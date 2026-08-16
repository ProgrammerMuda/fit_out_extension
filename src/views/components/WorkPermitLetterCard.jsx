import React, { useState } from 'react';
import { FileText, FilePdf, CheckCircle, Eye } from '@phosphor-icons/react';
import { Button, Modal } from 'react-bootstrap';

export function WorkPermitLetterCard() {
  const [showPreview, setShowPreview] = useState(false);
  const fileName = 'PERMIT_LETTER_FP_104.PDF';

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <FileText size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          WORK PERMIT LETTER
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Attached File Row matching Technical Supporting Documents */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="d-flex align-items-center gap-3 overflow-hidden">
            <div
              className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
              style={{ width: '32px', height: '32px', backgroundColor: '#fee2e2', color: '#ef4444' }}
            >
              <FilePdf size={20} weight="fill" />
            </div>
            <div className="overflow-hidden">
              <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.86rem' }}>
                {fileName}
              </div>
              <div className="text-muted small" style={{ fontSize: '0.7rem' }}>
                DOCUMENT • 98.15 KB
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 ms-2" style={{ color: '#27b29b' }}>
            <CheckCircle size={18} weight="bold" />
          </div>
        </div>

        {/* Action Button: Preview */}
        <Button
          variant="outline-primary"
          className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold btn-preview-action"
          onClick={() => setShowPreview(true)}
        >
          <Eye size={16} weight="bold" />
          <span>Preview</span>
        </Button>
      </div>

      {/* Preview Modal */}
      <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-6">Document: {fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center">
          <div className="border rounded-3 p-5 bg-light">
            <FilePdf size={64} weight="fill" className="text-danger mb-3" />
            <h5 className="fw-bold text-dark">{fileName}</h5>
            <p className="text-muted small mb-3">Surat Izin Kerja Resmi (Work Permit) Pengelola Gedung</p>
            <span className="badge bg-success-subtle text-success px-3 py-2 fw-semibold">
              Status: Active & Approved
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
