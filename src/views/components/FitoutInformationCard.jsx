import React from 'react';
import {
  Hash,
  Hammer,
  CalendarBlank,
  Clock,
} from '@phosphor-icons/react';

export function FitoutInformationCard({ permit }) {
  const isWaitingPayment = permit.status?.toLowerCase().includes('payment');
  const isOnWork = permit.status?.toLowerCase().includes('work');

  const bannerClass = isWaitingPayment
    ? 'waiting-payment-banner'
    : isOnWork
    ? 'on-work-banner'
    : 'final-inspection-banner';

  const bannerTitle = isWaitingPayment
    ? 'Waiting for Payment'
    : isOnWork
    ? 'On Work'
    : 'Final Inspection';

  const bannerText = isWaitingPayment
    ? 'Extension fee invoice has been issued. Fitout period extension will be fully applied upon payment confirmation.'
    : isOnWork
    ? 'Fitout work is currently in progress. Please ensure safety protocols and building rules are followed.'
    : 'Final inspection is scheduled. Please ensure your unit is ready.';

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Dynamic Status Banner (Orange for Waiting Payment, Blue for On Work, Amber for Final Inspection) */}
      <div className={bannerClass}>
        <h6 className="fw-bold mb-1 text-white" style={{ fontSize: '0.98rem' }}>
          {bannerTitle}
        </h6>
        <p className="mb-0 text-white" style={{ fontSize: '0.82rem', lineHeight: '1.45', opacity: 0.95 }}>
          {bannerText}
        </p>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="text-secondary small fw-bold mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.04em' }}>
          FIT OUT INFORMATION
        </div>

        {/* Request Code */}
        <div className="d-flex align-items-start gap-3 mb-3">
          <div
            className="info-icon-square flex-shrink-0"
            style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
          >
            <Hash size={18} weight="bold" />
          </div>
          <div>
            <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.66rem', letterSpacing: '0.03em' }}>
              REQUEST CODE
            </div>
            <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
              {permit.permitNumber}
            </div>
          </div>
        </div>

        {/* Work Type */}
        <div className="d-flex align-items-start gap-3 mb-3">
          <div
            className="info-icon-square flex-shrink-0"
            style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
          >
            <Hammer size={18} weight="fill" />
          </div>
          <div>
            <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.66rem', letterSpacing: '0.03em' }}>
              WORK TYPE
            </div>
            <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
              {permit.workType}
            </div>
          </div>
        </div>

        {/* Scheduled Period */}
        <div className="d-flex align-items-start gap-3">
          <div
            className="info-icon-square flex-shrink-0"
            style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
          >
            <CalendarBlank size={18} weight="fill" />
          </div>
          <div>
            <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.66rem', letterSpacing: '0.03em' }}>
              SCHEDULED PERIOD
            </div>
            <div className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>
              {permit.scheduledStartDate} - {permit.scheduledEndDate}
            </div>
            <div className="d-flex align-items-center gap-2 mt-1">
              <div className="d-flex align-items-center gap-1" style={{ color: '#27b29b', fontSize: '0.78rem', fontWeight: 600 }}>
                <Clock size={14} weight="bold" />
                <span>{permit.durationDays} Days Duration</span>
              </div>
              {permit.isExtended && (
                <span className="badge bg-warning-subtle text-warning-emphasis fw-bold" style={{ fontSize: '0.68rem' }}>
                  +{permit.extensionDays || 3}D Extended
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
