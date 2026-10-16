# Handoff: TeamParker redesign (guard gate, owner mobile, admin consistency)

Repo: `zoreladreanjava/Campus-Parking-Management-System` (branch `main`). Static HTML + `css/styles.css` + `js/app.js`, no build step.

## Overview
Three changes to the existing prototype:
1. **Guard** — replace the sidebar dashboard + separate entry/exit pages with **one gate screen that changes state when an ID is tapped** (turn 4, `4a`–`4n`). Guards are not comfortable with complex software; the UI is simple, the language is normal.
2. **Owner mobile** — answer "Can I park?" first, show freshness, green bars for free space (turn 5, `5a`–`5d`).
3. **Admin** — consistency pass only: green free-space bars, "ID number" wording, show guard undos/corrections (turn 6, `6a`–`6c`).

## About the design files
`TeamParker Redesign.html` is a **design reference** (a canvas of fixed-size mock frames, newest turn at the top). Do not copy its markup — it uses inline styles. Recreate the designs in the repo's existing plain HTML + `css/styles.css` pattern (classes, tokens in `:root`, existing media queries). Each frame has a visible id badge (e.g. `4b`) referenced below. Turns 1–3 are history; **3a is replaced by turn 4**.

## Fidelity
High-fidelity. Colours, type sizes and copy are final. Spacing values below are from the mocks; snap to existing CSS where close.

## Global rules
- **Wording:** use "ID number", never "RFID", anywhere users see it (students, faculty and employees all use IDs). Use "Entry"/"Exit", "Record entry", "Confirm exit".
- **One colour = one meaning, on every screen:**
  - Green `oklch(0.45 0.12 150)` = entry / available / success
  - Blue `oklch(0.42 0.11 250)` = exit
  - Red `oklch(0.48 0.17 25)` = problem (header bar); text `oklch(0.42 0.14 25)`, fill `oklch(0.94 0.04 25)`
  - Amber fill `#fbecc0`, border `#e2c46a`, text `#5c4510` = correction / stale warning
  - Maroon `#681F2B` = primary buttons, area buttons
- **Bars now show FREE space in green** (was occupied share in maroon). Track `#EDE6D6`, fill green, width = free %. Applies to owner, guard tiles and admin. Reports may keep "% full" if labelled so.
- **Freshness:** show relative time ("Updated 1 min ago") instead of a clock time on owner and admin overview.

## Screens

### Guard — one gate screen (tablet 4a–4g, phone 4h–4n)
No sidebar. Top bar 56px gold: brand, "Main gate · G. Santos", **Help** button (right). Sign out moves into Help.

States (same on tablet and phone; phone = single column, main button at bottom):

| State | Frame | Content |
|---|---|---|
| Waiting | 4a / 4h | Green reader dot (140px tablet / 96px phone). "Ready for the next ID tap" (52px / 32px, 700). Sub: "Tap a campus ID to start an entry or exit." Area tiles: name + "30 free" in green 30px (FULL in red). "No ID? Search by plate" button. Bottom strip **Last taps**: tablet shows 3, phone shows 1; only the most recent has **Undo**. |
| Entry | 4b / 4i | Green header bar "VEHICLE ENTRY" (36px / 24px, 800) + gate · time. Plate in plate style (48px / 36px, 800, letter-spacing .06em, 4px/3px `#38342C` border, white bg). Name + vehicle type. "Parking available. Confirm the plate, then record the owner's chosen area." **Area buttons**: maroon, name 40px/28px, "30 free", pill "Record entry". Tablet: 3 columns; phone: stacked rows 92px tall. Full area: dashed `#C9BA94` border, `#EDE6D6` bg, "FULL · No slots", not pressable. Cancel (outline). Pressing an area **records immediately** — no radio + confirm. |
| Done | 4c / 4j | Whole screen pale green `oklch(0.96 0.03 150)`. Check circle. "Entry recorded · Area A". "MC-1234 · John Doe · Area A now has 29 free". Countdown bar + "Returning to the reader in 3 s" — auto-return after 5 s. "Undo entry" button. |
| Exit | 4d / 4k | Blue header "VEHICLE EXIT". Plate, name. "Parked in Area A since 08:15 · 3 h 50 min". One large blue **Confirm exit** (tablet fills remaining height; phone 96px at bottom). Cancel. |
| Problem | 4e / 4l | Red header naming the problem, e.g. "ID NOT REGISTERED". Statement 44px/28px: "ID number 009931 has no matching owner or vehicle." "Hold the vehicle at the gate." Numbered steps (maroon circles). Two buttons: primary "Search by plate", outline "Back". Same template for: no parking available, vehicle already inside, no active record (content from current `exceptions.html`). |
| Search by plate | 4f / 4m | "Search by plate number". Big input (88px / 68px, 44px/32px 800 text). Results appear while typing (no search button): plate badge + owner + **Select**. Selecting opens Entry or Exit, same as a tap. "Not listed? Registration is handled by an administrator." |
| Help | 4g / 4n | Tablet: 440px right panel over 55% dark scrim. Phone: full screen. Items, each with a one-line reason: **Search by plate** (primary), **Correct a record**, **Today's log**; **Sign out** at bottom; Close. |

