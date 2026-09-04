# SilverCare — Elderly Healthcare, Medication & Caregiver Coordination Platform

> **Version 1.0** · Production-Grade Backend & Mobile Architecture  
> **Backend Stack:** Node.js (Express.js) · PostgreSQL (Supabase) · Prisma ORM · Socket.io (WebSockets)  
> **Mobile Stack:** React Native (TypeScript)

---

## 1. Executive Summary

Most eldercare applications fail because they are simple CRUD to-do lists. Real-world eldercare is **event-driven, multi-actor, and safety-critical**. A missed dose, an abnormal blood pressure spike, a wandering event, or a sudden fall must trigger an **active escalation workflow**, not just a passive database row.

**SilverCare** is architected around that foundational principle: every module is an **adherence state machine, a dynamic rules engine, or a real-time event pipeline** with role-based visibility connecting elderly patients, family members, professional aides, and physicians.

---

## 2. System Architecture & Tech Stack

```
                               ┌───────────────────────────┐
                               │   React Native App        │
                               │  (Senior / Caregiver /    │
                               │   Professional / Doctor)  │
                               └─────────────┬─────────────┘
                                             │ HTTP REST + Socket.io (WebSocket)
                               ┌─────────────▼─────────────┐
                               │     Express.js Server     │
                               │   (Node.js + Helmet/CORS) │
                               └─────────────┬─────────────┘
                ┌────────────────────────────┼────────────────────────────┐
                ▼                            ▼                            ▼
     ┌──────────────────────┐   ┌──────────────────────────┐   ┌──────────────────────┐
     │  10 Domain Modules   │   │  Real-Time Socket.io     │   │  Multi-Channel       │
     │  (Auth, Vitals, Meds,│   │  Gateway (Per-circle     │   │  Notification Router │
     │  SOS, Geofence, etc.)│   │  rooms: circle_{id})     │   │  (Push, SMS, Voice)  │
     └──────────┬───────────┘   └────────────┬─────────────┘   └──────────┬───────────┘
                │                            │                            │
                └────────────────────────────┼────────────────────────────┘
                                             ▼
                               ┌───────────────────────────┐
                               │   PostgreSQL Database     │
                               │   (Hosted on Supabase)    │
                               │   Managed via Prisma ORM  │
                               └───────────────────────────┘
```

---

## 3. Backend Features Implemented (6.1 – 6.10)

### 6.1 Care Circle & Role-Based Access (Foundational)
- **Multi-Role Matrix:** Patients, Family Caregivers (Full/View), Professional Nurses, and Physicians.
- **Dignity-First Patient Co-Ownership:** Patients can view, co-manage, and revoke who has access to their health circle.
- **Time-Limited Invite Tokens:** Secure signed invitations dispatched via SMS or email.
- **Mount Path:** `/api/care-circles`, `/api/auth`

### 6.2 Medication Management (Adherence State Machine)
- **Recurrence Engine:** RRULE-based recurrence schedules (not naive daily loops).
- **Adherence State Machine:** `SCHEDULED → NOTIFIED → CONFIRMED_TAKEN / CONFIRMED_SKIPPED / MISSED → ESCALATED`.
- **Drug Interaction & Duplicate Therapy Checking:** Integration with public drug APIs (RxNorm / OpenFDA) to warn of contraindications.
- **Refill Predictor:** Background logic tracking days-of-supply remaining and proactive refill alerts.
- **Photo/Voice Verification:** Trust-backed verification for taken doses.
- **Mount Path:** `/api/medications`

### 6.3 Vitals & Health Monitoring (Anomaly Engine)
- **Multi-Metric Support:** Blood Pressure (systolic/diastolic), Blood Glucose, SpO2, Heart Rate, Temperature, and Weight.
- **Dynamic Per-Patient Thresholds:** Physician/caregiver-configurable target bands.
- **Clinical Anomaly Detection:** Detects **3 consecutive out-of-range readings** or **sudden deviation from rolling baselines** (e.g. >15% sudden drift) to trigger alerts rather than naive `value > X` checks.
- **Physician Trend Review:** Aggregated metrics, Time-in-Range (TIR) percentages, and daily averages.
- **Mount Path:** `/api/vitals`

