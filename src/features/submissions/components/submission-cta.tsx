import { ArrowUpRight, MessageCircleWarning } from "lucide-react";

export function SubmissionCta({ memeTitle }: { memeTitle: string }) {
  const issueTitle = encodeURIComponent(`[제보] ${memeTitle} 출처 수정`);
  const issueBody = encodeURIComponent(
    `## 제보 내용\n\n- 더 오래된 원본 / 잘못된 정보 / 타임라인 추가\n\n## 근거 링크\n\n\n## 설명\n\n`,
  );
  const issueUrl = `https://github.com/iftype/meme-origin-timeline/issues/new?title=${issueTitle}&body=${issueBody}`;

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-[#fe2c55]/15 bg-[#fff4f6] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fe2c55] text-white">
          <MessageCircleWarning className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-black tracking-[-0.02em]">
            이 원본이 아닌 것 같나요?
          </h2>
          <p className="mt-1 text-sm leading-6 text-black/50">
            더 오래된 게시물이나 반대 근거를 링크와 함께 알려주세요.
          </p>
        </div>
      </div>
        <a
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white transition-transform hover:scale-[1.02]"
          href={issueUrl}
          target="_blank"
          rel="noreferrer"
        >
          원본에 이의제기
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
    </section>
  );
}
