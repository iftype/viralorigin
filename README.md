# ViralOrigin

밈, 챌린지, 바이럴 영상의 원본과 확산 과정을 함께 검증하고 기록하는 참여형 사전입니다.

## Monorepo

```text
apps/
  web/       Next.js 정적 웹 클라이언트
  api/       Fastify API 서버
infra/
  nginx/     웹 정적 파일과 /api 리버스 프록시 예시
  systemd/   API 프로세스 서비스 예시
docs/        브랜치·배포 운영 문서
```

## Local development

```bash
pnpm install
pnpm dev          # web + api
pnpm dev:web      # http://localhost:3000
pnpm dev:api      # http://127.0.0.1:4000
```

검증 명령:

```bash
pnpm lint
pnpm build
```

API 상태 확인:

```bash
curl http://127.0.0.1:4000/health
```

실제 환경값은 각 앱의 `.env.example`을 참고해 추적되지 않는 `.env` 파일에 둡니다. 서버 주소, SSH 키, 배포 경로는 클라이언트 환경변수에 넣지 않습니다.

## Branches and deployment

- 기능 개발과 초기 푸시는 `develop`에서 진행합니다.
- `develop`에서 `main`으로 PR이 병합되면 시맨틱 버전과 GitHub Release가 생성됩니다.
- GitHub Pages는 Oracle 전환 중에도 웹 프리뷰 배포를 유지합니다.
- Oracle 배포는 필요한 GitHub Actions Secret을 등록하고 `ORACLE_DEPLOY_ENABLED=true`로 바꾼 뒤 활성화됩니다.

자세한 내용:

- [브랜치·버전 전략](docs/BRANCHING.md)
- [Oracle VM 배포 준비](docs/DEPLOYMENT.md)

> Oracle 호스트는 프론트 코드나 Git 이력에 넣지 않습니다. 브라우저는 같은 도메인의 `/api`를 호출하고 Nginx가 내부 API로 전달합니다.
