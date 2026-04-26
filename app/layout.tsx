import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ascend Cabin Optimizer",
  description: "Identify the ideal premium cabin instantly.",
  icons: {
    icon: "/images/ascend-logo.png",
    shortcut: "/images/ascend-logo.png",
    apple: "/images/ascend-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-white text-[#152533]">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}