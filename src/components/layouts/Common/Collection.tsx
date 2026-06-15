"use client";
import Link from "next/link";
import aboutBg from "@/assets/home/about/jk-bg.png";
import { useGetAllCollectionsQuery } from "@/store/api/collectionsApi";
import { ICollection } from "@/types/collection";
import CollectionCard from "./CollectionCard";

const Collection = () => {
  const { data: responseData } = useGetAllCollectionsQuery(undefined);
  const collections = responseData?.data || [];

  return (
    <section
      className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16 "
      style={{
        backgroundImage: `url(${aboutBg.src})`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-xl md:text-2xl font-semibold leading-tight text-gray-900 mb-4 text-center">
          EXPLORE OUR J&K CABINET COLLECTIONS
        </h2>

        {/* Main 4 Large Collections */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-16">
          {collections?.map((collection: ICollection) => (
            <CollectionCard key={collection?._id} collection={collection} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link href="/our-cabinets">
            <button
              className="w-full md:w-auto px-10 h-14 border-2 rounded border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer "
              aria-label="Explore J&K Cabinets Collection"
            >
              Explore J&K Cabinets Collection
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collection;
