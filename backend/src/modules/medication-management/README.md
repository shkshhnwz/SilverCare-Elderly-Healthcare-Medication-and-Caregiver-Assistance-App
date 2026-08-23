# Medication Management Testing Flow (Postman)

This guide helps a to test the full SilverCare API flow for:
- health
- signup/login
- care circle
- medication adherence engine
- analytics

## 1) Prerequisites

1. Backend dependencies installed:

```powershell
cd backend
npm install
```

2. Environment configured in `backend/.env`:
- `DATABASE_URL`
- `JWT_SECRET`

3. Start server from backend folder (important):

```powershell
cd backend
npm run dev
```

Alternative from anywhere:

```powershell
npm --prefix "d:/SilverCare/SilverCare-Elderly-Healthcare-Medication-and-Caregiver-Assistance-App/backend" run dev
```

Expected log:
- `Server running on 5000`

## 2) Create Postman Environment

Create an environment named `SilverCare Local` with these variables:
- `baseUrl` = `http://localhost:5000`
- `token` = (empty)
- `patientId` = (empty)
- `circleId` = (empty)
- `medicationId` = (empty)
- `doseId` = (empty)
- `nextDoseId` = (empty)

## 3) Create Collection

Create collection: `SilverCare API Smoke Test`

Collection auth:
1. Authorization -> `Bearer Token`
2. Token -> `{{token}}`

## 4) Request Order (Run top to bottom)

### A. Health

**GET** `{{baseUrl}}/api/health`

Expected:
- `200`
- `{ "status": "ok", "message": "SilverCare backend running" }`

---

### B. Signup (preferred first auth call)

**POST** `{{baseUrl}}/api/auth/signup`

Body (raw JSON):

```json
{
  "firstName": "Smoke",
  "lastName": "Tester",
  "email": "smoke.tester+1@example.com"
}
```

Tests tab script:

```javascript
pm.test("Signup success", function () {
  pm.response.to.have.status(201);
});

const data = pm.response.json();
pm.environment.set("token", data.token);
pm.environment.set("patientId", data.user.id);
```

If email already exists, use Login request below.

---

### C. Login (fallback)

**POST** `{{baseUrl}}/api/auth/login`

Body:

```json
{
  "email": "smoke.tester+1@example.com"
}
```

Tests tab:

```javascript
pm.test("Login success", function () {
  pm.response.to.have.status(200);
});

const data = pm.response.json();
pm.environment.set("token", data.token);
pm.environment.set("patientId", data.user.id);
```

---

### D. Create Care Circle

**POST** `{{baseUrl}}/api/care-circles`

Headers:
- `Content-Type: application/json`
- `Authorization: Bearer {{token}}`

Body:

```json
{
  "name": "Family Circle",
  "patientId": "{{patientId}}",
  "patientCoOwn": true
}
```

Tests tab:

```javascript
pm.test("Care circle created", function () {
  pm.response.to.have.status(201);
});

const data = pm.response.json();
pm.environment.set("circleId", data.id);
```

---

### E. Get Care Circle

**GET** `{{baseUrl}}/api/care-circles/{{circleId}}`

Expected `200`.

---

### F. List Care Circle Members

**GET** `{{baseUrl}}/api/care-circles/{{circleId}}/members`

Expected `200`.

---

### G. Create Medication

**POST** `{{baseUrl}}/api/medications`

Body:

```json
{
  "patientId": "{{patientId}}",
  "medicationName": "Aspirin",
  "dosage": "75mg",
  "route": "oral",
  "frequencyRRule": "FREQ=DAILY;INTERVAL=1",
  "prescribingDoctor": "Dr. Shah",
  "refillQuantity": 30
}
```

Tests tab:

```javascript
pm.test("Medication created", function () {
  pm.response.to.have.status(201);
});

const data = pm.response.json();
pm.environment.set("medicationId", data.medication.id);
pm.environment.set("doseId", data.initialDose.id);
```

---

### H. List Medications

**GET** `{{baseUrl}}/api/medications/patients/{{patientId}}`

Expected `200`.

---

### I. Schedule Next Dose

**POST** `{{baseUrl}}/api/medications/{{medicationId}}/doses/schedule-next`

Tests tab:

```javascript
pm.test("Next dose scheduled", function () {
  pm.response.to.have.status(201);
});

const data = pm.response.json();
pm.environment.set("nextDoseId", data.id);
```

---

### J. Acknowledge Current Dose -> notified

**POST** `{{baseUrl}}/api/medications/{{medicationId}}/doses/{{doseId}}/acknowledge`

Body:

```json
{
  "action": "notified"
}
```

Expected state in response: `notified`.

---

### K. Acknowledge Current Dose -> taken (photo/voice style evidence)

**POST** `{{baseUrl}}/api/medications/{{medicationId}}/doses/{{doseId}}/acknowledge`

Body:

```json
{
  "action": "taken",
  "confirmationType": "photo",
  "evidenceUrl": "https://example.com/proof.jpg",
  "note": "Taken after breakfast"
}
```

Expected state: `confirmed_taken`.

---

### L. Escalation Cadence (run 3 times on nextDoseId)

**POST** `{{baseUrl}}/api/medications/{{medicationId}}/doses/{{nextDoseId}}/escalate`

Run #1 expected:
- state -> `notified`
- channel -> `push`

Run #2 expected:
- state -> `missed`
- channel -> `sms`

Run #3 expected:
- state -> `escalated`
- channel -> `caregiver_call`

---

### M. Refill Prediction

**GET** `{{baseUrl}}/api/medications/{{medicationId}}/refill-prediction`

Expected `200` with:
- `daysRemaining`
- `predictedRunOutDate`
- `proactiveAlertDate`

---

### N. Adherence Analytics

**GET** `{{baseUrl}}/api/medications/patients/{{patientId}}/adherence-analytics`

Expected `200` with:
- `summary.adherencePercent`
- `summary.missed`
- `missedDosePatternsByHour`

## 5) Quick Negative Tests

1. Remove `Authorization` header and call:
- `GET {{baseUrl}}/api/medications/patients/{{patientId}}`
- Expected `401`

2. Send create care circle with empty body:
- `POST {{baseUrl}}/api/care-circles`
- Expected clean validation error message, not server crash.

## 6) Known Dev Behavior

Current medication management service uses in-memory data structures in development.

Implication:
- Restarting the server clears created medications/doses in memory.
- Signup/login/care-circle data in database remains (if persisted by Prisma).

## 7) Common Mistakes

1. Running `npm run dev` from project root (`D:/SilverCare`) instead of `backend`.
2. Missing `Content-Type: application/json` header for POST requests.
3. Using wrong path (must include `/api/...`).
4. Forgetting Bearer token for protected routes.

---

If this flow passes end-to-end, your feature wiring is healthy for demo/testing.
