import React, { useState } from 'react';
import { Plus, X, ArrowUpRight } from 'lucide-react';

export default function FaqSection({ onOpenContact }) {
  // Q1, Q2, Q3 open by default like in screenshot
  const [openItems, setOpenItems] = useState({
    0: true,
    1: true,
    2: true,
    3: false,
    4: false
  });

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqs = [
    {
      question: "What is mynetworkk.ai?",
      answer: "mynetworkk.ai is a networking app that helps you save contacts, remember what you talked about, get reminded to follow up, and keep a whole team's event contacts in one shared place."
    },
    {
      question: "Is mynetworkk.ai free to use?",
      answer: "Yes. The free plan includes unlimited event hosting and attendance, up to 100 contacts with full context, business card scanning, and a digital card with Spaces — no credit card required."
    },
    {
      question: "What is a Space?",
      answer: "A Space is a shared folder for one event, meeting, or project. Invite the team, and everyone's scanned contacts land in the same searchable place, instead of staying trapped in individual phones."
    },
    {
      question: "Does voice transcription work with Hinglish and Indian accents?",
      answer: "Yes, absolutely! mynetworkk.ai is designed India-first. You can speak naturally in conversational Hinglish, Hindi, or English, and our audio engine reliably extracts names, companies, and promises."
    },
    {
      question: "Is my personal contact data and network private?",
      answer: "100%. Your relationships and notes are private to you (or your chosen shared Space). We never sell your contact book or train public models on your private conversations."
    }
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (matching screenshot media_1792169151232_9b3fab14.png) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              Frequently asked questions
            </h2>

            <div className="space-y-4">
              <p className="text-base text-gray-600 font-medium">
                Can't find your answer?
              </p>

              {/* Contact us plum pill button (exact match to screenshot) */}
              <div>
                <button
                  onClick={() => onOpenContact('General Question / FAQ')}
                  className="px-6 py-3 rounded-full bg-[#80235c] hover:bg-[#6a1b4b] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all active:scale-95"
                >
                  Contact us
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Accordions (exact match to screenshot) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = !!openItems[index];
              return (
                <div
                  key={index}
                  className="border border-gray-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white shadow-2xs hover:border-gray-300 transition-all"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between text-left gap-4"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {faq.question}
                    </h3>
                    
                    {/* Circle button with x or plus (matching screenshot) */}
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0 hover:bg-gray-200 transition-colors">
                      {isOpen ? (
                        <X className="w-4 h-4 text-gray-800" />
                      ) : (
                        <Plus className="w-4 h-4 text-gray-800" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-gray-100 text-gray-600 text-sm sm:text-base leading-relaxed animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
