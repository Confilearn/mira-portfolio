# AGENTS.md

# MIRA — Luxury Editorial Portfolio

## Purpose

This document is the permanent operating manual for every AI agent working on this project.

It defines the project's vision, engineering philosophy, coding standards, design principles and implementation rules.

Every code change should follow these guidelines.

When multiple solutions are possible, always choose the one that best aligns with this document.

---

# Before Writing Code

Before making any code changes:

1. Read this file completely.
2. Read every document inside `/docs`.
3. Review the approved homepage designs.
4. Understand the design before implementing.
5. Prefer asking for clarification over making assumptions.

Never begin implementation without understanding the project.

---

# Project Vision

This project is **not** a typical portfolio website.

It is a premium digital editorial experience.

The website represents:

- luxury
- confidence
- timeless design
- editorial storytelling
- refined interaction
- exceptional frontend craftsmanship

Photography is the primary visual element.

UI should support the photography—not compete with it.

Every interaction should feel intentional.

The finished website should feel worthy of being showcased alongside modern luxury fashion websites.

---

# Primary Objectives

The project has two equally important goals.

## Goal One

Present Mira as an international editorial fashion model.

## Goal Two

Demonstrate agency-level frontend engineering capable of attracting premium freelance clients.

Every implementation decision should support both goals.

---

# Design Philosophy

Less is more.

Whitespace is a design element.

Typography is part of the experience.

Photography carries the story.

Motion supports storytelling.

Avoid unnecessary decoration.

The interface should disappear behind the content.

---

# Visual Principles

Design should feel:

- editorial
- cinematic
- elegant
- quiet
- timeless
- premium

Never feel:

- playful
- loud
- overly futuristic
- startup-like
- dashboard-inspired

---

# What This Project Is NOT

Do NOT introduce:

- Glassmorphism
- Neumorphism
- Bootstrap aesthetics
- Material Design styling
- Random gradients
- Colorful UI
- Heavy shadows
- Rounded cards everywhere
- Floating widgets
- Dashboard layouts
- SaaS landing page patterns
- Unnecessary icons
- Decorative blobs
- Background particles
- Auto-playing audio
- Excessive animation

If unsure, choose simplicity.

---

# Engineering Philosophy

Code should be:

- readable
- maintainable
- reusable
- scalable
- predictable
- type-safe

Avoid clever code.

Prefer obvious code.

Optimize for future maintainability.

---

# Architecture Rules

Every feature should have a single responsibility.

Separate:

- presentation
- business logic
- animation
- utilities

Avoid tightly coupled components.

Favor composition over inheritance.

---

# Folder Philosophy

Each folder should have one responsibility.

Reusable UI belongs inside:

components/

Page-specific UI belongs inside:

sections/

Never mix them.

---

# Component Philosophy

Components should be:

small

focused

predictable

reusable

Avoid massive components.

When a component becomes difficult to understand, split it.

---

# State Management

Keep state as local as possible.

Avoid unnecessary global state.

Do not introduce state libraries unless genuinely needed.

---

# Styling Rules

Use Tailwind CSS.

Avoid inline styles.

Use CSS variables for design tokens.

Never hardcode colors throughout the application.

Never duplicate spacing values.

Keep utility usage readable.

---

# Responsive Philosophy

Mobile experience is equally important.

Do not simply stack desktop layouts.

Every breakpoint should feel intentionally designed.

Always test:

Mobile

Tablet

Laptop

Desktop

---

# Animation Philosophy

Animation exists to improve storytelling.

Never animate simply because animation is possible.

Motion should feel:

calm

confident

luxurious

subtle

Elegant websites move less.

---

# Animation Rules

CSS handles:

- hover
- focus
- small transitions

Framer Motion handles:

- menus
- shared layouts
- page transitions
- component entrances

GSAP handles:

- hero storytelling
- SplitType
- image reveals
- advanced timelines
- scroll storytelling

Lenis handles:

smooth scrolling only.

Never mix responsibilities.

---

# Performance Philosophy

Performance is a feature.

Never sacrifice responsiveness for visual effects.

Always prefer:

transform

opacity

Avoid animating:

top

left

width

height

unless absolutely necessary.

---

# Lazy Loading

Heavy content should not initialize until necessary.

Images below the fold should load lazily.

Expensive animations should initialize only when the section approaches the viewport.

Destroy animation instances when appropriate.

---

# Accessibility

Accessibility is mandatory.

Always use:

semantic HTML

keyboard navigation

visible focus states

correct heading hierarchy

meaningful alt text

ARIA where appropriate

Respect:

prefers-reduced-motion

---

# TypeScript

Strict typing only.

Avoid:

any

Prefer:

interfaces

utility types

shared types

Type safety should never be sacrificed for convenience.

---

# Code Quality

Write code for humans first.

Prioritize:

clarity

consistency

maintainability

Avoid unnecessary abstraction.

Avoid premature optimization.

Avoid duplicated logic.

---

# Naming Conventions

Use descriptive names.

Good:

EditorialGallery

HeroSection

FullscreenMenu

ImageModal

Bad:

Gallery2

ComponentNew

TestSection

Container2

---

# File Organization

Keep imports organized.

Group related files together.

Avoid deeply nested folders unless they improve clarity.

---

# Images

Version 1 uses local assets.

Location:

src/assets/images/

Do not introduce Cloudinary yet.

Future migration should require minimal changes.

---

# Dependencies

Do not add new dependencies unless there is a strong technical reason.

Always prefer existing project tools first.

---

# Error Handling

Fail gracefully.

Never leave broken UI.

Handle:

missing images

loading states

animation failures

network failures

unexpected data

---

# Browser Support

Support all modern evergreen browsers.

Avoid browser-specific hacks whenever possible.

---

# Lighthouse Targets

Performance

95+

Accessibility

100

SEO

100

Best Practices

100

These are project requirements—not aspirations.

---

# SEO

Maintain:

proper headings

meta tags

Open Graph

Twitter Cards

structured data

descriptive alt text

semantic HTML

---

# Git Philosophy

Every commit should represent one logical change.

Commit messages should be meaningful.

Example:

feat: implement responsive navigation

fix: improve gallery accessibility

perf: optimize image loading

Avoid vague commit messages.

---

# Future Roadmap

The architecture should anticipate future additions including:

- Hero video
- Cloudinary
- Additional pages
- CMS
- Booking functionality
- Journal
- Gallery filtering
- Internationalization

Do not hardcode decisions that prevent future expansion.

---

# Decision Hierarchy

When making implementation decisions, prioritize in this order:

1. Accessibility
2. Performance
3. Maintainability
4. Design fidelity
5. Developer convenience

---

# AI Behaviour

When uncertain:

Do not invent features.

Do not silently change designs.

Do not introduce unnecessary complexity.

Instead:

Explain the issue.

Offer alternatives.

Recommend the most maintainable solution.

---

# Final Principle

Every line of code should contribute to one question:

"Does this make the experience feel more premium without sacrificing performance, accessibility or maintainability?"

If the answer is no,

do not implement it.
