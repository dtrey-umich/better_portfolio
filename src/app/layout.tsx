import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { TopNavigation } from "@/components/TopNavigation";
import { BottomFooter } from "@/components/BottomFooter";

const inter = Inter({ subsets: ["latin"] });
const caveat = Caveat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - YwllowBolt",
  description: "Interactive portfolio showcasing projects across research, robotics, software, sculpture, videography, and play.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-white`} suppressHydrationWarning>
        <TopNavigation />
        <main className="pt-20">
          {children}
        </main>
        <BottomFooter />
      </body>
    </html>
  );
}
