# TeamParker — Campus Parking Management System

A front-end wireframe prototype of the Campus Parking Management System (CPMS) for Cebu Institute of Technology – University.

Today, guards at the gate check vehicles by eye: no ID is scanned and no entry is logged, so students can't tell whether parking is available before they arrive. CPMS proposes ID-based entry and exit tracking. Guards tap a campus ID to verify owners and record entries and exits. Vehicle owners check free slots per area from their phone. Administrators manage areas and vehicles and review history and reports.

**Team:** Jundyll Kendrich L. Jaca, Zorel Adrean R. Java, Ashton N. Ruiz

## Run it

No installation or build step is needed.

1. Open `index.html` in a browser to start at staff sign-in.
2. Open `screens.html` to browse all 24 screens.

Every page works offline and with JavaScript turned off. JavaScript only adds small conveniences (see [Project files](#project-files)).

## Screens

### Vehicle owner (no sign-in)

| Screen | File | Purpose |
| --- | --- | --- |
| Parking availability | `mobile.html` | Answers "Can I park?" first, then free slots per area, most free first |
| Selected area | `mobilearea.html` | One area's free slots and the three steps at the gate |
| No slots available | `mobilefull.html` | Shown when every area is full |
| Counts out of date | `mobilestale.html` | Shown when the counts are over 5 minutes old |

### Guard

Guards use one gate screen with no menu. The ID tap decides what it shows: a vehicle recorded inside opens Exit, one outside opens Entry, and anything wrong opens a Problem screen.

| Screen | File | Purpose |
| --- | --- | --- |
| Staff sign in | `index.html`, `login.html` | Sign-in form, with a link for vehicle owners |
| Waiting for a tap | `guard.html` | Reader status, free slots per area, plate search, the last taps (only the latest can be undone) and the Help menu |
| Vehicle entry | `entry.html` | Plate and owner; pressing an area records the entry right away |
| Entry recorded | `entrydone.html` | Full green screen; returns to the reader after 5 seconds; Undo |
| Vehicle exit | `exit.html` | Where and since when the vehicle is parked; one large Confirm exit button |
| Exit recorded | `exitdone.html` | Full green screen; returns to the reader after 5 seconds; Undo |
| Problem screens | `exceptions.html` | ID not registered, no parking, already inside, no active record (one per `#anchor`) |
| Search by plate | `search.html` | For owners without an ID; matches appear while typing |
| Correct a record | `correct.html` | From Help: change the area or time of an earlier tap, with a required reason |
| Today's log | `gatelog.html` | From Help: every tap at this gate today |

### Administrator

| Screen | File | Purpose |
| --- | --- | --- |
| Overview | `overview.html` | Free slots right now, vehicles parked, corrections today, and free space per area |
| Parking areas | `areas.html` | Areas with capacity, free space and row actions |
| Area form | `areaform.html` | Add or edit an area; capacity can't go below current occupancy |
| Vehicles & owners | `vehicles.html` | Registered owners and vehicles, with search and type filter |
| Owner & vehicle form | `vehicleform.html` | Register an owner or link another vehicle |
| Parking history | `history.html` | All entries and exits, with filters and quick filters for inside, corrected and undone taps |
| Log details | `logdetail.html` | One parking session with a timeline of what happened, including corrections |
| Reports | `reports.html` | Choose a period and area for a utilization report |
| Report result | `reportdone.html` | Totals and per-area usage; print or save as PDF |
| Remove area | `remove.html` | Removal is blocked while vehicles are still parked |

## How the main flows work

The screens follow the team's activity and sequence diagrams.

**Entry:** the owner taps their ID and the gate screen turns green with the plate and owner. If parking is available, the guard presses the area the owner chooses, which records the entry at once. That area's free slots drop by 1. If every area is full, a red screen tells the guard to say "No".

**Exit:** the owner taps their ID and the gate screen turns blue with where the vehicle is parked. The guard presses Confirm exit and the area's free slots rise by 1. If no active record exists, a red screen tells the guard to hold the vehicle and search the records.

**Mistakes:** the latest tap can be undone from the confirmation screen or the Last taps strip. Older taps are fixed with Correct a record, which needs a reason. Administrators see every undo and correction in parking history.

**Availability:** owners open the availability page on a phone, tablet or university device. They pick an area there and tell the guard at the gate. Viewing a page doesn't reserve a slot.

## Project files

| Path | Contents |
| --- | --- |
| `*.html` | One file per screen, written in plain, editable HTML |
| `css/styles.css` | Shared styles for every page: colours, layout, cards, tables, bars, badges, forms. Adapts to phone, tablet and desktop widths |
| `js/app.js` | Optional extras: filters tables and plate matches as you type, counts down on the confirmation screens, shows undo and correction messages, closes Help with Escape, runs the history quick filters, adds prototype links |
| `design_handoff/` | The design handoff these screens were built from (spec and mock frames) |

## Design

- **Colours:** cream `#FFF8E7`, warm white `#FFFEF8`, maroon `#681F2B`, header gold `#F2C230`, pale gold `#F8E9B6`. All colours are defined once at the top of `css/styles.css`.
- **One colour, one meaning, on every screen:** green = entry, available or success; blue = exit; red = a problem; amber = a correction or out-of-date counts; maroon = main buttons.
- **Type:** Inter when installed, otherwise Arial or Helvetica.
- **Patterns:**
  - Green bars show free space, so a longer bar means more room. Reports show "% full" instead, and say so.
  - Badges show status (Available, Full, Inside, Exited, Undone).
  - Users see "ID number", never "RFID".
  - Numbers are right-aligned with equal-width digits so columns line up.
  - Each screen's main action sits at the top right of the page or at the end of its form.
- **Origin:** the layout started from the TeamParker Figma file: https://www.figma.com/design/K51KbAEwjQ4xDcFIsoBer6

## Scope and limitations

This is a wireframe prototype, not a working parking system.

- No backend, database or ID reader is connected. Every count, name and record is fixed sample data.
- The sign-in buttons only choose a demo role; nothing is authenticated. Don't enter real credentials or personal information.
- Forms and confirmations move between sample screens; nothing is saved.
- Undo, corrections, gate names, the guards' gate log and the out-of-date warning go beyond the original reference documents. [docs/reference-updates.md](docs/reference-updates.md) lists the matching changes to the ERD, class diagram, use cases, functional requirements, activity and sequence diagrams.
- The gate screens can't receive a real ID tap. The waiting screen has a "Prototype · simulate a tap" row that opens each state.

## Next steps for a real build

- Authenticate guards and administrators on the server, with roles matching the `Guard` and `Administrator` entities.
- Read ID numbers from the card reader and look up `VehicleOwner` → `Vehicle`.
- Write `VehicleEntryLog` and `VehicleExitLog` records. Calculate each area's free slots from its capacity minus its active entries.
- Refresh the availability page automatically so owners see current counts.
