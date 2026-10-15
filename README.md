# TeamParker — Campus Parking

Open index.html in your browser. No installation or build command is required. Open screens.html to browse all 22 wireframe screens.

## Project files
- index.html: staff sign-in preview
- guard.html: gate dashboard
- overview.html: administrator dashboard
- mobile.html: public parking availability
- screens.html: complete screen directory
- css/styles.css: shared colors, layout, typography, rounding and shadows
- js/app.js: optional local table search and screen-directory links

All page content is plain, editable HTML. CSS is shared across pages and responds to phone, tablet and desktop widths. The pages also work with JavaScript disabled; only local table filtering and supplemental directory links require it.

## Scope
This is a front-end wireframe prototype, not a production parking system. Sign-in links select demonstration roles without authenticating. Forms, entry/exit confirmations, corrections and reports show fixed sample data; edits are not saved. No backend, RFID reader, live counts or database is connected. Do not enter real credentials or personal information. Actions that change records only navigate between the corresponding sample screens.

## Design
Based on the TeamParker Figma file https://www.figma.com/design/K51KbAEwjQ4xDcFIsoBer6 and its saved screen definitions. Palette: cream #FFF8E7, warm white #FFFEF8, maroon #681F2B, header gold #F2C230, pale gold #F8E9B6. Cards have 12px corners and soft shadows; tables have 10px corners. No official university seal was present in the wireframe, so no logo has been added. System sans-serif fonts keep the project fully offline; Inter is used when installed.

For a backend integration, replace demonstration links with real form submissions, authenticate roles on the server, and calculate availability from active entry records. The correction flow is a proposed extension to the original ERD.
