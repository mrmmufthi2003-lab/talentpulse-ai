import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and Anon Key from env or localStorage
const getStoredCredentials = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const localUrl = localStorage.getItem('tp_supabase_url') || '';
  const localKey = localStorage.getItem('tp_supabase_key') || '';

  return {
    supabaseUrl: localUrl || envUrl || 'https://xyzcompany.supabase.co',
    supabaseKey: localKey || envKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    isConfigured: !!(localUrl || envUrl) && !!(localKey || envKey)
  };
};

let { supabaseUrl, supabaseKey, isConfigured } = getStoredCredentials();

export let supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Update client dynamically when user saves settings in UI
export const updateSupabaseCredentials = (newUrl, newKey) => {
  if (newUrl && newKey) {
    localStorage.setItem('tp_supabase_url', newUrl);
    localStorage.setItem('tp_supabase_key', newKey);
    supabase = createClient(newUrl, newKey);
    return true;
  }
  return false;
};

export const getSupabaseStatus = () => {
  const creds = getStoredCredentials();
  return {
    isConfigured: creds.isConfigured,
    url: creds.supabaseUrl,
    keyMasked: creds.supabaseKey ? creds.supabaseKey.slice(0, 10) + '...' : 'Not Set'
  };
};

/**
 * SQL Schema for user to run in Supabase SQL Editor
 */
export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- TALENTPULSE AI - SUPABASE DATABASE SCHEMA
-- ==========================================

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
  resume_size TEXT,
  match_score INT DEFAULT 0,
  fit_level TEXT DEFAULT 'PENDING',
  rank INT DEFAULT 1,
  location TEXT DEFAULT 'Remote (Global)',
  salary_range TEXT DEFAULT '$85k - $110k',
  status TEXT DEFAULT 'Screened', -- Screened, Interviewed, Hired, Rejected
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Skill Breakdown Table
CREATE TABLE IF NOT EXISTS public.candidate_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  n8n_score INT DEFAULT 95,
  react_score INT DEFAULT 98,
  supabase_score INT DEFAULT 88,
  docker_score INT DEFAULT 88,
  technical_rating NUMERIC(3,1) DEFAULT 9.4,
  problem_solving NUMERIC(3,1) DEFAULT 9.2,
  communication NUMERIC(3,1) DEFAULT 8.8,
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
  ai_evaluation_insight TEXT,
  slot_selected TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create n8n Automation Audit Trail
CREATE TABLE IF NOT EXISTS public.n8n_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'RESUME_PARSED', 'WEBHOOK_DISPATCHED', 'CALENDAR_INVITE', 'OFFER_LETTER_SENT'
  payload JSONB,
  status TEXT DEFAULT 'SUCCESS',
  triggered_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidate_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.n8n_events ENABLE ROW LEVEL SECURITY;

-- Allow Public Access Policy for Demo/Testing
CREATE POLICY "Public full access to candidates" ON public.candidates FOR ALL USING (true);
CREATE POLICY "Public full access to candidate_skills" ON public.candidate_skills FOR ALL USING (true);
CREATE POLICY "Public full access to interviews" ON public.interviews FOR ALL USING (true);
CREATE POLICY "Public full access to n8n_events" ON public.n8n_events FOR ALL USING (true);
`;

/**
 * Auto-Save candidate to Supabase (with fallback to local storage)
 */
export const autoSaveCandidateToSupabase = async (candidate) => {
  const status = getSupabaseStatus();
  const timestamp = new Date().toISOString();

  // Always update local reactive cache
  const localCandidates = JSON.parse(localStorage.getItem('tp_candidates') || '[]');
  const existingIdx = localCandidates.findIndex(c => c.email === candidate.email);
  if (existingIdx >= 0) {
    localCandidates[existingIdx] = { ...localCandidates[existingIdx], ...candidate, updated_at: timestamp };
  } else {
    localCandidates.unshift({ ...candidate, id: candidate.id || crypto.randomUUID(), created_at: timestamp, updated_at: timestamp });
  }
  localStorage.setItem('tp_candidates', JSON.stringify(localCandidates));

  if (!status.isConfigured) {
    // Return gracefully with local success
    return {
      success: true,
      syncedWithCloud: false,
      message: 'Saved to Local Reactive Store (Connect Supabase in settings for Cloud Sync)',
      data: candidate
    };
  }

  try {
    const { data, error } = await supabase
      .from('candidates')
      .upsert({
        name: candidate.name,
        email: candidate.email,
        role: candidate.role || 'Senior React & n8n Specialist',
        level: candidate.level || 'L6 Engineer',
        github_username: candidate.github_username || 'mufthi-dev',
        github_repos_indexed: candidate.github_repos_indexed || 42,
        resume_filename: candidate.resume_filename || 'Mufthi_Resume_React_n8n.pdf',
        match_score: candidate.match_score || 92,
        fit_level: candidate.fit_level || 'EXCEPTIONAL FIT',
        status: candidate.status || 'Screened',
        updated_at: timestamp
      }, { onConflict: 'email' })
      .select();

    if (error) {
      console.warn('Supabase cloud upsert notice:', error.message);
      return { success: true, syncedWithCloud: false, message: error.message, data: candidate };
    }

    return { success: true, syncedWithCloud: true, message: 'Live synced to Supabase PostgreSQL!', data };
  } catch (err) {
    console.warn('Supabase sync error:', err.message);
    return { success: true, syncedWithCloud: false, message: err.message, data: candidate };
  }
};

/**
 * Log n8n Event to Supabase
 */
export const logN8nEventToSupabase = async (eventType, payload) => {
  const timestamp = new Date().toISOString();
  const logItem = {
    id: crypto.randomUUID(),
    eventType,
    payload,
    timestamp,
    status: 'SUCCESS'
  };

  const logs = JSON.parse(localStorage.getItem('tp_n8n_logs') || '[]');
  logs.unshift(logItem);
  localStorage.setItem('tp_n8n_logs', JSON.stringify(logs.slice(0, 50)));

  const status = getSupabaseStatus();
  if (status.isConfigured) {
    try {
      await supabase.from('n8n_events').insert([{
        event_type: eventType,
        payload,
        status: 'SUCCESS',
        triggered_at: timestamp
      }]);
    } catch (err) {
      console.warn('n8n log push error:', err);
    }
  }

  return logItem;
};
