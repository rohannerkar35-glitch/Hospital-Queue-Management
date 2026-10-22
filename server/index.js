const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', system: 'Smart Hospital OPD Backend', uptime: process.uptime() });
});

app.get('/api/departments', (req, res) => {
  res.json([
    { id: 'gen-med', name: 'General Medicine', code: 'GEN', avgWaitMins: 12 },
    { id: 'ortho', name: 'Orthopedics', code: 'ORTH', avgWaitMins: 8 },
    { id: 'cardio', name: 'Cardiology', code: 'CARD', avgWaitMins: 15 },
    { id: 'neuro', name: 'Neurology', code: 'NEUR', avgWaitMins: 18 },
    { id: 'pedia', name: 'Pediatrics', code: 'PED', avgWaitMins: 5 },
    { id: 'gynec', name: 'Gynecology', code: 'GYN', avgWaitMins: 14 },
    { id: 'derma', name: 'Dermatology', code: 'DERM', avgWaitMins: 10 }
  ]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`OPD Server running on port ${PORT}`));
