---
name: paper-deck
description: Create playful hand-drawn HTML slide decks with warm paper backgrounds, dark ink, indigo accents, thick borders, offset shadows, conceptual diagrams, and purposeful Anime.js motion. Use whenever the user asks for a presentation, slides, deck, workshop, class, talk, or visual explanation in the Paper Deck style, including requests that reference rounded cards, doodles, animated diagrams, warm editorial slides, or an existing paper-deck HTML. Produce a responsive browser presentation rather than PowerPoint unless another format is explicitly requested.
license: MIT
compatibility: Requires a browser. Python 3 is optional for validation.
metadata:
  author: mnsosa
  version: "1.0.0"
---

# Paper Deck

Build browser presentations that feel drawn on a warm sheet of paper: bold, direct, tactile, and easy to teach from. Preserve the visual system across decks while making every scene specific to its subject.

## Output

Create a folder containing:

```text
deck-name/
├── index.html
├── styles.css
├── app.js
└── assets/
```

Keep `index.html`, `styles.css`, and `app.js` separate so the result is easy to edit. Store local images under `assets/`. The deck must open directly through `file://`; do not require a build step or local server.

Start from `assets/template.html`, `assets/deck.css`, and `assets/deck.js`. Copy them into the output and replace the sample argument and scenes. Keep the shell, top bar, progress indicator, keyboard controls, click navigation, fullscreen shortcut, animation fallback, responsive behavior, and reduced-motion behavior.

## Workflow

### 1. Establish the brief

Infer what is already clear. Ask only for information that materially changes the result:

- audience and setting
- desired length or speaking time
- central takeaway
- source material and required facts
- whether web-hosted dependencies are acceptable

If the user gives no length, choose 10 to 16 slides for a talk and 6 to 10 for a short explanation.

### 2. Write the argument first

Draft one spoken sentence per slide before writing HTML. Make the sequence causal: each slide should follow from the previous one through a tension, answer, consequence, or example.

Prefer this arc when it fits:

1. Promise or provocative claim
2. Familiar situation
3. Problem or misconception
4. Better framing
5. Mechanism in two to four steps
6. Concrete example
7. Tradeoff, failure mode, or surprise
8. Practical takeaway
9. Closing synthesis or next action

Do not add agenda, divider, thank-you, or generic recap slides unless they contribute to the argument.

### 3. Turn each idea into a scene

Use one dominant visual idea per slide. Read `references/scene-recipes.md` and choose the closest recipe. Prefer HTML and CSS shapes over decorative stock illustrations.

A scene earns motion only when motion explains something: order, flow, comparison, selection, growth, threshold movement, or state change. Use a staggered reveal for static scenes. Add a custom scene animation only when it improves understanding.

### 4. Apply the visual system

Keep these characteristics stable:

- warm ivory canvas with a subtle radial wash
- near-black blue-gray ink
- indigo as the dominant accent
- white paper surfaces
- 3px dark borders and large rounded corners
- hard offset shadows, never soft floating shadows
- oversized rounded-system typography with tight headings
- generous empty space and one focal composition
- small hand-drawn details such as a rotated star, dashed line, or tilted label

Use semantic colors sparingly: amber for caution, red for failure, green for success. Do not introduce gradients on cards, glassmorphism, dashboards, icon grids, generic hero layouts, or multiple competing accent colors.

### 5. Keep text presentable

Use assertion titles rather than topic labels. Write in the audience's language. Keep most slides under 35 visible words and each card under 12 words. A slide should be understandable in three seconds and support the speaker rather than replace them.

Put useful context in `speaker-hint`, `photo-caption`, or the spoken notes supplied separately. Never shrink text to fit an overloaded slide; split the idea instead.

### 6. Add assets safely

Use real images when they are necessary evidence. Copy them into `assets/`, use descriptive file names and alt text, and avoid publishing private or identifying material. Use `photo-slot has-photo` for photography and add `shot` for screenshots that should not be cropped.

If no image is available, make a conceptual diagram rather than inventing a fake screenshot. Do not hotlink user-provided local files.

### 7. Validate

Run:

```bash
python3 scripts/validate_deck.py path/to/deck
```

Then open `index.html` and inspect at desktop and mobile widths. Verify:

- every slide is reachable with arrows, space, clicks, and touch
- the counter and progress bar match the slide count
- no content clips at 1366x768 or 390x844
- custom animations reset when revisiting a slide
- the deck remains usable without Anime.js
- reduced-motion users see content immediately
- images have meaningful alt text

## Scene API

Every slide is a section with a unique scene name:

```html
<section class="slide" data-scene="pipeline">
  <h2>A clear claim goes here</h2>
  <div class="flow-diagram">
    <div class="node" data-anim>input</div>
    <div class="arrow" data-anim>→</div>
    <div class="node accent-card" data-anim>change</div>
    <div class="arrow" data-anim>→</div>
    <div class="node" data-anim>result</div>
  </div>
</section>
```

Add `data-anim` to elements that should enter in sequence. `runScene` always applies the baseline reveal. Register custom behavior by scene name and ensure `resetSlide` restores its initial state.

## Quality Bar

The result is complete only when it is visually coherent, factually grounded, navigable, responsive, and ready to present. Do not return a mockup, prose outline, or code snippet when the user asked for the presentation itself. Create the files and report their location.
