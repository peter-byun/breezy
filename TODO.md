# High-Level Plan

1. Build MVP features using dummy data
2. Integrate with the backend

## MVP Features with mock API

### Use Cases

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
- Fix MSW server-side fetching errors
- Write tests
