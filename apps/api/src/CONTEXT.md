# API source context

- 공개 등록은 `POST /api/v1/intake`로 작은 JSON 문서에 저장한다.
- 관리자 세션은 서버 메모리에 보관하지 않고 HMAC 서명 HttpOnly 쿠키로 검증한다.
- 관리자 비밀번호 해시와 세션 키는 운영 서버의 `shared/api.env`에만 둔다.
- 관리자 목록 상태 변경은 임시 파일 작성 후 rename하는 원자적 저장을 사용한다.
