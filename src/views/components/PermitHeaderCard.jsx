import React from 'react';
import { CheckCircle, CalendarPlus } from '@phosphor-icons/react';

export function PermitHeaderCard({
  permit,
  engineeringRequest,
  onComplete,
  onOpenExtension,
  onPay,
}) {
  const isOrangeStatus =
    permit.status?.toLowerCase().includes('payment') ||
    permit.status?.toLowerCase().includes('waiting');
  const isBlueStatus = permit.status?.toLowerCase().includes('work');
  const hasPendingEngineeringRequest =
    engineeringRequest && engineeringRequest.status === 'PENDING_TR_REVIEW';

  const badgeClass = isOrangeStatus
    ? 'badge-orange-status'
    : isBlueStatus
    ? 'badge-blue-status'
    : 'badge-yellow-status';

  return (
    <div className="proa-card border-primary-top overflow-hidden mb-3">
      {/* Card Body */}
      <div className="p-4">
        {/* Small Category / Type */}
        <div className="text-secondary small fw-bold mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}>
          FIT OUT PERMIT
        </div>

        {/* Permit Number */}
        <h3 className="fw-bold text-dark mb-2" style={{ letterSpacing: '-0.02em', fontSize: '1.45rem' }}>
          {permit.permitNumber}
        </h3>

        {/* Status Badge & Submission Date */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          <span className={badgeClass}>
            {permit.status}
          </span>
          {permit.isExtended && (
            <span
              className="badge d-flex align-items-center gap-1 fw-bold"
              style={{
                backgroundColor: '#fff7ed',
                color: '#ea580c',
                border: 'none',
                fontSize: '0.74rem',
                padding: '0.35rem 0.65rem',
                borderRadius: '0.35rem',
              }}
            >
              <span>EXTENDED</span>
            </span>
          )}
          <span className="text-secondary fw-medium" style={{ fontSize: '0.84rem' }}>
            &bull; &nbsp; Submitted on {permit.submissionDate}
          </span>
        </div>
      </div>

      {/* Card Footer: Action Buttons */}
      <div
        className="p-3 px-4 d-flex align-items-center justify-content-start flex-wrap gap-2 border-top"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        {isOrangeStatus ? (
          /* Testing Flow: Paid button when Waiting Payment */
          <button
            className="btn text-white fw-bold d-flex align-items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: '#16a34a',
              borderColor: '#16a34a',
              borderRadius: '0.45rem',
              fontSize: '0.84rem',
              boxShadow: 'none',
              transition: 'all 0.2s ease',
            }}
            onClick={onPay}
            title="Klik untuk konfirmasi bahwa tenant telah membayar tagihan perpanjangan (Testing Flow)"
          >
            <CheckCircle size={18} weight="bold" />
            <span>Paid</span>
          </button>
        ) : hasPendingEngineeringRequest ? (
          /* Engineering Request is Pending TR Decision */
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <button
              className="btn d-flex align-items-center gap-2 px-4 py-2 fw-bold text-white"
              style={{
                backgroundColor: '#ea580c',
                borderColor: '#ea580c',
                borderRadius: '0.45rem',
                fontSize: '0.84rem',
                boxShadow: '0 2px 5px rgba(234, 88, 12, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onClick={onOpenExtension}
              title="Review engineering extension request"
            >
              <CalendarPlus size={18} weight="bold" />
              <span>Review Extension</span>
            </button>

            <button
              className="btn text-white fw-bold d-flex align-items-center gap-2 px-4 py-2"
              style={{
                backgroundColor: '#16a34a',
                borderColor: '#16a34a',
                borderRadius: '0.45rem',
                fontSize: '0.84rem',
                boxShadow: 'none',
                opacity: 0.85,
              }}
              onClick={onComplete}
              title="Click to complete fitout work"
            >
              <CheckCircle size={18} weight="bold" />
              <span>Complete</span>
            </button>
          </div>
        ) : (
          <>
            {/* 1. Complete Button (Green) */}
            <button
              className="btn text-white fw-bold d-flex align-items-center gap-2 px-4 py-2"
              style={{
                backgroundColor: '#16a34a',
                borderColor: '#16a34a',
                borderRadius: '0.45rem',
                fontSize: '0.84rem',
                boxShadow: 'none',
                transition: 'all 0.2s ease',
              }}
              onClick={onComplete}
              title="Click to complete fitout work"
            >
              <CheckCircle size={18} weight="bold" />
              <span>Complete</span>
            </button>

            {/* 2. Extension Button (Orange) */}
            <button
              className="btn d-flex align-items-center gap-2 px-4 py-2 fw-bold"
              style={{
                color: '#ea580c',
                borderColor: '#fed7aa',
                backgroundColor: '#fff7ed',
                borderRadius: '0.45rem',
                fontSize: '0.84rem',
                boxShadow: 'none',
                transition: 'all 0.2s ease',
              }}
              onClick={onOpenExtension}
              title="Click to request an extension for fitout completion"
            >
              <CalendarPlus size={18} weight="bold" />
              <span>Extension</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