### 6.4 Emergency Detection & Multi-Tier SOS Escalation
- **One-Tap Emergency SOS:** Instant alarm broadcast across the entire Care Circle.
- **Fall Detection Cancellation Countdown:** 30-second audio/haptic cancel window to prevent false-alarm fatigue.
- **Configurable Escalation Engine:** Tier 1 (Push) → Tier 2 (SMS via Twilio) → Tier 3 (Automated Voice Call), auto-escalating if unacknowledged within $N$ minutes.
- **Live Location Sharing:** Streams real-time GPS coordinates during active SOS events.
- **Mount Path:** `/api/emergency`

### 6.5 Geofencing & Location Safety (Wandering Protection)
- **Caregiver-Defined Safe Zones:** Configurable center coordinates with safe radius (e.g. 500m home or daily walk radius).
- **Haversine Breach Detection:** Great-circle distance calculations triggering instant alerts with one-click Google Maps navigation links.
- **Time-Boxed Emergency Tracking:** Privacy-respecting 30-minute location tracking sessions (opt-in and disclosed, not 24/7 intrusive surveillance).
- **Mount Path:** `/api/location-safety`

### 6.6 Care Plan & Task Coordination
- **Versioned Shared Care Plan:** Dietary restrictions, mobility guidelines, and DNR directives with immutable audit snapshot history (who changed what, when).
- **Caregiver Task Coordination:** Tasks with explicit due windows (e.g. 08:00 – 09:30), assignee tracking, and completion notes.
- **Professional Shift Logging:** Clock-in/out location audit with structured clinical handoffs (mood & mental state, meals & hydration, incidents, next-shift instructions).
- **Mount Path:** `/api/care-plans`

### 6.7 Appointments & Calendar Sync
- **Appointment Scheduler:** With clinic location, doctor name, and accompanying caregiver escort assignment.
- **Calendar Synchronization:** 1-Click Google Calendar web URL generator and RFC-5545 standard `.ics` export for Apple/Outlook Calendar.
- **Automated Dual Reminders:** 24-hour and 2-hour reminders sent to both patient and accompanying escort.
- **Post-Appointment Clinical Notes:** Attachable directly to the patient's care plan (automatically marking appointment completed).
- **Mount Path:** `/api/appointments`

### 6.8 Communication & Notification Hub
- **Unified Activity Feed:** Cross-module chronological timeline combining doses taken, vitals recorded, tasks completed, and shift handoffs into a single non-siloed feed.
- **Care Circle In-App Chat:** Dedicated chat for family and care team with photo and voice note attachments.
- **Multi-Channel Notification Router:** Dispatches alerts across Push, SMS, and Voice Call based on alert severity (`INFO`, `MEDIUM`, `HIGH`, `CRITICAL`) with configurable quiet hours.
- **Mount Path:** `/api/communication-hub`

### 6.9 Reporting & Insights
- **Physician-Ready Clinical Summary:** Comprehensive 30/60/90-day report aggregating medication adherence %, vitals averages, active care directives, and clinical incident logs.
- **Printable HTML / PDF View:** Ready for browser print-to-PDF (`?format=html`).
- **Caregiver Weekly Digest:** 7-day retrospective summary with adherence score, vitals stability index, and completed tasks.
- **Pre-Appointment Auto-Dispatch:** Pre-appointment clinical summary dispatch directly to the doctor's clinic.
- **Mount Path:** `/api/reports`

### 6.10 Accessibility & Remote Assisted Setup
- **Remote Configuration API:** Allows family caregivers to remotely configure the senior's phone settings (`fontScale`, `highContrastMode`, `voiceGuidanceTTS`, `simplifiedNavigation`).
- **Mount Path:** `/api/communication-hub/accessibility/:userId`

