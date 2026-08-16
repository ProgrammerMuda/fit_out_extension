import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { XCircle, CalendarX } from '@phosphor-icons/react';

export function RejectedExtensionDetailModal({
  show,
  onHide,
  engineeringRequest = null,
  currentStartDate = '04 Aug 2026',
  currentEndDate = '10 Aug 2026',
}) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!engineeringRequest) return null;

  const photos = engineeringRequest.photos || ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'];

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      {/* Modal Header: Exact 16px Padding */}
      <Modal.Header closeButton className="border-bottom" style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
        <div>
          <Modal.Title className="fw-bold fs-6 text-dark" style={{ marginBottom: '4px', lineHeight: '1.25' }}>
            Engineering Extension Request Detail
          </Modal.Title>
          <div className="text-muted small" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
            Detailed submission from Engineering Lead and Tenant Relation rejection decision notes.
          </div>
        </div>
      </Modal.Header>

      {/* Modal Body: Exact 20px Padding */}
      <Modal.Body className="bg-white" style={{ padding: '20px' }}>
        {/* Engineering Request Submission Box (White Background with Black Title) */}
        <div
          className="rounded-3 border overflow-hidden mb-3"
          style={{ borderColor: '#e2e8f0', backgroundColor: '#ffffff' }}
        >
          {/* Header Box */}
          <div
            className="d-flex align-items-center justify-content-between border-bottom"
            style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0', padding: '14px 18px' }}
          >
            <span className="fw-bold text-uppercase text-dark" style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}>
              ENGINEERING REQUEST SUBMISSION
            </span>
            <span
              className="badge rounded-pill fw-bold"
              style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                border: 'none',
                fontSize: '0.72rem',
                padding: '0.35rem 0.75rem',
                letterSpacing: '0.02em',
              }}
            >
              REJECTED
            </span>
          </div>

          {/* Body Box */}
          <div style={{ padding: '16px 18px' }}>
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <div className="text-muted small fw-medium mb-0.5" style={{ fontSize: '0.74rem' }}>
                  Requested By:
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.86rem' }}>
                  {engineeringRequest.requestedBy || 'Budi Santoso (Engineering Lead 01)'}
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="text-muted small fw-medium mb-0.5" style={{ fontSize: '0.74rem' }}>
                  Requested Period:
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.86rem' }}>
                  {engineeringRequest.currentEndDate || currentEndDate} &rarr; {engineeringRequest.requestedEndDate || '13 Aug 2026'} (+{engineeringRequest.requestedDays || 3} Days)
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="border-top" style={{ borderColor: '#e2e8f0', paddingTop: '12px', marginTop: '4px' }}>
              <div className="fw-bold text-uppercase text-dark mb-1.5" style={{ fontSize: '0.74rem', letterSpacing: '0.03em' }}>
                NOTES
              </div>
              <div className="fst-italic text-secondary" style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
                &ldquo;{engineeringRequest.technicalReason || 'Field technical issue requiring additional working days.'}&rdquo;
              </div>
            </div>

            {/* Photos Section */}
            {photos.length > 0 && (
              <div className="border-top" style={{ borderColor: '#e2e8f0', marginTop: '14px', paddingTop: '12px' }}>
                <div className="mb-2">
                  <span className="fw-bold text-uppercase text-dark" style={{ fontSize: '0.74rem', letterSpacing: '0.03em' }}>
                    REQUEST PHOTOS ({photos.length} PHOTOS)
                  </span>
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  {photos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="position-relative rounded-2 overflow-hidden border cursor-pointer shadow-xs"
                      style={{
                        width: '84px',
                        height: '62px',
                        borderColor: '#cbd5e1',
                        backgroundColor: '#ffffff',
                      }}
                      onClick={() => setSelectedPhoto(photo)}
                      title={`View Photo #${idx + 1}`}
                    >
                      <img
                        src={photo}
                        alt={`Photo #${idx + 1}`}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <div
                        className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-1.5 py-0.5"
                        style={{ fontSize: '0.62rem', borderTopLeftRadius: '4px', fontWeight: 600 }}
                      >
                        #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tenant Relation Rejection Decision Card (Red Theme with Generous Breathing Room) */}
        <div
          className="rounded-3 border"
          style={{ backgroundColor: '#fff5f5', borderColor: '#fca5a5', padding: '18px 20px' }}
        >
          <div className="d-flex align-items-center gap-2 mb-3">
            <XCircle size={18} weight="bold" color="#dc2626" />
            <span className="fw-bold text-danger text-uppercase" style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}>
              TENANT RELATION DECISION NOTES (REJECTED)
            </span>
          </div>

          <div
            className="text-dark fst-italic rounded-2 border bg-white mb-3"
            style={{
              fontSize: '0.86rem',
              lineHeight: '1.55',
              borderColor: '#fca5a5',
              color: '#1e293b',
              padding: '14px 16px',
            }}
          >
            &ldquo;{engineeringRequest.rejectReason || 'Extension request rejected due to exceeding permitted work tolerance.'}&rdquo;
          </div>

          <div
            className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted small pt-2 border-top"
            style={{ borderColor: '#fecaca', fontSize: '0.74rem' }}
          >
            <span>
              Decided by: <strong>Tenant Relation Lead - Management</strong>
            </span>
            <span>
              Effective End Date: <strong className="text-danger">{currentEndDate} (Active)</strong>
            </span>
          </div>
        </div>
      </Modal.Body>

      {/* Modal Footer: Close button */}
      <Modal.Footer className="border-top d-flex justify-content-end" style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
        <button
          type="button"
          className="btn fw-semibold px-4 py-2"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#cbd5e1',
            color: '#475569',
            fontSize: '0.84rem',
            borderRadius: '0.45rem',
          }}
          onClick={onHide}
        >
          Close
        </button>
      </Modal.Footer>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <Modal
          show={!!selectedPhoto}
          onHide={() => setSelectedPhoto(null)}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold fs-6">
              Field Documentation Photo Preview
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center p-3">
            <img
              src={selectedPhoto}
              alt="Preview"
              className="img-fluid rounded-3 shadow-sm mb-2"
              style={{ maxHeight: '70vh', objectFit: 'contain' }}
            />
            <div className="text-muted small mt-2">
              Technical field findings documentation submitted by the Engineering team
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Modal>
  );
}
