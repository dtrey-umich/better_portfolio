# DESIGN SPEC — Cards + Buttons Gallery Interaction

## Overview
This page presents a stack of project cards and a set of category buttons.  
- **Left side (top region):** stacked deck of cards.  
- **Right side (top region):** 6 category buttons in two columns.  
- **Gallery below:** reveals selected cards based on button states.  
- **Animations:** soft, smooth, physical (cards feel like they’re being moved).

---

## Data Model
- **Projects:**  
  - Each project comes from an external Notion database.  
  - Each project has scores `[0…N]` for each of the 6 categories.  
  - Display logic:  
    - When one or more buttons are active, compute each project’s **total score** across active categories.  
    - Only show projects where total score > 0.  
    - Order gallery cards by descending total score.

- **Categories/Buttons:**  
  - 6 buttons, in two columns.  
  - Each button corresponds to one category (with associated color + icon).  
  - Each card may belong to multiple categories.  
  - When hovered, cards in the deck with nonzero score for that category “peek” out slightly.  
  - When clicked, the button toggles active state and updates gallery.  
  - Multiple buttons can be active simultaneously.

---

## Layout
- **Top region:** two columns  
  - Left: stacked card deck.  
  - Right: two columns of buttons (3 buttons each).  
- **Gallery:** always 2 columns, regardless of screen size (mobile responsive design is deferred).

---

## Card Stack
- Default state: cards stacked with slight overlap; only the “See All Projects” card is visible on top.  
- Hovering the **stack**: all cards splay out slightly (offset to the right + slight rotation).  
- Hovering a **button**: only the relevant subset of cards splay (offset right + slight rotation).  
- Clicking the **“See All Projects” card**: reveals all projects in gallery below.  
- “See All” card also visually covers cards under it, reducing render load until interaction.

---

## Gallery
- 2-column grid.  
- Cards are ordered by descending total score for the selected categories.  
- Cards animate smoothly into and out of place when button states change.  
- Multiple active buttons merge results (union, with dedupe).  

---

## Card Design
- Elements:  
  - Image (16:10 ratio).  
  - Title text.  
  - Body/excerpt text.  
  - One or more category icons (from the same set as buttons).  
- Hover: subtle drop shadow, slight scale (1.01).  
- Click: navigates to project detail page (routing handled elsewhere).  
- Styling: rounded corners, translucent background with border, backdrop blur.  

---

## Button Design
- States:  
  - **Default:** white background, dark text.  
  - **Hover:** subtle tint of category color (light fill, border tinted).  
  - **Active:** solid category color background, white text.  
- Style: pill-shaped (fully rounded).  
- Behavior: toggles active state on click; multiple buttons can be active simultaneously.  

---

## Animations
- Library: **Framer Motion**.  
- Principles: soft, smooth, physical — like cards being gently moved.  
- Transitions:  
  - Movement between deck and gallery: spring (stiffness 500, damping 40).  
  - Fade/scale on entry: ease [0.2, 0.8, 0.2, 1], duration ≤ 0.3s.  
  - Stagger on multiple reveals: 30–50ms child stagger.  
- Peek animation (hover): offset right 8px, slight rotation, increased opacity.  
- Gallery entry/exit: fade + scale.  
- Global max reveal duration: ≤ 3 seconds total.  
- Respect `prefers-reduced-motion`.

---

## Icons
- 6 shared category icons.  
- Same set is used for buttons and cards.  
- Implementation: single SVG sprite loaded once, icons referenced with `<use>`.  
- Icons are colorized by CSS (`currentColor`).  

---

## Performance
- Max current cards: ~20, must scale higher later.  
- DOM optimization:  
  - Render only visible cards.  
  - “See All” card helps hide/render less until activated.  
  - Virtualize gallery if cards exceed ~40.  
- Images:  
  - Each card image provided in 1x/2x sizes.  
  - Use modern formats (AVIF/WebP/JPEG).  
  - Use lazy loading + blurred placeholder.  
- Animation optimization: only animate `transform` and `opacity`.  
- CSS containment on grid containers.  

---

## Accessibility
- Buttons: toggle buttons (`aria-pressed` reflects state).  
- Keyboard navigation supported (tab to buttons, Enter/Space toggles).  
- Gallery: cards as links with `aria-label="Open project: {title}"`.  
- Ensure color contrast ratio ≥ 4.5:1.  
- Motion respects `prefers-reduced-motion`.

---

## Figma Preparation (so API fetch is clean)
- Create a dedicated `_DEV_EXPORT` page.  
- Section: `Page: Cards+Buttons`. Inside it, three frames:  
  - `STACK` (stacked deck, with “See All” card on top).  
  - `BUTTONS` (6 buttons in two columns).  
  - `GALLERY_SAMPLE` (2-col layout with a few cards).  
- Naming:  
  - Cards: `CARD_<slug>` (e.g., `CARD_kinetic-sculpture`).  
  - Buttons: `BTN_<Category>` (e.g., `BTN_Robotics`).  
  - “See All” card: `CARD_ALL`.  
- Each card: annotate properties: `slug`, `categories` (icons).  
- All colors: use Figma Color Styles.  
- All fonts: use Figma Text Styles.  
- All icons: vector components; exportable as SVG.  
- Hide or move messy/draft work out of `_DEV_EXPORT`.

---
