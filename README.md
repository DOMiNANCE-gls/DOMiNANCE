# DOMiNANCE

DOMiNANCE is a blue-and-gold medical education web app for HB1–HB3 students.

## Start locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Firebase

Copy `.env.example` to `.env.local`, add the Firebase web application values, then enable Authentication, Firestore, and Storage in Firebase. Gemini and Google Cloud Text-to-Speech must be called through a secure server or Firebase Cloud Function; never put those credentials in browser code.

## Current foundation

- Blue-and-gold DOMiNANCE interface, with dark mode and mobile layout
- HB1 and HB2 course structure; HB3 marked as coming soon
- Student onboarding, course navigation, PDF-and-AI study desk, quiz, flashcards, and Super Admin shell
- Firebase configuration entry point in `src/firebase.js`

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
