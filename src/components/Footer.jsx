import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const footerLinks = {
    product: [
      { label: 'Digital Business Card', href: '#features' },
      { label: 'Spaces', href: '#spaces' },
      { label: 'Reminders', href: '#features' },
      { label: 'CRM Sync', href: '#features' },
      { label: 'Pricing', href: '#pricing' }
    ],
    useCases: [
      { label: 'Sales Teams', href: '#spaces' },
      { label: 'Events & Conferences', href: '#spaces' },
      { label: 'Founders', href: '#features' },
      { label: 'Business development', href: '#spaces' },
      { label: 'Teams', href: '#spaces' }
    ],
    resources: [
      { label: 'Resources', href: '#faq' },
      { label: 'Blog', href: '#demo' },
      { label: 'Integrations', href: '#features' },
      { label: 'Community', href: '#spaces' },
      { label: 'Contact us', href: '#contact' }
    ],
    legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Refund & Cancellation Policy', href: '#' },
      { label: 'Acceptable Use Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
      { label: 'Community Guidelines', href: '#' },
      { label: 'Anti-Spam Policy', href: '#' }
    ]
  };

  return (
    <footer className="bg-[#fdedee] border-t border-pink-200/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4 Columns (exact match to screenshot media_1792169151138_8569f5ec.png) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-16 border-b border-pink-200/50">
          
          {/* Column 1: Product */}
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-5">
              Product
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-700 font-medium">
              {footerLinks.product.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-[#80235c] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Use cases */}
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-5">
              Use cases
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-700 font-medium">
              {footerLinks.useCases.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-[#80235c] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-5">
              Resources
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-700 font-medium">
              {footerLinks.resources.map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onOpenContact(item.label)}
                    className="hover:text-[#80235c] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-bold text-gray-900 text-base mb-5">
              Legal
            </h4>
            <ul className="space-y-3.5 text-sm text-gray-700 font-medium">
              {footerLinks.legal.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} onClick={(e) => { e.preventDefault(); alert(`${item.label} will be available upon official launch.`); }} className="hover:text-[#80235c] transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#80235c] text-white flex items-center justify-center">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900">mynetworkk.ai</span>
            <span>— The AI Relationship Memory for Professionals</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Built with passion for real human connections</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline mx-1" />
            <span>© {new Date().getFullYear()} mynetworkk.ai. All rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
