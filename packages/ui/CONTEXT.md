# Shared UI package

- 웹과 관리자 앱이 함께 쓰는 디자인 토큰과 작은 표현 컴포넌트를 둔다.
- API 호출, 라우팅, 밈 도메인 판단은 이 패키지에 넣지 않는다.
- 새 컴포넌트는 `className`을 받아 확장 가능해야 하며 접근 가능한 기본 HTML을 유지한다.
- Tailwind 클래스 추가 시 각 앱 `globals.css`의 `@source`가 이 폴더를 포함하는지 확인한다.
