# TeamParker — Campus Parking Management System

A front-end wireframe prototype of the Campus Parking Management System (CPMS) for Cebu Institute of Technology – University.

Today, guards at the gate check vehicles by eye: no ID is scanned and no entry is logged, so students can't tell whether parking is available before they arrive. CPMS proposes ID-based entry and exit tracking. Guards verify owners with a campus ID tap and record entries and exits. Vehicle owners check free slots per area from their phone. Administrators manage areas and vehicles and review history and reports.

**Team:** Jundyll Kendrich L. Jaca, Zorel Adrean R. Java, Ashton N. Ruiz

## Run it

No installation or build step is needed.

1. Open `index.html` in a browser to start at staff sign-in.
2. Open `screens.html` to browse all 23 screens.

Every page works offline and with JavaScript turned off. JavaScript only adds small conveniences (see [Project files](#project-files)).

## Screens

### Vehicle owner (no sign-in)

| Screen | File | Purpose |
| --- | --- | --- |
| Parking availability | `mobile.html` | Answers "Can I park?" first, then free slots per area, most free first; "Last updated: just now" and Refresh; opens on a phone, tablet or university device |
| Selected area | `mobilearea.html` | One area's free slots, "Last updated: just now", and the three steps at the gate |
| No slots available | `mobilefull.html` | Shown when every area is full |

### Guard

Guards work from one reader screen with no menu. They press **Entry** or **Exit**, then the owner taps their campus ID.

| Screen | File | Purpose |
| --- | --- | --- |
| Staff sign in | `index.html`, `login.html` | Sign-in form, with a link for vehicle owners |
| Reader screen | `guard.html` | Entry and Exit buttons, free slots per area, plate search and the Help menu (Search by plate, Correct a record, Sign out) |
| Vehicle entry | `entry.html` | Plate and owner; pressing an area records the entry right away |
| Entry recorded | `entrydone.html` | Full green screen; Back to reader, or it returns by itself after 5 seconds |
| Vehicle exit | `exit.html` | Where and since when the vehicle is parked; one large Confirm exit button |
| Exit recorded | `exitdone.html` | Full green screen; Back to reader, or it returns by itself after 5 seconds |
| Problem screens | `exceptions.html` | ID not registered (entry, and `#not-registered-exit`), `#no-parking`, `#no-record` |
| Search vehicle / owner | `search.html` | For owners without an ID; search by plate or owner name; matches appear while typing. Opened after Entry or Exit (`?flow=entry` / `?flow=exit`) it shows only that flow's button; opened from Help it shows Start entry and Start exit |
| Correct a record | `correct.html` | From Help: change the area or entry time of an entry |

### Administrator

| Screen | File | Purpose |
| --- | --- | --- |
| Overview | `overview.html` | Free slots right now, vehicles parked, entries today, and free space per area |
| Parking areas | `areas.html` | Areas with capacity, free space and row actions |
| Area form | `areaform.html` | Add or edit an area; capacity can't go below current occupancy. Invalid details show an error message (`#invalid` shows an example); saving shows a success message on `areas.html` |
| Vehicles & owners | `vehicles.html` | Registered owners and vehicles, with search, type filter and row actions |
| Owner & vehicle form | `vehicleform.html` | Register an owner or link another vehicle. Invalid details show an error message (`#invalid` shows an example); saving shows a success message on `vehicles.html` |
| Parking history | `history.html` | All entries and exits, with filters and quick filters for vehicles inside and exited |
| Log details | `logdetail.html` | One parking session: the entry (guard, area, time) and the exit (guard, time) |
| Reports | `reports.html` | Choose the report type (Parking utilization), date range and area |
| Report result | `reportdone.html` | Per area: entries, exits, average daily usage, peak usage and how full it is now; print or save as PDF |
| Remove area | `remove.html` | Removal is blocked while vehicles are still parked |
| Remove vehicle or owner | `removevehicle.html` | Remove a vehicle, or an owner and all their vehicles; blocked while the vehicle is recorded inside (`#blocked`) |

## How the main flows work

The screens follow the team's submitted use cases, activity diagrams and sequence diagram.

**Entry:** the guard presses Entry, the owner taps their ID and the guard verifies it. The screen turns green with the plate and owner. If a slot is available, the guard tells the owner "Yes" and presses the area the owner chooses; the entry is recorded as Active and that area's free slots drop by 1. If the ID isn't registered, or every area is full ("No parking available"), a red screen explains what to do and nothing is recorded.

**Exit:** the guard presses Exit, the owner taps their ID and the screen turns blue with where the vehicle is parked. The guard presses Confirm exit: the exit is saved, the entry becomes Closed and the area's free slots rise by 1. If the vehicle has no active record, a red screen tells the guard to hold it and search the records; nothing is recorded.

**No ID:** the guard searches by plate number or owner name. The search keeps the Entry or Exit the guard chose. Starting an exit for a vehicle that isn't recorded inside opens No active record; starting an entry when every area is full opens No parking available.

**Mistakes:** if an entry was recorded with the wrong area or entry time, the guard fixes it with Correct a record (Help). Changing the area gives the old area one free slot back and takes one from the new area.

**Availability:** owners open the availability page on a phone, tablet or university device. They pick an area there and tell the guard at the gate. Viewing a page doesn't reserve a slot.

## Project files

| Path | Contents |
| --- | --- |
| `*.html` | One file per screen, written in plain, editable HTML |
| `css/styles.css` | Shared styles for every page: colours, layout, cards, tables, bars, badges, forms. Adapts to phone, tablet and desktop widths |
| `js/app.js` | Optional extras: filters tables and plate matches as you type, counts down on the confirmation screens, confirms a saved correction, closes Help with Escape, runs the history quick filters, checks the area and vehicle forms before saving, keeps the guard's Entry/Exit choice in search, shows the chosen vehicle on the next screens, adds prototype links |
| `design_handoff/` | The design handoff the visual style came from (spec and mock frames). Where it goes beyond the submitted documents, the prototype follows the documents |

## Design

- **Colours:** cream `#FFF8E7`, warm white `#FFFEF8`, maroon `#681F2B`, header gold `#F2C230`, pale gold `#F8E9B6`. All colours are defined once at the top of `css/styles.css`.
- **One colour, one meaning, on every screen:** green = entry, available or success; blue = exit; red = a problem; maroon = main buttons.
- **Type:** Inter when installed, otherwise Arial or Helvetica.
- **Patterns:**
  - Green bars show free space, so a longer bar means more room. Reports show "% full" instead, and say so.
  - Badges show status (Available, Full, Inside, Exited).
  - Users see "ID number", never "RFID".
  - Numbers are right-aligned with equal-width digits so columns line up.
  - Each screen's main action sits at the top right of the page or at the end of its form.
- **Origin:** the layout started from the TeamParker Figma file: https://www.figma.com/design/K51KbAEwjQ4xDcFIsoBer6

## Scope and limitations

This is a wireframe prototype, not a working parking system.

- No backend, database or ID reader is connected. Every count, name and record is fixed sample data.
- The sign-in buttons only choose a demo role; nothing is authenticated. Don't enter real credentials or personal information.
- Forms and confirmations move between sample screens; nothing is saved.
- The prototype stays within the submitted ERD, use case diagram and functional requirements. Correct a record only changes an entry's area and entry time; nothing else about a correction is stored.
- The guard screens can't receive a real ID tap. After pressing Entry or Exit, the reader screen shows "Prototype · simulate a tap" links for each outcome.
- Sample data describes one day (12 Oct 2026, seen at 12:10): 158 entries and 28 exits, so 130 vehicles parked and 70 slots free. "No parking available" and the owner's all-full page are demonstration states.

## Next steps for a real build

- Authenticate guards and administrators on the server, with roles matching the `Guard` and `Administrator` entities.
- Read ID numbers from the card reader and look up `VehicleOwner` → `Vehicle`.
- Write `VehicleEntryLog` and `VehicleExitLog` records, and update `ParkingArea.AvailableSlots`: −1 on entry, +1 on exit.
- Show the current `AvailableSlots` per area on the owner's availability page.
