import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/theme-provider";
import { ProductProvider } from "@/context/ProductContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "GildedStone",
  description: "Welcome to my GildedStone App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-black-100`}
      >
        <ProductProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </ProductProvider>
        <Toaster />
      </body>
    </html>
  );
}
