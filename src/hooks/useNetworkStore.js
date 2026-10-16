import { useState, useEffect } from 'react';

const INITIAL_CONTACTS = [
  {
    id: 'conn_1',
    name: 'Rohan Malhotra',
    role: 'Head of Partnerships',
    company: 'BharatCart',
    event: 'Delhi Startup Summit',
    spaceId: 'space_techsparks',
    tags: ['Fintech', 'SDK Integration', 'High Priority'],
    rawNotes: 'Bhai abhi Delhi summit me Rohan se mila, BharatCart ka partnerships head hai. Monday ko hume apna pitch deck WhatsApp pe bhejne ko bola hai.',
    actionItem: 'Send pitch deck and sample SDK documentation on WhatsApp',
    followUpDate: 'Monday, 10:00 AM',
    whatsappMessage: 'Hi Rohan, great meeting you at Delhi Startup Summit! Sharing our pitch deck and sample SDK documentation as discussed.',
    phone: '+91 98765 43210',
    email: 'rohan@bharatcart.in',
    photoUrl: '/assets/media_1792169151282_168d2625.png',
    createdAt: '2024-06-20T10:30:00Z',
    status: 'pending'
  },
  {
    id: 'conn_2',
    name: 'Alex Morgan',
    role: 'Lead Product Designer',
    company: 'FlowLoop',
    event: 'DesignUp 2024',
    spaceId: 'space_designup',
    tags: ['UI/UX', 'Vintage Cameras', 'Design Review'],
    rawNotes: 'Alex is a product designer at FlowLoop. Loves building simple, useful products and vintage cameras. Offered to review our mobile UI onboarding next month.',
    actionItem: 'Ping regarding mobile onboarding review next month',
    followUpDate: 'First week of next month',
    whatsappMessage: 'Hey Alex! Loved our chat at DesignUp about analog cameras and design systems. Looking forward to showing you our onboarding flow!',
    phone: '+1 555 019 2831',
    email: 'alex@flowloop.com',
    createdAt: '2024-06-21T14:15:00Z',
    status: 'pending'
  },
  {
    id: 'conn_3',
    name: 'Priya Sharma',
    role: 'Angel Investor',
    company: 'Nexus Ventures',
    event: 'Bangalore Founders Dinner',
    spaceId: 'space_dinner',
    tags: ['Investor', 'Seed Round', 'High Priority'],
    rawNotes: 'Met Priya Sharma during dinner. She is bullish on AI relationship memory CRM. Wants to see our MRR trajectory and set a 20-min Zoom call.',
    actionItem: 'Share MRR metrics & schedule 20-min Zoom call',
    followUpDate: 'Wednesday, 3:00 PM',
    whatsappMessage: 'Hi Priya, it was wonderful speaking with you at the founders dinner. Here are our MRR highlights and my calendar link for our call: https://cal.com/mynetworkk',
    phone: '+91 99887 76655',
    email: 'priya.sharma@nexusventures.com',
    createdAt: '2024-06-22T20:00:00Z',
    status: 'followed_up'
  }
];

const INITIAL_SPACES = [
  { id: 'all', name: 'All Contacts', badge: 'Global', isDefault: true },
  { id: 'space_techsparks', name: 'TechSparks Summit 2024', badge: 'Conference', members: 4 },
  { id: 'space_designup', name: 'DesignUp 2024', badge: 'Design Meetup', members: 2 },
  { id: 'space_dinner', name: 'Bangalore Founders Dinner', badge: 'Private Dinner', members: 3 }
];

export function useNetworkStore() {
  const [contacts, setContacts] = useState(() => {
    try {
      const saved = localStorage.getItem('mynetworkk_contacts');
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
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
    setContacts(prev => [newContact, ...prev]);
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
    const headers = ['Name', 'Role', 'Company', 'Event', 'Phone', 'Email', 'Tags', 'Action Item', 'Follow Up Due', 'Status', 'Notes'];
    const rows = contacts.map(c => [
      `"${c.name}"`,
      `"${c.role || ''}"`,
      `"${c.company || ''}"`,
      `"${c.event || ''}"`,
      `"${c.phone || ''}"`,
      `"${c.email || ''}"`,
      `"${(c.tags || []).join(', ')}"`,
      `"${c.actionItem || ''}"`,
      `"${c.followUpDate || ''}"`,
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
    const inNotes = c.rawNotes?.toLowerCase().includes(q);
    const inTags = (c.tags || []).some(t => t.toLowerCase().includes(q));

    return inName || inRole || inCompany || inEvent || inNotes || inTags;
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
