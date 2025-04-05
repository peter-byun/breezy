## High-Level Plans

1. Build MVP features using dummy data
2. Integrate with the backend

## Use Cases

- Optimize dragging effect performance of DraggableActionCardList.
- Form validation logic
  - Add/edit card modals
- Mock API server implementation
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
