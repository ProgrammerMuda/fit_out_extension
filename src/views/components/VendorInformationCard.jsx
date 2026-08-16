import React from 'react';
import { Buildings, User, Phone } from '@phosphor-icons/react';

export function VendorInformationCard({
  companyName = 'PT. Properti Teknik Indonesia',
  vendorPic = 'Ahmad Rizky',
  contactNumber = '081234567890',
}) {
  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <Buildings size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          VENDOR INFORMATION
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Company Name */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="info-icon-square flex-shrink-0"
            style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
          >
            <Buildings size={20} weight="fill" />
          </div>
          <div>
            <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
              COMPANY NAME
            </div>
            <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
              {companyName}
            </div>
          </div>
        </div>

        {/* Vendor PIC */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="info-icon-square flex-shrink-0"
            style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
          >
            <User size={20} weight="fill" />
          </div>
          <div>
            <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
              VENDOR PIC
            </div>
            <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
              {vendorPic}
            </div>
          </div>
        </div>

        {/* Contact Number */}
        <div className="d-flex align-items-center gap-3">
          <div
            className="info-icon-square flex-shrink-0"
            style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
          >
            <Phone size={20} weight="fill" />
          </div>
          <div>
            <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
              CONTACT NUMBER
            </div>
            <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
              {contactNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
