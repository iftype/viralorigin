import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Origin — 밈의 시작을 확인하세요",
    template: "%s | Origin",
  },
  description:
    "밈, 챌린지, 바이럴 영상의 현재까지 확인된 원본과 확산 과정을 살펴보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

