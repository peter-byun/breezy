# Breezy 서비스 소개

사용자가 쉽게 학습 자료를 탐색, 생성, 흡수 할 수 있게 도와주는 AI 기반의 학습 플랫폼입니다.

[아키텍처 다이어그램 보기](architecture.md)

## 제품 주요 기능

- AI 기반 학습자료(덱) 자동 생성
  - 개요, 상세 노트, 플래시카드 자료 제공(마크다운 렌더링)
  - 텍스트/PDF/Markdown/이미지 업로드 지원
  - 프롬프트로 생성 지원
- 몰입형 학습 기능
  - AI와 연습 시험
  - 드래그앤드롭 플래시카드, 효과음
- 학습자료 공유, 저장, 좋아요
- 게스트 모드 탐색 및 Google 로그인
- 웹 푸시 알림(FCM)
- 반응형 UI, PWA 지원(설치형 웹앱)

## 진행 중/로드맵

1. 자료 수동적 학습 기능 몰입도 개선
2. 협업/발견 기능 완성도 개선과 소셜 미디어 수준의 기능 확장
3. 크로스플랫폼 네이티브앱 지원: Web(Next.js) + Mobile(Expo iOS/Android)
4. 간격 반복(Spaced Repetition) 엔진

## 기술 스택

- Web: Next.js, React, Radix, Emotion, React Query, Jotai
- Mobile: React Native, Expo, EAS
- Backend: NestJS, Prisma, MySQL
- Infra: AWS(ECS/ALB/RDS/ECR/VPC), Terraform, Docker
  - 보안 개선과 정적 자원 제공 속도 최적화를 위해 WAF, CDN 추가를 진행 예정 입니다.
- Tooling: Turborepo, pnpm, Vitest, Sentry, Simple Analytics
