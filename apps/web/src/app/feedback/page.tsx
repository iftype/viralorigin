import { ArrowLeft, CircleHelp, Lightbulb, MessageCircleMore } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Card, buttonClassName } from "@origin/ui";
import { SiteFeedbackForm } from "@/features/feedback/components/site-feedback-form";

export const metadata: Metadata = {
  title: "문의·피드백",
  description: "사이트 의견, 새로운 밈 요청, 원본 제보를 운영자에게 보내세요.",
};

export default function FeedbackPage() {
  return (
    <div className="page-shell py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link className="inline-flex items-center gap-1.5 text-sm font-bold text-black/45 hover:text-black" href="/">
          <ArrowLeft className="size-4" /> 돌아가기
        </Link>
        <p className="mt-8 flex items-center gap-2 text-xs font-black text-[#fe2c55]"><MessageCircleMore className="size-4" />CONTACT</p>
        <h1 className="mt-2 text-4xl font-black tracking-[-0.055em] sm:text-5xl">무엇을 도와드릴까요?</h1>
        <p className="mt-3 text-sm leading-6 text-black/50">사이트 오류와 개선 의견, 출처·저작권 문의를 남길 수 있어요. 사전에 없는 밈은 아래 전용 폼이 더 빨라요.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Card className="p-5 shadow-none">
            <CircleHelp className="size-5" />
            <h2 className="mt-3 font-black">원하는 밈이 없어요</h2>
            <p className="mt-1 text-xs leading-5 text-black/45">이름과 궁금한 내용만으로 추가 요청을 보낼 수 있어요.</p>
            <Link className={buttonClassName({ variant: "secondary", size: "sm", className: "mt-4" })} href="/submit?type=request">추가 요청</Link>
          </Card>
          <Card className="p-5 shadow-none">
            <Lightbulb className="size-5" />
            <h2 className="mt-3 font-black">원본을 알고 있어요</h2>
            <p className="mt-1 text-xs leading-5 text-black/45">초기 영상과 근거 링크를 운영자 검토 목록으로 보내주세요.</p>
            <Link className={buttonClassName({ variant: "secondary", size: "sm", className: "mt-4" })} href="/submit?type=origin">원본 제보</Link>
          </Card>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-black">사이트 문의·피드백</h2>
          <SiteFeedbackForm />
        </section>
      </div>
    </div>
  );
}
