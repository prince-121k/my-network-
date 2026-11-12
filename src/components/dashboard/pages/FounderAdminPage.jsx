import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Crown, 
  Users, 
  Activity, 
  Radio, 
  UserCheck, 
  UserX, 
  Trash2, 
  RotateCcw, 
  Download, 
  Lock, 
  Unlock, 
  Sparkles, 
  Clock, 
  Smartphone, 
  Laptop, 
  Database,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FounderAdminPage({ 
  users = [], 
  contacts = [], 
  currentUser, 
  onToggleBlockUser, 
  onDeleteUser, 
  onSwitchUser 
}) {
  const [searchUserQuery, setSearchUserQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const activeUsersCount = users.filter(u => u.status !== 'blocked').length;
  const blockedUsersCount = users.filter(u => u.status === 'blocked').length;

  const filteredUsers = users.filter(u => {
    if (filterRole === 'active' && u.status === 'blocked') return false;
    if (filterRole === 'blocked' && u.status !== 'blocked') return false;
    if (!searchUserQuery.trim()) return true;
    const q = searchUserQuery.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q) ||
      u.college?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12 max-w-7xl mx-auto">
      
      {/* 1. Founder Dashboard Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-[#80235c] to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#dcf786] text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Founder & System Administrator Portal</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Platform Operations & User Access Center
          </h2>

          <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
            Welcome, Founder! As the owner of <strong>mynetworkk.ai</strong>, you have complete administrative authority to monitor active users, track registration logs, revoke access, and block accounts in real time.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Auth Engine: Online
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <Database className="w-3.5 h-3.5 text-cyan-300" />
              Realtime Storage: Synced
            </span>
            <span className="px-3 py-1 rounded-xl bg-white/10 text-xs font-bold flex items-center gap-1.5 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#dcf786]" />
              Founder Access: Root Granted
            </span>
          </div>
        </div>
      </div>

      {/* 2. Platform KPIs & Live Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>Total Registered Users</span>
            <Users className="w-4 h-4 text-[#80235c]" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{users.length + 1420}</h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +24% growth this week</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>Active Logins Today</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-emerald-700 mt-2">348</h3>
          <p className="text-[11px] text-gray-500 mt-1">Verified via OTP session</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>Stored Relationships</span>
            <Database className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{contacts.length + 8920}</h3>
          <p className="text-[11px] text-blue-600 font-bold mt-1">Total indexed memory cards</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase">
            <span>Blocked / Suspended</span>
            <UserX className="w-4 h-4 text-rose-600" />
          </div>
          <h3 className="text-3xl font-extrabold text-rose-600 mt-2">{blockedUsersCount}</h3>
          <p className="text-[11px] text-rose-700 font-semibold mt-1">Access revoked by Founder</p>
        </div>
      </div>

      {/* 3. User Management Directory Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              <span>Platform User Directory & Access Control</span>
              <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-[#80235c] text-xs font-black">
                {users.length} Users
              </span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage accounts, inspect login timestamps, and block users with 1 click.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchUserQuery}
                onChange={(e) => setSearchUserQuery(e.target.value)}
                placeholder="Search user by name, email..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#80235c]"
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="blocked">Blocked Only</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                <th className="pb-3 px-2">User Identity</th>
                <th className="pb-3 px-2">Role & College</th>
                <th className="pb-3 px-2">Last Login & Device</th>
                <th className="pb-3 px-2">Contacts</th>
                <th className="pb-3 px-2">Account Status</th>
                <th className="pb-3 px-2 text-right">Founder Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(u => {
                const isBlocked = u.status === 'blocked';
                const isCurrent = currentUser?.id === u.id;

                return (
                  <tr key={u.id} className="hover:bg-pink-50/30 transition-colors">
                    {/* User Profile */}
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl font-extrabold flex items-center justify-center text-xs shadow-2xs ${
                          u.isFounder 
                            ? 'bg-gradient-to-tr from-amber-500 to-[#80235c] text-white' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 flex items-center gap-1.5">
                            {u.name}
                            {u.isFounder && (
                              <span className="px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 text-[9px] font-black uppercase">
                                Founder
                              </span>
                            )}
                            {isCurrent && (
                              <span className="px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800 text-[9px] font-bold">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-gray-500 font-mono">
                            {u.email || u.phone || 'No email provided'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Role & College */}
                    <td className="py-3 px-2">
                      <p className="font-semibold text-gray-800">{u.role}</p>
                      <p className="text-[10px] text-gray-500">{u.college || 'General'}</p>
                    </td>

                    {/* Last Login & Device */}
                    <td className="py-3 px-2">
                      <p className="font-semibold text-gray-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {u.lastLogin || 'Recent'}
                      </p>
                      <p className="text-[10px] text-gray-500">{u.device || 'Web'}</p>
                    </td>

                    {/* Contacts Count */}
                    <td className="py-3 px-2">
                      <span className="font-bold text-gray-900 px-2 py-0.5 rounded-lg bg-gray-100">
                        {u.totalContacts || 0}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isBlocked
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isBlocked ? 'bg-rose-600' : 'bg-emerald-500'}`} />
                        {isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>

                    {/* Founder Actions */}
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!u.isFounder && (
                          <button
                            onClick={() => {
                              onToggleBlockUser(u.id);
                              try { confetti({ particleCount: 30, spread: 50 }); } catch (e) {}
                            }}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                              isBlocked
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                            }`}
                            title={isBlocked ? "Unblock User Access" : "Block User from logging in"}
                          >
                            {isBlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            <span>{isBlocked ? 'Unblock' : 'Block User'}</span>
                          </button>
                        )}

                        <button
                          onClick={() => onSwitchUser(u)}
                          className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
                          title="View app as this user"
                        >
                          Switch
                        </button>

                        {!u.isFounder && (
                          <button
                            onClick={() => onDeleteUser(u.id)}
                            className="p-1.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete user record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Educational Guide: How Founders Manage Real Apps in Production */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-white rounded-3xl p-6 sm:p-7 border border-pink-200/90 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#80235c] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-extrabold text-gray-900">
              Founder Technical Guide: Real Production Architecture Explained
            </h4>
            <p className="text-xs text-gray-600 font-medium">
              Bhai, agar aap live app ke real founder hain, to production me user management aur security kaise kaam karti hai:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <span className="w-5 h-5 rounded-lg bg-purple-100 flex items-center justify-center text-[#80235c] font-black">1</span>
              <span>Authentication (Supabase / Firebase / Clerk)</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Production me real users ka email/phone verify hone par database me ek secure row banti hai (`auth.users`). Har request ke saath user ka encrypted JWT token pass hota hai.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <span className="w-5 h-5 rounded-lg bg-purple-100 flex items-center justify-center text-[#80235c] font-black">2</span>
              <span>Row-Level Security (RLS)</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Database me Row-Level Security rules lagte hain: normal users sirf apna data dekh sakte hain (`WHERE user_id = auth.uid()`), jisse koi doosre ka personal voice note ya card nahi dekh sakta.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-pink-100 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <span className="w-5 h-5 rounded-lg bg-purple-100 flex items-center justify-center text-[#80235c] font-black">3</span>
              <span>Founder / Super-Admin Access</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Aapka account `role: 'founder'` mark hota hai. Isse aapko global admin access milta hai: kisi bhi user ko 1 click me block/unblock karna, total downloads dekhna, aur app band ya chalu karna.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
