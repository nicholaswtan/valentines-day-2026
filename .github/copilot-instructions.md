# Copilot / AI Agent Instructions — Charmato (valentines-day-2026)

Purpose
- Help an AI coding agent become productive in this small static web project quickly.

Big picture
- Single-page static site: entry is [index.html](index.html). UI is a small interactive "tomato" card that reveals a message when image frames are clicked.
- Behavior lives in [app.js](app.js) (no bundler); styling lives in [styles.css](styles.css). Assets under the `assets/` folder (images and audio).

Key files and what they do
- [index.html](index.html): entry point, loads `styles.css`, `TypeIt` from CDN, and `app.js` (defer).
- [app.js](app.js): Holds the frames array (`assets/tomato-frames/tomato-*.PNG`), click handlers, preloading, sound playback (`assets/chomp.mp3`) and TypeIt usage to reveal text.
- [styles.css](styles.css): Theme variables in :root, layout for `.card`, `.tomato` image classes and transitions (pop, fade-out).
- [assets/tomato-frames/](assets/tomato-frames): PNG sequence used as animation frames. Filenames follow `tomato-1.PNG`, `tomato-2.PNG`, ...

Project-specific conventions and patterns
- No build step: files are meant to be served as static assets. Edit source files directly.
- Image-frame animation is implemented by swapping `img.src` using an ordered array in `app.js`. When adding frames, keep numeric ordering and update the `frames` array in `app.js`.
- Sound is played with `new Audio(...)` on render; the file is referenced as `assets/chomp.mp3` — ensure any added audio keeps the same relative path usage.
- Minimal external deps: `TypeIt` is loaded from a CDN in `index.html`. Do not attempt to add a bundler unless the project scope grows.

Developer workflows (how to run / debug)
- Local preview: open `index.html` in the browser or serve the folder via a lightweight static server. Examples:

```bash
# Python 3
python -m http.server 8000

# OR using npm package `serve` (if you have Node):
npx serve . -p 8000
```

- Debugging tips:
  - Inspect console for missing asset paths (frame filenames and `chomp.mp3`).
  - Use breakpoints in `app.js` to step through `img.addEventListener('click', ...)`, `render()`, and `message_instance.go()`.
  - To test frame ordering, open the `frames` array in `app.js` and confirm file existence under [assets/tomato-frames](assets/tomato-frames).

Change patterns and examples
- Adding a new tomato frame: add PNG to `assets/tomato-frames/` and append its path to the `frames` array in `app.js` in the correct order.
- Changing the revealed text: update the string passed into `new TypeIt(...)` inside `app.js`.
- Tweaking the pop animation: modify `@keyframes pop` or `.tomato.pop` in [styles.css](styles.css).

Integration points & external dependencies
- CDN: `https://unpkg.com/typeit@8.7.1/dist/index.umd.js` (loaded from `index.html`). Network access is required for typing animation unless you vendor it locally.
- Audio playback uses the browser `Audio` API; no server-side audio processing.

What NOT to change without discussion
- Converting to a bundler-based workflow or adding a heavy build system — keep this lightweight unless expanding requirements.
- Renaming the `assets/` folder structure without updating `app.js` references.

Guidance for PRs and small tasks
- For visual tweaks, include before/after screenshots in the PR description.
- For asset changes (frames / audio), list added/removed filenames and confirm they are referenced in `app.js`.

Missing info you may ask for
- If you want CI, tests, or a package.json added, say so — current repo has no test harness or build scripts.

End
- Ask me to iterate on any unclear section or to merge different content found elsewhere into this file.
