import OrdersView from "@/components/layouts/DashboardLayout/OrdersView";
import { defaultMetadata } from "@/utils/metadata";

export const metadata = defaultMetadata.orders;

export default function OrdersPage() {
  return <OrdersView />;
}
