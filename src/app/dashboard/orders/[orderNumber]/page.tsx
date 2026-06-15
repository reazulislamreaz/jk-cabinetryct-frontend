import OrderDetails from "@/components/layouts/DashboardLayout/OrderDetails";
import { Metadata } from "next";
import { generateDynamicMetadata } from "@/utils/metadata";

type Props = {
  params: { orderNumber: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { orderNumber } = await params;

  return generateDynamicMetadata({
    title: `Order #${orderNumber} - J&K Cabinetry`,
    description: `View details for order #${orderNumber}`,
  });
}

export default function OrderDetailsPage() {
  return <OrderDetails />;
}
