# Software Requirements Specifications

Version: 0.2 • Status: Draft

## 1. Introduction

- Purpose: Define Breezy’s functional and non-functional requirements.
- Scope: Production Web app (Next.js)
- Definitions: Deck = learning material composed of overview/notes/cards. Passive study = reading. Interactive study = tests/flashcards.

## 2. Stakeholders and Users

- U1 Guest: Browses public decks.
- U2 Learner: Registered user; studies and tracks progress.
- U3 Creator: Creates/edits decks.

## 3. System Overview

Users upload/enter content → AI generates notes/cards/tests → Users study via passive/interactive modes → Progress is tracked and notifications prompt reviews. Social features enable discovery/sharing.

## 4. Functional Requirements (FR)

FR‑1 Authentication & Accounts

- FR‑1.1 Google OAuth 2.0 sign‑in/sign‑out/sign‑up/delete account
- FR‑1.2 Issue/verify access tokens; session management
- FR‑1.3 Guest‑mode browsing for public content

FR‑2 Deck Management

- FR‑2.1 Create/Read/Update/Delete/Duplicate decks; Public/Private
- FR‑2.2 Manage overview/notes/cards (create/update/delete; reorder/move)
- FR‑2.3 Markdown rendering for notes and cards

FR‑3 Content Generation

- FR‑3.1 Input via text box and file upload (Text/PDF/Markdown/Images)
- FR‑3.2 Prompt‑based generation supported
- FR‑3.3 Generate overview, detailed notes, flashcards, and summaries
- FR‑3.4 Notify user when generation completes (web push if opted‑in)

FR‑4 Study Experiences

- FR‑4.1 Passive reading for overview/notes/cards
- FR‑4.2 Drag‑and‑drop flashcards with sound effects
- FR‑4.3 AI practice tests
- FR‑4.4 Spaced‑repetition scheduling engine

FR‑5 Social & Discovery

- FR‑5.1 View public decks; like/star; save/bookmark
- FR‑5.2 Link sharing; basic browse/discovery

FR‑6 Notifications

- FR‑6.1 Web push notifications (FCM): generation completion and study reminders
- FR‑6.2 User opt‑in/opt‑out controls

FR‑7 Platform & UX

- FR‑7.1 Responsive UI (mobile/tablet/desktop)
- FR‑7.2 PWA (installable web app)

## 5. Non‑Functional Requirements (NFR)

- NFR‑1 Availability: HA setup with ALB/ECS auto‑scaling
- NFR‑2 Security: No public exposure for instances/DB
- NFR‑3 Observability: Centralized logs/metrics/traces
- NFR‑4 Privacy: Store minimal PII (email only)
- NFR‑5 Maintainability: Monorepo with CI/CD
- NFR‑6 Portability: Web on Next.js; Mobile via Expo (planned); Terraform IaC

## 6. External Interfaces

- Web UI: Next.js
- APIs: Multiple AI services; Auth: Google OAuth; Push: FCM

## 7. Data and Models

- Frequently changing; maintained in a separate internal document.

## 8. Out of Scope (post‑current scope)

- Offline sync, App Store/Play release, performance optimization, accessibility, cost

## 9. Prioritization

- Frequently changing; maintained in a separate internal document.

## 10. Acceptance Criteria

- AC‑1: A new user can sign up/sign in with Google successfully.
- AC‑2: Uploading a PDF creates at least one overview, one note, and one card within 5 minutes (P95).
- AC‑3: Starting a practice test shows the first question within 2 minutes (P95).
- AC‑4: Flashcard drag‑and‑drop works on latest Chrome/Safari with touch and mouse.
