# Breezy

A delightful cross-platform flash card app.  
Backend is a private repo for security reasons.

## Tools Used

- Framework
  - [React](https://react.dev/reference/react)
  - [Next.js](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- UI
  - [Radix](https://www.radix-ui.com/)
  - [useOverlay](https://www.slash.page/libraries/react/use-overlay/src/useOverlay.i18n)
- Style
  - [emotion](https://emotion.sh/docs/css-prop)
- Interactions
  - [react-spring](https://www.react-spring.dev/)
  - [use-gesture](https://use-gesture.netlify.app/)
- Network
  - [axios](https://axios-http.com/docs/api_intro)
  - [react-query](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- Utility
  - [remeda](https://remedajs.com/)
  - [es-toolkit](https://es-toolkit.slash.page/reference/array/at.html)
  - [usehooks-ts](https://usehooks-ts.com/introduction)
  - [Suspensive](https://suspensive.org/en/docs/react/Suspense)
  - [Zod](https://zod.dev/)
- Form
  - [Tanstack Form](https://tanstack.com/form/latest/docs/overview)
    - Rationale: It does all the heavy-lifting for building forms without excessive abstraction which is great when debugging or customizing a complex form.
- State Management
  1. Try flattening components using the composition pattern
  2. Consider query parameters when it makes sense
  - Passing one-off data to a page
  - Persisting data between page refreshes
  - Representing the page’s status when the page is shared as a link
  3. For highly dynamic regional states, use [Jotai](https://jotai.org/)
  - But keep the scope as small as possible, to avoid transitive dependencies.
