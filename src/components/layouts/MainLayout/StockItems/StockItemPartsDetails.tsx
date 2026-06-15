"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks";
import useAuth from "@/hooks/useAuth";
import { useGetPartsDetailsBySlugQuery } from "@/store/api/partsApi";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import RestrictedAccess from "../../RestrictedAccess";
import { BusinessType } from "@/types";
import { IParts } from "@/types/parts";
import { Breadcrumb } from "../../DashboardLayout/Breadcrumb";
import DOMPurify from "isomorphic-dompurify";

const StockItemPartsDetails = () => {
  const { user: currentUser, isAuthenticated } = useAuth();
  const params = useParams();
  const slug = params?.slug as string;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState("1"); // string because Select works with string values

  const {
    data: responseData,
    isLoading,
    isError,
  } = useGetPartsDetailsBySlugQuery(slug as string, {
    skip: !isAuthenticated && !currentUser && !slug,
  });

  const partsDetails = responseData?.data as IParts | undefined;

  const dispatch = useAppDispatch();

  const thumbnailImages = React.useMemo(() => {
    if (!partsDetails) return [];
    const imgs = [...partsDetails.images];
    if (partsDetails.mainImage && partsDetails.mainImage.trim() !== "") {
      if (!imgs.includes(partsDetails.mainImage)) {
        imgs.unshift(partsDetails.mainImage);
      }
    }
    return imgs;
  }, [partsDetails]);
  const currentImage =
    thumbnailImages.length > 0 ? thumbnailImages[selectedImageIndex] : null;

  const getPrice = () => {
    if (!partsDetails || !isAuthenticated || !currentUser) {
      return partsDetails?.price?.wholesale || 0;
    }

    switch (currentUser.businessType) {
      case BusinessType.CONSTRACTOR:
        return partsDetails.price.contractor;
      case BusinessType.DEALER:
      case BusinessType.SHOWROOM:
        return partsDetails.price.wholesale;
      case BusinessType.SALESREPRESENTATIVE:
      case BusinessType.BUILDERDEVELOPER:
      case BusinessType.DISTRIBUTOR:
      case BusinessType.RETAILER:
      case BusinessType.ONLINERETAILER:
        return partsDetails.price.wholesaleWithTenPercent;
      case BusinessType.OTHER:
      default:
        return partsDetails.price.wholesale;
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart");
      return;
    }
    if (!partsDetails) {
      toast.error("No part details available");
      return;
    }
    const qty = parseInt(quantity);
    if (qty < 1) {
      toast.error("Please select a quantity");
      return;
    }

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
        part: partsDetails,
        quantity: qty,
        isAssemblyPrice: false,
        priceType,
      })
    );
    toast.success(`${partsDetails.title} added to cart!`);
  };

  if (!isAuthenticated) return <RestrictedAccess />;
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
        <div className="text-gray-700 mb-4">Failed to load part details.</div>
      </div>
    );

  if (!partsDetails || !partsDetails.title)
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="text-gray-500 text-xl mb-4">No Data</div>
        <div className="text-gray-700 mb-4">No part details found.</div>
      </div>
    );

  const currentPrice = getPrice();

  return (
    <section className="w-full min-h-screen bg-white px-5 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <Breadcrumb
          items={[
            { label: "Shop Cabinetry Line", href: "/cabinet-lines" },
            { label: `${partsDetails.title}/${partsDetails.code}` },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto mt-10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="flex justify-center items-center h-[500px] rounded-lg">
              {currentImage ? (
                <Image
                  src={currentImage}
                  width={500}
                  height={500}
                  className="object-contain max-h-[500px] w-auto"
                  alt={`${partsDetails.title} - Main Image`}
                  priority
                />
              ) : (
                <div className="text-gray-400 text-center">
                  <p>No image available</p>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {thumbnailImages.length > 0 && (
              <div className="grid grid-cols-5 gap-3">
                {thumbnailImages.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary shadow-md"
                        : "border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      fill
                      className="object-cover"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {partsDetails.title}/{partsDetails.code}
              </h1>
              <p className="text-sm text-gray-500">
                by <span className="text-primary">J&K Cabinetryct</span>
              </p>
            </div>

            <div className="text-3xl font-bold text-gray-900">
              ${currentPrice.toFixed(2)}
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-semibold">SKU: </span>
              {partsDetails.title}/{partsDetails.code}
            </div>

            <div
              className="text-gray-700 leading-relaxed border-t border-gray-200 pt-6"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(partsDetails?.description || ""),
              }}
            />

            {/* Quantity + Add to Cart */}
            <div className="flex items-end gap-4 pt-4">
              {/* shadcn Select for Quantity */}
              <div className="shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="1" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(20)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grow">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary cursor-pointer rounded hover:bg-[#6B0000] text-white py-6 text-base font-semibold"
                >
                  Add to cart
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>In Stock - Ships within 2-3 business days</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <svg
                  className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span>Quality guaranteed by J&K Cabinetry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockItemPartsDetails;
