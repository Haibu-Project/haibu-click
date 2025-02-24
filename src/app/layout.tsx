import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FirstTimeRenderLayout from "@/layout/FirstTimeRender";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haibu Clicks",
  description: "Haibu Clicks - Empowering Connections",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-gray-900`}>
        <FirstTimeRenderLayout>{children}</FirstTimeRenderLayout>
      </body>
    </html>
  );
}
