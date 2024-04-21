import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OCOP CDiT",
  description: "OCOP",
};

export default function RootLayout({
  header,
  children,
  footer,
}: Readonly<{
  header: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
