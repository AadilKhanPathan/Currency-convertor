"use client";

import { useState, useEffect } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const description = "A linear line chart";

// Configured to match the 'rate' dataKey
const chartConfig = {
  rate: {
    label: "Exchange Rate",
    color: "var(--chart-4)",
  },
};

const rangeLabels = {
  "7d": "Last Week",
  "1m": "Last Month",
  "1y": "Last Year",
};

function ChartLineLinear({ From, To }) {
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("7d");
  const [isLoading, setisLoading] = useState(false);
  const [stats, setStats] = useState({
    change: 0,
    percentage: 0,
    increased: false,
  });

  useEffect(() => {
    async function getHistory() {
      try {
        setisLoading(true);

        const today = new Date();
        const startDate = new Date();

        switch (range) {
          case "7d":
            startDate.setDate(today.getDate() - 9);
            break;

          case "1m":
            startDate.setMonth(today.getMonth() - 1);
            break;

          case "1y":
            startDate.setFullYear(today.getFullYear() - 1);
            break;

          default:
            startDate.setDate(today.getDate() - 9);
        }

        const start = startDate.toISOString().split("T")[0];
        const end = today.toISOString().split("T")[0];

        console.log("fetching api");

        // FIRST API
        // const res = await fetch(
        //   `/api/history?from=${From}&to=${To}&start=${start}&end=${end}`,
        // );

        // const data = await res.json();

        // const formatted = Object.entries(data.rates).map(([date, rates]) => ({
        //   date,
        //   rate: rates[To],
        // }));

        // SECOND API
        const res = await fetch(
          `/api/history?from=${From}&to=${To}&start=${start}&end=${end}`,
        );

        const data = await res.json();

        const pair = `${From}${To}`;

        if (!data.quotes) {
          console.error("Unexpected API response:", data);
          return;
        }

        const formatted = Object.entries(data.quotes).map(([date, quotes]) => ({
          date,
          rate: quotes[pair],
        }));

        // CALCULATING EXCHANGE RATE STATS
        const firstRate = formatted[0]?.rate;
        const lastRate = formatted[formatted.length - 1]?.rate;

        const change = lastRate - firstRate;

        const percentage = (change / firstRate) * 100;

        console.log(change, percentage);

        setStats({
          change,
          percentage,
          increased: change >= 0,
        });

        console.log(formatted);
        setChartData(formatted);
      } catch (err) {
        console.log(err);
      } finally {
        setisLoading(false);
      }
    }

    getHistory();
  }, [From, To, range]);

 return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{`${From} to ${To} - Exchange Rate`}</CardTitle>
        <div className="flex justify-between">

          {isLoading ? <Skeleton className="h-5 w-[250px] mt-3"></Skeleton> :
          <CardDescription
            className={ cn( "flex mt-1.5 gap-1.5",
              stats.increased ? "text-green-600" : "text-red-600"
  )}
          >
            {stats.increased ? <TrendingUp/> : <TrendingDown/>}
            {stats.change.toFixed(4)} {" "} 
            ({stats.percentage.toFixed(2)}%) {" "}
            <span className="text-black">{rangeLabels[range]}</span>
          </CardDescription>
}
          <div className="flex gap-2">
            <Button
              variant={range === "7d" ? "default" : "outline"}
              onClick={() => setRange("7d")}
              className="cursor-pointer"
            >
              last week
            </Button>
            <Button
              variant={range === "1m" ? "default" : "outline"}
              onClick={() => setRange("1m")}
              className="cursor-pointer"
            >
              1 Month
            </Button>
            <Button
              variant={range === "1y" ? "default" : "outline"}
              onClick={() => setRange("1y")}
              className="cursor-pointer"
            >
              1 year
            </Button>
          </div>
        </div>
      </CardHeader>

      {isLoading ? (
        <Skeleton className="h-75 rounded-lg w-134 mx-3.5"></Skeleton>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig} className="h-75 w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />

              {/* 2. Added YAxis configuration */}
              <YAxis
                dataKey="rate"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // Formats the Y-axis numbers to show currency (e.g., ₹83.5)
                tickFormatter={(value) => `${value}`}
                // Prevents the line from flattening by auto-scaling axis bounds
                domain={["auto", "auto"]}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />

              {/* Customized Tooltip */}
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    // Formats the tooltip date header (e.g., Oct 15, 2024)
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                    // Formats the hovered rate value
                    formatter={(value) => [
                      `${Number(value).toFixed(2)}`,
                      "Rate",
                    ]}
                  />
                }
              />

              <Line
                dataKey="rate"
                type="linear"
                stroke="var(--color-rate)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      )}

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing exchange rates of the {rangeLabels[range].toLowerCase()}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ChartLineLinear;
