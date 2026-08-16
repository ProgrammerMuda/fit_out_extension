import React, { useState } from 'react';
import {
  Ticket,
  Buildings,
  User,
  Phone,
  FileText,
  Image as ImageIcon,
  ArrowsOut,
} from '@phosphor-icons/react';
import { Modal } from 'react-bootstrap';

export function RequestInformationCard({ permit }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const handleOpenPhoto = (index) => {
    setSelectedPhotoIndex(index);
  };

  const handleClosePhoto = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <Ticket size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          REQUEST INFORMATION
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Row 1: 3 Column Info (Unit, Tenant Name, Tenant Phone) */}
        <div className="row g-3 mb-4 pb-2">
          {/* Unit */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <Buildings size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  UNIT
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  {permit.unit}
                </div>
              </div>
            </div>
          </div>

          {/* Tenant Name */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <User size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  TENANT NAME
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  {permit.tenantName}
                </div>
              </div>
            </div>
          </div>

          {/* Tenant Phone */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <Phone size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  TENANT PHONE
                </div>
                <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  {permit.tenantPhone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Field: Fitout Title & Description */}
        <div className="mb-4">
          <div className="text-muted text-uppercase fw-semibold mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
            FITOUT TITLE
          </div>
          <h5 className="fw-bold text-dark mb-1.5" style={{ fontSize: '1.05rem' }}>
            {permit.fitoutTitle}
          </h5>
          {permit.fitoutDescription && (
            <div className="text-dark fst-italic" style={{ lineHeight: '1.55', fontSize: '0.85rem', color: '#334155' }}>
              &ldquo;{permit.fitoutDescription}&rdquo;
            </div>
          )}
        </div>

        {/* Field: Request Photos (3 Water Pipe Photos) */}
        <div>
          <div className="d-flex align-items-center gap-1 text-muted text-uppercase fw-bold mb-2" style={{ fontSize: '0.7rem', letterSpacing: '0.04em' }}>
            <ImageIcon size={14} />
            <span>REQUEST PHOTOS</span>
          </div>

          <div className="d-flex flex-wrap gap-3">
            {permit.photos && permit.photos.length > 0 ? (
              permit.photos.map((imgUrl, i) => (
                <div
                  key={i}
                  className="photo-preview-box shadow-sm position-relative"
                  onClick={() => handleOpenPhoto(i)}
                  title={`Lihat Foto Pipa Air #${i + 1}`}
                  style={{ width: '110px', height: '110px' }}
                >
                  <img src={imgUrl} alt={`Foto Pipa Air ${i + 1}`} />
                  <div
                    className="position-absolute bottom-0 end-0 bg-dark bg-opacity-60 text-white p-1 rounded-top-left"
                    style={{ borderTopLeftRadius: '4px' }}
                  >
                    <ArrowsOut size={13} />
                  </div>
                </div>
              ))
            ) : (
              <div className="photo-preview-box text-muted">
                <ImageIcon size={28} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Zoom Modal */}
      <Modal show={selectedPhotoIndex !== null} onHide={handleClosePhoto} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-6">
            Foto Pekerjaan Pipa Air #{selectedPhotoIndex !== null ? selectedPhotoIndex + 1 : ''} — {permit.fitoutTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-3">
          {selectedPhotoIndex !== null && permit.photos[selectedPhotoIndex] && (
            <div>
              <img
                src={permit.photos[selectedPhotoIndex]}
                alt={`Full preview ${selectedPhotoIndex + 1}`}
                className="img-fluid rounded-3 shadow-sm mb-2"
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
              <div className="text-muted small mt-2">
                Dokumentasi kondisi pipa air eksisting & area kerja unit {permit.unit}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
