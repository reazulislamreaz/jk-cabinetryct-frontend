import { Toaster } from "@/components/ui/sonner";
import VideoModal from "@/components/ui/VideoModal";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import { SocketProvider } from "@/context/SocketContext";
import { ReduxProvider } from "@/store/providers/ReduxProvider";
import type { Metadata, Viewport } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-merriweather",
});
// const merriweather = Merriweather({
//   subsets: ["latin"],
//   weight: ["300"],
//   display: "swap",
//   variable: "--font-merriweather",
// });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#721011",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jkcabinetryct.com"),
  title: {
    default: "J&K Cabinetry - Premium Quality Cabinets for Professionals",
    template: "%s | J&K Cabinetry",
  },
  description:
    "Premium quality cabinetry for professionals. Trusted by contractors and designers across the nation. Shop our extensive collection of kitchen cabinets, bathroom vanities, and custom cabinetry solutions.",
  keywords: [
    "J&K Cabinetry",
    "premium cabinets",
    "kitchen cabinets",
    "bathroom vanities",
    "cabinet manufacturer",
    "wholesale cabinets",
    "professional cabinetry",
    "custom cabinets",
    "cabinet contractor",
    "cabinet designer",
  ],
  authors: [{ name: "J&K Cabinetry" }],
  creator: "J&K Cabinetry",
  publisher: "J&K Cabinetry",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jkcabinetry.com",
    siteName: "J&K Cabinetry",
    title: "J&K Cabinetry - Premium Quality Cabinets for Professionals",
    description:
      "Premium quality cabinetry for professionals. Trusted by contractors and designers across the nation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "J&K Cabinetry - Premium Quality Cabinets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J&K Cabinetry - Premium Quality Cabinets for Professionals",
    description:
      "Premium quality cabinetry for professionals. Trusted by contractors and designers across the nation.",
    images: ["/og-image.jpg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body className={cinzel.className}>
        <ReduxProvider>
          <SocketProvider>
            {children}
            <VideoModal />
            <WhatsAppWidget />
            <Toaster position="top-center" richColors />
          </SocketProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