### Real-Time WebSocket Engine (Socket.io)
- **Room Isolation:** Clients join `circle_${patientId}` rooms upon connection.
- **Instant Latency (<50ms):** Immediate push for Emergency SOS alarms, chat messages, and live activity feed updates without polling.
- **Connection URL:** `http://localhost:5000` (or production host)

---

## 4. Screens & Pages to be Built by the React Native Mobile Team

The React Native team should implement **two UX modes** based on user role:
1. **Elderly/Senior Mode:** High contrast, extra-large touch targets, voice guidance (TTS), single-column navigation.
2. **Caregiver / Family / Doctor Mode:** Full clinical management dashboard, rich data charts, and real-time feeds.

---

### Group 1: Authentication & Onboarding
| # | Screen Name | Description & Key UI Elements | Connected Backend APIs |
|---|---|---|---|
| **1.1** | **Login & Registration** | Email/password, phone OTP, role selector (Senior Patient, Family Member, Professional Caregiver, Physician). | `POST /api/auth/signup`<br>`POST /api/auth/login` |
| **1.2** | **Care Circle Onboarding / Join** | Enter 6-character circle invite code or create a new circle for an elderly family member. | `POST /api/care-circles/invitations/accept`<br>`POST /api/care-circles` |
| **1.3** | **Remote Assisted Setup (6.10)** | Family member configures the senior's device remotely: font size slider (100%–160%), high-contrast toggle, voice TTS toggle, simplified tiles toggle. | `POST /api/communication-hub/accessibility/:userId` |

---

### Group 2: Senior / Elderly UX Mode (Simplified UI)
| # | Screen Name | Description & Key UI Elements | Connected Backend APIs |
|---|---|---|---|
| **2.1** | **Senior Main Dashboard** | Extra-large tiles: Today's Next Medication, Log Vitals, Daily Schedule, and a giant **Persistent Red SOS Button**. | `GET /api/medications/patients/:id/schedule`<br>`GET /api/care-plans/patients/:id/tasks` |
| **2.2** | **"I Took It" Confirmation Screen** | High-contrast modal: medication photo, large checkmark "Confirm Taken" button, optional camera photo capture or voice confirmation. | `PATCH /api/medications/doses/:id/take` |
| **2.3** | **SOS & Fall Countdown Modal** | Full-screen flashing alarm with a **30-second countdown bar** + loud beep. Big "I'm OK / False Alarm" cancel button vs. "Call for Help Now". | `POST /api/emergency/sos`<br>`PATCH /api/emergency/events/:id/cancel` |
| **2.4** | **Senior Vitals Entry Screen** | Simplified single-field numeric input with large keypad (BP Systolic/Diastolic, Blood Sugar) + Bluetooth BLE auto-sync button. | `POST /api/vitals` |

---

