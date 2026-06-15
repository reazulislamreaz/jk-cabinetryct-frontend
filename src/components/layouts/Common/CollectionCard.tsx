import { ICollection } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";

const CollectionCard = ({ collection }: { collection: ICollection }) => {
  return (
    <Link
      key={collection?._id}
      href={`/collections/${collection?.slug}` || "/"}
      className="group block"
    >
      <div className="relative overflow-hidden ">
        {collection?.mainImage && (
          <div className="aspect-w-3 aspect-h-4">
            <Image
              src={collection?.mainImage}
              alt={collection?.slug || "Image"}
              width={600}
              height={800}
              className="w-full h-96 md:h-[450px] object-cover hover:scale-90 transition-all duration-300"
            />
          </div>
        )}
        <h1 className="text-center font-semibold text-primary">
          {collection?.code} | {collection?.color}
        </h1>
      </div>
    </Link>
  );
};

export default CollectionCard;
