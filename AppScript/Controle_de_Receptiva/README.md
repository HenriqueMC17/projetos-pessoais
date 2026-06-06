# Receptive Control System - CCBEU

## 🚀 Overview
The **Receptive Control System** is a technical solution designed to manage and organize receptive customer interactions. It automates the creation of organized data structures, applies complex formatting based on business rules, and integrates holiday management to ensure accurate service scheduling and reporting.

## 🏛️ Architecture & Governance
This system implements a modular architecture optimized for the Google Apps Script environment, ensuring stability and ease of expansion.

- **Resiliência:** Implementing a centralized `ErrorHandler` for consistent user feedback and error logging.
- **Imutabilidade de Configuração:** Use of `Object.freeze()` to lock down environmental constants.
- **Camada de Validação:** Dedicated logic for data integrity checks before any spreadsheet write operation.

## 🛠️ Technology Stack
- **Runtime:** Google Apps Script (V8 Engine)
- **Frontend:** HTML Service / Sidebar integration
- **Data Layer:** Google Sheets API
- **Utilities:** Custom business logic for calendar and formatting

## 📁 File Structure & Responsibilities

| File | Responsibility |
| :--- | :--- |
| `config.js` | Central repository for frozen system constants and sheet mappings. |
| `utils.js` | Generic utility functions and the standard `ErrorHandler` module. |
| `menu.js` | Integration with Google Sheets UI (Menu creation, Button triggers). |
| `tabelas.js` | Complex logic for dynamic table generation and data orchestration. |
| `formatacao.js` | Automated styling, cell coloring, and conditional formatting rules. |
| `validacao.js` | Data entry verification and business logic enforcement. |
| `feriados.js` | Calendar management logic to handle business vs. non-business days. |

## ⚙️ Core Components

### 📅 Holiday Management (`feriados.js`)
A specialized module that calculates business dates by accounting for national and local holidays, ensuring that receptive response times and deadlines are technically accurate.

### 🎨 Intelligent Formatting (`formatacao.js`)
Reduces manual spreadsheet maintenance by automatically applying the corporate visual identity to new data rows and tables, maintaining a premium look and feel.

## 🔧 Installation & Setup
1.  **Environment:** Create a script project attached to your target Google Spreadsheet.
2.  **Deployment:** Upload all `.js` files (renaming them to `.gs`).
3.  **Initialization:** In `config.js`, define your range names and sheet IDs.
    - *Frozen Constants:* Ensure all environment-specific adjustments are made before the script runs.
4.  **Activation:** Execute the `onOpen()` function to display the control panel.

## 🛡️ Security & Performance
- **Error Capture:** The `ErrorHandler` intercepts modal dialog failures to prevent script crashes.
- **IO Optimization:** Minimizes row-by-row writing by using range buffering techniques.
- **Logic Isolation:** Business rules are separated from UI logic, facilitating unit testing of core functions.

---
**Status:** `Refactored & Standardized`
**Senior Architect:** HenriqueMC17