### Group 3: Caregiver & Family Dashboard
| # | Screen Name | Description & Key UI Elements | Connected Backend APIs |
|---|---|---|---|
| **3.1** | **Caregiver Home & Patient Selector** | Switch between multiple care recipients. Header shows real-time status: "Arthur is Safe · Next dose in 45m · BP Normal". | `GET /api/care-circles`<br>`GET /api/vitals/patients/:id/latest` |
| **3.2** | **Unified Real-Time Activity Feed** | Single chronological feed of all care events (pill taken, glucose logged, task completed, shift clock-out) synced via Socket.io. | `GET /api/communication-hub/patients/:id/timeline`<br>Socket: `new_activity_feed_item` |
| **3.3** | **In-App Care Circle Chat** | Real-time chat among family, aides, and doctors. Voice note recorder, photo check-ins, and system notification cards. | `GET /api/communication-hub/patients/:id/chat`<br>`POST /api/communication-hub/chat/messages`<br>Socket: `new_chat_message` |
| **3.4** | **Medication Schedule & Adherence** | List active prescriptions, calendar view of doses, adherence %, pill bottle remaining supply tracker, and RxNorm interaction warning alerts. | `GET /api/medications/patients/:id`<br>`POST /api/medications` |
| **3.5** | **Vitals & Anomaly Trends** | Interactive line charts (BP, Glucose, Weight) with green target zones, red anomaly badges, and physician review summaries. | `GET /api/vitals/patients/:id/history`<br>`GET /api/vitals/patients/:id/trends` |
| **3.6** | **Safe Zone Geofencing & Map** | Interactive map showing senior's current location, circular safe zones (home, park), and active breach alert banners. | `GET /api/location-safety/patients/:id/safe-zones`<br>`POST /api/location-safety/safe-zones` |
| **3.7** | **Emergency SOS Alert Screen** | Critical real-time modal popping up when SOS or fall is triggered. Displays live GPS pin, time elapsed, active escalation tier (Push/SMS/Call), and "Acknowledge & Respond" button. | `GET /api/emergency/patients/:id/active`<br>`PATCH /api/emergency/events/:id/acknowledge`<br>Socket: `emergency_sos_alert` |
| **3.8** | **Care Plan & Task Coordination** | Tab 1: Clinical directives (diet, mobility, DNR) with version audit history.<br>Tab 2: Caregiver tasks with time due windows and completion check-offs. | `GET /api/care-plans/patients/:id`<br>`POST /api/care-plans/tasks` |
| **3.9** | **Professional Shift Logging** | For visiting nurses/aides: One-tap Clock-In, Clock-Out with structured handover fields (mood, meals, incidents, next-shift notes). | `POST /api/care-plans/shifts/clock-in`<br>`PATCH /api/care-plans/shifts/:id/clock-out` |
| **3.10** | **Appointment & Escort Manager** | Calendar list, escort assignment selector, 1-click Google Calendar sync, and .ics export button. | `GET /api/appointments/patients/:id`<br>`POST /api/appointments` |
| **3.11** | **Clinical Reports & Weekly Digest** | View/download 30-day physician summary, 1-click email report to doctor's clinic, and weekly retrospective scorecards. | `GET /api/reports/patients/:id/physician-report`<br>`GET /api/reports/patients/:id/weekly-digest` |

---

## 5. Automated Integration Test Suites

All backend features are backed by integration test suites located in `backend/test/`:

| Test Suite | Command | What It Verifies |
|---|---|---|
| **Vitals & Anomalies** | `npm run test:vitals` | Dynamic thresholds, 3 consecutive breaches, rolling baseline deviation. |
| **Geofencing & Safety** | `npm run test:geofence` | Safe zone radius, Haversine breach detection, map links, 30m tracking. |
| **Emergency SOS Engine** | `npm run test:emergency` | One-tap SOS, 30s cancellation countdown, multi-tier escalation. |
| **Appointments & Sync** | `npm run test:appointments` | Scheduling, escort assignment, .ics file export, Google Calendar URLs. |
| **Care Plan & Coordination**| `npm run test:care-plan` | Versioning (v1→v2) with audit trail, tasks, shift handoff notes. |
| **Communication & Hub** | `npm run test:communication` | Unified timeline, circle chat, multi-channel routing, remote accessibility. |
| **Reporting & Insights** | `npm run test:reporting` | Physician summary aggregation, HTML report render, weekly digest. |

---

## 6. How to Run the Backend Locally

### 1. Prerequisites
- Node.js (v18+ recommended, v22 supported)
- PostgreSQL database (or Supabase URL)

### 2. Setup Environment Variables
Create `backend/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require"
JWT_SECRET="your_super_secret_jwt_key"
```

### 3. Install Dependencies & Migrate
```powershell
cd backend
npm install
npx prisma migrate dev
```

### 4. Run Development Server
```powershell
npm run dev
```
The server will start at `http://localhost:5000` with **both REST endpoints and Socket.io WebSockets active**.
