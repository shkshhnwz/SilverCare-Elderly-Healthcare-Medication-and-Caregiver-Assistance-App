const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const CareCircleRoutes = require('./src/modules/care-circle/careCircle.routes');
const AuthRoutes = require('./src/modules/auth/auth.routes');
const MedicationManagementRoutes = require('./src/modules/medication-management/medicationManagement.routes');
const VitalsRoutes = require('./src/modules/vitals-tracking/vitals.routes');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SilverCare backend running' });
});

app.use('/api/auth', AuthRoutes);
app.use('/api/care-circles', CareCircleRoutes);
app.use('/api/medications', MedicationManagementRoutes);
app.use('/api/vitals', VitalsRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  res.status(statusCode).json({
    message: err.message || 'Request failed',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});