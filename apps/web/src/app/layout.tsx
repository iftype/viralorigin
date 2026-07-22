import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { SiteHeader } from "@/components/layout/site-header";
import { ClarityConsent } from "@/components/analytics/clarity-consent";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://viraltimes.vercel.app"),
  applicationName: "ViralTimes 바이럴타임즈",
  title: {
    default: "ViralTimes 바이럴타임즈 — 밈·챌린지 원본과 원조 검색",
    template: "%s | ViralTimes",
  },
  description:
    "밈과 챌린지의 원본·원조, 별칭, 근거와 확산 타임라인을 검색하고 함께 검증하는 사전입니다.",
  keywords: [
    "바이럴타임즈",
    "바이럴 타임즈",
    "밈 원조",
    "밈 유래",
    "밈 뜻",
    "챌린지 원조",
    "챌린지 처음",
    "원본 영상",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "ViralTimes 바이럴타임즈",
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <Analytics />
        <ClarityConsent />
      </body>
    </html>
  );
}
