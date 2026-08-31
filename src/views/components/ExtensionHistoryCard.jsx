import React, { useState } from 'react';
import {
  ClockCounterClockwise,
  XCircle,
  CheckCircle,
  Clock,
  Wrench,
  User,
  Calendar,
  Image as ImageIcon,
  CaretDown,
  CaretUp,
} from '@phosphor-icons/react';
import { Modal } from 'react-bootstrap';

export function ExtensionHistoryCard({ extensionLogs = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const rejectedCount = extensionLogs.filter((log) => log.status === 'REJECTED').length;
  const pendingCount = extensionLogs.filter((log) => log.status === 'PENDING_TR_REVIEW').length;
  const approvedCount = extensionLogs.filter(
    (log) => log.status === 'APPROVED_FREE' || log.status === 'APPROVED_CHARGEABLE'
  ).length;

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Header */}
      <div
        className="p-3 px-4 d-flex align-items-center justify-content-between cursor-pointer user-select-none border-bottom"
        onClick={() => setIsExpanded((prev) => !prev)}
        style={{
          backgroundColor: '#f8fafc',
          borderColor: '#e2e8f0',
          cursor: 'pointer',
        }}
        role="button"
        aria-expanded={isExpanded}
      >
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
            <ClockCounterClockwise size={21} weight="bold" />
          </div>
          <span
            className="fw-bold text-dark text-uppercase"
            style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
          >
            EXTENSION HISTORY
          </span>

          {/* Quick Summary Pill Badges */}
          <div className="d-flex align-items-center gap-1.5 ms-sm-2">
            {rejectedCount > 0 && (
              <span
                className="badge rounded-pill fw-bold"
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  fontSize: '0.68rem',
                  padding: '0.22rem 0.55rem',
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
                  padding: '0.22rem 0.55rem',
                }}
              >
                {pendingCount} Pending Review
              </span>
            )}
            {approvedCount > 0 && (
              <span
                className="badge rounded-pill fw-bold"
                style={{
                  backgroundColor: '#f0fdf4',
                  color: '#16a34a',
                  fontSize: '0.68rem',
                  padding: '0.22rem 0.55rem',
                }}
              >
                {approvedCount} Approved
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="btn btn-link p-0 text-secondary border-0 d-flex align-items-center"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded((prev) => !prev);
          }}
        >
          {isExpanded ? <CaretUp size={18} weight="bold" /> : <CaretDown size={18} weight="bold" />}
        </button>
      </div>

      {/* Body Content */}
      {isExpanded && (
        <div className="p-4">
          {extensionLogs.length === 0 ? (
            <div className="text-center py-4 text-muted small">
              No extension requests recorded yet.
            </div>
          ) : (
            <div className="position-relative ps-1">
              {extensionLogs.map((item, index) => {
                const isRejected = item.status === 'REJECTED';
                const isPending = item.status === 'PENDING_TR_REVIEW';
                const isApproved = item.status === 'APPROVED_FREE' || item.status === 'APPROVED_CHARGEABLE';

                // Status Badge Color Scheme
                let badgeBg = '#f1f5f9';
                let badgeColor = '#475569';
                let badgeText = 'RECORDED';
                let markerColor = '#64748b';

                if (isRejected) {
                  badgeBg = '#fee2e2';
                  badgeColor = '#dc2626';
                  badgeText = 'REJECTED BY TR';
                  markerColor = '#dc2626';
                } else if (isPending) {
                  badgeBg = '#fff7ed';
                  badgeColor = '#ea580c';
                  badgeText = 'WAITING FOR APPROVAL';
                  markerColor = '#ea580c';
                } else if (isApproved) {
                  badgeBg = item.status === 'APPROVED_FREE' ? '#f0fdf4' : '#f0f9ff';
                  badgeColor = item.status === 'APPROVED_FREE' ? '#16a34a' : '#0284c7';
                  badgeText = item.status === 'APPROVED_FREE' ? 'APPROVED (FREE)' : 'APPROVED (CHARGEABLE)';
                  markerColor = item.status === 'APPROVED_FREE' ? '#16a34a' : '#0284c7';
                }

                return (
                  <div key={item.id || index} className="position-relative pb-4 last:pb-0">
                    {/* Vertical Timeline Track */}
                    {index < extensionLogs.length - 1 && (
                      <div
                        className="position-absolute"
                        style={{
                          left: '11px',
                          top: '26px',
                          bottom: '-8px',
                          width: '2px',
                          borderLeft: `2px dashed ${markerColor === '#dc2626' ? '#fca5a5' : '#cbd5e1'}`,
                          zIndex: 1,
                        }}
                      />
                    )}

                    <div className="d-flex align-items-start gap-3">
                      {/* Timeline Icon Marker */}
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: '#ffffff',
                          color: markerColor,
                          zIndex: 2,
                        }}
                      >
                        {isRejected && <XCircle size={22} weight="fill" />}
                        {isPending && <Clock size={22} weight="fill" />}
                        {isApproved && <CheckCircle size={22} weight="fill" />}
                        {!isRejected && !isPending && !isApproved && <Clock size={22} weight="fill" />}
                      </div>

                      {/* Content Card */}
                      <div
                        className="flex-grow-1 p-3.5 rounded-3 border"
                        style={{
                          backgroundColor: isRejected ? '#fffbfb' : '#ffffff',
                          borderColor: isRejected ? '#fecaca' : '#e2e8f0',
                        }}
                      >
                        {/* Title Row & Status Badge */}
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                              {item.title}
                            </span>
                            {item.requestedDays && (
                              <span
                                className="badge fw-semibold"
                                style={{
                                  backgroundColor: '#f1f5f9',
                                  color: '#334155',
                                  fontSize: '0.7rem',
                                  padding: '0.2rem 0.5rem',
                                }}
                              >
                                +{item.requestedDays} Days ({item.targetDate})
                              </span>
                            )}
                          </div>

                          <span
                            className="badge rounded-pill fw-bold"
                            style={{
                              backgroundColor: badgeBg,
                              color: badgeColor,
                              fontSize: '0.68rem',
                              padding: '0.28rem 0.65rem',
                              letterSpacing: '0.02em',
                            }}
                          >
                            {badgeText}
                          </span>
                        </div>

                        {/* Submitter & Timestamp Info */}
                        <div className="d-flex align-items-center gap-3 text-muted small mb-2.5 flex-wrap" style={{ fontSize: '0.74rem' }}>
                          <span className="d-flex align-items-center gap-1">
                            <User size={13} />
                            <strong>{item.requestedBy}</strong>
                          </span>
                          <span className="d-flex align-items-center gap-1">
                            <Clock size={13} />
                            <span>{item.requestedAt}</span>
                          </span>
                        </div>

                        {/* Engineering Technical Reason */}
                        {item.requestReason && (
                          <div
                            className="p-2.5 rounded-2 mb-2.5"
                            style={{
                              backgroundColor: '#f8fafc',
                              borderLeft: '3px solid #64748b',
                              fontSize: '0.76rem',
                              color: '#334155',
                              lineHeight: '1.45',
                            }}
                          >
                            <div className="text-muted fw-semibold mb-0.5" style={{ fontSize: '0.7rem' }}>
                              Engineering Request Reason:
                            </div>
                            {item.requestReason}
                          </div>
                        )}

                        {/* Request Photo Attachments (if any) */}
                        {item.photos && item.photos.length > 0 && (
                          <div className="mb-2.5">
                            <div className="d-flex align-items-center gap-1 text-muted mb-1.5" style={{ fontSize: '0.72rem' }}>
                              <ImageIcon size={13} />
                              <span className="fw-semibold">Technical Photos ({item.photos.length}):</span>
                            </div>
                            <div className="d-flex gap-2 flex-wrap">
                              {item.photos.map((src, pIdx) => (
                                <img
                                  key={pIdx}
                                  src={src}
                                  alt={`Documentation ${pIdx + 1}`}
                                  className="rounded border cursor-pointer hover-opacity"
                                  style={{
                                    width: '64px',
                                    height: '64px',
                                    objectFit: 'cover',
                                    borderColor: '#cbd5e1',
                                  }}
                                  onClick={() => setSelectedPhoto(src)}
                                  title="Click to view full photo"
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* REJECTION DECISION BOX */}
                        {isRejected && (
                          <div
                            className="p-3 rounded-2"
                            style={{
                              backgroundColor: '#fff5f5',
                              border: '1px solid #fca5a5',
                              borderLeft: '4px solid #dc2626',
                            }}
                          >
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-1">
                              <span className="fw-bold text-danger d-flex align-items-center gap-1.5" style={{ fontSize: '0.76rem' }}>
                                <XCircle size={14} weight="bold" />
                                TENANT RELATION DECISION: REJECTED
                              </span>
                              <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                                {item.decidedAt}
                              </span>
                            </div>
                            <div className="text-secondary small fw-medium" style={{ fontSize: '0.72rem' }}>
                              Decided by: <strong>{item.decidedBy || 'Tenant Relation Lead - Management'}</strong>
                            </div>
                            <div className="mt-1.5 text-danger small" style={{ fontSize: '0.76rem', lineHeight: '1.45' }}>
                              <strong>Rejection Reason:</strong> &ldquo;{item.decisionReason}&rdquo;
                            </div>
                          </div>
                        )}

                        {/* APPROVAL DECISION BOX */}
                        {isApproved && (
                          <div
                            className="p-3 rounded-2"
                            style={{
                              backgroundColor: item.status === 'APPROVED_FREE' ? '#f0fdf4' : '#f0f9ff',
                              border: `1px solid ${item.status === 'APPROVED_FREE' ? '#bbf7d0' : '#bae6fd'}`,
                              borderLeft: `4px solid ${item.status === 'APPROVED_FREE' ? '#16a34a' : '#0284c7'}`,
                            }}
                          >
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-1">
                              <span
                                className="fw-bold d-flex align-items-center gap-1.5"
                                style={{
                                  fontSize: '0.76rem',
                                  color: item.status === 'APPROVED_FREE' ? '#15803d' : '#0369a1',
                                }}
                              >
                                <CheckCircle size={14} weight="bold" />
                                TENANT RELATION DECISION: {item.status === 'APPROVED_FREE' ? 'APPROVED (FREE OF CHARGE)' : 'APPROVED (CHARGEABLE)'}
                              </span>
                              <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                                {item.decidedAt}
                              </span>
                            </div>
                            <div className="text-secondary small fw-medium" style={{ fontSize: '0.72rem' }}>
                              Decided by: <strong>{item.decidedBy || 'Tenant Relation Lead - Management'}</strong>
                            </div>
                            {item.decisionReason && (
                              <div className="mt-1.5 text-dark small" style={{ fontSize: '0.76rem', lineHeight: '1.45' }}>
                                <strong>Decision Notes:</strong> &ldquo;{item.decisionReason}&rdquo;
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal for Full Photo Inspection */}
      <Modal show={!!selectedPhoto} onHide={() => setSelectedPhoto(null)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#f8fafc' }}>
          <Modal.Title className="fs-6 fw-bold text-dark">Technical Inspection Documentation</Modal.Title>
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
