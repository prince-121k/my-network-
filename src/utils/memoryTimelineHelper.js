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

  // If user has zero contacts saved
  if (!contacts || contacts.length === 0) {
    return {
      success: false,
      query,
      entityType: 'empty',
      botReply: `Aapke network me abhi koi contact saved nahi hai. Pehle "+ Add Connection" par click karke apna real meeting record karein, fir aap mujhse kisi bhi company, person ya topic ke baare me pooch sakte hain!`,
      totalMatches: 0,
      timeline: []
    };
  }

  // Normalize contacts into timeline entries
  const allEntries = contacts.flatMap(c => {
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
      isoDate: c.visitDate || c.createdAt || new Date().toISOString().split('T')[0],
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
      audioUrl: c.audioUrl || null,
      audioDuration: c.audioDuration || '0:30'
    };
    return [entry];
  });

  // Query Matchers
  let matchedEntries = [];
  let botReply = '';
  let entityType = 'general';

  // 1. Pending Follow-ups query
  if (q.includes('pending') || q.includes('follow') || q.includes('baki') || q.includes('due') || q.includes('remind')) {
    entityType = 'pending';
    matchedEntries = allEntries.filter(e => e.status !== 'followed_up');
    botReply = `Aapke paas abhi **${matchedEntries.length} pending follow-ups** hain jin par WhatsApp message bhejna baaki hai:`;
  }
  // 2. All Meetings / Full History query
  else if (q.includes('all') || q.includes('sab') || q.includes('meeting') || q.includes('history') || q.includes('timeline') || q.includes('kisse') || q.includes('show')) {
    entityType = 'all';
    matchedEntries = [...allEntries];
    botReply = `Aapki complete chronological meeting timeline (total ${matchedEntries.length} saved sessions):`;
  }
  // 3. Dynamic Search across all fields
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
      botReply = `Aapke memory records me **"${query}"** ke regarding **${matchedEntries.length} meeting(s)** mili hain. Yahan date-wise aur time-wise poori summary hai:`;
    } else {
      botReply = `Mujhe aapke memory logs me "${query}" ke related koi meeting nahi mili. Kya aap is meeting ke liye abhi "+ Add Connection" se voice note ya text note save karna chahenge?`;
    }
  }

  // Sort matched entries chronologically
  matchedEntries.sort((a, b) => new Date(b.isoDate) - new Date(a.isoDate));

  return {
    success: matchedEntries.length > 0,
    query,
    entityType,
    botReply,
    totalMatches: matchedEntries.length,
    timeline: matchedEntries
  };
}
