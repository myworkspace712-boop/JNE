import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs uppercase font-extrabold text-blue-600 tracking-widest block mb-2">Corporate Profile</span>
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">About JN Enterprise</h2>
          <div className="space-y-4 text-slate-600 text-base leading-relaxed">
            <p>
              Established on foundational printing principles, **JN Enterprise** has evolved into a comprehensive graphic design and production center. We bridge the gap between complex digital design files and tangible business media formats.
            </p>
            <p>
              Our facility processes complex arrays ranging from high-volume marketing collateral like brochures and flyers, to precision industrial requirements like barcode rolls and bespoke structural product box models.
            </p>
            <p>
              With dedicated inspection control points spanning paper bag selection, clothing tags, and crystal trophy engravings, we back every run with deep industry expertise.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden">
          <h3 className="text-2xl font-bold mb-6">Corporate Operations Office</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
              <p className="text-slate-300 text-sm">
                104-108, Press Enclave Industrial Belt, Sector-4,<br />
                Corporate Print Zone, India
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-blue-500 flex-shrink-0" />
              <p className="text-slate-300 text-sm">+91 98765 43210</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 flex-shrink-0" />
              <p className="text-slate-300 text-sm">printdesk@jnenterprise.com</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-6 flex justify-between text-xs text-slate-400">
            <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            <span>ISO 9001 Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
}