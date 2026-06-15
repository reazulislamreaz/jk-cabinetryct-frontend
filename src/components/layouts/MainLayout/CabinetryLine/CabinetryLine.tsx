"use client";
import React from "react";
import CabinetryLineCard from "./CabinetryLineCard";
import { useGetAllCabinetryQuery } from "@/store/api/cabinetryApi";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ICabinetryLineResponse } from "@/types";

const CabinetryLine: React.FC = () => {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetAllCabinetryQuery(undefined);
  const cabinetryLineResponse =
    responseData?.data || ([] as ICabinetryLineResponse[]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        Error loading cabinetry lines.
      </div>
    );
  }
  return (
    <section className="w-full px-5 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-7xl mx-auto ">
        <div className="text-center mb-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Our Cabinetry Lines
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our premium collection of cabinet styles — from timeless
            Shaker to sleek Modern Slab
          </p>
        </div>

        <div className="space-y-20">
          {cabinetryLineResponse && cabinetryLineResponse?.length > 0 ? (
            cabinetryLineResponse?.map((cabinetry: ICabinetryLineResponse) => (
              <div key={cabinetry?.categoryId}>
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  {cabinetry?.categoryName}
                </h2>

                {cabinetry?.cabinetryDatas &&
                cabinetry?.cabinetryDatas?.length > 0 ? (
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-8">
                    {cabinetry?.cabinetryDatas?.map((item) => (
                      <CabinetryLineCard key={item?._id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 px-4">
                    <div className="text-center max-w-md">
                      <svg
                        className="w-24 h-24 text-gray-300 mx-auto mb-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        ></path>
                      </svg>
                      <h2 className="text-2xl font-bold text-gray-700 mb-3">
                        No Cabinetry Available
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Currently, there are no cabinetry items available in
                        this category.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="text-center max-w-md">
                <svg
                  className="w-24 h-24 text-gray-300 mx-auto mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
                <h2 className="text-2xl font-bold text-gray-700 mb-3">
                  No Cabinetry Available
                </h2>
                <p className="text-gray-600 mb-8">
                  Currently, there are no cabinetry items available in any
                  category.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CabinetryLine;
