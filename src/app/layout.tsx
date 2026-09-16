import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { BookingProvider } from "@/lib/booking-store";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.city}`,
  description: `A neighbourhood dining room in ${site.suburb}, ${site.city}. Wood fire, Mediterranean plates, and a table waiting for you.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <ToastProvider>
          <BookingProvider>{children}</BookingProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
