import type { Meme } from "@/types/meme";

export const sampleMemes: Meme[] = [
  {
    id: "harlem-shake",
    slug: "harlem-shake",
    title: "Harlem Shake",
    aliases: ["할렘 쉐이크", "Harlem Shake meme"],
    summary:
      "한 사람이 춤추던 조용한 장면이 비트 드롭과 함께 집단 난장판으로 바뀌는 짧은 영상 포맷.",
    accent: "#ff6b35",
    origin: {
      status: "likely",
      video: {
        id: "harlem-origin",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=8vJiSSAMNWw",
        title: "DO THE HARLEM SHAKE (ORIGINAL)",
        creator: "DizastaMusic",
        uploadedAt: "2013-01-30",
      },
      summary:
        "현재 샘플은 짧은 오프닝 개그를 이후 집단 댄스 포맷에 영향을 준 초기 영상으로 표시합니다.",
      evidence: [
        {
          title: "업로드 시점",
          detail: "유행 포맷이 폭발적으로 확산되기 직전 공개된 초기 영상입니다.",
          url: "https://www.youtube.com/watch?v=8vJiSSAMNWw",
        },
        {
          title: "포맷 연결",
          detail:
            "후속 영상들이 같은 음악 구간과 장면 전환 구조를 반복했습니다. 운영 데이터 전환 전 추가 검토가 필요합니다.",
        },
      ],
      lastReviewedAt: "2026-07-16",
    },
    timeline: [
      {
        id: "harlem-1",
        dateLabel: "2013. 01. 30",
        title: "초기 개그 영상 공개",
        description: "음악과 짧은 춤 동작을 결합한 영상이 공개됩니다.",
        kind: "origin",
      },
      {
        id: "harlem-2",
        dateLabel: "2013. 02",
        title: "집단 변신 포맷 등장",
        description:
          "평범한 장면에서 비트 드롭과 함께 모두가 춤추는 30초 안팎의 구조가 복제됩니다.",
        kind: "variation",
      },
      {
        id: "harlem-3",
        dateLabel: "2013. 02–03",
        title: "글로벌 챌린지로 확산",
        description: "학교, 회사, 스포츠팀이 각자의 버전을 제작합니다.",
        kind: "mainstream",
      },
    ],
    topVideos: [
      {
        id: "harlem-top-1",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=8vJiSSAMNWw",
        title: "DO THE HARLEM SHAKE (ORIGINAL)",
        creator: "DizastaMusic",
      },
      {
        id: "harlem-top-2",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=ygr5AHufBN4",
        title: "Harlem Shake — 대표 확산 버전",
        creator: "샘플 큐레이션",
      },
    ],
    tags: ["댄스", "챌린지", "2010s", "유튜브"],
  },
  {
    id: "nyan-cat",
    slug: "nyan-cat",
    title: "Nyan Cat",
    aliases: ["냥캣", "Pop Tart Cat"],
    summary:
      "팝타르트 몸을 가진 고양이가 무지개를 남기며 우주를 날아가는 루프 애니메이션과 음악.",
    accent: "#6c63ff",
    origin: {
      status: "verified",
      video: {
        id: "nyan-origin",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
        title: "Nyan Cat [original]",
        creator: "saraj00n",
        uploadedAt: "2011-04-05",
      },
      summary:
        "원본 픽셀 아트와 일본 보컬 합성 음악이 결합된 영상이 Nyan Cat이라는 이름으로 널리 확산됐습니다.",
      evidence: [
        {
          title: "원본 영상 링크",
          detail: "현재도 접근 가능한 대표 원본 업로드입니다.",
          url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
        },
        {
          title: "창작 요소 구분",
          detail:
            "픽셀 아트, 음악, 합성 영상의 제작자가 다를 수 있어 운영 단계에서는 각각의 출처를 분리 기록해야 합니다.",
        },
      ],
      lastReviewedAt: "2026-07-16",
    },
    timeline: [
      {
        id: "nyan-1",
        dateLabel: "2011. 04",
        title: "픽셀 아트 공개",
        description: "Pop Tart Cat GIF가 먼저 공개됩니다.",
        kind: "origin",
      },
      {
        id: "nyan-2",
        dateLabel: "2011. 04. 05",
        title: "음악 합성 영상 업로드",
        description: "반복 애니메이션과 Nyanyanyanyanyanyanya!가 결합됩니다.",
        kind: "remix",
      },
      {
        id: "nyan-3",
        dateLabel: "2011–2012",
        title: "리믹스와 게임으로 확산",
        description: "장시간 버전, 캐릭터 변형, 팬 게임이 이어집니다.",
        kind: "spread",
      },
    ],
    topVideos: [
      {
        id: "nyan-top-1",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
        title: "Nyan Cat [original]",
        creator: "saraj00n",
      },
      {
        id: "nyan-top-2",
        platform: "unknown",
        url: "https://www.nyan.cat/",
        title: "Nyan Cat 인터랙티브 아카이브",
        creator: "nyan.cat",
      },
    ],
    tags: ["고양이", "픽셀아트", "2010s", "리믹스"],
  },
  {
    id: "rickroll",
    slug: "rickroll",
    title: "Rickroll",
    aliases: ["릭롤", "Never Gonna Give You Up"],
    summary:
      "궁금한 링크인 척 유도한 뒤 Rick Astley의 뮤직비디오로 보내는 인터넷식 장난.",
    accent: "#2f80ed",
    origin: {
      status: "needs-review",
      video: {
        id: "rickroll-origin",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Never Gonna Give You Up (Official Video)",
        creator: "Rick Astley",
        uploadedAt: "2009-10-25",
      },
      summary:
        "뮤직비디오는 장난에 사용된 대상이며, 최초의 rickroll 게시물을 특정하려면 당시 포럼 기록을 별도로 검토해야 합니다.",
      evidence: [
        {
          title: "대표 대상 영상",
          detail: "릭롤 링크가 최종적으로 보여주는 가장 널리 알려진 영상입니다.",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        },
        {
          title: "최초 게시물 미확정",
          detail:
            "노래의 발표, 유튜브 업로드, 링크 장난의 시작은 서로 다른 사건이므로 추가 자료가 필요합니다.",
        },
      ],
      lastReviewedAt: "2026-07-16",
    },
    timeline: [
      {
        id: "rick-1",
        dateLabel: "1987",
        title: "곡과 뮤직비디오 발표",
        description: "Rick Astley의 Never Gonna Give You Up이 공개됩니다.",
        kind: "origin",
      },
      {
        id: "rick-2",
        dateLabel: "2007",
        title: "링크 장난으로 확산",
        description: "예상치 못한 뮤직비디오로 연결하는 bait-and-switch가 퍼집니다.",
        kind: "variation",
      },
      {
        id: "rick-3",
        dateLabel: "2008 이후",
        title: "주류 문화에 정착",
        description: "방송, 행사, 브랜드 캠페인에서 반복적으로 재현됩니다.",
        kind: "mainstream",
      },
    ],
    topVideos: [
      {
        id: "rick-top-1",
        platform: "youtube",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Never Gonna Give You Up (Official Video)",
        creator: "Rick Astley",
      },
      {
        id: "rick-top-2",
        platform: "x",
        url: "https://x.com/rickastley",
        title: "플랫폼 외부 자료 예시",
        creator: "Rick Astley",
      },
    ],
    tags: ["링크", "장난", "2000s", "뮤직비디오"],
  },
];

export function getMemeBySlug(slug: string) {
  return sampleMemes.find((meme) => meme.slug === slug);
}
