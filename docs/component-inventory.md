# Component Inventory

## Purpose

This document defines every reusable component used throughout the project.

Reusable components should live inside:

src/components

Page-specific components belong inside:

src/sections

---

# Layout

## Container

Centers content.

Controls maximum width.

Provides responsive horizontal padding.

---

## Section

Standard vertical spacing.

Consistent section wrapper.

---

# Typography

## EditorialHeading

Large serif heading.

Used for section titles.

---

## SectionLabel

Small uppercase label.

Appears above headings.

---

## BodyText

Reusable paragraph component.

Maintains typography consistency.

---

# Navigation

## Navbar

Desktop navigation.

Transparent over hero.

Sticky after scrolling.

---

## MobileMenu

Fullscreen overlay navigation.

Animated with Framer Motion.

---

## NavLink

Reusable navigation item.

Supports active state.

---

# Hero

## HeroSection

Main landing section.

Contains hero image and typography.

---

## HeroImage

Responsive hero image.

Optimized loading.

---

## HeroContent

Contains title, subtitle and supporting text.

---

## ScrollIndicator

Animated scroll hint.

---

# Gallery

## GalleryGrid

Editorial image layout.

Responsive.

---

## GalleryItem

Single gallery image.

Supports hover interaction.

---

## GalleryModal

Fullscreen viewer.

Keyboard accessible.

---

# About

## ProfileStats

Displays height, nationality, language and measurements.

---

## StatItem

Reusable information row.

---

# Agency

## AgencyCard

Displays agency information.

Contains external link.

---

# Services

## ServiceCard

Displays a modelling category.

Supports hover interaction.

---

# Contact

## ContactLink

Reusable social/contact link.

Instagram

WhatsApp

Agency

---

# Footer

## Footer

Global footer.

---

## FooterNavigation

Footer links.

---

## FooterSocials

Social media links.

---

# Shared Components

## Button

Primary button.

Minimal styling.

---

## MagneticButton

Optional premium interaction.

Only if it improves UX.

---

## ImageReveal

Reusable reveal animation wrapper.

---

## FadeIn

Reusable entrance animation.

---

## SectionDivider

Simple spacing divider.

No decorative graphics.

---

# Utility Components

## SEO

Page metadata.

---

## PageTransition

Handles route transitions.

---

## LazyImage

Reusable optimized image component.

Supports loading placeholder.

---

# Rules

Components should:

- Have one responsibility.
- Be reusable.
- Be responsive.
- Be accessible.
- Be easy to test.
- Remain under ~200–250 lines where practical.

If a component becomes difficult to understand, split it into smaller pieces.
