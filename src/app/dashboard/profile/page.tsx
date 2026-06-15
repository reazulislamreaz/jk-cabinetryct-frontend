import ProfileView from "@/components/layouts/DashboardLayout/ProfileView";
import { defaultMetadata } from "@/utils/metadata";

export const metadata = defaultMetadata.profile;

export default function ProfilePage() {
  return <ProfileView />;
}
