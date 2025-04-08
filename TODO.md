## High-Level Plans

1. Build MVP features using dummy data
2. Integrate with the backend

## Use Cases

- Mock API server implementation
  - Check out the mock Card data and write a mock API based on the use-cases.
- Onboarding experience
  - The play page
- Better error handling
  - Card reload feature from the error fallback
  - Report critical errors
- Error handling
  - pages
    - my cards
      - Page-level error UI and reporting, to prevent the whole app from crashing.
        ```ts
        captureException(); // Sentry SDK
        ```
    - play
      - Page-level error UI
