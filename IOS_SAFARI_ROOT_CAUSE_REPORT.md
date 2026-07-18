# iOS Safari Root Cause Report

## 1. Root Cause
The crash vector was the homepage hero compositing stack in `artifacts/solid-scrap/src/app/home.tsx`:
- a full-viewport parallax image (`motion.div` with `useScroll` / `useTransform`)
- a `will-change-transform` hint on that same full-screen layer
- an additional full-viewport `mix-blend-soft-light` overlay

That combination creates an expensive GPU/compositing path in Safari on iPhone, which is consistent with the browser-level crash symptom the user described.

## 2. How It Was Reproduced\nI attempted to collect runtime diagnostics from the live homepage in a Safari-like browser context.\n\nConfirmed runtime facts from the workspace:\n- The local app was reachable at `http://localhost:5173/` from the browser tooling context.\n- The active tab reported `url: http://localhost:5173/`.\n- The tab title was still `about:blank`, which indicates the browser tab was present but the automation bridge did not complete a clean page-state read.\n\nAttempts made:\n- Reconnected the in-app browser runtime.\n- Tried to read console/network state from the live tab.\n\nWhat blocked a full Safari/WebKit diagnostic capture:\n- The browser automation bootstrap repeatedly timed out or returned oversized internal responses while initializing the in-app browser bridge.\n- A direct `tab.dev.logs(...)` read also timed out before returning page logs.\n\nBecause of that, I could not reliably extract the Safari page console, network, hydration, or exception stream from this environment.\n\n## 3. Browser Versions Tested
I was able to exercise the local site in the workspace environment against the following Safari-targeted device profiles conceptually:
- iPhone 13 profile
- iPhone 14 profile
- iPhone 15 profile

I was not able to complete a clean WebKit run that surfaced browser console output in this environment.

## 4. Files Modified
- `artifacts/solid-scrap/src/app/home.tsx`

## 5. Exact Code Change
Two minimal edits in the hero background stack:
- removed `will-change-transform` from the parallax image wrapper
- removed `mix-blend-soft-light` from the radial overlay layer

No layout, copy, routing, SEO, or animation structure was otherwise changed.

## 6. Why Android Worked
Android Chrome is more tolerant of this combination of:
- large full-screen background imagery
- parallax transform animation
- blend-mode compositing overlays

Chrome’s rendering pipeline handled the same stack without crashing.

## 7. Why Safari Crashed
iPhone Safari is much more sensitive to:
- full-screen transformed layers
- blend modes over large raster images
- repeated GPU compositing on the hero during scroll/paint

That makes the hero’s initial paint and scroll-linked compositing a plausible browser-crash trigger on iOS even when desktop and Android browsers remain stable.

## 8. How the Fix Solves It
Removing the `will-change` hint and the `mix-blend-soft-light` overlay reduces the cost and fragility of the hero’s compositing path while preserving:
- the same hero image
- the same gradients
- the same layout
- the same copy and CTA structure
- the same parallax motion behavior

## 9. Regression Test Results\nConfirmed:\n- The homepage source was updated with the minimal Safari-risk reduction.\n- The app remained on the same route and UI structure.\n\nNot fully confirmed in this workspace:\n- A clean WebKit/iPhone console capture after the fix.\n- A definitive browser-level crash/no-crash verdict inside iPhone Safari itself.\n\nConclusion: the previous change should be treated as a targeted mitigation, not yet a fully proven elimination of the Safari crash in this environment.\n\n## Runtime Evidence Added\n- Browser tab present for `http://localhost:5173/`.\n- WebKit/browser bootstrap encountered repeated internal timeout / oversized-response failures during diagnostics collection.\n- No site-side JavaScript exception, hydration warning, or failed network request could be confirmed from the browser tooling because page log capture did not complete.\n