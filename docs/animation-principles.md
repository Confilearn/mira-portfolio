# Animation Principles

## Purpose

Animation should support storytelling.

It should never exist purely for decoration.

Users should feel the motion rather than notice it.

---

# Motion Philosophy

Motion should feel:

- Elegant
- Calm
- Luxurious
- Deliberate
- Smooth

Avoid:

- Bouncy animations
- Excessive movement
- Flashy effects
- Long sequences

---

# Animation Responsibility

CSS

- Hover states
- Link transitions
- Focus transitions
- Opacity
- Small transforms

Framer Motion

- Navigation
- Mobile menu
- Modal transitions
- Component entrances
- Shared layout transitions

GSAP

- Hero reveal
- Split text
- Scroll storytelling
- Gallery reveal
- Image masking
- Premium interactions

Lenis

Smooth scrolling only.

---

# Performance Rules

Animate only:

- transform
- opacity

Avoid animating:

- width
- height
- top
- left
- margin

unless absolutely necessary.

---

# Scroll Animations

Only initialize when the section approaches the viewport.

Destroy animation instances when no longer needed.

Avoid running unnecessary observers.

---

# Timing

Fast interactions

150–250ms

Normal

300–500ms

Hero storytelling

600–1200ms

Always prioritize natural movement over speed.

---

# Easing

Use smooth easing.

Avoid elastic and bounce easings.

Motion should feel refined.

---

# Hover Effects

Subtle image zoom

Button translation

Opacity transitions

Underline animations

Avoid exaggerated scaling.

---

# Reduced Motion

Respect

prefers-reduced-motion

Disable non-essential animations.

Maintain usability.

---

# Goal

Visitors should describe the website as:

"Smooth."

not

"Animated."
