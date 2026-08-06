"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { currencies } from "@/data/currencies";
import { useState } from "react";

const CurrencySelect = ({ SelectedCurrency, handleCurrency }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-2 border rounded-sm p-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger >
          <Button
            variant="outline"
            role="combobox"
            className="w-[200px] justify-between bg-transparent border-none hover:bg-transparent hover:text-white cursor-pointer"
          >
            {SelectedCurrency
              ? currencies.find(
                  (currency) => currency.value === SelectedCurrency,
                )?.label
              : "Select Currency"}

            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandInput placeholder="Search currency..." />
            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {currencies.map((currency) => (
                  <CommandItem
                    key={currency.value}
                    value={currency.value}
                    onSelect={(value) => {
                      handleCurrency(value);
                      setOpen(false);
                    }}
                  >
                    <Image
                      src={`https://flagsapi.com/${currency.country}/shiny/32.png`}
                      width={24}
                      height={24}
                      alt={currency.label}
                    />
                    {/* <img src={`https://flagcdn.com/256x192/${currency.country}.png`} width={24} height={24} /> */}
                    {currency.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        SelectedCurrency === currency.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CurrencySelect;