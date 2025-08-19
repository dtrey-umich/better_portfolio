# Figma Design Specification

## Overview
Black and white portfolio website with colored category system. Clean, minimal design with sophisticated card stack interaction and category filtering.

---

## Screenshots & References

### Available Screenshots
- [x] Card stack and button layout: `/public/design/card stack and button array.png`
- [x] Card stack with splay effect: `/public/design/card stack and splay.png`
- [x] Single card design: `/public/design/single card.png`
- [x] Card gallery array: `/public/design/card array.png`
- [x] Layout with active button: `/public/design/layout with shaded button.png`

---

## Layout & Structure

### Container
- **Max width**: Full width container with centered content (approximately 1400px max content width)
- **Padding**: 60px on sides (estimated from screenshots)
- **Background**: White (#FFFFFF)

### Grid System
- **Main layout**: 2 columns (card stack left, buttons right)
- **Gap between sections**: ~120px horizontal gap between stack and buttons
- **Card stack position**: Left side, vertically centered
- **Buttons position**: Right side, 2x3 grid layout
- **Gallery position**: Below main section, full width 2-column grid

### Layout Measurements (from screenshots)
- **Card stack area**: ~400px wide
- **Button area**: ~300px wide  
- **Vertical spacing**: ~80px between main content and gallery
- **Gallery cards**: 2 columns with ~40px gap

---

## Typography

### Font Family
- **Primary font**: Gabarito (specified by user)
- **Weight**: Regular weight for body, likely medium/semibold for headings

### Text Styles
| Element | Size | Weight | Line Height | Color |
|---------|------|---------|-------------|-------|
| Card titles | 32px | Medium/Semibold | Auto | #000000 |
| Card descriptions | 16px | Regular | 1.5 | #666666 |
| Button text | 16px | Medium | Auto | #000000 (default), #FFFFFF (active) |
| Category labels | 16px | Medium | Auto | Various category colors |

---

## Color Palette

### Primary Colors
- **Primary**: #000000 (Black - main text and UI elements)
- **Secondary**: #FFFFFF (White - backgrounds and negative space)
- **Neutral**: #666666 (Gray - secondary text)

### Background Colors
- **Page background**: #FFFFFF (White)
- **Card background**: #FFFFFF (White with subtle shadow)
- **Button background**: #FFFFFF (default), Category colors (active)

### Text Colors
- **Primary text**: #000000 (Black)
- **Secondary text**: #666666 (Gray)
- **Button text**: #000000 (default), #FFFFFF (active state)

### Border & Shadow Colors
- **Card shadow**: rgba(0, 0, 0, 0.1) - subtle gray shadow
- **Button border**: Very light gray or none

### Category Colors
- **Research**: #97CCF6 (Light blue)
- **Robotics**: #B2E272 (Light green)
- **Software**: #D096F5 (Light purple)
- **Sculpture**: #F1BD6B (Light orange/yellow)
- **Videography**: #F5C16B (Light yellow)
- **Play**: #EC6F6B (Light red/coral)

---

## Components

### Project Cards

#### Dimensions (from single card screenshot)
- **Width**: ~350px 
- **Height**: ~400px (auto-height based on content)
- **Image aspect ratio**: Approximately 16:10 or 3:2

#### Styling  
- **Border radius**: 16px (all corners)
- **Border**: None visible
- **Shadow**: Subtle drop shadow - approximately "0 4px 12px rgba(0, 0, 0, 0.1)"
- **Background**: #FFFFFF (White)

#### Image
- **Aspect ratio**: 16:10 or 3:2 (covers top portion of card)
- **Border radius**: 16px on top corners only
- **Object fit**: cover

#### Content Padding
- **All sides**: ~24px
- **Between image and text**: ~20px
- **Between title and description**: ~12px

#### Text Layout
- **Title**: 32px Gabarito, black, positioned at top of content area
- **Description**: 16px Gabarito, gray (#666666), below title
- **Category indicators**: Small colored dots or labels (visible in screenshots)

### Category Buttons

#### Dimensions (from button array screenshot)
- **Width**: ~140px (auto-width with padding)
- **Height**: ~48px
- **Pills are consistent width across 2x3 grid**

#### Layout
- **Arrangement**: 2 columns × 3 rows
- **Gap between buttons**: ~16px horizontal, ~12px vertical
- **Alignment**: Left-aligned in grid

#### Styling
- **Border radius**: 16px (moderate rounding, not full pills)
- **Border**: Thin light gray border for inactive state
- **Padding**: ~16px horizontal, ~12px vertical

#### States (observed from screenshots)
| State | Background | Text Color | Border |
|-------|------------|------------|--------|
| Default | #FFFFFF | #000000 | Light gray |
| Active | Category Color | #FFFFFF | None or same as background |

#### Category Button Labels (from screenshots)
- Research, Robotics, Software, Sculpture, Videography, Play

### Card Stack

#### Positioning (from stack screenshots)
- **Stack offset**: ~12px right, ~8px down for each subsequent card
- **Rotation**: ~2-3 degrees rotation for stacked effect
- **Z-index spacing**: Clear layering with top card fully visible

#### Splay Effect (from splay screenshot)
- **Peek effect**: Cards fan out to the right by ~20-30px each
- **Rotation**: Maintains slight rotation, increases spacing
- **Visibility**: All cards become partially visible when splayed

#### Stack Behavior
- **Default**: Neat stack with only top card fully visible
- **Hover/Interaction**: Cards splay out showing all projects
- **Top card**: Acts as "See All" trigger or main featured project

### Gallery Grid

#### Layout (from card array screenshot)
- **Columns**: 2 columns
- **Gap**: ~40px between cards
- **Cards**: Same design as stack cards but in grid formation

#### Grid Characteristics
- **Consistent spacing**: Even gaps maintained
- **Card alignment**: Top-aligned in rows
- **Responsive**: Maintains 2-column layout

---

## Spacing & Measurements

### Section Spacing (estimated from screenshots)
- **Page margins**: ~60px from screen edges
- **Between stack and buttons**: ~120px horizontal gap
- **Between main content and gallery**: ~80px vertical
- **Header/title area**: ~60px top margin

### Component Spacing
- **Inside cards**: 24px padding all around content
- **Between card elements**: 12px between title and description
- **Button spacing**: 16px horizontal, 12px vertical gaps
- **Stack offset**: 12px right, 8px down per card

---

## Visual Effects & Interactions

### Card Effects
- **Default shadow**: Subtle drop shadow for depth
- **Hover effects**: Likely slight scale (1.02) and enhanced shadow
- **Stack interaction**: Smooth splay animation revealing all cards

### Button Effects  
- **Default**: Clean white background with border
- **Active**: Filled with category color, white text
- **Hover**: Likely slight color transition or scale

### Layout Behavior
- **Stack reveal**: Smooth animation spreading cards to show all options
- **Gallery filtering**: Cards appear/disappear based on category selection
- **Category correlation**: Stack cards relate to button states

---

## Implementation Notes

### Key Design Principles
1. **Minimalist aesthetic**: Heavy use of white space, clean typography
2. **Color as accent**: Black/white base with strategic category colors
3. **Sophisticated interaction**: Card stack provides engaging discovery method
4. **Clear hierarchy**: Typography sizing creates clear information hierarchy

### Technical Requirements
- **Font loading**: Gabarito font family needs to be imported
- **Smooth animations**: Stack splay and gallery filtering require smooth transitions
- **Responsive considerations**: Layout needs to adapt gracefully to smaller screens
- **Accessibility**: Ensure proper contrast ratios with category colors on white backgrounds

### Category Integration
- Each project can belong to multiple categories
- Category buttons filter the gallery display
- Stack interaction reveals all projects regardless of category
- Visual correlation between button colors and project category indicators

---

## Checklist
- [x] Screenshots analyzed from `/public/design/`
- [x] Color palette extracted and documented
- [x] Typography specifications from user input
- [x] Component dimensions estimated from screenshots
- [x] Layout structure mapped from images
- [x] Interaction patterns identified
- [x] Category system documented
