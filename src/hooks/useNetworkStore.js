import { useState, useEffect } from 'react';

export const INITIAL_CONTACTS = [
  // --- MICROSOFT VISITS ---
  {
    id: 'conn_ms_1',
    name: 'Sameer Verma',
    role: 'Sr. Cloud Solutions Architect',
    company: 'Microsoft',
    event: 'Microsoft Reactor Bengaluru (Azure AI Day)',
    location: 'Microsoft Reactor Bengaluru, Lavelle Road',
    visitDate: '2024-08-12',
    displayDate: '12 Aug 2024',
    displayTime: '03:30 PM',
    spaceId: 'space_techsparks',
    tags: ['Microsoft', 'Azure AI', 'Cloud Credits', 'High Priority'],
    rawNotes: 'Microsoft Reactor Bengaluru gaye the 12th Aug ko 3:30 PM. Sameer Verma se Azure OpenAI architecture aur latency benchmarks pe baat hui. Unhone Founders Hub me $25,000 cloud credits grant ke liye apply karne ko bola aur architecture blueprint manga.',
    actionItem: 'Submit cloud architecture blueprint & apply for $25K Azure credits',
    followUpDate: 'Completed (Credits Approved)',
    whatsappMessage: 'Hi Sameer, following up on our meeting at Microsoft Reactor Bengaluru regarding Azure OpenAI credits and architecture.',
    phone: '+91 98112 34567',
    email: 'sameer.verma@microsoft.com',
    createdAt: '2024-08-12T15:30:00Z',
    status: 'followed_up',
    audioDuration: '0:42',
    topicsDiscussed: [
      'Pitched mynetworkk speech-to-relationship extraction engine',
      'Discussed Azure OpenAI GPT-4o latency benchmarks for multilingual voice transcription',
      'Explored Microsoft for Startups Founders Hub $25K credits eligibility & cloud onboarding'
    ],
    commitmentsMade: 'Shared architecture diagram and pitch deck for Microsoft credit review'
  },
  {
    id: 'conn_ms_2',
    name: 'Ananya Rao',
    role: 'Startup Ecosystem Lead',
    company: 'Microsoft',
    event: 'TechSparks 2024 (Microsoft Cloud Booth #B-14)',
    location: 'TechSparks 2024, Microsoft Enterprise Booth #B-14',
    visitDate: '2024-09-28',
    displayDate: '28 Sep 2024',
    displayTime: '11:15 AM',
    spaceId: 'space_techsparks',
    tags: ['Microsoft', 'Demo Day', 'Reactor Gurgaon', 'Partnership'],
    rawNotes: 'TechSparks me Microsoft booth par Ananya se mile the 28th September 11:15 AM. Unhone hamare mynetworkk prototype ka live demo dekha aur Reactor Gurgaon ke upcoming Demo Day me pitch slot dene ki baat ki.',
    actionItem: 'Confirm attendance & submit 5-slide pitch deck for Reactor Gurgaon Demo Day',
    followUpDate: 'Friday, 11:00 AM',
    whatsappMessage: 'Hi Ananya, great meeting you at the Microsoft booth during TechSparks! Confirming our slot for the Reactor Gurgaon Demo Day.',
    phone: '+91 98223 45678',
    email: 'ananya.rao@microsoft.com',
    createdAt: '2024-09-28T11:15:00Z',
    status: 'pending',
    audioDuration: '0:38',
    topicsDiscussed: [
      'Live demo of business card scanner & voice note auto-transcription',
      'Invitation to pitch at Microsoft Reactor Gurgaon Demo Day',
      'Potential co-marketing case study on Azure Startup Showcase'
    ],
    commitmentsMade: 'Confirm slot for Demo Day and send updated 5-slide deck'
  },

  // --- IIT DELHI VISITS ---
  {
    id: 'conn_iit_1',
    name: 'Prof. R. Sharma',
    role: 'Incubation Advisory Member',
    company: 'IIT Delhi (FITT)',
    event: 'IIT Delhi Annual E-Summit 2024',
    location: 'Dogra Hall & LHC, IIT Delhi Hauz Khas',
    visitDate: '2024-10-05',
    displayDate: '05 Oct 2024',
    displayTime: '10:00 AM',
    spaceId: 'space_techsparks',
    tags: ['IIT Delhi', 'FITT Grant', 'Incubation', 'Campus Pilot'],
    rawNotes: 'IIT Delhi E-Summit me 5th October 10:00 AM Dogra Hall gaye the. Prof. R. Sharma se baat hui. FITT incubation program aur student seed grant ke baare me discuss kiya. Unhone pilot trial ke liye college hackathons me deploy karne ki permission di.',
    actionItem: 'Submit FITT student incubation proposal & prototype demo video',
    followUpDate: 'Completed (Incubation Review)',
    whatsappMessage: 'Respected Prof. Sharma, thank you for meeting at IIT Delhi E-Summit. Sharing our FITT incubation proposal and prototype link: https://mynetworkkai1.netlify.app/',
    phone: '+91 98101 23456',
    email: 'r.sharma@fitt-iitd.in',
    createdAt: '2024-10-05T10:00:00Z',
    status: 'followed_up',
    audioDuration: '0:50',
    topicsDiscussed: [
      'Pitched mynetworkk as the networking memory layer for college summits and hackathons',
      'FITT (Foundation for Innovation and Technology Transfer) seed grant criteria',
      'Pilot testing with 500+ participants across upcoming Delhi collegiate events'
    ],
    commitmentsMade: 'Submit formal FITT incubation form with video walkthrough'
  },
  {
    id: 'conn_iit_2',
    name: 'Dr. Arpit Sen',
    role: 'AI & Speech Processing Fellow',
    company: 'IIT Delhi (Bharti School AI Lab)',
    event: 'IIT Delhi AI Research Showcase & DeepTech Meetup',
    location: 'Bharti School AI Lab (Room 304), IIT Delhi',
    visitDate: '2024-11-14',
    displayDate: '14 Nov 2024',
    displayTime: '02:30 PM',
    spaceId: 'space_techsparks',
    tags: ['IIT Delhi', 'Research', 'Speech AI', 'Hinglish NLP'],
    rawNotes: 'IIT Delhi AI Lab me 14th November 2:30 PM gaye the Dr. Arpit Sen se milne. Hinglish speech transcription and noisy room audio enhancement pe discussion hui. On-device lightweight models test karne ka plan banaya.',
    actionItem: 'Share sample noisy audio benchmark datasets and test script',
    followUpDate: 'Thursday, 4:00 PM',
    whatsappMessage: 'Hi Dr. Sen, great meeting at Bharti School AI Lab yesterday. Here are the audio sample benchmarks for Hinglish transcription tests.',
    phone: '+91 98711 98765',
    email: 'arpit.sen@ee.iitd.ac.in',
    createdAt: '2024-11-14T14:30:00Z',
    status: 'pending',
    audioDuration: '0:45',
    topicsDiscussed: [
      'Evaluated audio acoustic model accuracy for noisy event halls & conferences',
      'Testing lightweight quantized Whisper and local NLP models on edge devices',
      'Invited student research interns to contribute to mynetworkk open datasets'
    ],
    commitmentsMade: 'Send test scripts & benchmark audio dataset'
  },

  // --- ROHAN MALHOTRA (BHARATCART) ---
  {
    id: 'conn_1',
    name: 'Rohan Malhotra',
    role: 'Head of Partnerships',
    company: 'BharatCart',
    event: 'Delhi Startup Summit (Pragati Maidan)',
    location: 'Pragati Maidan, Hall 5, New Delhi',
    visitDate: '2024-06-20',
    displayDate: '20 Jun 2024',
    displayTime: '10:30 AM',
    spaceId: 'space_techsparks',
    tags: ['Fintech', 'SDK Integration', 'High Priority', 'BharatCart'],
    rawNotes: 'Bhai abhi Delhi summit me Rohan se mila, BharatCart ka partnerships head hai. Monday ko hume apna pitch deck WhatsApp pe bhejne ko bola hai.',
    actionItem: 'Send pitch deck and sample SDK documentation on WhatsApp',
    followUpDate: 'Monday, 10:00 AM',
    whatsappMessage: 'Hi Rohan, great meeting you at Delhi Startup Summit! Sharing our pitch deck and sample SDK documentation as discussed.',
    phone: '+91 98765 43210',
    email: 'rohan@bharatcart.in',
    photoUrl: '/assets/media_1792169151282_168d2625.png',
    createdAt: '2024-06-20T10:30:00Z',
    status: 'pending',
    audioDuration: '0:32',
    topicsDiscussed: [
      'Integrating BharatCart merchant QR contacts into mynetworkk CRM',
      'Cross-promotion at upcoming D2C founders conclave in Gurgaon',
      'API access for bulk contact syncing and WhatsApp notifications'
    ],
    commitmentsMade: 'Send developer docs & pitch deck on WhatsApp by Monday'
  },

  // --- ALEX MORGAN (FLOWLOOP) ---
  {
    id: 'conn_2',
    name: 'Alex Morgan',
    role: 'Lead Product Designer',
    company: 'FlowLoop',
    event: 'DesignUp 2024 (BIC Domlur)',
    location: 'Bangalore International Centre, Domlur',
    visitDate: '2024-06-21',
    displayDate: '21 Jun 2024',
    displayTime: '02:15 PM',
    spaceId: 'space_designup',
    tags: ['UI/UX', 'Vintage Cameras', 'Design Review', 'FlowLoop'],
    rawNotes: 'Alex is a product designer at FlowLoop. Loves building simple, useful products and vintage cameras. Offered to review our mobile UI onboarding next month.',
    actionItem: 'Ping regarding mobile onboarding review next month',
    followUpDate: 'First week of next month',
    whatsappMessage: 'Hey Alex! Loved our chat at DesignUp about analog cameras and design systems. Looking forward to showing you our onboarding flow!',
    phone: '+1 555 019 2831',
    email: 'alex@flowloop.com',
    createdAt: '2024-06-21T14:15:00Z',
    status: 'pending',
    audioDuration: '0:28',
    topicsDiscussed: [
      'Design systems, typography and clean card layouts in relationship apps',
      'Shared mutual love for 35mm vintage cameras (Leica & Olympus)',
      'Reviewing mynetworkk mobile onboarding micro-interactions'
    ],
    commitmentsMade: 'Schedule 30-min design review session next month'
  },

  // --- PRIYA SHARMA (NEXUS VENTURES) ---
  {
    id: 'conn_3',
    name: 'Priya Sharma',
    role: 'Angel Investor',
    company: 'Nexus Ventures',
    event: 'Bangalore Founders Dinner (Indiranagar)',
    location: 'Toit Brewpub / Private Room, Indiranagar Bangalore',
    visitDate: '2024-06-22',
    displayDate: '22 Jun 2024',
    displayTime: '08:00 PM',
    spaceId: 'space_dinner',
    tags: ['Investor', 'Seed Round', 'High Priority', 'Nexus Ventures'],
    rawNotes: 'Met Priya Sharma during dinner. She is bullish on AI relationship memory CRM. Wants to see our MRR trajectory and set a 20-min Zoom call.',
    actionItem: 'Share MRR metrics & schedule 20-min Zoom call',
    followUpDate: 'Wednesday, 3:00 PM',
    whatsappMessage: 'Hi Priya, it was wonderful speaking with you at the founders dinner. Here are our MRR highlights and my calendar link for our call: https://cal.com/mynetworkk',
    phone: '+91 99887 76655',
    email: 'priya.sharma@nexusventures.com',
    createdAt: '2024-06-22T20:00:00Z',
    status: 'followed_up',
    audioDuration: '0:40',
    topicsDiscussed: [
      'Pitched AI relationship intelligence market size for Indian ecosystem',
      'Discussed early user retention metrics and organic referral velocity',
      'Invited to submit pitch deck for Nexus Seed Cohort review'
    ],
    commitmentsMade: 'Shared MRR spreadsheet and calendly invite'
  }
];

