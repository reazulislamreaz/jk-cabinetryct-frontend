"use client";
import DOMPurify from "isomorphic-dompurify";
import { useGetCollectionBySlugQuery } from "@/store/api/collectionsApi";
import { ICollection } from "@/types/collection";
import Image from "next/image";
import { Breadcrumb } from "../DashboardLayout/Breadcrumb";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";

interface CollectionDetailsProps {
  slug: string;
}

const CollectionDetails = ({ slug }: CollectionDetailsProps) => {
  const { data: responseData, isLoading } = useGetCollectionBySlugQuery(
    slug as string,
    {
      skip: !slug,
    },
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const collection = responseData?.data as ICollection;
  const galleryImages = collection?.images || [];

  return (
    <section className="w-full px-5 py-8">
      <div className="w-full max-w-7xl mx-auto ">
        <Breadcrumb
          items={[
            { label: "Collections", href: "/collections" },
            { label: collection?.slug || "" },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12  gap-5 md:gap-10 items-start mt-10">
          {/* Left Column: Door Sample + Title + Description */}
          <div className="col-span-full lg:col-span-5 flex flex-col items-center lg:items-start">
            {collection?.mainImage && (
              <div className="mb-12">
                <Image
                  src={collection?.mainImage}
                  alt={`Sample door - ${collection?.code}`}
                  width={400}
                  height={600}
                  className="w-full max-w-sm h-auto object-contain "
                  priority
                />
              </div>
            )}

            {/* Title, Description & CTA */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-light  tracking-wider text-gray-900 mb-6">
                {collection?.color} Cabinets
              </h1>

              <div className="w-20 h-px bg-primary mx-auto lg:mx-0 mb-8"></div>

              {/* Description (HTML supported) */}
              <div
                className="text-gray-600 text-base leading-relaxed mb-10"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(collection?.description || ""),
                }}
              />

              {/* Contact Button */}
              <Link href="/contact">
                {" "}
                <button className="bg-primary text-white px-10 py-4 rounded mx-auto uppercase tracking-widest text-sm  transition duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Gallery Images (Exact match with screenshot) */}
          <div className="w-full col-span-full lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {galleryImages?.map((image, index) => {
                const isOddRow = Math.floor(index / 2) % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden border border-primary group cursor-pointer rounded-lg ${
                      isOddRow ? "h-56 md:h-96" : "h-32 md:h-48"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Gallery Image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-125 transition-all duration-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionDetails;
