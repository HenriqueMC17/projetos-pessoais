# Attendance Control System - Dashboard & Analytics

## 🚀 Overview
The **Attendance Control System** is a high-performance management tool designed to track, register, and visualize attendance data through an automated dashboard. It streamlines the workflow from data entry (via forms/calendars) to executive-level reporting, providing real-time insights into service performance.

## 🏛️ Architecture & Governance
This project follows a **Feature-Sliced** approach, where modules are organized by their business domain (Dashboard, Registry, Form).

- **Data Consistency:** Implements a strict persistence layer in `registro.js` to ensure zero data loss during concurrent writes.
- **Fail-Safe Mechanism:** Uses the `ErrorHandler` utility to wrap critical operations, ensuring a resilient user experience.
- **Configurational Integrity:** All project-wide settings are immutable at runtime via `Object.freeze()`.

## 🛠️ Technology Stack
- **Runtime:** Google Apps Script (V8)
- **Reporting:** Dynamic Dashboarding within Google Sheets
- **Form Engine:** Custom HTML/JS registration forms
- **Scheduling:** Integration with calendar-based logic

## 📁 File Structure & Responsibilities

| File | Responsibility |
| :--- | :--- |
| `config.js` | Central Hub for immutable project constants, sheet names, and IDs. |
| `utils.js` | Shared logic and the core `ErrorHandler` service. |
| `eventos.js` | Entry points for system triggers (`onOpen`, `installable triggers`). |
| `registro.js` | The persistence layer; handles all data writing to the database. |
| `formulario.js` | Integration between UI forms and the backend registry. |
| `dashboard.js` | Analytical engine for calculating KPIs and updating visual trackers. |
| `calendario.js` | Specialized logic for date-based events and scheduling. |

## ⚙️ Core Components

### 📊 Real-time Dashboard (`dashboard.js`)
An automated analytical engine that processes raw attendance data into actionable KPIs. It updates summaries and charts without requiring manual user intervention.

### 📝 Resilient Registry (`registro.js`)
A robust data layer that validates fields before insertion and manages range expansions dynamically, ensuring the spreadsheet database scales efficiently.

## 🔧 Installation & Setup
1.  **Script Binding:** Attach a new Apps Script project to your Attendance Spreadsheet.
2.  **Modular Upload:** Copy all files, maintaining the modular organization.
3.  **Setup Hub:** Configure the `CONFIG` object in `config.js` with your specific Spreadsheet keys and range names.
4.  **Triggers:** Run any initialization logic from `eventos.js` to set up the environment.

## 🛡️ Security & Performance
- **Error Transparency:** Users are notified only of actionable issues via the UI, while technical details are logged.
- **API Cache Management:** Uses efficient reading patterns to minimize sheet-to-script latency.
- **Validation Blocks:** Form submissions are sanitized at both the frontend (HTML) and backend (registry) levels.

---
**Status:** `v2.0 - Optimized & Modularized`
**Senior Architect:** HenriqueMC17
