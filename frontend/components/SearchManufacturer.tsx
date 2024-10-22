"use client"

import { Fragment, useState } from "react";
import Image from "next/image";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { Scrollbars } from 'react-custom-scrollbars-2';

import { manufacturers } from "@/constants";
import { SearchManuFacturerProps } from "@/types";

const SearchManufacturer = ({ selected, setSelected }: any) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <>
      <div className="search-manufacturer">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative w-full">
            <ComboboxButton className="absolute top-[14px]">
              <Image
                src="/car-logo.svg"
                width={20}
                height={20}
                className="ml-4"
                alt="Car Logo"
              />
            </ComboboxButton>

            <ComboboxInput
              className="search-manufacturer__input"
              placeholder="Volkswagen"
              displayValue={(manufacturer: string) => manufacturer}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions>
                <Scrollbars
                  style={{ width: "100%", height: "155px" }}
                  autoHide
                  autoHideTimeout={100}
                  autoHideDuration={100}
                >
                  {filteredManufacturers.map((item) => (
                    <ComboboxOption
                      key={item}
                      className={({ active }) => `relative z-0 search-manufacturer__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`}
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item}
                          </span>
                        </>
                      )}
                    </ComboboxOption>
                  ))}
                </Scrollbars>
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
      </div>
    </>
  );
};

export default SearchManufacturer;
