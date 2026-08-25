# 🇬🇧 GBP Store - Complete E-commerce Dashboard

A full-featured e-commerce dashboard clone of Katrina.bz built with Firebase authentication.

## Features
- ✅ User authentication (Email/Password + Google)
- ✅ Real-time balance updates
- ✅ Responsive dashboard
- ✅ Guest/demo mode
- ✅ Order statistics
- ✅ Mobile-friendly sidebar

## Firebase Setup (Free)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project → "GBP Store"
3. Register a web app → Copy the config object
4. Enable Authentication:
   - Go to "Authentication" → "Sign-in methods"
   - Enable "Email/Password" and "Google"
5. Create Firestore Database:
   - Go to "Firestore Database" → "Create database"
   - Start in "test mode" (for development)
6. Replace the config in `firebase-config.js` with your own

## Deploy to Vercel (Free)

1. Push this code to GitHub
2. Go to [Vercel.com](https://vercel.com) → Sign up with GitHub
3. Click "Add New" → "Project"
4. Select your repository → Deploy
5. Your site is live!

## Local Testing

Open the files in your browser or use Live Server in VS Code:
```bash
# Install Live Server extension then:
right-click index.html → Open with Live Server
