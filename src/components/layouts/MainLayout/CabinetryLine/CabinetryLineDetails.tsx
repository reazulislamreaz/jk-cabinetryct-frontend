"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ICabinetry } from "@/types/cabinetry.types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import useAuth from "@/hooks/useAuth";
import RestrictedAccess from "../../RestrictedAccess";
import { useGetCabinetDetailsBySlugQuery } from "@/store/api/cabinetryApi";
import { useGetAllPartsQuery } from "@/store/api/partsApi";
import { IStockItemResponse } from "@/stockItem";
import { IParts } from "@/types/parts";
import { BusinessType } from "@/types";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Breadcrumb } from "../../DashboardLayout/Breadcrumb";

interface CabinetryLineDetailsProps {
  slug: string;
}
const CabinetryLineDetails = ({ slug }: CabinetryLineDetailsProps) => {
  const { isAuthenticated, user: currentUser } = useAuth();
  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetCabinetDetailsBySlugQuery(slug, {
    skip: !slug,
  });
  const cabinetryDetails = responseData?.data as ICabinetry;

  const { data: stockItemWithPartsDataResponse } = useGetAllPartsQuery(
    undefined,
    {
      skip: !slug,
    },
  );
  const stockItemWithPartsDataResult =
    stockItemWithPartsDataResponse as IStockItemResponse;

  // Safe access to stock items
  const stockItems = (stockItemWithPartsDataResult?.data ?? []) as Array<
    (typeof stockItemWithPartsDataResult.data)[number]
  >;
  const hasNoStockItems = stockItems.length === 0;

  // State for selected tab and quantities
  const [openStock, setOpenStock] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Derived active tab: use openStock if set, otherwise default to first item
  const activeStockId =
    openStock ||
    (stockItems.length > 0 ? stockItems[0]?.stockItemId || `stock-0` : null);

  const toggleStock = (id: string) => {
    setOpenStock(id);
  };

  const updateQuantity = (partKey: string, value: string) => {
    const numValue = parseInt(value) || 1;
    setQuantities((prev) => ({
      ...prev,
      [partKey]: Math.max(1, numValue),
    }));
  };

  const dispatch = useAppDispatch();

  const handleAddToCart = (part: IParts, partKey: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart");
      return;
    }

    const quantity = quantities[partKey] || 1;

    let priceType: "wholesale" | "wholesaleWithTenPercent" | "contractor" =
      "wholesale";

    if (currentUser) {
      switch (currentUser.businessType) {
        case BusinessType.CONSTRACTOR:
          priceType = "contractor";
          break;
        case BusinessType.DEALER:
        case BusinessType.SHOWROOM:
          priceType = "wholesale";
          break;
        case BusinessType.SALESREPRESENTATIVE:
        case BusinessType.BUILDERDEVELOPER:
        case BusinessType.DISTRIBUTOR:
        case BusinessType.RETAILER:
        case BusinessType.ONLINERETAILER:
          priceType = "wholesaleWithTenPercent";
          break;
        default:
          priceType = "wholesale";
      }
    }

    dispatch(
      addToCart({
        part,
        quantity,
        isAssemblyPrice: false,
        priceType,
      }),
    );

    toast.success(`${part.title}/${part.code} added to cart!`);
  };

  const getPrice = (part: IParts): number => {
    if (!isAuthenticated || !currentUser) {
      return part.price.wholesale;
    }

    switch (currentUser.businessType) {
      case BusinessType.CONSTRACTOR:
        return part.price.contractor;
      case BusinessType.DEALER:
      case BusinessType.SHOWROOM:
        return part.price.wholesale;
      case BusinessType.SALESREPRESENTATIVE:
      case BusinessType.BUILDERDEVELOPER:
      case BusinessType.DISTRIBUTOR:
      case BusinessType.RETAILER:
      case BusinessType.ONLINERETAILER:
        return part.price.wholesaleWithTenPercent;
      default:
        return part.price.wholesale;
    }
  };

  // Filter parts based on search query
  const filterParts = (parts: IParts[]) => {
    if (!searchQuery.trim()) return parts;

    const query = searchQuery.toLowerCase().trim();
    return parts.filter(
      (part) =>
        part.title.toLowerCase().includes(query) ||
        part.code.toLowerCase().includes(query) ||
        (part.description && part.description.toLowerCase().includes(query)),
    );
  };

  if (!isAuthenticated) {
    return <RestrictedAccess />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
        <div className="text-gray-700 mb-4">
          Failed to load cabinetry details.
        </div>
        <div className="text-gray-500 text-sm">
          Please try again later or contact support.
        </div>
      </div>
    );
  }

  if (!cabinetryDetails || !cabinetryDetails.code) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="text-gray-500 text-xl mb-4">No Data</div>
        <div className="text-gray-700 mb-4">No cabinetry details found.</div>
        <div className="text-gray-500 text-sm">
          The requested cabinetry may not exist or is not available.
        </div>
      </div>
    );
  }
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Shop Cabinetry Line", href: "/cabinet-lines" },
            { label: `${cabinetryDetails.code}/${cabinetryDetails.color}` },
          ]}
        />
      </div>
      {/* Header Section with Image and Details */}
      <div className="bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary text-center mb-16">
            Shop {cabinetryDetails?.code} {cabinetryDetails?.color}
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="flex justify-center items-center h-[400px]">
              <Image
                src={`${cabinetryDetails?.mainImage}`}
                width={400}
                height={400}
                className="object-contain max-h-[400px] w-auto"
                alt={`${cabinetryDetails?.code} - Image ${cabinetryDetails?.slug}`}
                priority={cabinetryDetails?.slug === "white" ? true : false}
              />
            </div>

            <div className="w-full">
              <div
                className="max-w-none"
                dangerouslySetInnerHTML={{
                  __html: cabinetryDetails.description,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* No Stock Items Message */}
      {hasNoStockItems ? (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-200">
            <svg
              className="w-24 h-24 text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">
              No Stock Items Found
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              Currently, there are no stock items available for this cabinetry
              line. Please check back later or contact support for assistance.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Navigation Tabs - Desktop Only */}
          <div className="hidden xl:block w-full border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="w-full mx-auto px-6">
              <div className="flex justify-center gap-1 overflow-x-auto">
                {stockItems?.map((item, index) => {
                  const stockId = item?.stockItemId || `stock-${index}`;
                  return (
                    <button
                      key={stockId}
                      onClick={() => toggleStock(stockId)}
                      className={`px-3 py-3 text-sm font-medium cursor-pointer whitespace-nowrap border border-b-0 border-primary transition-colors rounded-t ${
                        activeStockId === stockId
                          ? "bg-primary text-white border-primary"
                          : "text-primary"
                      }`}
                    >
                      {item?.stockItemName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center max-w-md ml-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search all products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Mobile & Tablet - Accordion View */}
            <div className="xl:hidden space-y-4">
              {stockItems?.map((item, index) => {
                const stockId = item?.stockItemId || `stock-${index}`;
                const isOpen = activeStockId === stockId;

                return (
                  <div
                    key={stockId}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleStock(stockId)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-base font-semibold text-gray-900">
                        {item?.stockItemName}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Accordion Content */}
                    {isOpen && (
                      <div className="p-4 bg-white">
                        {!item?.titles || item.titles.length === 0 ? (
                          <div className="flex flex-col items-center justify-center py-8 px-4">
                            <svg
                              className="w-16 h-16 text-gray-300 mb-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                            <h2 className="text-lg font-bold text-gray-700 mb-1">
                              No Items Found
                            </h2>
                            <p className="text-sm text-gray-600 text-center">
                              No items available in this category.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {item?.titles.map((titleData) => {
                              const filteredParts = filterParts(
                                titleData?.parts || [],
                              );

                              return (
                                <div key={titleData?.titleId}>
                                  <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-3">
                                    {titleData?.titleName}
                                  </h3>

                                  {filteredParts?.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                      {filteredParts?.map((part) => {
                                        const partKey = `${stockId}-${part._id}`;
                                        const price = getPrice(part);

                                        return (
                                          <div
                                            key={partKey}
                                            className="flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                                          >
                                            <Link
                                              href={`/stock-parts-details/${part?.slug}`}
                                              className="relative aspect-square bg-gray-50"
                                            >
                                              <Image
                                                src={part.mainImage}
                                                alt={part.title}
                                                fill
                                                className="object-cover"
                                              />
                                            </Link>

                                            <div className="p-3 flex flex-col gap-2">
                                              <Link
                                                href={`/stock-parts-details/${part?.slug}`}
                                              >
                                                <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors">
                                                  {part.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                  {part.code}
                                                </p>
                                              </Link>

                                              <p className="text-base font-semibold text-gray-900">
                                                ${price.toFixed(2)}
                                              </p>

                                              <input
                                                type="number"
                                                min="1"
                                                value={quantities[partKey] || 1}
                                                onChange={(e) =>
                                                  updateQuantity(
                                                    partKey,
                                                    e.target.value,
                                                  )
                                                }
                                                className="w-full px-2 py-1.5 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                              />

                                              <Button
                                                onClick={() =>
                                                  handleAddToCart(part, partKey)
                                                }
                                                className="w-full bg-primary text-white px-3 py-2 text-sm rounded hover:bg-primary/90 transition-colors"
                                              >
                                                Add to cart
                                              </Button>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center py-8 px-4">
                                      <svg
                                        className="w-12 h-12 text-gray-300 mb-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                      </svg>
                                      <h2 className="text-base font-semibold text-gray-700 mb-1">
                                        {searchQuery
                                          ? "No matching products"
                                          : "No Parts Available"}
                                      </h2>
                                      <p className="text-sm text-gray-600 text-center">
                                        {searchQuery
                                          ? `No products match "${searchQuery}"`
                                          : "No parts available in this category."}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop - Tab Content View */}
            <div className="hidden xl:block">
              {stockItems?.map((item, index) => {
                const stockId = item?.stockItemId || `stock-${index}`;

                if (activeStockId !== stockId) return null;

                if (!item?.titles || item.titles.length === 0) {
                  return (
                    <div
                      key={stockId}
                      className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <svg
                        className="w-20 h-20 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <h2 className="text-xl font-bold text-gray-700 mb-2">
                        No Items Found
                      </h2>
                      <p className="text-gray-600 text-center">
                        Currently, there are no items available in this
                        category.
                      </p>
                    </div>
                  );
                }

                return (
                  <div key={stockId} className="space-y-8">
                    {item?.titles.map((titleData) => {
                      const filteredParts = filterParts(titleData?.parts || []);

                      return (
                        <div key={titleData?.titleId}>
                          <h3 className="text-base md:text-xl text-gray-700 font-semibold border-b border-gray-200 pb-2 mb-4">
                            {titleData?.titleName}
                          </h3>

                          {filteredParts?.length > 0 ? (
                            <div className="space-y-4">
                              {filteredParts?.map((part) => {
                                const partKey = `${stockId}-${part._id}`;
                                const price = getPrice(part);

                                return (
                                  <div
                                    key={partKey}
                                    className="w-full flex justify-between gap-4 items-center py-2 border-b border-gray-200"
                                  >
                                    <Link
                                      href={`/stock-parts-details/${part?.slug}`}
                                      className="flex gap-4 items-center"
                                    >
                                      <div className="shrink-0 w-[60px] h-[60px]">
                                        <Image
                                          src={part?.mainImage}
                                          alt={part.title}
                                          width={60}
                                          height={60}
                                          className="w-full h-full object-cover rounded"
                                        />
                                      </div>

                                      <div className="grow min-w-0 group">
                                        <h1 className="text-base font-semibold hover:text-primary transition-colors flex items-center">
                                          {part.title}/{part.code}
                                          <BsBoxArrowUpRight className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </h1>
                                        <p className="text-sm text-gray-500 mt-1">
                                          {part.title}/{part.code}
                                        </p>
                                      </div>
                                    </Link>

                                    <div className="flex gap-4 items-center">
                                      <div className="shrink-0 text-right">
                                        <p className="text-lg font-semibold text-gray-900">
                                          ${price.toFixed(2)}
                                        </p>
                                      </div>

                                      <div className="shrink-0">
                                        <input
                                          type="number"
                                          min="1"
                                          value={quantities[partKey] || 1}
                                          onChange={(e) =>
                                            updateQuantity(
                                              partKey,
                                              e.target.value,
                                            )
                                          }
                                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                      </div>

                                      <div className="shrink-0">
                                        <Button
                                          onClick={() =>
                                            handleAddToCart(part, partKey)
                                          }
                                          className="bg-primary cursor-pointer text-white px-6 py-2 rounded transition-colors"
                                        >
                                          Add to cart
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-12 px-4">
                              <svg
                                className="w-16 h-16 text-gray-300 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                {searchQuery
                                  ? "No matching products found"
                                  : "No Parts Available"}
                              </h2>
                              <p className="text-gray-600 text-center">
                                {searchQuery
                                  ? `No products match "${searchQuery}". Try different keywords.`
                                  : "Currently, there are no parts available in this category."}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CabinetryLineDetails;
