import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import LogoutListener from "@/components/LogoutListener";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Recruitment Platform",
  description: "Connect with the best talent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased w-screen h-screen`}>
        <Providers>
          <LogoutListener />
          <Navbar />
          <div className="pt-[75px] p-[20px]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
