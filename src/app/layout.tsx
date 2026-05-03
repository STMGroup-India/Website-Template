import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import F1Globe from "@/components/F1Globe";

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
      <body>
        {/* Animated mesh gradient background */}
        <div className="mesh-bg" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
        </div>

        {/* 3D F1 Globe */}
        <F1Globe />

        <Navbar />
        <main className="relative z-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
