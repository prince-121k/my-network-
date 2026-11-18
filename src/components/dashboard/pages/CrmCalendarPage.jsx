import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Calendar as CalendarIcon, 
  Filter,
  Check,
  MapPin,
  User
} from 'lucide-react';

export default function CrmCalendarPage({ 
  contacts = [], 
  onSelectContact, 
  onToggleStatus, 
  onOpenAddConnection 
}) {
  const [selectedDay, setSelectedDay] = useState(18);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Days in November 2026 (Starts on Sunday Nov 1)
  // Nov 2026: Nov 1 is Sunday. Total 30 days.
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const nextMonthDays = [1, 2, 3, 4, 5];

  // Derive tasks from contacts
  const tasks = contacts.map(c => ({
    id: c.id,
    contact: c,
    title: `Follow up with ${c.name} (${c.company})`,
    description: c.rawNotes || 'Discussed collaboration and next steps.',
    dueDay: 18, // matches demo or date
    dueDate: c.displayDate || '18 Nov 2026',
    status: c.status === 'followed_up' ? 'completed' : 'pending',
    priority: c.tags?.includes('High Priority') ? 'high' : 'normal',
    whatsappMessage: c.whatsappMessage || `Hi ${c.name.split(' ')[0]}, following up regarding our meeting!`
  }));

  const filteredTasks = tasks.filter(t => {
    if (statusFilter === 'pending' && t.status !== 'pending') return false;
    if (statusFilter === 'completed' && t.status !== 'completed') return false;
    if (priorityFilter === 'high' && t.priority !== 'high') return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      
      {/* CRM Page Header with Circular Purple + Button (matches screenshot media_1794976841317_484996ac.png) */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          CRM
        </h2>

        <button
          onClick={onOpenAddConnection}
          className="w-10 h-10 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          title="Add New Contact / Task"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Main Calendar Card (matches screenshot media_1794976841317_484996ac.png) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-2xs space-y-6">
        
        {/* Month Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">
            November 2026
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedDay(18)}
              className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Today
            </button>

            <div className="flex items-center bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
              <button 
                onClick={() => setSelectedDay(prev => Math.max(1, prev - 1))}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setSelectedDay(prev => Math.min(30, prev + 1))}
                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-pink-50 text-[#80235c] text-xs font-bold border border-pink-200/60">
              {filteredTasks.length} total tasks
            </div>
          </div>
        </div>

        {/* Calendar Grid (S M T W T F S) */}
        <div className="space-y-2">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-gray-400 py-1">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Days Numbers Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm font-semibold">
            {daysInMonth.map((day) => {
              const isSelected = selectedDay === day;
              const isToday = day === 18;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`h-10 sm:h-11 rounded-2xl flex items-center justify-center transition-all ${
                    isToday
                      ? 'bg-[#80235c] text-white font-extrabold shadow-sm'
                      : isSelected
                      ? 'bg-pink-100 text-[#80235c] font-bold border border-[#80235c]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              );
            })}

            {/* Next Month Faded Days */}
            {nextMonthDays.map((nextDay) => (
              <span
                key={'next_' + nextDay}
                className="h-10 sm:h-11 rounded-2xl flex items-center justify-center text-blue-300 font-medium"
              >
                {nextDay}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Tasks Section for Selected Day (matches screenshot media_1794976841317_484996ac.png) */}
      <div className="space-y-4">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-extrabold text-gray-900">
              Tasks for Nov {selectedDay}, 2026
            </h4>
            <span className="text-xs text-gray-500 font-medium">
              {filteredTasks.length} tasks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task Cards or Empty Sticky Note Graphic */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-pink-100 hover:border-pink-200 shadow-2xs flex items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggleStatus && onToggleStatus(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      task.status === 'completed'
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'border-gray-300 hover:border-[#80235c]'
                    }`}
                  >
                    {task.status === 'completed' && <Check className="w-3.5 h-3.5" />}
                  </button>

                  <div>
                    <h5 
                      onClick={() => onSelectContact && onSelectContact(task.contact)}
                      className={`text-sm font-bold cursor-pointer hover:text-[#80235c] ${
                        task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'
                      }`}
                    >
                      {task.title}
                    </h5>
                    <p className="text-xs text-gray-500 line-clamp-1 italic">
                      "{task.description}"
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-gray-400 font-mono">
                      Due: {task.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(task.whatsappMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cute Sticky Note Empty State (matches bottom graphic in media_1794976841317_484996ac.png) */
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200/90 shadow-2xs space-y-4">
            <div className="w-20 h-20 mx-auto relative flex items-center justify-center">
              {/* Illustrated sticky note icon */}
              <div className="w-16 h-16 bg-[#fedb71] rounded-lg shadow-sm border-2 border-gray-900 rotate-6 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gray-900 -mt-8" />
                <div className="space-y-1 w-10">
                  <div className="h-1 bg-gray-800 rounded-full w-full" />
                  <div className="h-1 bg-gray-800 rounded-full w-4/5" />
                  <div className="h-1 bg-gray-800 rounded-full w-3/5" />
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-base font-bold text-gray-900">
                No tasks scheduled for Nov {selectedDay}, 2026
              </h5>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                Add a new contact or log a meeting update to automatically create follow-up tasks!
              </p>
            </div>

            <button
              onClick={onOpenAddConnection}
              className="px-5 py-2.5 rounded-2xl bg-[#80235c] hover:bg-[#6a1b4b] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Follow-up / Contact</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
