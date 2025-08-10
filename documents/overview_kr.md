# Breezy 서비스 소개

사용자가 쉽게 학습 자료를 탐색, 생성, 흡수 할 수 있게 도와주는 AI 기반의 학습 플랫폼입니다.

[요구사항 정의서 보기](requirements_kr.md) · [클라우드 리소스 아키텍처 보기](resource-architecture.md)

## 기술 스택

- Web: Next.js, React, Radix, Emotion, React Query, Jotai
- Mobile: React Native, Expo, EAS
- Backend: NestJS, Prisma, MySQL
- Infra: AWS(ECS/ALB/RDS/ECR/VPC), Terraform, Docker
  - 보안 개선과 정적 자원 제공 속도 최적화를 위해 WAF, CDN 추가를 진행 예정 입니다.
- Tooling: Turborepo, pnpm, Vitest, Sentry, Simple Analytics
