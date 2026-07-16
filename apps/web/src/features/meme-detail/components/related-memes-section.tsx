import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Card, buttonClassName } from "@origin/ui";
import type { Meme } from "@/types/meme";

const kindLabel = { challenge: "챌린지", "video-meme": "영상 밈", "community-meme": "커뮤니티 밈" };

export function RelatedMemesSection({ memes }: { memes: Meme[] }) {
  return (
    <section className="page-shell py-14 sm:py-20"><div className="mx-auto max-w-3xl">
      <p className="text-xs font-black text-black/35">MEME DICTIONARY</p><h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">다른 밈·챌린지 알아보기</h2><p className="mt-2 text-sm text-black/45">다음 항목을 넘겨보세요.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {memes.map((meme) => <Link href={`/meme?slug=${encodeURIComponent(meme.slug)}`} key={meme.id}><Card className="flex min-h-48 flex-col p-5 shadow-none transition-transform hover:-translate-y-1"><div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-black text-black/40"><span className="size-2 rounded-full" style={{ backgroundColor: meme.accent }} />{kindLabel[meme.kind]}</span><ArrowUpRight className="size-4 text-black/25" /></div><h3 className="mt-auto text-2xl font-black tracking-[-0.04em]">{meme.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 text-black/45">{meme.summary}</p></Card></Link>)}
      </div>
      <Link className={buttonClassName({ className: "mt-5" })} href="/">사전 전체 보기<ArrowUpRight className="size-4" /></Link>
    </div></section>
  );
}
