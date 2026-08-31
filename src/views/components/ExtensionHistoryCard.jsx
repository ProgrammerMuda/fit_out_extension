import React, { useState } from 'react';
import {
  ClockCounterClockwise,
  XCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Image as ImageIcon,
  MagnifyingGlassPlus,
} from '@phosphor-icons/react';
import { Modal } from 'react-bootstrap';

export function ExtensionHistoryCard({ extensionLogs = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="proa-card overflow-hidden mb-4">
      {/* Light Gray Card Header: Exact Match with other cards */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <ClockCounterClockwise size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          EXTENSION HISTORY
        </span>
      </div>

      {/* Card Body: Generous 24px Padding */}
      <div style={{ padding: '24px' }}>
        {extensionLogs.length === 0 ? (
          <div className="text-center py-5 text-muted small">
            No extension records found for this permit.
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {extensionLogs.map((item, index) => {
              const isRejected = item.status === 'REJECTED';
              const isPending = item.status === 'PENDING_TR_REVIEW';
              const isApproved = item.status === 'APPROVED_FREE' || item.status === 'APPROVED_CHARGEABLE';

              // Status Badge Config
              let badgeBg = '#f1f5f9';
              let badgeColor = '#475569';
              let badgeText = 'RECORDED';

              if (isRejected) {
                badgeBg = '#fee2e2';
                badgeColor = '#dc2626';
                badgeText = 'REJECTED';
              } else if (isPending) {
                badgeBg = '#fff7ed';
                badgeColor = '#ea580c';
                badgeText = 'WAITING FOR APPROVAL';
              } else if (isApproved) {
                badgeBg = '#ecfdf5';
                badgeColor = '#059669';
                badgeText = item.status === 'APPROVED_FREE' ? 'APPROVED (FREE)' : 'APPROVED (CHARGEABLE)';
              }

              return (
                <div
                  key={item.id || index}
                  className="rounded-3 border overflow-hidden bg-white shadow-xs"
                  style={{
                    borderColor: isRejected ? '#fca5a5' : '#e2e8f0',
                  }}
                >
                  {/* Card Item Header: Clean Title on Left, Status Badge on Right */}
                  <div
                    className="d-flex align-items-center justify-content-between flex-wrap gap-3 border-bottom"
                    style={{
                      backgroundColor: isRejected ? '#fffaf8' : '#f8fafc',
                      borderColor: isRejected ? '#fecaca' : '#e2e8f0',
                      padding: '16px 24px',
                    }}
                  >
                    <span className="fw-bold text-dark" style={{ fontSize: '0.92rem' }}>
                      {item.title}
                    </span>

                    <span
                      className="badge rounded-pill fw-bold"
                      style={{
                        backgroundColor: badgeBg,
                        color: badgeColor,
                        fontSize: '0.72rem',
                        padding: '0.35rem 0.85rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {badgeText}
                    </span>
                  </div>

                  {/* Card Item Body: Generous 24px Padding */}
                  <div style={{ padding: '24px' }}>
                    {/* Submitter & Extension Period Info Row: 3 Columns */}
                    <div
                      className="row g-3 border-bottom"
                      style={{
                        borderColor: '#f1f5f9',
                        paddingBottom: '20px',
                        marginBottom: '24px',
                      }}
                    >
                      {/* 1. Requested By */}
                      <div className="col-12 col-md-4">
                        <div
                          className="text-muted fw-semibold text-uppercase"
                          style={{ fontSize: '0.7rem', letterSpacing: '0.04em', marginBottom: '6px' }}
                        >
                          REQUESTED BY
                        </div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                          {item.requestedBy || 'Budi Santoso (Engineering Lead 01)'}
                        </div>
                      </div>

                      {/* 2. Requested Extension Period */}
                      <div className="col-12 col-md-4">
                        <div
                          className="text-muted fw-semibold text-uppercase"
                          style={{ fontSize: '0.7rem', letterSpacing: '0.04em', marginBottom: '6px' }}
                        >
                          REQUESTED EXTENSION
                        </div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.94rem' }}>
                          +{item.requestedDays || 3} Days
                        </div>
                        <div
                          className="fw-semibold text-secondary"
                          style={{ fontSize: '0.9rem', marginTop: '6px', letterSpacing: '0.01em' }}
                        >
                          (until {item.targetDate})
                        </div>
                      </div>

                      {/* 3. Submitted At */}
                      <div className="col-12 col-md-4">
                        <div
                          className="text-muted fw-semibold text-uppercase"
                          style={{ fontSize: '0.7rem', letterSpacing: '0.04em', marginBottom: '6px' }}
                        >
                          SUBMITTED AT
                        </div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                          {item.requestedAt}
                        </div>
                      </div>
                    </div>

                    {/* Engineering Technical Reason Section: Spacious 18px 22px Box */}
                    {item.requestReason && (
                      <div style={{ marginBottom: '24px' }}>
                        <div
                          className="fw-bold text-uppercase text-dark"
                          style={{ fontSize: '0.74rem', letterSpacing: '0.04em', marginBottom: '10px' }}
                        >
                          TECHNICAL NOTES
                        </div>
                        <div
                          className="fst-italic rounded-2 border"
                          style={{
                            backgroundColor: '#f8fafc',
                            borderColor: '#e2e8f0',
                            padding: '16px 20px',
                            fontSize: '0.88rem',
                            lineHeight: '1.6',
                            color: '#334155',
                          }}
                        >
                          &ldquo;{item.requestReason}&rdquo;
                        </div>
                      </div>
                    )}

                    {/* Attached Photos: Spacious Gallery */}
                    {item.photos && item.photos.length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        <div
                          className="fw-bold text-uppercase text-dark d-flex align-items-center gap-2.5"
                          style={{ fontSize: '0.74rem', letterSpacing: '0.04em', marginBottom: '12px' }}
                        >
                          <ImageIcon size={17} weight="bold" />
                          <span>
                            REQUEST PHOTOS ({item.photos.length} {item.photos.length === 1 ? 'PHOTO' : 'PHOTOS'})
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          {item.photos.map((src, pIdx) => (
                            <div
                              key={pIdx}
                              className="position-relative rounded-3 overflow-hidden border cursor-pointer group shadow-xs"
                              style={{ width: '64px', height: '64px', borderColor: '#e2e8f0' }}
                              onClick={() => setSelectedPhoto(src)}
                              title="Click to view full photo"
                            >
                              <img
                                src={src}
                                alt={`Documentation ${pIdx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <div
                                className="position-absolute bottom-0 end-0 bg-dark text-white d-flex align-items-center justify-content-center"
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  opacity: 0.85,
                                  borderTopLeftRadius: '5px',
                                }}
                              >
                                <MagnifyingGlassPlus size={12} weight="bold" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TENANT RELATION REJECTION DECISION BOX: Generous 22px 24px Padding & 16px Separation */}
                    {isRejected && (
                      <div
                        className="rounded-3 border"
                        style={{
                          backgroundColor: '#fff5f5',
                          borderColor: '#fca5a5',
                          padding: '22px 24px',
                          marginTop: '24px',
                        }}
                      >
                        {/* Rejection Header Row */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2"
                          style={{ marginBottom: '16px' }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <XCircle size={18} weight="bold" color="#dc2626" />
                            <span
                              className="fw-bold text-danger text-uppercase"
                              style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}
                            >
                              TENANT RELATION DECISION NOTES (REJECTED)
                            </span>
                          </div>
                          <span className="text-muted small" style={{ fontSize: '0.74rem' }}>
                            {item.decidedAt}
                          </span>
                        </div>

                        {/* Rejection Reason Text in Spacious Pure White Card */}
                        <div
                          className="bg-white rounded-2 border fst-italic text-dark"
                          style={{
                            borderColor: '#fca5a5',
                            padding: '16px 20px',
                            fontSize: '0.88rem',
                            lineHeight: '1.6',
                            color: '#1e293b',
                            marginBottom: '16px',
                          }}
                        >
                          &ldquo;{item.decisionReason}&rdquo;
                        </div>

                        {/* Evaluator Footer with Generous Top Padding */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted border-top"
                          style={{
                            borderColor: '#fecaca',
                            paddingTop: '14px',
                            fontSize: '0.76rem',
                          }}
                        >
                          <span>
                            Decided by: <strong>{item.decidedBy || 'Tenant Relation Lead - Management'}</strong>
                          </span>
                          <span>
                            Decision: <strong className="text-danger">Request Rejected</strong>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* TENANT RELATION APPROVAL DECISION BOX: Generous 22px 24px Padding & 16px Separation */}
                    {isApproved && (
                      <div
                        className="rounded-3 border"
                        style={{
                          backgroundColor: '#f0fdf4',
                          borderColor: '#86efac',
                          padding: '22px 24px',
                          marginTop: '24px',
                        }}
                      >
                        {/* Approval Header Row */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2"
                          style={{ marginBottom: '16px' }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <CheckCircle size={18} weight="bold" color="#16a34a" />
                            <span
                              className="fw-bold text-success text-uppercase"
                              style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}
                            >
                              TENANT RELATION DECISION (APPROVED - {item.status === 'APPROVED_FREE' ? 'FREE OF CHARGE' : 'CHARGEABLE'})
                            </span>
                          </div>
                          <span className="text-muted small" style={{ fontSize: '0.74rem' }}>
                            {item.decidedAt}
                          </span>
                        </div>

                        {/* Approval Notes Text in Spacious Pure White Card */}
                        {item.decisionReason && (
                          <div
                            className="bg-white rounded-2 border fst-italic text-dark"
                            style={{
                              borderColor: '#86efac',
                              padding: '16px 20px',
                              fontSize: '0.88rem',
                              lineHeight: '1.6',
                              color: '#1e293b',
                              marginBottom: '16px',
                            }}
                          >
                            &ldquo;{item.decisionReason}&rdquo;
                          </div>
                        )}

                        {/* Evaluator Footer with Generous Top Padding */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted border-top"
                          style={{
                            borderColor: '#bbf7d0',
                            paddingTop: '14px',
                            fontSize: '0.76rem',
                          }}
                        >
                          <span>
                            Approved by: <strong>{item.decidedBy || 'Tenant Relation Lead - Management'}</strong>
                          </span>
                          <span>
                            Policy: <strong className="text-success">{item.status === 'APPROVED_FREE' ? 'Free Tolerance Exemption' : 'Supervision Chargeable'}</strong>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Modal show={!!selectedPhoto} onHide={() => setSelectedPhoto(null)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#f8fafc', padding: '16px 20px' }}>
          <Modal.Title className="fs-6 fw-bold text-dark">Technical Inspection Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center bg-dark">
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Full Preview"
              className="img-fluid rounded"
              style={{ maxHeight: '75vh', objectFit: 'contain' }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
