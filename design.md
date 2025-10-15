# Leveler Design System

This document outlines the design system for Leveler, a gamified productivity app inspired by Solo Leveling.

## Color Tokens

### Light Mode
```css
--background: 210 10% 96%
--foreground: 222 47% 11%
--card: 0 0% 100%
--card-foreground: 222 47% 11%
--primary: 217 91% 60%        /* Glowing Blue */
--primary-foreground: 0 0% 100%
--secondary: 210 40% 96%
--secondary-foreground: 222 47% 11%
--accent: 217 91% 60%
--destructive: 0 84% 60%      /* Red */
--border: 214 32% 91%
--ring: 217 91% 60%
```

### Dark Mode (Default)
```css
--background: 222 47% 4%       /* Deep Black */
--foreground: 210 40% 98%      /* Off-white */
--card: 222 47% 8%             /* Dark Gray */
--card-foreground: 210 40% 98%
--primary: 217 91% 60%         /* Glowing Blue */
--primary-foreground: 0 0% 100%
--secondary: 222 47% 11%
--secondary-foreground: 210 40% 98%
--accent: 217 91% 60%          /* Glowing Blue */
--destructive: 0 84% 60%       /* Red Accent */
--border: 222 47% 15%
--ring: 217 91% 60%
```

### Special Colors
- **Streak/Fire**: Orange-500 to Red-500 gradient
- **Success/XP**: Green-500 to Emerald-500 gradient
- **Warning**: Yellow-500
- **Level Up**: Primary to Accent gradient

## Typography

### Fonts
- **Headings**: Orbitron (weights: 400, 700, 900)
- **Body**: Inter (weights: 400, 500, 600, 700)
- **Import**: Google Fonts

### Font Sizes
```css
text-xs: 0.75rem (12px)
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)
text-4xl: 2.25rem (36px)
text-5xl: 3rem (48px)
```

### Line Height
- Body text: 150% (1.5)
- Headings: 120% (1.2)

## Spacing System

Uses an 8px base unit:

```
0: 0px
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
5: 1.25rem (20px)
6: 1.5rem (24px)
8: 2rem (32px)
10: 2.5rem (40px)
12: 3rem (48px)
16: 4rem (64px)
```

## Border Radius

```
sm: calc(var(--radius) - 4px)
md: calc(var(--radius) - 2px)
lg: var(--radius)            /* 0.5rem / 8px */
```

## Components

### Button
**Variants:**
- `default`: Primary blue with glow effect
- `destructive`: Red for delete actions
- `outline`: Transparent with border
- `ghost`: Transparent, hover effect
- `secondary`: Muted background

**Sizes:**
- `sm`: Compact, for toolbars
- `default`: Standard size
- `lg`: Prominent actions
- `icon`: Square for icon-only buttons

**Example:**
```tsx
<Button variant="default" size="lg">Level Up</Button>
```

### Card
**Purpose:** Container for content sections

**Styles:**
- Default: Dark background with subtle border
- Gradient variants for special sections (XP, streaks, goals)

**Example:**
```tsx
<Card className="p-6">
  <h2 className="text-2xl font-bold mb-4">Title</h2>
  <p>Content</p>
</Card>
```

### ProgressBar
**Purpose:** Visual XP and goal progress

**Props:**
- `current`: Current value
- `max`: Maximum value
- `glowing`: Enable glow effect
- `showLabel`: Display numerical values

**Example:**
```tsx
<ProgressBar
  current={75}
  max={100}
  glowing
  showLabel
/>
```

### Badge
**Variants:**
- `default`: Blue accent
- `secondary`: Muted gray
- `destructive`: Red accent
- `outline`: Transparent with border

**Usage:**
- Task type indicators (workout/study)
- XP values
- Completion status
- Achievement earned indicators

### TaskCard
**Purpose:** Display individual task with actions

**Features:**
- Checkbox for completion
- Title and description
- XP value badge
- Type indicator (workout/study)
- Due date
- Tags
- Action buttons (Edit, Delete)

### LevelUpModal
**Purpose:** Celebrate level-up moments

**Features:**
- Animated entrance
- Confetti effects
- Trophy icon with glow
- Level number display
- Auto-dismiss after 3 seconds

### Navbar
**Purpose:** Main navigation

**Features:**
- Logo with gradient text
- Desktop: Full labels with icons
- Mobile: Icon-only buttons
- Active state with glow effect
- Sticky positioning

## Special Effects

### Glow Effects
```css
.glow-blue {
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
              0 0 20px rgba(59, 130, 246, 0.3);
}

.glow-red {
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5),
              0 0 20px rgba(239, 68, 68, 0.3);
}
```

### Gradients
```css
/* Primary Gradient */
bg-gradient-to-r from-primary to-accent

/* Stats Cards */
from-primary/10 to-accent/10
from-orange-500/10 to-red-500/10
from-green-500/10 to-emerald-500/10
```

## Animations

### Framer Motion
- **Page transitions**: Fade in with slide up (0.5s)
- **Level up modal**: Scale and rotate entrance
- **Task cards**: Fade and slide on mount/unmount
- **Progress bars**: Animated width change (0.5s ease-out)

### Confetti
- **Trigger**: On level up
- **Duration**: 3 seconds
- **Pattern**: Dual origin points (left and right)
- **Colors**: System default rainbow

## Responsive Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Layout Strategy
- **Mobile First**: Single column layouts
- **Tablet (md)**: 2-column grids
- **Desktop (lg)**: 3+ column grids
- **Container**: Max-width with auto margins

## Accessibility

- All interactive elements have proper focus states
- Color contrast meets WCAG AA standards
- Icon buttons include proper labels
- Keyboard navigation supported
- Screen reader friendly

## Dark Mode

Dark mode is the default theme, matching the Solo Leveling aesthetic. The app is designed primarily for dark mode with high contrast and glowing effects.

To enable light mode, remove `className="dark"` from the `<html>` tag in `app/layout.tsx`.

## Best Practices

1. **Consistency**: Use established color tokens and spacing
2. **Hierarchy**: Use font sizes and weights to establish importance
3. **Contrast**: Ensure readability with proper color combinations
4. **Feedback**: Provide visual feedback for all user actions
5. **Performance**: Use CSS transforms for animations
6. **Responsiveness**: Test on multiple screen sizes

## Component Examples

### Stat Card with Icon
```tsx
<Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
  <div className="flex items-center gap-4">
    <div className="p-3 bg-primary/20 rounded-lg">
      <Trophy className="w-8 h-8 text-primary" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground">Level</p>
      <p className="text-3xl font-bold">15</p>
    </div>
  </div>
</Card>
```

### Gradient Text
```tsx
<h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
  LEVELER
</h1>
```

### Animated Button
```tsx
<Button className="gap-2 glow-blue">
  <Zap className="w-4 h-4" />
  Complete Task
</Button>
```

---

This design system ensures consistency across the Leveler app while maintaining the dark, powerful aesthetic inspired by Solo Leveling.
