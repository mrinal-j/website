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

## Section layout

**On case study pages, the section title sits in its own column on the left,
and the content sits to the right of it.**

The content area is divided into four equal columns. The title takes the first
one, everything else in the section spans the remaining three. At the usual
1440px screen that works out as four 262px columns with 24px between them, so
the title column is 262px wide and the content column is 835px.

The tokens and the rule both live in `src/styles/globals.css`:

```css
--section-columns: 4;
--section-gutter: 24px;
```

Apply it by putting **`section-columns`** on the section and
**`section-columns-label`** on the block holding its title. These are plain
global class names used straight from the JSX, the same way `reveal-root` works,
rather than per page rules. Written once, they cannot drift between pages.

**Which pages are on it:** Housing Works, UN80, UNGA80, Kaaro and Integrated
Care. In the Loop is not, and is the odd one out until someone does the
groundwork described below.

**A section must hold the page margins itself.** The layout divides the
section's own content box into four, so the section needs
`padding: ... var(--page-side-padding)` on it. Some pages were built the other
way round, with the section at zero padding and every block inside it carrying
the margins. Those pages need that padding hoisted onto the section, and taken
off every child, before the layout can be applied. Kaaro and UN80's context
section were converted this way. In the Loop still works the old way across
about 45 rules, including the phone mockup positioning, which reads
`--page-side-padding` to line the phone up with the copy, so it needs a
dedicated pass rather than being folded in with the others.

Three things worth knowing:

1. **A section with no title still indents.** The continuation bands push their
   content into columns two to four as well, so they stay lined up with the
   section above rather than jumping back to the left edge.
2. **Below 1000px this switches off entirely** and sections stack exactly as
   they used to, with the title above its content. A quarter column is around
   85px on a phone, which is too narrow to hold a title.
3. **Full width bands stay full width.** Heroes, banner images, the metadata
   grid and the pinned scroll blocks are not part of this and keep running edge
   to edge.

### Reflections

**Every reflections section carries a vertical line down its left edge.** A 3px
rule, with the text held 28px clear of it. It is how the honest close at the end
of a case study is marked, and it is the same on every page that has one.

**The line stands the height of the body text and no more.** It starts where the
writing starts and stops where it stops. It does not run on down the side of
anything that follows, such as a row of tags, and it does not extend into the
space above or below the text. In practice that means putting the rule on the
text itself rather than on the block wrapping it, and indenting whatever sits
underneath to stay level with the writing.

The line takes **the page's own accent colour**, so it belongs to the project
rather than to a site-wide palette:

| Page | Line |
| --- | --- |
| Housing Works | `--housing-works-pink` |
| Integrated Care | `--ic-red` |
| In the Loop | the yellow used across that page |
| UN80 | `currentColor`, the black of the text |

UN80 is the one worth explaining. Its reflection sits on the blue results band,
so the page's accent is the ground itself and would disappear into it. The rule
there takes the colour of the writing instead, which is black, set as
`currentColor` so it follows the copy if that colour ever changes.

Kaaro and UNGA80 have no reflections section. If either gains one, it gets the
line too.

---

### Section titles

A section title is the plain name of the section and nothing else. Two rules
shape it, and both are about taking things away.

**Do not number the section titles.** No `01`, no `02`, no counting of any
kind. A number promises the reader a sequence they have to keep track of, and a
case study is not a numbered procedure. The title column already shows where
each section starts, so the count adds nothing and dates badly the moment a
section is added, dropped or reordered.

**Titles have no trailing line.** They used to end in a fade-out rule that
stretched across the page. In a 262px column that would only ever have been a
stub, so it is gone.

The type is General Sans, 13px, weight 600, uppercase, `0.14em` letter spacing,
in a muted grey. Long titles wrap onto two or three lines inside the column,
which is expected and fine.

---

## Phone layout

Phone styling starts at `max-width: 767px`.

**Sections keep a 24px margin each side.** On wider screens a section is capped
and centred; on a phone it goes full width and holds its content 24px in from
both edges. Every section follows this, so nothing sits closer to the edge than
anything else.

**In the About collage, rows are 16px apart and photos still touch side to
side.** On desktop the collage is an eight column grid where neighbouring
photos butt together into strips and the empty cells are the whitespace. On a
phone it becomes one continuous two column grid: photos still meet with no gap
across, and a single 16px gap separates every row, including the rows holding
the doodle journal, the Spotify card and the closing caption. Nothing gets its
own spacing.

One consequence worth knowing: the Spotify embed always draws its card 152px
tall, pinned to the top of its frame. The frame must match that height on a
phone, or the leftover becomes blank space that reads as an uneven gap.

---

## Standing rules

These apply site wide, not just to one page.

1. **All raster images must be `.webp`.** Convert before adding them. It keeps
   pages fast.
2. **No em dashes in copy.** Use commas, colons, brackets or a full stop.
3. **Cap body text width.** Long paragraphs running the full width of the
   screen are hard to read. Keep the line length to roughly three quarters of
   the page's content area, meaning the space inside the side margins.

   **On a four column section the layout already does this.** The title takes
   the first column and the copy takes the other three, which is three quarters
   of the content area by construction. Capping again inside that column stacks
   one measure on top of another and leaves the text stopping well short of the
   right margin, so a section laid out this way lets its copy run the full width
   of its column. This applies to every page on the layout, and the cap comes
   off whatever form it took, per cent, `ch` or pixels. All five pages on the
   layout have had theirs removed.

   The exception is copy that sits in a column of its own inside a section, for
   example the text beside a picture in a two-up row. There the width is the
   layout, not a measure laid over it, and it stays.

   One number worth knowing: on a 1440px screen this puts body copy at about
   86 characters a line. That is at the long end of comfortable rather than in
   the middle of it, and it is a deliberate choice on this page rather than an
   oversight.
4. **Flag anything that steps outside this document.** If a font, a colour or a
   styling choice is not in the set here, say so plainly when handing the work
   over, and say what was used and why. This includes a token from the system
   being used for a job it was not given, not only a brand new value.

   A project sometimes does need a colour of its own, so this is not a ban. It
   is a checkpoint: flagged, it can be confirmed or refused. Unflagged, the
   system quietly drifts and nobody notices until it has.

---

## Housekeeping

Keep stylesheets describing only what is actually on the site. If a section gets
redesigned, delete the styling for the old version rather than leaving it in
place. Unused styling is easy to mistake for something live and makes the files
harder to trust.
