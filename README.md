# SilverCare-Elderly-Healthcare-Medication-and-Caregiver-Assistance-App

Elderly Healthcare, Medication and Caregiver Assistance Application.

## Project Structure

- `backend/` - Node.js + Express.js + PostgreSQL backend
- `mobile/` - React Native mobile application


SilverCare-Elderly-Healthcare-Medication-and-Caregiver-Assistance-App/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── care-circles/
│   │   │   ├── memberships/
│   │   │   ├── invitations/
│   │   │   ├── permissions/
│   │   │   ├── consent/
│   │   │   ├── medications/
│   │   │   ├── medication-reminders/
│   │   │   ├── vitals/
│   │   │   ├── care-tasks/
│   │   │   ├── appointments/
│   │   │   ├── emergency/
│   │   │   ├── notifications/
│   │   │   └── audit/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── prisma/
│   └── tests/
│
├── mobile/
│   └── src/
│       ├── components/
│       ├── screens/
│       ├── navigation/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       ├── constants/
│       └── assets/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   └── features/
│
├── .gitignore
└── README.md
