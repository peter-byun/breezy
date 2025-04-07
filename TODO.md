## High-Level Plans

1. Build MVP features using dummy data
2. Integrate with the backend

## Use Cases

- Optimize dragging effect performance of DraggableActionCardList.

  - observation
    - frame drops when dragging an item over another
      - hypothesis
        - possible causes
          - excessive re-rendering happens
          - it is expensive to render items
        - Profiling result
          - all items rerendered sequentially. Every component under the list rerenders, adding to the total render duration.
            - this is likely the cause of the stuttering.
        - Solution
          - Items shouldn't rerender since the render result does not change, and items animated using transform which draws elements on another layer.
        - Proving the solution
          - Quick rendering test without item buttons
            - Items render without stuttering

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
