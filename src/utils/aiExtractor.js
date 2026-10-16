/**
 * AI NLP Extractor for mynetworkk.ai
 * Parses spoken voice notes (Hinglish/English/Hindi) into structured contact information.
 */

export function extractContactFromVoiceNote(text, eventContext = '') {
  if (!text || text.trim().length === 0) {
    return null;
  }

  const clean = text.trim();
  const lower = clean.toLowerCase();

  // 1. Try to extract Person Name
  let name = '';
  // Patterns like "mila rohan se", "met rohan", "spoke to rohan", "rohan malhotra"
  const metPatterns = [
    /(?:met|spoke to|talked with|connected with|mila)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /(?:ye hai|this is|name is|naam hai)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /([A-Z][a-z]+\s+[A-Z][a-z]+)/ // any capitalized Two-word name
  ];

  for (const regex of metPatterns) {
    const match = clean.match(regex);
    if (match && match[1]) {
      name = match[1].trim();
      break;
    }
  }

  if (!name) {
    // Fallback: take first two words or default
    const words = clean.split(/\s+/).filter(w => w.length > 2);
    name = words.length > 0 ? capitalize(words[0]) + (words[1] ? ' ' + capitalize(words[1]) : '') : 'New Connection';
  }

  // 2. Try to extract Company
  let company = '';
  const companyPatterns = [
    /(?:at|from|founder of|works at|ka startup hai|startup)\s+([A-Z0-9][a-zA-Z0-9]+)/i,
    /company\s+(?:is|ka naam)\s+([A-Za-z0-9]+)/i
  ];
  for (const regex of companyPatterns) {
    const match = clean.match(regex);
    if (match && match[1]) {
      company = match[1].trim();
      break;
    }
  }
  if (!company) {
    if (lower.includes('fintech') || lower.includes('payment')) company = 'Fintech Startup';
    else if (lower.includes('investor') || lower.includes('vc') || lower.includes('fund')) company = 'Venture Capital';
    else if (lower.includes('ai') || lower.includes('llm')) company = 'AI Labs';
    else company = 'Independent';
  }

  // 3. Try to extract Role
  let role = 'Professional';
  if (lower.includes('founder') || lower.includes('co-founder') || lower.includes('ceo')) role = 'Founder & CEO';
  else if (lower.includes('investor') || lower.includes('angel') || lower.includes('partner') || lower.includes('vc')) role = 'Investor / Partner';
  else if (lower.includes('designer') || lower.includes('ui') || lower.includes('ux') || lower.includes('product designer')) role = 'Lead Designer';
  else if (lower.includes('cto') || lower.includes('developer') || lower.includes('engineer') || lower.includes('tech lead')) role = 'Engineering Lead';
  else if (lower.includes('partnership') || lower.includes('bd') || lower.includes('growth') || lower.includes('sales')) role = 'Head of Partnerships';

  // 4. Extract Event / Location
  let event = eventContext || 'Networking Event';
  const eventPatterns = [
    /(?:at|in|during)\s+([A-Z][a-zA-Z0-9\s]+(?:summit|conference|meetup|event|fest|hackathon|dinner))/i,
    /(bangalore|delhi|mumbai|pune|hyderabad|goa)\s+(?:summit|meetup|event)/i
  ];
  for (const regex of eventPatterns) {
    const match = clean.match(regex);
    if (match && match[1]) {
      event = match[1].trim();
      break;
    }
  }

  // 5. Semantic Tags
  const tags = [];
  if (lower.includes('fintech') || lower.includes('payment') || lower.includes('upi')) tags.push('Fintech');
  if (lower.includes('investor') || lower.includes('seed') || lower.includes('fund') || lower.includes('pitch')) tags.push('Investor');
  if (lower.includes('ai') || lower.includes('llm') || lower.includes('model') || lower.includes('gpt')) tags.push('AI/GenAI');
  if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) tags.push('Design');
  if (lower.includes('hiring') || lower.includes('job') || lower.includes('recruiting')) tags.push('Hiring');
  if (lower.includes('deck') || lower.includes('proposal') || lower.includes('contract')) tags.push('High Priority');
  if (tags.length === 0) tags.push('Networking', 'Lead');

  // 6. Action Items & Follow Up Date
  let actionItem = 'Send polite follow-up message & connect over LinkedIn.';
  let followUpDate = 'In 2 days';

  if (lower.includes('deck') || lower.includes('pitch')) {
    actionItem = 'Send pitch deck and company overview';
    followUpDate = 'Monday, 10:00 AM';
  } else if (lower.includes('call') || lower.includes('zoom') || lower.includes('meeting')) {
    actionItem = 'Send calendar invite for 20-min intro call';
    followUpDate = 'Wednesday, 3:00 PM';
  } else if (lower.includes('demo') || lower.includes('sdk') || lower.includes('api')) {
    actionItem = 'Share demo link & API documentation';
    followUpDate = 'Tomorrow, 11:00 AM';
  } else if (lower.includes('coffee') || lower.includes('dinner')) {
    actionItem = 'Catch up over coffee next week';
    followUpDate = 'Next Tuesday';
  }

  // 7. Auto-generated WhatsApp message
  const firstName = name.split(' ')[0] || 'there';
  let whatsappMessage = `Hi ${firstName}, great connecting with you${event ? ' at ' + event : ''}! `;
  if (lower.includes('deck')) {
    whatsappMessage += `Sharing our pitch deck as discussed. Would love to hear your thoughts when you get a chance!`;
  } else if (lower.includes('call') || lower.includes('zoom')) {
    whatsappMessage += `Loved our conversation. Here's my calendar link to set up our quick intro call: https://cal.com`;
  } else {
    whatsappMessage += `Really enjoyed our conversation. Let's stay in touch!`;
  }

  return {
    id: 'conn_' + Date.now(),
    name,
    role,
    company,
    event,
    tags,
    rawNotes: clean,
    actionItem,
    followUpDate,
    whatsappMessage,
    phone: '+91 ' + Math.floor(9000000000 + Math.random() * 999999999),
    email: `${firstName.toLowerCase()}@${company.toLowerCase().replace(/[^a-z]/g, '') || 'company'}.com`,
    createdAt: new Date().toISOString(),
    status: 'pending' // 'pending' | 'followed_up'
  };
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
