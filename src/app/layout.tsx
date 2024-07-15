import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/scss/index.scss"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scatter Pro",
  description: "Scatter Plot Graph Creator",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
