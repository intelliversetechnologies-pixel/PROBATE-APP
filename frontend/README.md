# FRISOPS ProbAdmin Module

## Overview
This is the UI/UX implementation for the **Probadmin Module**, designed to digitize the probate administration process.

## Tech Stack
- **Framework**: React (Vite)
- **Styling**: Vanilla CSS (CSS Modules / Global Styles) with a Premium Design System
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Project Structure
- `src/components`: Reusable UI components and Layouts.
- `src/pages`:
  - `client`: Client-facing dashboards and forms.
  - `officer`: Administrative tools and Kanban boards.
  - `legal`: Interface for Lawyers and Court Agents.
- `src/context`: Authentication and State Management.
- `src/index.css`: Global Design System (Variables, Typography, Utilities).

## How to Run
1.  Navigate to the directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open the link shown (usually `http://localhost:5173`).

## User Roles (Demo)
Select a role on the landing page to view the respective dashboard:
- **Client**: View status, initiate requests.
- **Officer**: Manage tasks, verify documents.
- **Legal**: Review and approve legal documents.
