import CollectionDetails from "@/components/layouts/Common/CollectionDetails";
import { generateDynamicMetadata } from "@/utils/metadata";
import { Metadata } from "next";
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const formattedName =
    decodedSlug
      ?.split("-")
      ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
      ?.join(" ") || "Collection";

  return generateDynamicMetadata({
    title: `${formattedName} - J&K Cabinetry`,
    description: `View details for our ${formattedName} collection.`,
    keywords: [
      "cabinets",
      "kitchen",
      "bathroom",
      "professional",
      "wholesale",
      "custom",
      formattedName,
    ],
  });
}

// ⭐ Slug pass korun as prop
export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CollectionDetails slug={slug} />;
}
