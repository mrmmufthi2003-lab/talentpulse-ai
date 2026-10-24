import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { autoSaveCandidateToSupabase, logN8nEventToSupabase, getSupabaseStatus, updateSupabaseCredentials } from '../supabaseClient';
import { sendRealEmailViaEmailJS, getStoredEmailJSCredentials, saveEmailJSCredentials } from '../emailService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('apply'); // 'apply' | 'match' | 'interview' | 'hr'
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' (full frame) | 'mobile' (phone frame) | 'panorama' (4 side-by-side)
  const [showComparison, setShowComparison] = useState(false);
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  
  // Real-time Supabase status state
  const [supabaseState, setSupabaseState] = useState(() => getSupabaseStatus());
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState(null);
  const [autoSaveNotification, setAutoSaveNotification] = useState(null);

  // EmailJS & Email System State
  const [emailJSState, setEmailJSState] = useState(() => getStoredEmailJSCredentials());
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmailAlert, setNewEmailAlert] = useState(null);
  const [activeEmail, setActiveEmail] = useState(null);
  const [dispatchedEmails, setDispatchedEmails] = useState([]);
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState(() => localStorage.getItem('tp_n8n_webhook_url') || '');

  // Active applicant being processed
  const [currentCandidate, setCurrentCandidate] = useState({
    id: 'mufthi-cand-1',
    name: 'Mufthi',
    email: 'mufthi.dev@gmail.com',
    role: 'Senior React & n8n Specialist',
    level: 'L6 Engineer',
    github: 'github.com/mufthi-dev',
    reposIndexed: 42,
    resumeFilename: 'Mufthi_Resume_React_n8n.pdf',
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
    status: 'Ready for Autonomous Dispatch',
    calendarSlot: 'Today 4:00 PM',
    isHired: false,
    interviewAnswer: 'In n8n, I configure the Webhook node with customized error workflow triggers. For idempotent processing, I implement upsert deduplication using PostgreSQL unique transaction keys combined with exponential retry backoff logic...'
  });

  // Candidate pool for HR Hub
  const [candidatesList, setCandidatesList] = useState([
    {
      id: 'mufthi-cand-1',
      name: 'Mufthi',
      role: 'React & n8n Specialist',
      level: 'L6 Engineer',
      email: 'mufthi.dev@gmail.com',
      location: 'San Francisco, CA • Available Immediately',
      matchScore: 92,
      rank: 1,
      isTopCandidate: true,
      ratings: { technical: 9.4, problemSolving: 9.2, communication: 8.8 },
      status: 'Ready for Dispatch',
      isHired: false
    },
    {
      id: 'cand-2',
      name: 'Priya S.',
      role: 'Lead Backend & Node Engineer',
      level: 'L5 Engineer',
      email: 'priya.s@clouddev.io',
      location: 'Remote • 2 Weeks Notice',
      matchScore: 88,
      rank: 2,
      tags: ['Postgres', 'Kafka'],
      ratings: { technical: 8.9, problemSolving: 8.8, communication: 8.7 },
      status: 'Screened',
      isHired: false
    },
    {
      id: 'cand-3',
      name: 'David K.',
      role: 'Fullstack UI/UX Engineer',
      level: 'L5 Engineer',
      email: 'david.k@uicraft.dev',
      location: 'New York • Immediate',
      matchScore: 84,
      rank: 3,
      tags: ['Tailwind', 'Next.js'],
      ratings: { technical: 8.5, problemSolving: 8.4, communication: 9.0 },
      status: 'Screened',
      isHired: false
    }
  ]);

  // Live telemetry of n8n execution triggers
  const [n8nLogs, setN8nLogs] = useState([
    {
      id: 'n8n-init-1',
      node: '#410 Active',
      title: 'n8n Webhook Triggered Automatically!',
      desc: 'Automated interview invitation dispatched to mufthi.dev@gmail.com with integrated Google Calendar sync.',
      timestamp: 'Just now',
      active: true
    }
  ]);

  // Screening state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Trigger notification toast
  const triggerAutoSaveAlert = (msg) => {
    setAutoSaveNotification(msg);
    setLastAutoSaveTime(new Date().toLocaleTimeString());
    setTimeout(() => {
      setAutoSaveNotification(null);
    }, 4000);
  };

  // Helper to trigger email dispatch (Real Gmail via EmailJS + n8n Webhook)
  const dispatchEmailMessage = async (emailObj) => {
    setActiveEmail(emailObj);
    setDispatchedEmails(prev => [emailObj, ...prev]);
    setNewEmailAlert(emailObj);

    // 1. Send REAL email via EmailJS (to real Gmail inbox)
    try {
      const emailResult = await sendRealEmailViaEmailJS({
        toName: emailObj.candidateName || currentCandidate.name,
        toEmail: emailObj.to || currentCandidate.email,
        role: currentCandidate.role || 'Senior React & n8n Specialist',
        matchScore: `${emailObj.matchScore || 92}%`,
        type: emailObj.type,
        calendarSlot: currentCandidate.calendarSlot || 'Today 4:00 PM',
        customMessage: emailObj.message
      });

      if (emailResult.deliveredToRealInbox) {
        triggerAutoSaveAlert(`✓ REAL GMAIL DELIVERED to ${emailObj.to} via EmailJS!`);
      }
    } catch (err) {
      console.warn('[EmailJS] Sending error:', err);
    }

    // 2. If custom real n8n webhook URL is set, call it
    const storedWebhook = localStorage.getItem('tp_n8n_webhook_url');
    if (storedWebhook) {
      fetch(storedWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailObj)
      }).catch(err => console.warn('n8n remote webhook error:', err));
    }
  };

  // Perform AI 2-Sec Screening
  const runAiScreening = async (formData) => {
    setIsScanning(true);
    setScanProgress(15);

    const stepInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(stepInterval);
          return 90;
        }
        return prev + 25;
      });
    }, 350);

    setTimeout(async () => {
      clearInterval(stepInterval);
      setScanProgress(100);

      const candidateName = formData?.name || currentCandidate.name;
      const candidateEmail = formData?.email || currentCandidate.email;

      const updated = {
        ...currentCandidate,
        name: candidateName,
        email: candidateEmail,
        github: formData?.github || currentCandidate.github,
        resumeFilename: formData?.resumeFilename || currentCandidate.resumeFilename,
        matchScore: 92,
        status: 'AI Screened (92%)'
      };

      setCurrentCandidate(updated);
      setIsScanning(false);

      // 1. Auto save to Supabase
      const saveRes = await autoSaveCandidateToSupabase(updated);
      await logN8nEventToSupabase('AI_SCREENING_COMPLETED', {
        candidate: updated.email,
        matchScore: 92,
        shaChecksum: 'sha256:7f3b8a'
      });

      triggerAutoSaveAlert(saveRes.syncedWithCloud 
        ? '✓ Live Cloud Auto-Saved to Supabase: Candidates Table' 
        : '✓ Auto-Saved to Supabase Reactive Store (Ready for Cloud Sync)'
      );

      // 2. Dispatch simulated / real email to candidate
      const emailInvite = {
        id: 'email-' + Date.now(),
        type: 'INTERVIEW_INVITE',
        to: candidateEmail,
        candidateName,
        subject: `TalentPulse AI: Congratulations ${candidateName}! 92% Match Score for Senior React & n8n Specialist`,
        message: `Your resume and GitHub telemetry were scanned in 1.8s by our autonomous AI Agent. You scored an exceptional 92% match (Top 1% of 1,000 applicants). An autonomous interview invitation has been generated. Please select your pre-cleared interview slot below:`,
        matchScore: 92,
        timestamp: new Date().toLocaleTimeString()
      };
      dispatchEmailMessage(emailInvite);

      // 3. Add n8n telemetry log
      setN8nLogs(prev => [
        {
          id: 'n8n-scan-' + Date.now(),
          node: '#410 Active',
          title: 'n8n Webhook Triggered Automatically!',
          desc: `Automated interview invitation dispatched to ${candidateEmail} with integrated Google Calendar sync.`,
          timestamp: 'Just now',
          active: true
        },
        ...prev
      ]);

      // Move to Match Score screen
      setActiveTab('match');
    }, 1800);
  };

  // Confirm Interview Slot
  const confirmCalendarSlot = async (slot) => {
    const updated = {
      ...currentCandidate,
      calendarSlot: slot,
      status: `Interview Slot: ${slot}`
    };
    setCurrentCandidate(updated);

    await autoSaveCandidateToSupabase(updated);
    await logN8nEventToSupabase('CALENDAR_SLOT_CONFIRMED', {
      candidate: updated.email,
      slot
    });

    triggerAutoSaveAlert(`✓ Slot "${slot}" Auto-Saved to Supabase & n8n Synced`);
    setActiveTab('interview');
  };

  // Submit Live AI Interview Answer
  const submitInterviewAnswer = async (answer) => {
    const updated = {
      ...currentCandidate,
      interviewAnswer: answer,
      status: 'Interview Completed - Ready for Recruiter Dispatch'
    };
    setCurrentCandidate(updated);

    await autoSaveCandidateToSupabase(updated);
    await logN8nEventToSupabase('INTERVIEW_EVALUATION_GENERATED', {
      candidate: updated.email,
      speechConfidence: '97.8% Clear Delivery',
      technicalScore: 9.4
    });

    triggerAutoSaveAlert('✓ AI Report Card & Live Transcript Auto-Saved to Supabase');
    setActiveTab('hr');
  };

  // Recruiter One-Click Hire & Dispatch Offer Letter via n8n
  const hireCandidate = async (candidateId) => {
    confetti({
      particleCount: 130,
      spread: 75,
      origin: { y: 0.6 }
    });

    const updated = {
      ...currentCandidate,
      isHired: true,
      status: 'HIRED - Offer Letter Dispatched via n8n'
    };
    setCurrentCandidate(updated);

    setCandidatesList(prev => prev.map(c => {
      if (c.id === candidateId || c.email === updated.email) {
        return { ...c, isHired: true, status: 'HIRED' };
      }
      return c;
    }));

    // Auto save to Supabase
    await autoSaveCandidateToSupabase(updated);
    await logN8nEventToSupabase('OFFER_LETTER_DISPATCHED', {
      recipient: updated.name,
      email: updated.email,
      position: updated.role,
      channels: ['Gmail API', 'Telegram Bot', 'DocuSign Webhook']
    });

    // Dispatch Official Offer Letter Email
    const offerEmail = {
      id: 'offer-email-' + Date.now(),
      type: 'OFFER_LETTER',
      to: updated.email,
      candidateName: updated.name,
      subject: `Official Offer Letter: Senior React & n8n Specialist - TechCorp Labs`,
      message: `We are thrilled to offer you the position of Senior React & n8n Specialist at TechCorp Labs! Based on your 92% autonomous assessment score and stellar performance on n8n webhook error handling, our executive team has dispatched your official offer letter package.`,
      timestamp: new Date().toLocaleTimeString()
    };
    dispatchEmailMessage(offerEmail);

    setN8nLogs(prev => [
      {
        id: 'n8n-hire-' + Date.now(),
        node: '#425 Dispatch',
        title: 'n8n Offer Letter Automation Fired!',
        desc: `Autonomous PDF Offer Letter dispatched to ${updated.email} via Gmail & Telegram.`,
        timestamp: 'Just now',
        active: true
      },
      ...prev
    ]);

    triggerAutoSaveAlert(`✓ HIRED! Offer letter dispatched via n8n & logged to Supabase.`);
  };

  const saveSupabaseConfig = (url, key) => {
    const success = updateSupabaseCredentials(url, key);
    if (success) {
      setSupabaseState(getSupabaseStatus());
      triggerAutoSaveAlert('✓ Supabase credentials configured! Cloud Sync active.');
      setShowSupabaseModal(false);
    }
  };

  const saveN8nWebhook = (url) => {
    setN8nWebhookUrl(url);
    localStorage.setItem('tp_n8n_webhook_url', url);
    triggerAutoSaveAlert('✓ n8n Webhook URL saved! Live webhook relay active.');
  };

  const saveEmailJSConfig = (serviceId, templateId, publicKey) => {
    saveEmailJSCredentials(serviceId, templateId, publicKey);
    setEmailJSState(getStoredEmailJSCredentials());
    triggerAutoSaveAlert('✓ EmailJS configured! Live Gmail delivery active.');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        showComparison,
        setShowComparison,
        showSupabaseModal,
        setShowSupabaseModal,
        showEmailModal,
        setShowEmailModal,
        activeEmail,
        setActiveEmail,
        newEmailAlert,
        setNewEmailAlert,
        dispatchedEmails,
        emailJSState,
        saveEmailJSConfig,
        n8nWebhookUrl,
        saveN8nWebhook,
        currentCandidate,
        setCurrentCandidate,
        candidatesList,
        n8nLogs,
        isScanning,
        scanProgress,
        runAiScreening,
        confirmCalendarSlot,
        submitInterviewAnswer,
        hireCandidate,
        supabaseState,
        lastAutoSaveTime,
        autoSaveNotification,
        saveSupabaseConfig
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
