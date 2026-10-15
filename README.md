# TeamParker — Campus Parking Management System

A front-end wireframe prototype of the Campus Parking Management System (CPMS) for Cebu Institute of Technology – University.

Today, guards at the gate check vehicles by eye: no ID is scanned and no entry is logged, so students can't tell whether parking is available before they arrive. CPMS proposes ID-based entry and exit tracking. Guards tap a campus ID to verify owners and record entries and exits. Vehicle owners check free slots per area from their phone. Administrators manage areas and vehicles and review history and reports.

**Team:** Jundyll Kendrich L. Jaca, Zorel Adrean R. Java, Ashton N. Ruiz

## Run it

No installation or build step is needed.

1. Open `index.html` in a browser to start at staff sign-in.
2. Open `screens.html` to browse all 22 screens.

Every page works offline and with JavaScript turned off. JavaScript only adds small conveniences (see [Project files](#project-files)).

## Screens

### Vehicle owner (no sign-in)

| Screen | File | Purpose |
| --- | --- | --- |
| Parking availability | `mobile.html` | Free slots per area, each with a bar and an Available/Full badge |
| Selected area | `mobilearea.html` | One area's free slots and the steps at the gate |
| No slots available | `mobilefull.html` | Shown when every area is full |

### Guard

| Screen | File | Purpose |
| --- | --- | --- |
| Staff sign in | `index.html`, `login.html` | Sign-in form, with a link for vehicle owners |
| Gate dashboard | `guard.html` | ID reader status, entry/exit buttons, quick search, campus availability |
| Vehicle entry | `entry.html` | Verified owner; tell the owner Yes or No; record their chosen area |
| Entry recorded | `entrydone.html` | Confirmation and the area's updated slot count |
| Vehicle exit | `exit.html` | Active parking record and the slot change, before confirming |
| Exit recorded | `exitdone.html` | Confirmation and the area's updated slot count |
| Search / correct | `search.html` | Find a vehicle without an ID tap, or open a record to fix |
| Correct record | `correct.html` | Change the area or time with a required reason; shows the availability impact |
| Gate exceptions | `exceptions.html` | Unregistered ID, no parking, already inside, no active record |

### Administrator

| Screen | File | Purpose |
| --- | --- | --- |
| Overview | `overview.html` | Campus totals and usage per area |
| Parking areas | `areas.html` | Areas with capacity, usage and row actions |
| Area form | `areaform.html` | Add or edit an area; capacity can't go below current occupancy |
| Vehicles & owners | `vehicles.html` | Registered owners and vehicles, with search and type filter |
| Owner & vehicle form | `vehicleform.html` | Register an owner or link another vehicle |
| Parking history | `history.html` | All entries and exits, with date, area and status filters |
| Log details | `logdetail.html` | Timeline of one parking session |
| Reports | `reports.html` | Choose a period and area for a utilization report |
| Report result | `reportdone.html` | Totals and per-area usage; print or save as PDF |
| Remove area | `remove.html` | Removal is blocked while vehicles are still parked |

## How the main flows work

The screens follow the team's activity and sequence diagrams.

**Entry:** the owner taps their ID and the guard sees the verified owner and vehicle. If parking is available, the guard tells the owner "Yes" and records the area the owner chooses. That area's free slots drop by 1. If every area is full, the guard tells the owner "No" and no entry is recorded.

**Exit:** the owner taps their ID and the guard sees the active parking record. The guard confirms the exit and the area's free slots rise by 1. If no active record exists, the guard searches the records before letting the vehicle out.

**Availability:** owners open the availability page on a phone, tablet or university device. They pick an area there and tell the guard at the gate. Viewing a page doesn't reserve a slot.

## Project files

| Path | Contents |
| --- | --- |
| `*.html` | One file per screen, written in plain, editable HTML |
| `css/styles.css` | Shared styles for every page: colours, layout, cards, tables, bars, badges, forms. Adapts to phone, tablet and desktop widths |
| `js/app.js` | Optional extras: filters tables as you type, pre-fills search from the dashboard, updates the entry slot preview, adds prototype links to the footer |

## Design

- **Colours:** cream `#FFF8E7`, warm white `#FFFEF8`, maroon `#681F2B`, header gold `#F2C230`, pale gold `#F8E9B6`. Green marks available slots and red marks errors. All colours are defined once at the top of `css/styles.css`.
- **Type:** Inter when installed, otherwise Arial or Helvetica.
- **Patterns:**
  - Bars show how full each area is.
  - Badges show status (Available, Full, Inside, Exited).
  - Numbers are right-aligned with equal-width digits so columns line up.
  - Each screen's main action sits at the top right of the page or at the end of its form.
- **Origin:** the layout started from the TeamParker Figma file: https://www.figma.com/design/K51KbAEwjQ4xDcFIsoBer6

## Scope and limitations

This is a wireframe prototype, not a working parking system.

- No backend, database or RFID reader is connected. Every count, name and record is fixed sample data.
- The sign-in buttons only choose a demo role; nothing is authenticated. Don't enter real credentials or personal information.
- Forms and confirmations move between sample screens; nothing is saved.
- The record-correction flow goes beyond the original ERD. A real build would need to store corrections, for example in a corrections or audit table.

## Next steps for a real build

- Authenticate guards and administrators on the server, with roles matching the `Guard` and `Administrator` entities.
- Read IDs from the RFID reader and look up `VehicleOwner` → `Vehicle`.
- Write `VehicleEntryLog` and `VehicleExitLog` records. Calculate each area's free slots from its capacity minus its active entries.
- Refresh the availability page automatically so owners see current counts.
