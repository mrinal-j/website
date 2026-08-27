# Design System

The agreed visual rules for mrinaljadhav.com. If you are changing how something
looks, check here first, and update this file when a rule changes.

Nearly all shared values live in one place: `src/styles/globals.css`. Anything
listed here as a token can be changed there once, and the whole site follows.

---

## Corner radius

**Cards, images and thumbnails are 8px. Always.**

This is the one rounding rule for the site. It covers case study cards, photos,
image wrappers, logo panels, media boxes, thumbnails, and the draggable cards.

It is stored as a token so it only exists in one place:

```css
--radius-card: 8px;   /* in src/styles/globals.css */
```

In the stylesheets it is used like this, never as a bare number:

```css
border-radius: var(--radius-card);
```

To change every card on the site, edit the single `8px` in `globals.css`. Do not
type radius numbers directly into a component stylesheet.

### The exceptions, and why they exist

These are deliberate. Leave them alone unless you are changing the rule itself.

| Thing | Rounding | Why |
| --- | --- | --- |
| Pills, tags, buttons | `999px` or `100px` | Fully round by design. Not tokenised, because one number cannot serve both short and tall pills. |
| Avatars, dots, circular buttons | `50%` | Must stay perfectly circular at any size. |
| Navbar bar | `16px` | Its own shape, agreed separately. |
| Footer, and the Statements band on the home page | `48px 48px 0 0` | Large rounded top edge, a page level treatment rather than a card. |
| Phone mockups (In the Loop) | `--screen-radius` and friends | Copying real hardware. 8px would look wrong. |
| Browser window mockup (UN80) | `12px` | Same reason: it is a window frame, not a card. |
| Edit panel | its own values | Developer only tool. Never appears on the live site. |

---

## Colour

Defined in `src/styles/globals.css`. The site is light only. Dark mode is
switched off on purpose, so black text is never auto inverted by the browser.

**Brand colours**

| Token | Value |
| --- | --- |
| `--color-orange` | `#f60` |
| `--color-orange-hover` | `#e55a00` |
| `--color-blue` | `#a2c4e7` |
| `--color-indigo` | `#4450ea` |
| `--color-indigo-dark` | `#3640c4` |
| `--color-yellow` | `#ded74f` |
| `--color-green` | `rgb(34, 197, 94)` |

**Backgrounds, text and borders**

| Token | Value | Use for |
| --- | --- | --- |
| `--bg-primary` | `#fff` | Default page background |
| `--bg-secondary` | `#f5f5f5` | Light grey sections |
| `--bg-tertiary` | `#ebebeb` | Slightly darker grey blocks |
| `--bg-warm` | `#fff9f5` | Warm off white sections |
| `--text-primary` | `#000` | Headlines and body copy |
| `--text-secondary` | `#4a4a4a` | Supporting copy |
| `--text-muted` | `#8a8a8a` | Captions and small labels |
| `--border-light` | `#ebebeb` | Default hairline borders |
| `--border-medium` | `#cbcbcb` | Stronger borders and grey fills |

Use the token, not the hex code, so a colour change stays a one line edit.

---

## Type

| Token | Font | Use for |
| --- | --- | --- |
| `--font-sans` | General Sans | Headlines and labels. Weights 600 and 700. |
| `--font-body` | Manrope | Body copy. Weights 400 and 700. |
| `--font-mono` | SF Mono / Menlo (system) | Tiny technical captions, like the photo labels on the About page. |

Roboto is loaded but is only for the UN80 case study, where it shows the United
Nations master brand typeface as it really is. Do not use it anywhere else.

---

## Standing rules

These apply site wide, not just to one page.

1. **All raster images must be `.webp`.** Convert before adding them. It keeps
   pages fast.
2. **No em dashes in copy.** Use commas, colons, brackets or a full stop.
3. **Cap body text width.** Long paragraphs running the full width of the screen
   are hard to read. Keep the line length to roughly three quarters of the
   content width or less.

---

## Housekeeping

Keep stylesheets describing only what is actually on the site. If a section gets
redesigned, delete the styling for the old version rather than leaving it in
place. Unused styling is easy to mistake for something live and makes the files
harder to trust.
