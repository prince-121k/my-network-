// Utility to search and extract chronological timeline memories for AI Chatbot and Landing Page Playground

export function generateTimelineResponse(query, contacts = []) {
  if (!query || !query.trim()) {
    return {
      success: false,
      message: "Please enter a company, college, person or topic to search (e.g. 'Microsoft', 'IIT Delhi', 'Rohan', 'Pending follow-ups').",
      timeline: []
    };
  }

  const q = query.toLowerCase().trim();

  // Normalize contacts into timeline entries
  const allEntries = contacts.flatMap(c => {
    // If contact has multiple sub-visits, we can map them, or treat contact as a visit
    const entry = {
      id: c.id,
      contactId: c.id,
      name: c.name,
      role: c.role,
      company: c.company,
      event: c.event || 'Direct Interaction',
      location: c.location || c.event || 'In-person Meeting',
      date: c.displayDate || (c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'),
      time: c.displayTime || '11:00 AM',
      isoDate: c.visitDate || c.createdAt || '2024-08-01',
      topicsDiscussed: c.topicsDiscussed || [
        c.rawNotes || 'Initial networking and partnership discussion.'
      ],
      commitmentsMade: c.commitmentsMade || c.actionItem || 'Send follow-up details on WhatsApp.',
      actionItem: c.actionItem || 'Follow up with contact',
      followUpDate: c.followUpDate || 'Pending',
      status: c.status || 'pending',
      whatsappMessage: c.whatsappMessage || `Hi ${c.name}, great connecting with you!`,
      phone: c.phone || '',
      email: c.email || '',
      tags: c.tags || [],
      rawNotes: c.rawNotes || '',
      audioDuration: c.audioDuration || '0:35'
    };
    return [entry];
  });

  // Query Matchers
  let matchedEntries = [];
  let botReply = '';
  let entityType = 'general';

  // 1. Microsoft Queries
  if (q.includes('microsoft') || q.includes('msft') || q.includes('reactor') || q.includes('azure')) {
    entityType = 'microsoft';
    matchedEntries = allEntries.filter(e => 
      e.company?.toLowerCase().includes('microsoft') || 
      e.location?.toLowerCase().includes('microsoft') ||
      e.event?.toLowerCase().includes('microsoft') ||
      e.name?.toLowerCase().includes('sameer') ||
      e.name?.toLowerCase().includes('ananya')
    );
    botReply = `Bhai, aapke memory records me **Microsoft** ke total **${matchedEntries.length} visits/meetings** mile hain. Yeh rahi complete date-wise aur time-wise chronological timeline:`;
  }
  // 2. IIT Delhi Queries
  else if (q.includes('iit') || q.includes('iit delhi') || q.includes('iitd') || q.includes('hauz khas') || q.includes('fitt') || q.includes('dogra')) {
    entityType = 'iit_delhi';
    matchedEntries = allEntries.filter(e => 
      e.company?.toLowerCase().includes('iit') || 
      e.company?.toLowerCase().includes('delhi') ||
      e.location?.toLowerCase().includes('iit') ||
      e.event?.toLowerCase().includes('iit') ||
      e.name?.toLowerCase().includes('sharma') ||
      e.name?.toLowerCase().includes('arpit')
    );
    botReply = `IIT Delhi me aapke **${matchedEntries.length} visits & meetings** record hue hain (Dogra Hall E-Summit aur Bharti School AI Lab). Yahan date-wise aur time-wise poori summary hai:`;
  }
  // 3. Rohan / BharatCart
  else if (q.includes('rohan') || q.includes('bharatcart')) {
    entityType = 'rohan';
    matchedEntries = allEntries.filter(e => 
      e.name?.toLowerCase().includes('rohan') || 
      e.company?.toLowerCase().includes('bharatcart')
    );
    botReply = `Rohan Malhotra (BharatCart) ke sath aapki Delhi Startup Summit me hui meeting ki details yahan hain:`;
  }
  // 4. Priya / Nexus Ventures / Investors
  else if (q.includes('priya') || q.includes('nexus') || q.includes('investor') || q.includes('seed')) {
    entityType = 'priya';
    matchedEntries = allEntries.filter(e => 
      e.name?.toLowerCase().includes('priya') || 
      e.company?.toLowerCase().includes('nexus') ||
      e.role?.toLowerCase().includes('investor') ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes('investor')))
    );
    botReply = `Found ${matchedEntries.length} investor meetings in your memory log (Nexus Ventures / Priya Sharma):`;
  }
  // 5. Alex / FlowLoop / Design
  else if (q.includes('alex') || q.includes('flowloop') || q.includes('design')) {
    entityType = 'alex';
    matchedEntries = allEntries.filter(e => 
      e.name?.toLowerCase().includes('alex') || 
      e.company?.toLowerCase().includes('flowloop') ||
      e.role?.toLowerCase().includes('designer') ||
      (e.tags && e.tags.some(t => t.toLowerCase().includes('ui/ux')))
    );
    botReply = `Alex Morgan (FlowLoop) ke sath DesignUp summit meeting details:`;
  }
  // 6. Pending Follow-ups
  else if (q.includes('pending') || q.includes('follow') || q.includes('baki') || q.includes('due') || q.includes('remind')) {
    entityType = 'pending';
    matchedEntries = allEntries.filter(e => e.status !== 'followed_up');
    botReply = `Aapke paas abhi **${matchedEntries.length} pending follow-ups** hain jin par WhatsApp message ya email bhejna baaki hai:`;
  }
  // 7. All Meetings / Full History
  else if (q.includes('all') || q.includes('sab') || q.includes('meeting') || q.includes('history') || q.includes('timeline') || q.includes('kisse') || q.includes('show')) {
    entityType = 'all';
    matchedEntries = [...allEntries];
    botReply = `Aapki complete chronological meeting timeline (total ${matchedEntries.length} networking sessions):`;
  }
  // 8. General Fuzzy Match
  else {
    matchedEntries = allEntries.filter(e => {
      const inName = e.name?.toLowerCase().includes(q);
      const inComp = e.company?.toLowerCase().includes(q);
      const inRole = e.role?.toLowerCase().includes(q);
      const inLoc = e.location?.toLowerCase().includes(q);
      const inEvent = e.event?.toLowerCase().includes(q);
      const inNotes = e.rawNotes?.toLowerCase().includes(q);
      const inTags = e.tags?.some(t => t.toLowerCase().includes(q));
      const inTopics = e.topicsDiscussed?.some(tp => tp.toLowerCase().includes(q));
      return inName || inComp || inRole || inLoc || inEvent || inNotes || inTags || inTopics;
    });

    if (matchedEntries.length > 0) {
      botReply = `"${query}" ke regarding aapke network me **${matchedEntries.length} matching meetings** mili hain:`;
    } else {
      botReply = `Mujhe aapke memory logs me "${query}" ke related koi meeting nahi mili. Kya aap is meeting ke liye abhi 15-second ka voice note record karna chahenge?`;
    }
  }

  // Sort matched entries chronologically (oldest to newest or vice-versa)
  matchedEntries.sort((a, b) => new Date(a.isoDate) - new Date(b.isoDate));

  return {
    success: matchedEntries.length > 0,
    query,
    entityType,
    botReply,
    totalMatches: matchedEntries.length,
    timeline: matchedEntries
  };
}
