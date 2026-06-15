import Cart from "@/components/layouts/MainLayout/Cart/Cart";
import { defaultMetadata } from "@/utils/metadata";

export const metadata = {
  ...defaultMetadata.cart,
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartPage() {
  return <Cart />;
}
