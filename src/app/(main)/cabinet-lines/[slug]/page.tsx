import CabinetryLineDetails from "@/components/layouts/MainLayout/CabinetryLine/CabinetryLineDetails";
import { Metadata } from "next";
import { generateDynamicMetadata } from "@/utils/metadata";

type Props = {
  params: Promise<{ slug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const formattedName =
    decodedSlug
      ?.split("-")
      ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
      ?.join(" ") || "Cabinetry Line";

  return generateDynamicMetadata({
    title: `${formattedName} - J&K Cabinetry`,
    description: `View details for our ${formattedName} cabinetry line.`,
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CabinetryLineDetails slug={slug} />;
}
