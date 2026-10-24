// EmailJS Integration for sending REAL emails to candidate's Gmail inbox
export const getStoredEmailJSCredentials = () => {
  return {
    serviceId: localStorage.getItem('tp_emailjs_service_id') || '',
    templateId: localStorage.getItem('tp_emailjs_template_id') || 'template_vocoao8', // From user's EmailJS dashboard
    publicKey: localStorage.getItem('tp_emailjs_public_key') || '',
    isConfigured: !!(localStorage.getItem('tp_emailjs_service_id') && localStorage.getItem('tp_emailjs_public_key'))
  };
};

export const saveEmailJSCredentials = (serviceId, templateId, publicKey) => {
  localStorage.setItem('tp_emailjs_service_id', serviceId.trim());
  localStorage.setItem('tp_emailjs_template_id', (templateId || 'template_vocoao8').trim());
  localStorage.setItem('tp_emailjs_public_key', publicKey.trim());
  return true;
};

/**
 * Send real email via EmailJS REST API
 */
export const sendRealEmailViaEmailJS = async ({
  toName = 'Mufthi',
  toEmail = 'mufthi.dev@gmail.com',
  role = 'Senior React & n8n Specialist',
  matchScore = '92%',
  type = 'INTERVIEW_INVITE',
  calendarSlot = 'Today 4:00 PM',
  customMessage = ''
}) => {
  const { serviceId, templateId, publicKey, isConfigured } = getStoredEmailJSCredentials();

  const singleSentence = "LinkedIn-la aalunga manual-a seiyura Hiring Process-a, n8n Webhook, Supabase Realtime Database, matrum AI Agents vechu 2 seconds-la fully automated-a mudikkira next-gen hiring OS thaan indha app!";

  const emailSubject = type === 'INTERVIEW_INVITE'
    ? `TalentPulse AI: Congratulations ${toName}! 92% Match Score for ${role}`
    : `Official Offer Letter: ${role} - TechCorp Labs`;

  const emailBody = type === 'INTERVIEW_INVITE'
    ? `Hi ${toName},

Your resume and GitHub telemetry were successfully scanned in 1.8s by our autonomous AI Agent.
Role: ${role}
Overall Match Score: ${matchScore}

Pre-Cleared Interview Slot: ${calendarSlot}

Key Architecture Insight:
"${singleSentence}"

Best regards,
TechCorp Labs Autonomous Hiring Engine`
    : `Official Employment Offer Letter

Dear ${toName},
We are thrilled to offer you the position of ${role} at TechCorp Labs!
Base Compensation: $105,000 USD / Year + Equity
Start Date: Immediate

Best regards,
TechCorp Labs Hiring Team`;

  if (!isConfigured) {
    console.log('[EmailJS] Credentials not configured yet. Saving simulation.');
    return {
      success: true,
      deliveredToRealInbox: false,
      subject: emailSubject,
      to: toEmail,
      message: 'Email queued in simulated inbox. Enter your EmailJS Service ID & Public Key to deliver to real Gmail!'
    };
  }

  try {
    const payload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_name: toName,
        to_email: toEmail,
        reply_to: 'automated-hiring@techcorp-labs.com',
        from_name: 'TalentPulse AI Hiring Engine',
        subject: emailSubject,
        role: role,
        match_score: matchScore,
        calendar_slot: calendarSlot,
        message: customMessage || emailBody,
        summary: singleSentence
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('✓ [EmailJS] Real email dispatched successfully to:', toEmail);
      return {
        success: true,
        deliveredToRealInbox: true,
        subject: emailSubject,
        to: toEmail,
        message: `Real email successfully sent to ${toEmail} via EmailJS!`
      };
    } else {
      const errorText = await response.text();
      console.warn('[EmailJS] API error response:', errorText);
      return {
        success: false,
        deliveredToRealInbox: false,
        error: errorText,
        message: `EmailJS responded: ${errorText}`
      };
    }
  } catch (error) {
    console.error('[EmailJS] Network/Sending error:', error);
    return {
      success: false,
      deliveredToRealInbox: false,
      error: error.message,
      message: error.message
    };
  }
};
