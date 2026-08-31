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

  const rejectedCount = extensionLogs.filter((log) => log.status === 'REJECTED').length;
  const pendingCount = extensionLogs.filter((log) => log.status === 'PENDING_TR_REVIEW').length;
  const approvedCount = extensionLogs.filter(
    (log) => log.status === 'APPROVED_FREE' || log.status === 'APPROVED_CHARGEABLE'
  ).length;

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header */}
      <div
        className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center gap-2">
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

        {/* Status Count Badges */}
        <div className="d-flex align-items-center gap-1.5">
          {rejectedCount > 0 && (
            <span
              className="badge rounded-pill fw-bold"
              style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                fontSize: '0.68rem',
                padding: '0.28rem 0.65rem',
              }}
            >
              {rejectedCount} Rejected
            </span>
          )}
          {pendingCount > 0 && (
            <span
              className="badge rounded-pill fw-bold"
              style={{
                backgroundColor: '#fff7ed',
                color: '#ea580c',
                fontSize: '0.68rem',
                padding: '0.28rem 0.65rem',
              }}
            >
              {pendingCount} Pending Review
            </span>
          )}
          {approvedCount > 0 && (
            <span
              className="badge rounded-pill fw-bold"
              style={{
                backgroundColor: '#ecfdf5',
                color: '#059669',
                fontSize: '0.68rem',
                padding: '0.28rem 0.65rem',
              }}
            >
              {approvedCount} Approved
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {extensionLogs.length === 0 ? (
          <div className="text-center py-4 text-muted small">
            No extension records found for this permit.
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
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
                  style={{ borderColor: isRejected ? '#fecaca' : '#e2e8f0' }}
                >
                  {/* Card Item Header */}
                  <div
                    className="p-3 px-3.5 d-flex align-items-center justify-content-between flex-wrap gap-2 border-bottom"
                    style={{
                      backgroundColor: isRejected ? '#fffbfb' : '#f8fafc',
                      borderColor: isRejected ? '#fee2e2' : '#e2e8f0',
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <span className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                        {item.title}
                      </span>
                      {item.requestedDays && (
                        <span
                          className="badge rounded-pill fw-semibold"
                          style={{
                            backgroundColor: '#f1f5f9',
                            color: '#334155',
                            fontSize: '0.72rem',
                            padding: '0.25rem 0.6rem',
                          }}
                        >
                          +{item.requestedDays} Days &bull; until {item.targetDate}
                        </span>
                      )}
                    </div>

                    <span
                      className="badge rounded-pill fw-bold"
                      style={{
                        backgroundColor: badgeBg,
                        color: badgeColor,
                        fontSize: '0.68rem',
                        padding: '0.3rem 0.75rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {badgeText}
                    </span>
                  </div>

                  {/* Card Item Body */}
                  <div className="p-3.5 px-4">
                    {/* Submitter Info Row */}
                    <div className="row g-2 mb-3 pb-2 border-bottom" style={{ borderColor: '#f1f5f9' }}>
                      <div className="col-12 col-sm-6">
                        <div className="text-muted fw-semibold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                          REQUESTED BY
                        </div>
                        <div className="fw-bold text-dark mt-0.5" style={{ fontSize: '0.84rem' }}>
                          {item.requestedBy || 'Budi Santoso (Engineering Lead 01)'}
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="text-muted fw-semibold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                          SUBMITTED AT
                        </div>
                        <div className="text-secondary fw-semibold mt-0.5" style={{ fontSize: '0.82rem' }}>
                          {item.requestedAt}
                        </div>
                      </div>
                    </div>

                    {/* Engineering Technical Reason Section */}
                    {item.requestReason && (
                      <div className="mb-3">
                        <div
                          className="fw-bold text-uppercase text-dark mb-1.5"
                          style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}
                        >
                          TECHNICAL NOTES
                        </div>
                        <div
                          className="fst-italic text-secondary rounded-2 border bg-light"
                          style={{
                            fontSize: '0.84rem',
                            lineHeight: '1.55',
                            padding: '12px 14px',
                            borderColor: '#e2e8f0',
                            color: '#334155',
                          }}
                        >
                          &ldquo;{item.requestReason}&rdquo;
                        </div>
                      </div>
                    )}

                    {/* Attached Photos (if available) */}
                    {item.photos && item.photos.length > 0 && (
                      <div className="mb-3">
                        <div
                          className="fw-bold text-uppercase text-dark mb-1.5 d-flex align-items-center gap-1.5"
                          style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}
                        >
                          <ImageIcon size={14} weight="bold" />
                          <span>REQUEST PHOTOS ({item.photos.length})</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          {item.photos.map((src, pIdx) => (
                            <div
                              key={pIdx}
                              className="position-relative rounded-2 overflow-hidden border cursor-pointer group"
                              style={{ width: '56px', height: '56px', borderColor: '#e2e8f0' }}
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
                                  width: '18px',
                                  height: '18px',
                                  opacity: 0.8,
                                  borderTopLeftRadius: '4px',
                                }}
                              >
                                <MagnifyingGlassPlus size={11} weight="bold" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TENANT RELATION REJECTION DECISION BOX */}
                    {isRejected && (
                      <div
                        className="rounded-3 border p-3 mt-3"
                        style={{
                          backgroundColor: '#fff5f5',
                          borderColor: '#fca5a5',
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex align-items-center gap-1.5">
                            <XCircle size={17} weight="bold" color="#dc2626" />
                            <span
                              className="fw-bold text-danger text-uppercase"
                              style={{ fontSize: '0.76rem', letterSpacing: '0.04em' }}
                            >
                              TENANT RELATION DECISION NOTES (REJECTED)
                            </span>
                          </div>
                          <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                            {item.decidedAt}
                          </span>
                        </div>

                        {/* Rejection Reason Text in Clean White Box */}
                        <div
                          className="bg-white rounded-2 border p-3 mb-2 text-dark fst-italic"
                          style={{
                            fontSize: '0.84rem',
                            lineHeight: '1.55',
                            borderColor: '#fca5a5',
                            color: '#1e293b',
                          }}
                        >
                          &ldquo;{item.decisionReason}&rdquo;
                        </div>

                        {/* Evaluator Footer */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted pt-2 border-top"
                          style={{ borderColor: '#fecaca', fontSize: '0.74rem' }}
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

                    {/* TENANT RELATION APPROVAL DECISION BOX */}
                    {isApproved && (
                      <div
                        className="rounded-3 border p-3 mt-3"
                        style={{
                          backgroundColor: '#f0fdf4',
                          borderColor: '#86efac',
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex align-items-center gap-1.5">
                            <CheckCircle size={17} weight="bold" color="#16a34a" />
                            <span
                              className="fw-bold text-success text-uppercase"
                              style={{ fontSize: '0.76rem', letterSpacing: '0.04em' }}
                            >
                              TENANT RELATION DECISION (APPROVED - {item.status === 'APPROVED_FREE' ? 'FREE OF CHARGE' : 'CHARGEABLE'})
                            </span>
                          </div>
                          <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                            {item.decidedAt}
                          </span>
                        </div>

                        {/* Approval Notes Text in Clean White Box */}
                        {item.decisionReason && (
                          <div
                            className="bg-white rounded-2 border p-3 mb-2 text-dark fst-italic"
                            style={{
                              fontSize: '0.84rem',
                              lineHeight: '1.55',
                              borderColor: '#86efac',
                              color: '#1e293b',
                            }}
                          >
                            &ldquo;{item.decisionReason}&rdquo;
                          </div>
                        )}

                        {/* Evaluator Footer */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted pt-2 border-top"
                          style={{ borderColor: '#bbf7d0', fontSize: '0.74rem' }}
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
        <Modal.Header closeButton style={{ backgroundColor: '#f8fafc' }}>
          <Modal.Title className="fs-6 fw-bold text-dark">Technical Inspection Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3 text-center bg-dark">
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
