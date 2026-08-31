import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { CheckCircle, X } from '@phosphor-icons/react';

export function CompleteFitoutModal({ show, onHide, onConfirm }) {
  const [notes, setNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Reset fields on modal open so user can experience the validation directly
  useEffect(() => {
    if (show) {
      setNotes('');
      setUploadedFiles([]);
    }
  }, [show]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedFiles(files);
    }
  };

  const handleClearFiles = (e) => {
    e.stopPropagation();
    setUploadedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validation: Button disabled until BOTH file uploaded AND notes filled!
  const isFormValid = useMemo(() => {
    return notes.trim().length > 0 && uploadedFiles.length > 0;
  }, [notes, uploadedFiles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    if (onConfirm) {
      onConfirm({
        notes: notes.trim(),
        files: uploadedFiles,
      });
    }
    onHide();
  };

  // Display text for the custom file input
  const fileDisplayText = useMemo(() => {
    if (uploadedFiles.length === 0) return 'No file chosen';
    if (uploadedFiles.length === 1) return uploadedFiles[0].name;
    return `${uploadedFiles.length} files chosen (${uploadedFiles.map((f) => f.name).join(', ')})`;
  }, [uploadedFiles]);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      {/* Modal Header */}
      <Modal.Header
        closeButton
        className="border-bottom"
        style={{ backgroundColor: '#f8fafc', padding: '16px 20px' }}
      >
        <div>
          <Modal.Title className="fw-bold fs-6 text-dark mb-1" style={{ lineHeight: '1.25' }}>
            Confirm Fitout Completion
          </Modal.Title>
          <div className="text-muted small" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
            Verify completion of unit renovation works and submit required documentation files.
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="bg-white" style={{ padding: '24px' }}>
          {/* Info Alert */}
          <div
            className="rounded-3 border mb-4 p-3 d-flex align-items-center gap-2.5"
            style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}
          >
            <CheckCircle size={20} weight="fill" className="flex-shrink-0" />
            <span style={{ fontSize: '0.82rem', lineHeight: '1.45' }}>
              Confirming completion of fitout works will advance the permit status to{' '}
              <strong>FINAL INSPECTION</strong>.
            </span>
          </div>

          {/* 1. Custom File Upload Bar matching design */}
          <div className="mb-4">
            <Form.Label className="fw-bold text-dark mb-1.5" style={{ fontSize: '0.82rem' }}>
              Upload Documentation File <span className="text-danger">*</span>
            </Form.Label>

            {/* Hidden native input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
            />

            {/* File Input Bar */}
            <div
              className="d-flex align-items-center border rounded-2 overflow-hidden cursor-pointer"
              style={{
                borderColor: '#cbd5e1',
                backgroundColor: '#ffffff',
                height: '42px',
                cursor: 'pointer',
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              {/* Dark slate 'Choose File' button */}
              <div
                className="d-flex align-items-center justify-content-center text-white fw-semibold px-3 h-100 flex-shrink-0"
                style={{
                  backgroundColor: '#2c3b4d',
                  fontSize: '0.84rem',
                  letterSpacing: '0.01em',
                  userSelect: 'none',
                }}
              >
                Choose File
              </div>

              {/* File name / 'No file chosen' text */}
              <div
                className="px-3 text-truncate flex-grow-1"
                style={{
                  fontSize: '0.84rem',
                  color: uploadedFiles.length > 0 ? '#0f172a' : '#64748b',
                  fontWeight: uploadedFiles.length > 0 ? 500 : 400,
                }}
              >
                {fileDisplayText}
              </div>

              {/* Clear button if files selected */}
              {uploadedFiles.length > 0 && (
                <button
                  type="button"
                  className="btn btn-sm btn-link text-muted p-2 me-1 d-flex align-items-center justify-content-center"
                  onClick={handleClearFiles}
                  title="Remove selected file"
                  style={{ textDecoration: 'none' }}
                >
                  <X size={16} weight="bold" />
                </button>
              )}
            </div>

            {/* Subtext info */}
            <div
              className="text-secondary small mt-1.5"
              style={{ fontSize: '0.74rem', color: '#64748b' }}
            >
              Supported formats: PDF, PNG, JPG (Max. 5MB)
            </div>
          </div>

          {/* 2. Tenant Relation / Engineering Notes */}
          <div className="mb-2">
            <Form.Label className="fw-bold text-dark mb-1" style={{ fontSize: '0.82rem' }}>
              Completion Evaluation Notes <span className="text-danger">*</span>
            </Form.Label>
            <div className="text-muted small mb-2" style={{ fontSize: '0.74rem' }}>
              Provide a verification summary and on-site evaluation before advancing to Final Inspection.
            </div>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter completion notes and evaluation details..."
              style={{
                fontSize: '0.86rem',
                color: '#0f172a',
                backgroundColor: '#ffffff',
                borderColor: '#cbd5e1',
                borderRadius: '0.45rem',
                lineHeight: '1.5',
                padding: '12px 14px',
              }}
              required
            />
          </div>
        </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer
          className="border-top d-flex align-items-center justify-content-end gap-2"
          style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0', padding: '16px 20px' }}
        >
          {/* Cancel Button */}
          <button
            type="button"
            className="btn btn-outline-secondary fw-bold px-4 py-2"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '0.45rem',
              fontSize: '0.84rem',
              boxShadow: 'none',
              borderColor: '#cbd5e1',
              color: '#475569',
            }}
            onClick={onHide}
          >
            Cancel
          </button>

          {/* Confirm Button (Disabled until BOTH file uploaded AND notes filled) */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="btn fw-bold d-flex align-items-center gap-2 px-4 py-2 text-white"
            style={{
              backgroundColor: isFormValid ? '#16a34a' : '#cbd5e1',
              borderColor: isFormValid ? '#16a34a' : '#cbd5e1',
              color: isFormValid ? '#ffffff' : '#94a3b8',
              borderRadius: '0.45rem',
              fontSize: '0.84rem',
              boxShadow: isFormValid ? '0 2px 4px rgba(22, 163, 74, 0.2)' : 'none',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
            title={
              !isFormValid
                ? 'Please upload a documentation file and fill in notes to enable completion'
                : 'Confirm & Proceed to Final Inspection'
            }
          >
            <CheckCircle size={18} weight="bold" />
            <span>Confirm Complete</span>
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
