# High-Level Plan

1. Build MVP features using dummy data
2. Integrate with the backend

## MVP Features with mock API

### Use Cases

- Edit modal should be filled with the current data
- Refactor my-cards page
  - non-blocking suspense
  - separating concerns
- Onboarding experience
  - The play page
- Better error handling
  - Card reload feature from the error fallback
  - Report critical errors
    - pages
      - my cards
        - Page-level error UI and reporting, to prevent the whole app from crashing.
          ```ts
          captureException(); // Sentry SDK
          ```
      - play
        - Page-level error UI
- Implement loading.tsx pages
