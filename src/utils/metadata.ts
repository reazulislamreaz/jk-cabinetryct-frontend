import { Metadata } from "next";

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
}

export const generateDynamicMetadata = ({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
}: PageMetadata): Metadata => {
  return {
    title: {
      default: title,
      template: `%s | ${title.split(" - ")[0] || "J&K Cabinetry"}`,
    },
    description,
    keywords: [
      ...keywords,
      "J&K Cabinetry",
      "premium cabinets",
      "kitchen cabinets",
      "bathroom vanities",
      "cabinet manufacturer",
      "wholesale cabinets",
      "professional cabinetry",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://jkcabinetry.com",
      siteName: "J&K Cabinetry",
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};

// Default metadata for common pages
export const defaultMetadata = {
  home: generateDynamicMetadata({
    title: "J&K Cabinetry - Premium Quality Cabinets for Professionals",
    description:
      "Premium quality cabinetry for professionals. Trusted by contractors and designers across the nation. Shop our extensive collection of kitchen cabinets, bathroom vanities, and custom cabinetry solutions.",
    keywords: [
      "cabinets",
      "kitchen",
      "bathroom",
      "professional",
      "wholesale",
      "custom",
    ],
  }),
  about: generateDynamicMetadata({
    title: "About J&K Cabinetry - Craftsmanship & Quality",
    description:
      "Learn about J&K Cabinetry's commitment to quality craftsmanship and premium cabinetry solutions for professionals.",
  }),
  products: generateDynamicMetadata({
    title: "Our Cabinet Collection - J&K Cabinetry",
    description:
      "Explore our extensive collection of premium quality cabinets for kitchens, bathrooms, and custom projects.",
  }),
  contact: generateDynamicMetadata({
    title: "Contact J&K Cabinetry - Get in Touch",
    description:
      "Reach out to J&K Cabinetry for inquiries about our premium cabinetry solutions.",
  }),
  cart: generateDynamicMetadata({
    title: "Your Cart - J&K Cabinetry",
    description: "Review and manage items in your shopping cart.",
  }),
  checkout: generateDynamicMetadata({
    title: "Checkout - J&K Cabinetry",
    description: "Complete your purchase with our secure checkout process.",
  }),
  dashboard: generateDynamicMetadata({
    title: "Dashboard - J&K Cabinetry",
    description: "Manage your account, orders, and preferences.",
  }),
  profile: generateDynamicMetadata({
    title: "My Profile - J&K Cabinetry",
    description: "Update your profile information and preferences.",
  }),
  orders: generateDynamicMetadata({
    title: "My Orders - J&K Cabinetry",
    description: "View and manage your order history.",
  }),
};
