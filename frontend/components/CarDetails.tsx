"use client";

import Image from "next/image";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CarProps } from "@/types";
import Scrollbars from "react-custom-scrollbars-2";
import { generateCarImageUrl } from "@/utils";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
  return (
    <>
      <Transition appear show={isOpen}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-lg max-h-[90vh] transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5 overflow-hidden">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <Scrollbars
                    style={{ width: "100%", height: "80vh" }} // Adjust height as needed
                    autoHide
                    autoHideTimeout={100}
                    autoHideDuration={300}
                  >
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                        <Image
                          src={generateCarImageUrl(car)}
                          alt="car model"
                          fill
                          priority
                          className="object-contain"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            src={generateCarImageUrl(car)}
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            src={generateCarImageUrl(car)}
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg">
                          <Image
                            src={generateCarImageUrl(car)}
                            alt="car model"
                            fill
                            priority
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <h2 className="font-semibold text-xl capitalize">
                        {car.make} {car.model}
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-4">
                        {Object.entries(car).map(([key, value]) => (
                          <div
                            className="flex justify-between gap-5 w-full text-right"
                            key={key}
                          >
                            <h4 className="text-gray capitalize">
                              {key.split("_").join(" ")}
                            </h4>
                            <p className="text-black-100 font-semibold">
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Scrollbars>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CarDetails;