Logic: the tap decides direction — vehicle recorded inside → Exit; outside → Entry; errors → Problem. Undo is available for the latest tap only (from Done and the Last taps strip). Corrections require a reason (shown in admin 6c).

Repo impact: `guard.html` becomes the gate screen; `entry.html`, `entrydone.html`, `exit.html`, `exitdone.html`, `exceptions.html`, `search.html`, `correct.html` become its states (separate files are fine for a static prototype). Guard sidebar is removed.

### Owner mobile (5a–5d) — `mobile.html`, `mobilearea.html`, `mobilefull.html`
- **5a Availability:** answer card at top (green fill `oklch(0.93 0.05 150)`, text `oklch(0.38 0.1 150)`): "Right now" / "Parking available" (30px 800) / "70 free slots in 2 of 3 areas". Freshness row: green dot + "Updated 1 min ago" + Refresh (44px). "AREAS" label. Area cards sorted by free slots desc, full last; free number 30px green; green free bar; "View ›". Full card muted with maroon "Full" badge, not tappable. Footnote: "Viewing doesn't reserve a slot. Counts may change before you arrive."
- **5b Area detail:** "‹ All areas" (44px target). "Area A", free 52px green, "of 100 slots free", 12px green bar, freshness row. "At the gate" steps: 1 Tap your campus ID on the reader. 2 Tell the guard you choose Area A. 3 Park once the guard records your entry.
- **5c All full:** answer card red: "No parking available" / "All 3 areas are full". "Slots open up when vehicles leave. Check again before you head to campus." All cards muted.
- **5d Stale (>5 min without update):** amber banner "These counts are 14 minutes old" / "They may have changed. Refresh before you go." / "Refresh now" (maroon, 48px). Answer in past tense "Parking was available" / "70 free slots at 08:15". Label "AREAS · AT 08:15". Cards at 60% opacity.

### Admin (6a–6c)
Keep the current shell, sidebar and table styles.
- **6a Overview (`overview.html`):** summary: "Free right now" 70 (green) "of 200 · 35% free" + green bar | Parked 130 | **Corrections today** 2 + "Review" link (replaces Total capacity). Table: Area, Total, Parked, Free (green; red when 0), Free space bar + %, Status. Subtitle "Updated 1 min ago".
- **6b History (`history.html`):** filters + search placeholder "Plate, owner or ID number". Quick filter chips with counts: All · 158, Inside · 130, Corrected · 2, Undone · 1 (active chip maroon). Columns: Owner / plate, **ID number**, Area, Entry, Exit, Duration, Status, Details. New badges: **Undone** (red fill/text), **Corrected** shown as sub-line under the status, e.g. "Corrected by G. Santos" / "Undone by G. Santos at 08:12". Footer: "Undone taps don't count toward totals or reports."
- **6c Log details (`logdetail.html`):** left card SESSION: ID number, Owner type (Student/Faculty/Employee — remove if not stored), Vehicle, Area, Entry, Exit, Duration, Status. Right card WHAT HAPPENED timeline: maroon dot = entry, amber dot = correction, blue dot = exit. Correction step: "08:20 · Corrected: Area B → Area A", who, reason in quotes, slot impact ("Area B +1 free, Area A −1 free"). Amber note: "This session was corrected once. The original value is kept above."

## Design tokens (additions to existing `:root`)
- Green `oklch(0.45 0.12 150)`, fill `oklch(0.93 0.05 150)`, ink `oklch(0.38 0.1 150)`, done bg `oklch(0.96 0.03 150)`
- Blue `oklch(0.42 0.11 250)`, fill `oklch(0.93 0.04 250)`, ink `oklch(0.4 0.1 250)`
- Red bar `oklch(0.48 0.17 25)`; existing `--danger-fill`, `--danger-ink`
- Bar track `#EDE6D6`; disabled area `#EDE6D6` + dashed `#C9BA94`
- Existing: canvas `#FFF8E7`, surface `#FFFEF8`, gold `#F2C230`, sidebar `#F8E9B6`, ink `#681F2B`, secondary `#6C604D`, border `#D8C393`, rule `#EADBB4`
- Type: Inter → Arial/Helvetica. Tabular numerals for all counts.
- Radii: 8 (inputs, small buttons), 10–14 (cards, big buttons), 999 (badges). Shadow `0 4px 16px rgb(0 0 0 / 8%)`.
- Touch targets: ≥44px everywhere; guard primary buttons ≥72px (phone) / ≥80px (tablet).

## Assets
None. No images or icons; the check mark is a text glyph.

## Files
- `TeamParker Redesign.html` — all mock frames, self-contained (open in a browser; pan/zoom). Turns 4, 5, 6 are the spec.
