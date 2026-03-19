import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KerbBackground from "@/components/KerbBackground";

export const metadata: Metadata = {
  title: "Alex Torque | F1 Creator Picks & Recommendations",
  description: "Shop the gear, tech, and essentials recommended by F1 content creator Alex Torque. Honest reviews from the paddock to your doorstep.",
  keywords: ["F1", "Formula 1", "creator", "influencer", "affiliate", "tech", "gear"],
  openGraph: {
    title: "Alex Torque | F1 Creator Picks",
    description: "Shop my favorite gear and tech from the world of Formula 1.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <Navbar />
        <div className="relative">
          <KerbBackground />
          <main className="relative z-10 min-h-screen">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
