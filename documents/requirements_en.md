## Functional Requirements

- Authentication
  - Implement membership using Google OAuth 2.0 credentials
  - Sign in / Sign out / Sign up / Delete account
    - Issue and verify access tokens
- Deck (study material) management: Create / Update / Delete / Duplicate, Public / Private
  - Overview management: Create / Update / Delete
  - Note management: Create / Update / Delete, Reorder/Move
  - Card management: Create / Update / Delete, Reorder/Move
  - Receive push notifications (FCM) when generation of study materials is complete
- View deck overview/notes/cards (passive learning)
- Interactive learning using decks
  - Short quizzes
  - Flashcards
- Social features: View decks and Like/Star

## Non-functional Requirements

- High availability (auto-scaling with ALB, ECS, etc.)
- Secure networking (restrict public access to backend/DB)
- Developer productivity (monorepo, CI/CD, IaC, containerized portability)
- Logging/Monitoring
- Cloud cost optimization
