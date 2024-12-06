import Header from "@component/header";
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Jimmy",
  description: "Welcome to Jimmy Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={JetBrainsMono.variable}>
        <Header />
        {children}
      </body>
    </html>
  );
}
