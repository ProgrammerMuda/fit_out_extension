import React, { useState } from 'react';
import {
  ClockCounterClockwise,
  XCircle,
  CheckCircle,
  Clock,
  User,
  Image as ImageIcon,
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
      {/* Clean Light Gray Card Header */}
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
                padding: '0.25rem 0.6rem',
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
                padding: '0.25rem 0.6rem',
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
                padding: '0.25rem 0.6rem',
              }}
            >
              {approvedCount} Approved
            </span>
          )}
        </div>
      </div>

      {/* Card Body: Sleek Vertical Timeline */}
      <div className="p-4">
        {extensionLogs.length === 0 ? (
          <div className="text-center py-4 text-muted small">
            No extension records found for this permit.
          </div>
        ) : (
          <div className="position-relative">
            {extensionLogs.map((item, index) => {
              const isRejected = item.status === 'REJECTED';
              const isPending = item.status === 'PENDING_TR_REVIEW';
              const isApproved = item.status === 'APPROVED_FREE' || item.status === 'APPROVED_CHARGEABLE';
              const isLast = index === extensionLogs.length - 1;

              // Node & Status styles
              let nodeBg = '#f1f5f9';
              let nodeIconColor = '#64748b';
              let NodeIcon = Clock;
              let badgeBg = '#f1f5f9';
              let badgeColor = '#475569';
              let badgeText = 'RECORDED';

              if (isRejected) {
                nodeBg = '#fee2e2';
                nodeIconColor = '#dc2626';
                NodeIcon = XCircle;
                badgeBg = '#fee2e2';
                badgeColor = '#dc2626';
                badgeText = 'REJECTED';
              } else if (isPending) {
                nodeBg = '#fff7ed';
                nodeIconColor = '#ea580c';
                NodeIcon = Clock;
                badgeBg = '#fff7ed';
                badgeColor = '#ea580c';
                badgeText = 'WAITING FOR APPROVAL';
              } else if (isApproved) {
                nodeBg = '#ecfdf5';
                nodeIconColor = '#059669';
                NodeIcon = CheckCircle;
                badgeBg = '#ecfdf5';
                badgeColor = '#059669';
                badgeText = item.status === 'APPROVED_FREE' ? 'APPROVED (FREE)' : 'APPROVED (CHARGEABLE)';
              }

              return (
                <div key={item.id || index} className="d-flex gap-3 position-relative pb-4">
                  {/* Left Timeline Rail */}
                  <div className="d-flex flex-column align-items-center flex-shrink-0" style={{ width: '28px' }}>
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: nodeBg,
                        color: nodeIconColor,
                        zIndex: 2,
                      }}
                    >
                      <NodeIcon size={16} weight="bold" />
                    </div>

                    {!isLast && (
                      <div
                        className="flex-grow-1"
                        style={{
                          width: '2px',
                          backgroundColor: '#e2e8f0',
                          minHeight: '28px',
                          marginTop: '4px',
                          marginBottom: '-6px',
                          zIndex: 1,
                        }}
                      />
                    )}
                  </div>

                  {/* Right Content */}
                  <div className="flex-grow-1 pt-0.5">
                    {/* Header Row: Title, Duration & Status Badge */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                          {item.title}
                        </span>
                        {item.requestedDays && (
                          <span
                            className="badge rounded-pill fw-semibold"
                            style={{
                              backgroundColor: '#f1f5f9',
                              color: '#475569',
                              fontSize: '0.7rem',
                              padding: '0.2rem 0.55rem',
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
                          padding: '0.25rem 0.65rem',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {badgeText}
                      </span>
                    </div>

                    {/* Submitter & Date */}
                    <div className="text-muted small mb-2" style={{ fontSize: '0.74rem' }}>
                      Requested by <strong className="text-secondary">{item.requestedBy}</strong> &bull; {item.requestedAt}
                    </div>

                    {/* Engineering Technical Reason */}
                    {item.requestReason && (
                      <div
                        className="text-secondary small mb-2 ps-2.5"
                        style={{
                          borderLeft: '2px solid #cbd5e1',
                          fontSize: '0.78rem',
                          lineHeight: '1.45',
                        }}
                      >
                        <span className="fw-semibold text-dark">Technical Notes: </span>
                        {item.requestReason}
                      </div>
                    )}

                    {/* Photo Attachments Preview */}
                    {item.photos && item.photos.length > 0 && (
                      <div className="d-flex align-items-center gap-2 mb-2.5 flex-wrap">
                        <span className="text-muted small d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                          <ImageIcon size={13} />
                          <span>Photos:</span>
                        </span>
                        {item.photos.map((src, pIdx) => (
                          <img
                            key={pIdx}
                            src={src}
                            alt={`Photo ${pIdx + 1}`}
                            className="rounded border cursor-pointer hover-opacity"
                            style={{
                              width: '46px',
                              height: '46px',
                              objectFit: 'cover',
                              borderColor: '#e2e8f0',
                            }}
                            onClick={() => setSelectedPhoto(src)}
                            title="Click to view full photo"
                          />
                        ))}
                      </div>
                    )}

                    {/* TR REJECTION DECISION BOX */}
                    {isRejected && (
                      <div
                        className="mt-2 p-2.5 px-3 rounded-2"
                        style={{
                          backgroundColor: '#fff5f5',
                          border: '1px solid #fed7d7',
                          borderLeft: '3px solid #dc2626',
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-1">
                          <span
                            className="fw-bold text-danger d-flex align-items-center gap-1"
                            style={{ fontSize: '0.74rem', letterSpacing: '0.02em' }}
                          >
                            <XCircle size={14} weight="fill" />
                            TR REJECTION DECISION
                          </span>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                            {item.decidedAt}
                          </span>
                        </div>
                        <div className="text-muted small mb-1" style={{ fontSize: '0.72rem' }}>
                          Evaluated by: <span className="text-dark fw-semibold">{item.decidedBy || 'Tenant Relation Lead'}</span>
                        </div>
                        <div className="text-dark small" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                          <strong className="text-danger">Reason:</strong> &ldquo;{item.decisionReason}&rdquo;
                        </div>
                      </div>
                    )}

                    {/* TR APPROVAL DECISION BOX */}
                    {isApproved && (
                      <div
                        className="mt-2 p-2.5 px-3 rounded-2"
                        style={{
                          backgroundColor: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderLeft: '3px solid #16a34a',
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-1 mb-1">
                          <span
                            className="fw-bold d-flex align-items-center gap-1"
                            style={{
                              fontSize: '0.74rem',
                              color: item.status === 'APPROVED_FREE' ? '#15803d' : '#0369a1',
                            }}
                          >
                            <CheckCircle size={14} weight="fill" />
                            TR APPROVAL DECISION: {item.status === 'APPROVED_FREE' ? 'FREE OF CHARGE' : 'CHARGEABLE'}
                          </span>
                          <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                            {item.decidedAt}
                          </span>
                        </div>
                        <div className="text-muted small mb-1" style={{ fontSize: '0.72rem' }}>
                          Approved by: <span className="text-dark fw-semibold">{item.decidedBy || 'Tenant Relation Lead'}</span>
                        </div>
                        {item.decisionReason && (
                          <div className="text-dark small" style={{ fontSize: '0.78rem', lineHeight: '1.45' }}>
                            <strong className="text-success">Notes:</strong> &ldquo;{item.decisionReason}&rdquo;
                          </div>
                        )}
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
