/**
 * SA Deal Analyser — Firebase Configuration
 * ─────────────────────────────────────────
 * HOW TO SET UP (one-time, takes ~10 minutes):
 *
 * 1. Go to https://console.firebase.google.com
 * 2. Click "Add project" → name it "SA Deal Analyser"
 * 3. Disable Google Analytics (not needed) → Create project
 * 4. Click "Web" icon (</>)  → Register app → name it "SA Web App"
 * 5. Copy the firebaseConfig object below and paste your values
 * 6. In Firebase Console → Authentication → Get Started → Email/Password → Enable
 * 7. In Firebase Console → Firestore Database → Create database → Start in production mode
 *    → Choose region: europe-west2 (London) → Enable
 * 8. In Firestore → Rules tab → paste:
 *
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        match /users/{userId} {
 *          allow read, write: if request.auth != null && request.auth.uid == userId;
 *        }
 *        match /users/{userId}/deals/{dealId} {
 *          allow read, write: if request.auth != null && request.auth.uid == userId;
 *        }
 *        match /pendingUsers/{email} {
 *          allow create: if true;
 *          allow read, write: if request.auth != null &&
 *            get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
 *        }
 *      }
 *    }
 *
 * 9. YOUR ADMIN EMAIL: Set your own email below in ADMIN_EMAIL.
 *    When you first register with that email, you'll be auto-granted admin rights.
 */

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyATufm2z-ybNmmQqqnRdy1A6LG_gNeTYfI",
  authDomain:        "operateiq-570ee.firebaseapp.com",
  projectId:         "operateiq-570ee",
  storageBucket:     "operateiq-570ee.firebasestorage.app",
  messagingSenderId: "65971367171",
  appId:             "1:65971367171:web:ce4fdac1964245a77a0d36"
};

// ── YOUR ADMIN EMAIL ──────────────────────────────────────────────────────────
// This email gets automatic admin access when it first registers.
// Change this to YOUR email address.
const ADMIN_EMAIL = "info@servicedaccommodationsuccess.com";

// ── APP BRANDING ──────────────────────────────────────────────────────────────
const APP_CONFIG = {
  name:    "SA Deal Analyser",
  tagline: "Serviced Accommodation Success",
  version: "2.0.0"
};
