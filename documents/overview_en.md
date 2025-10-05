# Breezy Service Overview

An AI-powered learning platform that helps users easily explore, create, and absorb learning materials.

[Requirements Specification](requirements_en.md) · [Architecture](architecture.md)

## Tech Stack

- Web: Next.js, React, Radix, Emotion, React Query, Jotai
- Mobile: React Native, Expo, EAS
- Backend: NestJS, Prisma, MySQL
- Infra: AWS (ECS/ALB/RDS/ECR/VPC), Terraform, Docker
  - Plan to add WAF and CDN to improve security and optimize static asset delivery speed
- Tooling: Turborepo, pnpm, Vitest, Sentry, Simple Analytics
