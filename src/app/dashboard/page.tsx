import DashboardHome from "@/components/layouts/DashboardLayout/DashboardHome";
import { defaultMetadata } from "@/utils/metadata";

export const metadata = defaultMetadata.dashboard;

export default function DashboardPage() {
  return <DashboardHome />;
}
