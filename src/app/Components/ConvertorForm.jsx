"use client";

import { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import Graph from "./Graph";

const ConvertorForm = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [isLoading, setisLoading] = useState(false);
  const [result, setResult] = useState("");

  // SWAP CURRENCIES
  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  // PREPARE OUTPUT
  const getExchangeRate = async () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
    setisLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("something went wrong!!");

      const data = await response.json();
      const rate = (data.conversion_rate * amount).toFixed(4);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Promise.all([getExchangeRate()]);
  };

  return (
    <form onSubmit={handleSubmit} className="text-white font-semibold ">
      <div
        className="flex gap-4 rounded-2xl bbg-white/10 backdrop-blur-xs
border border-white/20 p-6"
      >
        <div>
          {/* TAKE INPUT */}
          <div className="flex flex-col gap-2">
            <label className="form-label">Enter Amount</label>
            <input
              type="number"
              placeholder="eg. 100"
              className="border bg-white text-black rounded p-2 outline-none mb-5 text-2xl "
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* FROM CURRENCY */}
          <div className="flex justify-around">
            <div className="overflow-hidden">
              <label className="form-label">From</label>
              <CurrencySelect
                SelectedCurrency={fromCurrency}
                handleCurrency={(value) => setFromCurrency(value)}
              />
            </div>

            {/* SWAP ICON */}
            <button
              type="button"
              onClick={handleSwap}
              className="mt-6 flex h-12 w-12 mx-4 items-center justify-center rounded-full bg-white hover:bg-gray-200 transition cursor-pointer active:scale-95"
            >
              <ArrowRightLeft className="h-6 w-6 text-black cursor-pointer" />
            </button>

            {/* TO CURRENCY */}
            <div className="form-section">
              <label className="form-label">To</label>
              <CurrencySelect
                SelectedCurrency={toCurrency}
                handleCurrency={(value) => setToCurrency(value)}
              />
            </div>
          </div>

          {/* GIVE OUTPUT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-10 bg-white font-semibold cursor-pointer text-xl text-black p-3 rounded border-none outline-none hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Exchange Rate
          </button>

          {(result || isLoading) && (
            <div className="border rounded flex justify-center p-3 mt-4 ">
              {isLoading ? (
                <div className="flex gap-2">
                  <Loader2 className="animate-spin" />
                  <span>Loading exchange rate...</span>
                </div>
              ) : (
                result
              )}
            </div>
          )}
        </div>
        {/* <Graph To={toCurrency} From={fromCurrency} /> */}
      </div>
    </form>
  );
};

export default ConvertorForm;
