import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory runtime database for fast reactive access
let candidatesDb = [
  {
    id: 'c1',
    name: 'Mufthi',
    email: 'mufthi.dev@gmail.com',
    role: 'Senior React & n8n Specialist',
    level: 'L6 Engineer',
    github: 'github.com/mufthi-dev',
    reposIndexed: 42,
    resume: 'Mufthi_Resume_React_n8n.pdf',
    resumeSize: '2.4 MB • OCR Vectorized',
    matchScore: 92,
    fitLevel: 'EXCEPTIONAL FIT',
    rank: 1,
    location: 'San Francisco, CA • Available Immediately',
    skills: {
      n8n: 95,
      react: 98,
      supabase: 88,
      docker: 88
    },
    ratings: {
      technical: 9.4,
      problemSolving: 9.2,
      communication: 8.8
    },
    interviewInsights: 'Demonstrated deep mastery of n8n webhook pipelines and React memoization. Zero human screening time required.',
    status: 'Ready for Dispatch',
    calendarSlot: 'Today 4:00 PM',
    createdAt: new Date().toISOString()
  },
  {
    id: 'c2',
    name: 'Priya S.',
    email: 'priya.backend@gmail.com',
    role: 'Lead Backend & Node Engineer',
    level: 'L5 Engineer',
    github: 'github.com/priya-cloud',
    reposIndexed: 35,
    resume: 'Priya_Backend_CV.pdf',
    resumeSize: '1.8 MB',
    matchScore: 88,
    fitLevel: 'STRONG FIT',
    rank: 2,
    location: 'Remote • 2 Weeks Notice',
    skills: {
      n8n: 86,
      react: 80,
      supabase: 94,
      docker: 90
    },
    ratings: {
      technical: 8.9,
      problemSolving: 8.8,
      communication: 8.7
    },
    interviewInsights: 'Exceptional knowledge of PostgreSQL schemas and distributed queue patterns.',
    status: 'Screened',
    calendarSlot: null,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'c3',
    name: 'David K.',
    email: 'david.ux@frontend.io',
    role: 'Fullstack UI/UX Engineer',
    level: 'L5 Engineer',
    github: 'github.com/david-creative',
    reposIndexed: 28,
    resume: 'David_Fullstack_Dev.pdf',
    resumeSize: '3.1 MB',
    matchScore: 84,
    fitLevel: 'GOOD FIT',
    rank: 3,
    location: 'New York • Immediate',
    skills: {
      n8n: 78,
      react: 95,
      supabase: 82,
      docker: 80
    },
    ratings: {
      technical: 8.5,
      problemSolving: 8.4,
      communication: 9.0
    },
    interviewInsights: 'Specialist in Tailwind CSS and micro-interactions.',
    status: 'Screened',
    calendarSlot: null,
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

let n8nAuditLogs = [
  {
    id: 'n8n-evt-1',
    node: '#410 Active',
    type: 'WEBHOOK_DISPATCH',
    target: 'mufthi.dev@gmail.com',
    status: 'DELIVERED',
    timestamp: new Date().toISOString(),
    payload: { action: 'interview_invitation', score: '92%' }
  }
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'TalentPulse AI Backend & n8n Relay Engine',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

// Get all candidates
app.get('/api/candidates', (req, res) => {
  res.json({
    success: true,
    total: candidatesDb.length,
    candidates: candidatesDb
  });
});

// Trigger 2-Sec Instant AI Screening
app.post('/api/screen', (req, res) => {
  const { name, email, github, resumeFilename } = req.body;
  
  // High-performance AI candidate scoring simulation
  const candidate = {
    id: 'c_' + Date.now(),
    name: name || 'Mufthi',
    email: email || 'mufthi.dev@gmail.com',
    role: 'Senior React & n8n Specialist',
    level: 'L6 Engineer',
    github: github || 'github.com/mufthi-dev',
    reposIndexed: 42,
    resume: resumeFilename || 'Mufthi_Resume_React_n8n.pdf',
    resumeSize: '2.4 MB • OCR Vectorized',
    matchScore: 92,
    fitLevel: 'EXCEPTIONAL FIT',
    rank: 1,
    location: 'San Francisco, CA • Available Immediately',
    skills: {
      n8n: 95,
      react: 98,
      supabase: 88,
      docker: 88
    },
    ratings: {
      technical: 9.4,
      problemSolving: 9.2,
      communication: 8.8
    },
    interviewInsights: 'Demonstrated deep mastery of n8n webhook pipelines and React memoization. Zero human screening time required.',
    status: 'Screened',
    calendarSlot: null,
    createdAt: new Date().toISOString()
  };

  // Prepend to database
  candidatesDb.unshift(candidate);

  // Trigger simulated n8n webhook
  n8nAuditLogs.unshift({
    id: 'n8n-' + Date.now(),
    node: '#410 Active',
    type: 'AI_SCREENING_COMPLETED',
    target: candidate.email,
    status: 'TRIGGERED',
    timestamp: new Date().toISOString(),
    payload: { score: candidate.matchScore, fit: candidate.fitLevel }
  });

  res.json({
    success: true,
    scanLatency: '1.8s',
    shaChecksum: 'sha256:7f3b8a',
    candidate,
    n8nWebhookTriggered: true
  });
});

// n8n Webhook Endpoint for Calendar Booking
app.post('/api/n8n/calendar-slot', (req, res) => {
  const { email, slot } = req.body;
  const candidate = candidatesDb.find(c => c.email === email);
  if (candidate) {
    candidate.calendarSlot = slot;
    candidate.status = 'Slot Confirmed';
  }

  n8nAuditLogs.unshift({
    id: 'n8n-cal-' + Date.now(),
    node: '#418 Active',
    type: 'GOOGLE_CALENDAR_SYNC',
    target: email,
    status: 'SYNCED',
    timestamp: new Date().toISOString(),
    payload: { slot, calendarEventId: 'gcal_' + Math.floor(Math.random() * 89999 + 10000) }
  });

  res.json({
    success: true,
    message: `Interview slot confirmed for ${slot}. Google Calendar invite sent!`,
    slot
  });
});

// Single-Click Hire & Auto-Send Offer Letter via n8n
app.post('/api/hire', (req, res) => {
  const { candidateId, email, name } = req.body;
  const candidate = candidatesDb.find(c => c.id === candidateId || c.email === email);
  
  if (candidate) {
    candidate.status = 'HIRED';
  }

  const n8nLog = {
    id: 'n8n-offer-' + Date.now(),
    node: '#425 Dispatch',
    type: 'OFFER_LETTER_AUTOMATION',
    target: email || candidate?.email || 'mufthi.dev@gmail.com',
    status: 'EXECUTED_SUCCESSFULLY',
    timestamp: new Date().toISOString(),
    payload: {
      recipient: name || candidate?.name || 'Mufthi',
      position: 'Senior React & n8n Specialist',
      compensation: '$105,000 USD / year + Equity',
      channels: ['Gmail API', 'Telegram Bot', 'DocuSign Webhook']
    }
  };

  n8nAuditLogs.unshift(n8nLog);

  res.json({
    success: true,
    message: `Offer letter automatically generated & dispatched via n8n to ${candidate?.email || email}!`,
    n8nLog,
    candidate
  });
});

// Get n8n telemetry logs
app.get('/api/n8n/telemetry', (req, res) => {
  res.json({
    success: true,
    activeNodes: 4,
    uptime: '99.98%',
    logs: n8nAuditLogs
  });
});

app.listen(PORT, () => {
  console.log(`[TalentPulse AI] Node.js Express server running on http://localhost:${PORT}`);
});
