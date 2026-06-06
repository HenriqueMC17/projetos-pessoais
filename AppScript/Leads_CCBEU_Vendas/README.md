# Leads & Sales Distribution System - CCBEU

## 🚀 Overview
The **Leads Distribution System** is a professional-grade automation solution built on **Google Apps Script** to manage, distribute, and audit sales leads within the CCBEU ecosystem. It implements a balanced distribution algorithm to ensure fair lead assignment among vendors while maintaining strict data integrity and auditability.

## 🏛️ Architecture & Governance
This project follows **Clean Architecture** principles adapted for the Google Apps Script environment, prioritizing modularity, resilience, and maintainability.

- **Modular Design:** Functional separation of concerns (Business Logic, UI, Auth, Utilities).
- **Resilience:** Centralized `ErrorHandler` to manage UI notifications and silent failure logging.
- **Imutability:** Configuration constants are frozen at runtime using `Object.freeze()` to prevent accidental state corruption.
- **Type Safety (Logic):** Rigorous validation of spreadsheet objects and input parameters.

## 🛠️ Technology Stack
- **Runtime:** Google Apps Script (V8 Engine)
- **Frontend:** HTML5, CSS3, JavaScript (via Google HTML Service)
- **Database:** Google Sheets (SpreadsheetApp API)
- **Communication:** GmailApp for notifications

## 📁 File Structure & Responsibilities

| File | Responsibility |
| :--- | :--- |
| `config.js` | Global constants, environment variables, and vendor settings. |
| `utils.js` | Shared utility functions and the centralized `ErrorHandler` class. |
| `menu.js` | Spreadsheet UI initialization and top-menu event handlers. |
| `distribuicao.js` | Core lead distribution algorithm (Balanced Distribution). |
| `vendedores.js` | CRUD operations for vendor management and assignment. |
| `auditoria.js` | Data validation, duplicate checking, and audit report generation. |
| `permissoes.js` | Security layer for managing access to specific sheets or actions. |
| `htmlTemplates.js` | UI/UX components for dialogs and sidebars. |

## ⚙️ Core Components

### 🛡️ ErrorHandler
A centralized utility that wraps complex operations. It ensures that any runtime error is captured and presented to the user via a friendly UI alert while preventing script execution from hanging.

### ⚖️ Balanced Distribution
The distribution logic calculates the current load per vendor and assigns new leads focusing on equity, avoiding bottlenecks and ensuring all leads are processed promptly.

## 🔧 Installation & Setup
1.  **Project Creation:** Create a New Project in [Google Apps Script](https://script.google.com/).
2.  **File Import:** Copy all `.js` files to the project (Rename `.js` to `.gs` in the Google Editor).
3.  **Config Hub:** Update `config.js` with your specific Spreadsheet IDs, Sheet Names, and Vendor Emails.
    - *Note: Configuration objects are frozen; updates must be made directly in the source.*
4.  **Triggers:** Run `onOpen` manually once to initialize the menu or reload the spreadsheet.

## 🛡️ Security & Performance
- **Zero-Trust Input:** All UI inputs are sanitized before being written to the spreadsheet.
- **Batch Operations:** Uses `getValues()` and `setValues()` to minimize API calls (Big-O optimization).
- **Menu Protection:** Permission checks are performed before opening administrative dialogs.

---
**Status:** `v3.1 - Refactored & Modularized`
**Senior Architect:** HenriqueMC17
