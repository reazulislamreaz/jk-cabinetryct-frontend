import PaymentShipping from "@/components/layouts/MainLayout/PaymentShipping/PaymentShipping";
import { generateDynamicMetadata } from "@/utils/metadata";

export const metadata = {
  ...generateDynamicMetadata({
    title: "Checkout - J&K Cabinetry",
    description:
      "Complete your order with secure payment and shipping options. Fast and reliable delivery for your premium cabinets.",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function PaymentShippingPage() {
  return <PaymentShipping />;
}
