import React, { useState } from 'react';
import { X, Camera, Upload, Check, Sparkles, Building2, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CardScannerModal({ isOpen, onClose, onSaveContact, activeSpaceId }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    event: 'Business Card Scan',
    phone: '',
    email: '',
    tags: 'Conference, Lead',
    actionItem: 'Follow up via email & connect on LinkedIn',
    followUpDate: 'Tomorrow, 10:00 AM'
  });

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      simulateOcrScan(file.name);
    };
    reader.readAsDataURL(file);
  };

  const simulateOcrScan = (filename) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Auto populate realistic data based on typical cards
      const sampleNames = ['Karan Singhal', 'Ananya Deshmukh', 'Vikramaditya Roy', 'Neha Kapoor'];
      const chosenName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
      const first = chosenName.split(' ')[0].toLowerCase();

      setFormData({
        name: chosenName,
        role: 'Director of Growth',
        company: 'HyperScale Mobility',
        event: 'Bangalore Tech Summit',
        phone: '+91 98' + Math.floor(10000000 + Math.random() * 90000000),
        email: `${first}@hyperscalemobility.com`,
        tags: 'Growth, Mobility, EV',
        actionItem: 'Send intro deck & schedule quick Zoom call',
        followUpDate: 'Tomorrow, 11:30 AM'
      });

      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (err) {}
    }, 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSaveContact({
      id: 'conn_' + Date.now(),
      name: formData.name,
      role: formData.role,
      company: formData.company,
      event: formData.event,
      spaceId: activeSpaceId !== 'all' ? activeSpaceId : 'space_techsparks',
      phone: formData.phone,
      email: formData.email,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      actionItem: formData.actionItem,
      followUpDate: formData.followUpDate,
      rawNotes: `Scanned business card for ${formData.name} at ${formData.event}.`,
      whatsappMessage: `Hi ${formData.name.split(' ')[0]}, great meeting you! Connecting regarding ${formData.company}.`,
      photoUrl: imagePreview,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcf786] text-gray-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5 text-[#80235c]" />
            Camera & Card OCR
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            Scan Business Card or Badge
          </h3>
          <p className="text-sm text-gray-600">
            Upload or snap any physical card. mynetworkk.ai extracts contact information instantly.
          </p>
        </div>

        {/* Image Upload Area */}
        <div className="mb-6">
          <label className="border-2 border-dashed border-pink-300 hover:border-[#80235c] bg-pink-50/50 hover:bg-pink-50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden">
            {imagePreview ? (
              <div className="relative w-full max-h-48 flex items-center justify-center">
                <img src={imagePreview} alt="Business Card Preview" className="max-h-48 object-contain rounded-xl shadow-md" />
                {isScanning && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center text-white">
                    <div className="w-8 h-8 border-4 border-[#dcf786] border-t-transparent rounded-full animate-spin mb-2" />
                    <span className="text-xs font-bold">Scanning Card OCR...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white text-[#80235c] flex items-center justify-center mx-auto shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-gray-900 block">Click to upload business card photo</span>
                  <span className="text-xs text-gray-500">Supports PNG, JPG, WebP</span>
                </div>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        {/* Extracted Details Form */}
        <form onSubmit={handleSave} className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Karan Singhal"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company / Organization</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. HyperScale Mobility"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Designation / Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Director of Growth"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="karan@company.com"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Follow-up Due</label>
              <input
                type="text"
                value={formData.followUpDate}
                onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                placeholder="Tomorrow, 11:30 AM"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#80235c]"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name.trim()}
              className="px-7 py-2.5 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all disabled:opacity-50"
            >
              Save Scanned Contact
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
