# Breezy Service Overview

An AI-powered learning platform that helps users easily explore, create, and absorb learning materials.

[View Architecture](architecture.md) · [View Requirements (EN)](requirements_en.md)

## Roadmap

1. Improve engagement for passive-study features
2. Enhance collaboration/discovery and expand to social-media-grade functionality
3. Cross-platform native app support: Web (Next.js) + Mobile (Expo iOS/Android)
4. Spaced Repetition engine

## Tech Stack

- Web: Next.js, React, Radix, Emotion, React Query, Jotai
- Mobile: React Native, Expo, EAS
- Backend: NestJS, Prisma, MySQL
- Infra: AWS (ECS/ALB/RDS/ECR/VPC), Terraform, Docker
  - Plan to add WAF and CDN to improve security and optimize static asset delivery speed
- Tooling: Turborepo, pnpm, Vitest, Sentry, Simple Analytics
