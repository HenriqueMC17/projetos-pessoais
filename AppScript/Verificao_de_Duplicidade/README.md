# Duplicate Verification Engine - Data Quality & Integrity

## 🚀 Overview
The **Duplicate Verification Engine** is a specialized automation tool designed to ensure data uniqueness and integrity within high-volume spreadsheets. By combining real-time triggers (`onEdit`) with manual scan capabilities, the system identifies, marks, and prevents redundant data entries, significantly reducing the "noise" in your database.

## 🏛️ Architecture & Governance
This project is built for speed and accuracy, utilizing an event-driven architecture to monitor user changes instantly.

- **Event-Driven Detection:** Real-time monitoring of spreadsheet edits via optimized `onEdit` handlers.
- **Visual Feedback Layer:** Automatic styling (color alerts) applied to conflicting data points.
- **Architectural Resilience:** Centralized error management via `ErrorHandler` to prevent trigger blockages.
- **Environment Isolation:** Immutable configurations using `Object.freeze()` to guarantee execution consistency.

## 🛠️ Technology Stack
- **Runtime:** Google Apps Script (V8 Engine) - High Speed
- **Triggers:** Simple and Installable onEdit Triggers
- **Styling API:** Range formatting for visual status indicators
- **Algorithms:** Optimized array-based collection scanning

## 📁 File Structure & Responsibilities

| File | Responsibility |
| :--- | :--- |
| `config.js` | Definitive source for environment settings and match criteria. |
| `utils.js` | Infrastructure logic and the centralized `ErrorHandler` exception manager. |
| `eventos.js` | System entry points for real-time monitoring and menu setup. |
| `verificacao.js` | Core engine for duplicate detection logic and data comparison. |
| `formatacao.js` | UI logic for highlighting, marking, and cleaning visual indicators. |

## ⚙️ Core Components

### 🔍 Search Intelligence (`verificacao.js`)
The algorithm performs non-linear scans of specific columns, identifying exact and fuzzy matches (depending on config) to flag potential duplicates before they affect data downstream.

### ⚡ Rapid-Response Triggers (`eventos.js`)
Configured to execute in milliseconds, the `onEdit` handler captures changes and triggers the verification flow without interrupting the user's typing experience.

## 🔧 Installation & Setup
1.  **Script Linkage:** Attach the script to your main Data Spreadsheet.
2.  **File Setup:** Integrate all project files into the Apps Script editor.
3.  **Config Tuning:** In `config.js`, specify the columns that must remain unique and the colors used for alerts.
4.  **Authorization:** Run the `onOpen` function once and authorize the script to allow triggers to perform background scans.

## 🛡️ Security & Performance
- **API Throttling:** The engine uses internal buffers to avoid hitting Google's rate limits during mass edits.
- **Graceful Failure:** If the UI is unavailable (headless execution), the `ErrorHandler` allows the logic to proceed without throwing blocking errors.
- **Scoped Permissions:** Validations are only performed on relevant ranges, conserving execution time.

---
**Status:** `Refactored & Automated`
**Senior Architect:** HenriqueMC17
