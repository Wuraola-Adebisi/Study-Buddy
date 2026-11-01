# Morrow design system

Cobalt blue, ink, coral, yellow, lilac and green on a warm paper background.

## Color

Tokens live in `src/styles/globals.css`. Primitives hold values, role tokens hold meaning, components use roles only.

| Role | Value | Use |
|---|---|---|
| ground | `#F4F5F0` | page background |
| surface | `#FFFFFF` | cards, inputs |
| panel | `#ECEFE8` | progress tracks, quiet fills |
| line | `#DFE3DC` | dividers (decorative only) |
| field | `#7D8596` | input borders |
| ink / night | `#171B2A` | text, dark panels, footer |
| muted | `#535C6E` | secondary text |
| accent | `#3456D1` | primary buttons, links, blue bands |
| accent-deep | `#263FA7` | button hover |
| accent-soft | `#E7EBFF` | active nav item, tags |
| coral, coral-soft | `#F07861`, `#FBE3DC` | one tile, soft tag |
| yellow, yellow-soft | `#F5CF58`, `#F8EDC9` | highlights, avatar, progress fill on dark |
| lilac, green | `#DCD7F7`, `#DCE9C9` | tiles and tags |

Two changes from the first version: muted grey moved from `#687080` to `#535C6E` because the old value failed AA on every tinted card, and text on coral is ink instead of white (white on coral is 2.8:1).

### Contrast (WCAG 2.1 AA, checked with the playbook script)

| Pair | Ratio |
|---|---|
| muted on paper / white / panel | 6.1 / 6.7 / 5.5 |
| muted on the five tints | 4.8 to 5.9 |
| ink on yellow / coral | 11.4 / 6.2 |
| white on accent | 6.2 |
| light blue (`#D7DDFA`) on accent | 4.6 |
| white on ink | 17.1 |
| grey (`#B4BACB`) on ink | 8.8 |
| field border on paper / white (needs 3:1) | 3.4 / 3.7 |

Forbidden: accent text on lilac (4.45:1), white text on coral, field borders on tinted surfaces.

## Type

- **Headings:** Bricolage Grotesque Variable, weight 700.
- **Body and UI:** DM Sans Variable.
- Both are self-hosted through `@fontsource-variable`, so there is no third-party font request.
- Scale: 13px floor for metadata, 14px secondary, 16px body. Display and heading sizes use `clamp()`.
- Tabular numerals on counters and percentages only.

## Shape, depth, spacing

- Radius: 8, 12, 20 and 28px. Buttons and toggles use 12px. Pills are only for small tags.
- Shadows: `card` and `float`, used on the hero cards and a few overlays. No hard offset shadows.
- Spacing: Tailwind's 4px scale, `py-section` between sections, `max-w-page` for content, `.page` for the side padding.

## Buttons

`btn` plus one variant: `btn-primary` (blue), `btn-ink` (dark, for use on yellow), `btn-yellow` (for dark surfaces), `btn-quiet` (outlined). `btn-lg` for the main call to action on a page. All are 44px or taller, with a 1px press.

## Motion

Hero cards settle in once on load. The dashed ring behind them turns slowly. Both stop under `prefers-reduced-motion`.

## Assets

`public/favicon.svg` is the source for the favicon, touch icon, 32px PNG and the in-app logo (`Wordmark.tsx`). `public/og-image.png` is 1200 by 630.
