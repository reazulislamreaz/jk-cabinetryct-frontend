import Collection from "@/components/layouts/Common/Collection";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = generateDynamicMetadata({
  title: "Collections - J&K Cabinetry",
  description: "Browse our premium cabinet collections",
});

const page = () => {
  return <Collection />;
};

export default page;
