# ⚡ TalentPulse AI - Autonomous Hiring & n8n Orchestration

A modern, high-tech recruitment automation web application built with **React 18 + Node.js Express + Supabase PostgreSQL + n8n Webhook Engine**.

---

## 🌟 Architecture & Workflow Flow

```
[ Candidate Applies ] ➔ [ 2-Sec AI Deep Scan ] ➔ [ 92% Match Score ] ➔ [ n8n Webhook Dispatched ]
                                                                                │
[ Recruiter 1-Click Hire ] 🠄 [ Real-Time Transcription ] 🠄 [ Autonomous AI Interviewer ] 🠄 [ Google Cal Slot ]
         │
[ n8n Auto-Offer Letter Sent ]
```

### 📱 4 Dedicated Pipeline Screens (Matching Visual Mockups):

1. **Screen 1: Apply (`ApplyScreen.jsx`)**
   - Company & Job Dossier: *TechCorp Labs - Senior React & n8n Specialist* ($85k - $110k)
   - Architecture Nodes: React 18, n8n Engine, Next.js 14, Supabase, Docker, GraphQL/REST
   - Candidate Dossier: `Mufthi_Resume_React_n8n.pdf` (2.4 MB • OCR Vectorized)
   - GitHub Telemetry: `github.com/mufthi-dev` (42 repos indexed, Sync OK)
   - Action: **Run Instant 2-Sec AI Screening** (1.8s scan latency, 100% autonomous)

2. **Screen 2: Match Score (`MatchScoreScreen.jsx`)**
   - Verification status: `AI Deep-Scan Completed in 1.9s` • `sha256:7f3b8a`
   - Animated Radial Ring: **92% Fit Score** (*Exceptional Fit - Top 1% of 1,000 Verified Applicants*)
   - 4-Node Skill Verification:
     - `n8n Orchestration` (95%)
     - `React Architecture` (98%)
     - `Supabase / PostgreSQL` (88%)
     - `Docker & Cloud DevOps` (88%)
   - n8n Execution Engine: Live trigger notification & Direct Google Calendar Slot Booking (*Today 4:00 PM* / *Tomorrow 11:00 AM*)

3. **Screen 3: Live Agent (`LiveAgentScreen.jsx`)**
   - Status: *AI Interview Live - Q 2 of 5* (Live timer)
   - Virtual Avatar / Stream: *TalentPulse v4.2 ONLINE • 1080p 60fps*
   - Futuristic Animated Audio Waveform (`AI Synthesizing Assessment`)
   - Candidate Webcam Inset PiP Preview with toggle
   - Technical Query: *"How do you handle error retries and idempotent data delivery in high-load n8n PostgreSQL Webhooks?"*
   - Real-Time Transcription Stream (98ms latency) with speech confidence score (97.8%)
   - Interactive Mic, Video & "Submit & Next" evaluation controls

4. **Screen 4: HR Hub (`HRHubScreen.jsx`)**
   - Greeting: *"Morning, Sarah! 5 High-Match Candidates Ready for autonomous dispatch."*
   - Telemetry: *n8n Node #410 Active*
   - Screening Funnel: Applied 1,000 ➔ Screened 100% ➔ Shortlist 12 ➔ Interview 5 Done (**14 Days Saved**)
   - Ranked #1 Dossier: **Mufthi** (92% Match)
   - Autonomous Assessment Matrix: Technical (9.4/10), Problem Solving (9.2/10), Communication (8.8/10)
   - Playable AI Highlight Audio Segment: *n8n PostgreSQL Webhook explanation (00:34 / 01:24)*
   - One-Click Primary Action: **Hire & Auto-Send Offer Letter via n8n** (Triggers n8n offer automation, confetti celebration, updates status to HIRED)

---

## 🗄️ Supabase Live Auto-Save & Database Schema

Every single candidate application, scan score, calendar slot, interview transcript, and hiring event is **automatically synced to Supabase** via `src/supabaseClient.js`.

### Run this SQL in your Supabase SQL Editor:
```sql
-- 1. Create Candidates Table
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'Senior React & n8n Specialist',
  level TEXT DEFAULT 'L6 Engineer',
  github_username TEXT,
  github_repos_indexed INT DEFAULT 42,
  resume_filename TEXT,
  match_score INT DEFAULT 0,
  fit_level TEXT DEFAULT 'PENDING',
  status TEXT DEFAULT 'Screened',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Candidate Skills Table
CREATE TABLE IF NOT EXISTS public.candidate_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  n8n_score INT DEFAULT 95,
  react_score INT DEFAULT 98,
  supabase_score INT DEFAULT 88,
  docker_score INT DEFAULT 88,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Autonomous Interview Logs Table
CREATE TABLE IF NOT EXISTS public.interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  question_number INT DEFAULT 2,
  question_text TEXT NOT NULL,
  candidate_response TEXT,
  speech_confidence NUMERIC(4,1) DEFAULT 97.8,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create n8n Automation Audit Trail
CREATE TABLE IF NOT EXISTS public.n8n_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  payload JSONB,
  status TEXT DEFAULT 'SUCCESS',
  triggered_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🚀 Running the App Locally

### 1. Frontend (React 18 + Vite)
```bash
npm run dev
# Running on http://localhost:5175
```

### 2. Backend (Node.js Express + n8n Webhook Relay)
```bash
npm run server
# Running on http://localhost:3001
```

---

## 📊 Traditional Hiring vs TalentPulse AI

| Stage | Traditional / LinkedIn | TalentPulse AI |
| :--- | :--- | :--- |
| **Resume Screening** | HR manual-a 2-3 weeks paakkanum | AI Agent 2 seconds-la scan & verify pannum |
| **Interview Scheduling** | Phone calls & manual emails | n8n Webhook automatic-a Google Calendar sync |
| **First Round Interview**| Human HR 1 hour interview eduppanga | Autonomous AI Voice Agent live assessment edukkum |
| **Final Result** | Very slow process (1 Month) | **Instant & Autonomous (1-2 Days)** |
