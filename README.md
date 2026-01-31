# 🎨 HA SVG Icons

A collection of customizable SVG icons designed for [Home Assistant](https://www.home-assistant.io/) dashboards. Each icon supports dynamic color control via CSS custom properties, making them easy to theme to match your dashboard.

## Quick Start

### 1. Add to Home Assistant

**Option A — HACS Custom Repository (Recommended)**

1. Open HACS → **Frontend** → ⋮ menu → **Custom repositories**
2. Add this repo URL and select **Lovelace** as the category
3. Install **HA SVG Icons**
4. Restart Home Assistant

**Option B — Manual Install**

1. Download the `icons/` folder from this repository
2. Place it in your Home Assistant `www/` directory:
   ```
   config/
   └── www/
       └── ha-svg-icons/
           └── icons/
               └── streaming/
                   └── disney-plus.svg
   ```
3. Restart Home Assistant

### 2. Use in a Dashboard Card

Reference icons via `/local/ha-svg-icons/icons/...`:

```yaml
type: picture-element
image: /local/ha-svg-icons/icons/streaming/disney-plus.svg
```

---

## Color Customization

Every icon in this repo uses **CSS custom properties** (variables) for color control. This means you can override colors at the card level, in your theme, or with `card-mod`.

### Available CSS Variables

| Variable | Description | Default |
|---|---|---|
| `--icon-color` | Main icon fill (text / shapes) | `#ffffff` |
| `--gradient-start` | Gradient start color | `#ffffff` |
| `--gradient-mid` | Gradient midpoint color | `#00ffff` |
| `--gradient-end` | Gradient end color | `#0000ff` |

> Not every icon uses all four variables. Check the icon's SVG source to see which variables apply.

### Method 1: `card-mod` Inline Styles

Using [card-mod](https://github.com/thomasloven/lovelace-card-mod) you can set the CSS variables directly:

```yaml
type: image
image: /local/ha-svg-icons/icons/streaming/disney-plus.svg
card_mod:
  style: |
    ha-card img {
      --icon-color: #e0e0e0;
      --gradient-start: #ff6600;
      --gradient-mid: #ff0000;
      --gradient-end: #660000;
    }
```

### Method 2: Theme-Level Defaults

Add variables to your Home Assistant theme so all icons inherit consistent colors:

```yaml
my_theme:
  icon-color: "#ffffff"
  gradient-start: "#ffffff"
  gradient-mid: "#00ffff"
  gradient-end: "#0000ff"
```

### Method 3: Inline SVG in Markdown Card

For maximum flexibility, embed the SVG directly in a Markdown card and swap the CSS variable values:

```yaml
type: markdown
content: >
  <svg viewBox="-5.35 -20.13 1053.89 738.50" xmlns="http://www.w3.org/2000/svg"
       style="width: 120px; height: auto;">
    <style>
      :root {
        --icon-color: #ff0000;
        --gradient-mid: #ffaa00;
      }
    </style>
    <!-- ... rest of SVG ... -->
  </svg>
```

---

## Icon Catalog

### Streaming

| Icon | Path | Customizable Parts |
|---|---|---|
| Disney+ | `icons/streaming/disney-plus.svg` | `--icon-color` (logo text), `--gradient-start`, `--gradient-mid`, `--gradient-end` (arc) |

---

## Adding New Icons

1. **Create a folder** under `icons/` for the category (e.g., `icons/smart-home/`, `icons/networking/`)
2. **Prepare the SVG:**
   - Replace hard-coded `fill` colors with `var(--icon-color)` or similar CSS variables
   - Add a `<style>` block at the top with `:root` defaults so the icon renders correctly without any overrides
   - Simplify the gradient stops where possible (the original may have 10 stops — you usually only need 3-4 with CSS variables)
   - Remove `width` and `height` attributes; keep only the `viewBox` so the icon scales properly
   - Add comments labeling each section (`<!-- Logo text -->`, `<!-- Gradient arc -->`, etc.)
3. **Update this README** with the new icon in the catalog table
4. **Test in Home Assistant** — drop it in `www/` and verify it renders with default colors and with overridden variables

### SVG Template

```xml
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root {
      --icon-color: #ffffff;
      --accent-color: #00ffff;
    }
  </style>
  <!-- Main shape -->
  <path d="..." fill="var(--icon-color)"/>
  <!-- Accent shape -->
  <circle cx="50" cy="50" r="10" fill="var(--accent-color)"/>
</svg>
```

---

## Repository Structure

```
ha-svg-icons/
├── README.md
├── icons/
│   └── streaming/
│       └── disney-plus.svg
└── .github/
    └── CONTRIBUTING.md       (optional)
```

---

## Compatibility Notes

- **CSS custom properties in SVGs** work when the SVG is embedded inline or loaded via `<object>` / `<iframe>`. When loaded as a standard `<img>` tag, browsers sandbox the SVG and CSS variables from the parent page won't cascade in. The default values defined inside the SVG's own `<style>` block will always apply.
- **card-mod** overrides work when the card renders the SVG in a way that allows style injection. For `picture-elements` and `image` cards, test with your specific HA version.
- For guaranteed color control, the **inline Markdown method** or a **custom card** that embeds the SVG directly into the DOM is the most reliable approach.

## License

MIT — use these icons however you like.
