# Design Plan

## Visual Direction

The health section will follow the civic visual pattern of Lalitpur Metropolitan City: a slim red top utility strip, a formal municipal identity header, deep blue navigation, dense notice/news sections, tab-like content blocks, official profile cards, and publication/download cards. The content and branding will be adapted for Rautamai Rural Municipality Health Branch.

Reference captures:

- `reference-lmc.png`: primary layout, palette, header and section rhythm.
- `reference-rautamai.png`: local municipality identity reference.
- `emblem.png`: official emblem/logo.
- `np_flag.gif`: Nepal flag positioned at the upper-right.
- `ram.jfif`: health unit chief photo.

## Palette

- Civic red: `#c52026` for top strip, section accents, alerts, notice labels.
- Deep municipal blue: `#0b4f8f` for navigation, primary buttons, admin sidebar.
- Dark navy: `#0f2f55` for headings and footer foundation.
- Warm gold: `#f2b632` for highlights and active states.
- Soft background: `#f5f7fb` for page bands.
- White cards with light gray borders for official, notice, and download surfaces.

## Typography

- Primary font stack: system UI with Nepali fallback fonts.
- Nepali content uses clear medium weights and generous line height.
- Headers are formal and compact, matching government-site density rather than marketing hero styling.

## Public Site Structure

1. Home
   - Health branch introduction
   - Major notices and news
   - Emergency contact numbers
   - Notice board
2. About Us
   - Branch introduction
   - Organization chart
   - Staff details and contact
3. Health Institutions
   - Health posts, hospitals, and basic health service centers
   - Location map placeholder for embeddable map
   - Service time
4. Programs and Services
   - Maternal and child health
   - Immunization
   - Nutrition
   - TB
   - HIV/AIDS
   - Family planning
   - NCD
5. Notices and Publications
   - Notices, circulars, guidelines, procedures, annual reports, health profile
6. Data and Reports
   - HMIS reports, indicators, periodic reports, dashboard
7. Download Center
   - Forms, report templates, IEC materials
8. Grievance System
   - Online complaint form
   - Feedback form
   - Suggestion box
9. Emergency Service Information
   - Ambulance, blood service, snakebite center, urgent contacts
10. Photo and Video Gallery
11. Contact Us
12. Citizen Charter
13. Online Appointment Request

## Admin UX

The admin panel uses a restrained dashboard layout:

- Supabase email/password login.
- Sidebar navigation for every editable section.
- Overview metrics for notices, institutions, programs, grievances, and appointments.
- Section editor forms for contact details, notices, programs, institutions, emergency contacts, downloads, gallery items, citizen charter, and appointments.
- Clear save buttons and status states.

The admin UI prioritizes data entry and scanning over decoration.

## Responsive Behavior

- Desktop: full civic header and horizontal nav.
- Tablet: wrapped nav and two-column cards.
- Mobile: compact header, stacked content, sticky top identity, touch-friendly forms.

