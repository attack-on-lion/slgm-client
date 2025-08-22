import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./layout.client";

export const metadata: Metadata = {
  title: "슬기로운 소비생활",
  description: "적게 쓰기 챌린지",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

