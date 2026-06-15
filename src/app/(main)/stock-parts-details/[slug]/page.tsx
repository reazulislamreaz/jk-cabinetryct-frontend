import StockItemPartsDetails from "@/components/layouts/MainLayout/StockItems/StockItemPartsDetails";
import { Metadata } from "next";
import { generateDynamicMetadata } from "@/utils/metadata";

type Props = {
  params: { slug: string };
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
    title: `${formattedName} - Stock Parts - J&K Cabinetry`,
    description: `View detailed information about ${formattedName} cabinet parts including specifications, availability, and pricing.`,
    keywords: [
      "cabinet parts",
      "stock parts",
      "cabinet components",
      "J&K Cabinetry",
      formattedName,
    ],
  });
}

export default function StockItemPartsDetailsPage() {
  return <StockItemPartsDetails />;
}
