# Scene Recipes

Choose the scene that carries the argument with the fewest elements. Combine recipes only when the relationship between them is the point.

## Three Steps

Use `.three-cards` for a sequence, framework, or three-part distinction. Put a number, short label, and consequence in each `.card`. Animate cards in reading order.

## Pipeline

Use `.flow-diagram` with `.node` and `.arrow` for causality. Highlight only the transforming or deciding node with `.accent-card`. On mobile, arrows rotate automatically.

## Before and After

Use `.side-by-side` when the audience must compare two states. Make both sides structurally parallel. Replace `≈` with `→` for change, `≠` for contrast, or `↔` for tension.

## Big Question

Use `.question-slide` for a reframing question or provocative claim. Keep it to one sentence. It works best immediately before the answer rather than as a decorative section break.

## Mantra

Use `.mantra` for three short lines the audience should remember. Keep the grammar parallel and the words concrete.

## Timeline

Use `.timeline` and `.bubble` for evolution or milestones. Keep three to five milestones. Apply `.big` to the turning point, not automatically to the latest event.

```html
<div class="timeline">
  <div class="bubble" data-anim>manual</div>
  <div class="bubble" data-anim>assisted</div>
  <div class="bubble big" data-anim>automatic</div>
</div>
```

## Warning Chips

Use `.warning-list` for failure modes that accumulate around one bad approach. Keep each chip to two or three words.

## Question Cloud

Use `.question-cloud` to reveal the hidden complexity behind a simple idea. Five questions is usually enough. Vary chip lengths naturally rather than forcing a grid.

## Evidence Image

Use a photo as the focal point when it proves the claim. Add only one short caption. Use `shot` for screenshots and diagrams that must remain fully visible.

```html
<div class="photo-slot wide has-photo shot" data-anim>
  <img src="assets/product-screen.png" alt="The product screen showing the completed workflow">
</div>
<p class="photo-caption" data-anim>The user sees the result in one place.</p>
```

## Threshold or Slider

Build a horizontal score line with a marker when the decision boundary matters. Animate the marker between two meaningful positions and update labels at each extreme. Avoid infinite motion unless the presenter needs to explain both directions repeatedly.

## Population or Selection

Represent a large set with a dotted field and distinguish the selected subset through color, scale, or clipping. Animate selection only after the whole population is visible.

## Custom Motion

Put custom animation behind a scene-name branch in `runScene`. Store its Anime.js instance in `sceneAnimation` so navigation can pause it. Extend `resetSlide` with every custom initial state. Provide a static final state when Anime.js is unavailable.

Use 400 to 800 ms for entrances and 900 to 1800 ms for explanatory movement. Prefer `easeOutExpo` for reveals and `easeInOutSine` for continuous comparisons. Avoid bounce, spin, parallax, and decorative loops unless the subject itself calls for them.
