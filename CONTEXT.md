# Project context

## Product intent

사람들이 밈·챌린지의 원본, 근거, 확산 과정을 빠르게 확인하고 수정 제안과 토론으로 기록을 함께 검증하게 한다.

## Current architecture

- pnpm workspace monorepo
- `apps/web`: Next.js App Router, React, TypeScript, Tailwind CSS
- `apps/api`: Fastify, TypeScript, Node.js 22
- `infra`: Nginx reverse proxy와 systemd API 서비스 예시
- 정적 샘플 데이터와 브라우저 로컬 참여 저장소는 API 연결 전 프로토타입 경계로 유지

## Network boundary

- 클라이언트는 상대 경로 `/api`만 사용한다.
- 공개 요청은 Nginx가 `127.0.0.1:4000`의 API로 프록시한다.
- Oracle VM 호스트, SSH 사용자·키·배포 경로는 GitHub Actions Secret으로만 관리한다.
- 실제 API 및 데이터베이스 자격 증명은 VM의 `/opt/origin/shared/api.env`에 둔다.

## Delivery model

- `develop`: 통합 개발 및 CI
- `main`: 보호된 릴리스 브랜치
- `main` 업데이트: semantic-release 버전 태그와 GitHub Release 생성
- GitHub Pages: 전환기 웹 프리뷰
- Oracle VM: 저장소 변수로 명시적으로 활성화하는 조건부 자동배포

## Next milestone

공용 저장소를 선택해 수정 제안, 투표, 댓글, 신규 항목 등록을 API로 이전하고 운영자 확정 상태를 추가한다.
