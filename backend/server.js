const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const CareCircleRoutes = require('./src/modules/care-circle/careCircle.routes');
const AuthRoutes = require('./src/modules/auth/auth.routes');
const MedicationManagementRoutes = require('./src/modules/medication-management/medicationManagement.routes');
const VitalsRoutes = require('./src/modules/vitals-tracking/vitals.routes');
const LocationSafetyRoutes = require('./src/modules/geofencing-location-safety/geolocasafe.routes');
const EmergencyRoutes = require('./src/modules/emergency-detection-and-SOS/emergency-detection.routes');
const AppointmentRoutes = require('./src/modules/appointments/appointments.routes');
const CarePlanRoutes = require('./src/modules/care-plan-task-coordination/carePlanCoordination.routes');
const CommunicationHubRoutes = require('./src/modules/communication-and-notification-hub/communicateAndNotification.routes');
const ReportingRoutes = require('./src/modules/reporting-and-insights/reportingAndInsights.routes');


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
})
app.set('io', io);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Real-Time Socket Connection & Room Management
io.on('connection', (socket) => {
  console.log(`⚡ Client connected via WebSocket: ${socket.id}`);

  // When a caregiver or patient opens the app, they join their Care Circle room
  socket.on('join_care_circle', (patientId) => {
    socket.join(`circle_${patientId}`);
    console.log(`Socket ${socket.id} joined Care Circle: circle_${patientId}`);
  });

  socket.on('leave_care_circle', (patientId) => {
    socket.leave(`circle_${patientId}`);
    console.log(`Socket ${socket.id} left Care Circle: circle_${patientId}`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SilverCare backend running' });
});

app.use('/api/auth', AuthRoutes);
app.use('/api/care-circles', CareCircleRoutes);
app.use('/api/medications', MedicationManagementRoutes);
app.use('/api/vitals', VitalsRoutes);
app.use('/api/location-safety', LocationSafetyRoutes);
app.use('/api/emergency', EmergencyRoutes);
app.use('/api/appointments', AppointmentRoutes);
app.use('/api/care-plans', CarePlanRoutes);
app.use('/api/communication-hub', CommunicationHubRoutes);
app.use('/api/communication', CommunicationHubRoutes);
app.use('/communication', CommunicationHubRoutes);
app.use('/api/activity', CommunicationHubRoutes);
app.use('/api/reports', ReportingRoutes);


app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'SilverCare backend is running'
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message || 'Request failed',
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});