export const INITIAL_SPACES = [
  { id: 'all', name: 'All Contacts', badge: 'Global', isDefault: true },
  { id: 'space_techsparks', name: 'TechSparks & Tech Summits', badge: 'Conference', members: 4 },
  { id: 'space_designup', name: 'DesignUp & Creative Meetups', badge: 'Design Meetup', members: 2 },
  { id: 'space_dinner', name: 'Founders Dinner & Investor Mixers', badge: 'Private Dinner', members: 3 }
];

export function useNetworkStore() {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('mynetworkk_contacts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge rich INITIAL_CONTACTS if any key demo contact (e.g., Microsoft or IIT Delhi) is missing
          const existingIds = new Set(parsed.map(c => c.id));
          const missingDefaults = INITIAL_CONTACTS.filter(c => !existingIds.has(c.id));
          if (missingDefaults.length > 0) {
            const merged = [...parsed, ...missingDefaults];
            localStorage.setItem('mynetworkk_contacts', JSON.stringify(merged));
            return merged;
          }
          return parsed;
        }
      }
      return INITIAL_CONTACTS;
    } catch (e) {
      return INITIAL_CONTACTS;
    }
  });

  const [spaces, setSpaces] = useState(() => {
    try {
      const saved = localStorage.getItem('mynetworkk_spaces');
      return saved ? JSON.parse(saved) : INITIAL_SPACES;
    } catch (e) {
      return INITIAL_SPACES;
    }
  });

  const [selectedSpaceId, setSelectedSpaceId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('mynetworkk_contacts', JSON.stringify(contacts));
    } catch (e) {}
  }, [contacts]);

  useEffect(() => {
    try {
      localStorage.setItem('mynetworkk_spaces', JSON.stringify(spaces));
    } catch (e) {}
  }, [spaces]);

  const addContact = (newContact) => {
    // Fill default displayDate and time if not present
    const enriched = {
      ...newContact,
      displayDate: newContact.displayDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      displayTime: newContact.displayTime || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      visitDate: newContact.visitDate || new Date().toISOString().split('T')[0],
      topicsDiscussed: newContact.topicsDiscussed || (newContact.rawNotes ? [newContact.rawNotes] : ['Initial meeting notes recorded.']),
      commitmentsMade: newContact.commitmentsMade || newContact.actionItem || 'Follow up as agreed.'
    };
    setContacts(prev => [enriched, ...prev]);
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const updateContact = (id, updates) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const toggleFollowUpStatus = (id) => {
    setContacts(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'followed_up' ? 'pending' : 'followed_up'
        };
      }
      return c;
    }));
  };

  const addSpace = (spaceName, badge = 'Event') => {
    if (!spaceName.trim()) return;
    const newSpace = {
      id: 'space_' + Date.now(),
      name: spaceName.trim(),
      badge,
      members: 1
    };
    setSpaces(prev => [...prev, newSpace]);
    return newSpace;
  };

  // Real CSV Export
  const exportToCSV = () => {
    const headers = ['Name', 'Role', 'Company', 'Event', 'Date', 'Time', 'Location', 'Phone', 'Email', 'Tags', 'Action Item', 'Status', 'Notes'];
    const rows = contacts.map(c => [
      `"${c.name}"`,
      `"${c.role || ''}"`,
      `"${c.company || ''}"`,
      `"${c.event || ''}"`,
      `"${c.displayDate || ''}"`,
      `"${c.displayTime || ''}"`,
      `"${(c.location || '').replace(/"/g, '""')}"`,
      `"${c.phone || ''}"`,
      `"${c.email || ''}"`,
      `"${(c.tags || []).join(', ')}"`,
      `"${c.actionItem || ''}"`,
      `"${c.status || 'pending'}"`,
      `"${(c.rawNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `mynetworkk_contacts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered contacts by search & space
  const filteredContacts = contacts.filter(c => {
    const matchesSpace = selectedSpaceId === 'all' || c.spaceId === selectedSpaceId;
    if (!matchesSpace) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const inName = c.name?.toLowerCase().includes(q);
    const inRole = c.role?.toLowerCase().includes(q);
    const inCompany = c.company?.toLowerCase().includes(q);
    const inEvent = c.event?.toLowerCase().includes(q);
    const inLocation = c.location?.toLowerCase().includes(q);
    const inNotes = c.rawNotes?.toLowerCase().includes(q);
    const inTags = (c.tags || []).some(t => t.toLowerCase().includes(q));

    return inName || inRole || inCompany || inEvent || inLocation || inNotes || inTags;
  });

  return {
    contacts,
    spaces,
    selectedSpaceId,
    setSelectedSpaceId,
    searchQuery,
    setSearchQuery,
    filteredContacts,
    addContact,
    deleteContact,
    updateContact,
    toggleFollowUpStatus,
    addSpace,
    exportToCSV
  };
}
