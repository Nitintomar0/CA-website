import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileNotchedNavigation } from "@/components/layout/MobileNotchedNavigation";
import { FloatingContactMenu } from "@/components/layout/FloatingContactMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abhishek Tiwari & Company | Chartered Accountants",
    template: "%s | Chartered Accountancy Firm",
  },
  description:
    "Accounting, taxation and business advisory for people and organisations ready to move with confidence.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <MobileNotchedNavigation />
        <FloatingContactMenu />
      </body>
    </html>
  );
}
