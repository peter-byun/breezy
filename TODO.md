## High-Level Plans

1. Build MVP features using dummy data
2. Integrate with the backend

## Use Cases

- Refactor
  - using useOverlay, make actions explicit
    1. Separate a modal and a trigger. Make the modal controllable via props
    2. from the root, integrate the modal with a useOverlay hook
    3. From the root, open the modal in response to a matching event.
  - ManageableCardList could be slimmed down by separating concerns.
- Delete cards
- Save the ordered state (mock server API)
