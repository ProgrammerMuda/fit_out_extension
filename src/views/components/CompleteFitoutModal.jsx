import React, { useState, useMemo } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { CheckCircle, UploadSimple, Camera } from '@phosphor-icons/react';

export function CompleteFitoutModal({ show, onHide, onConfirm }) {
  const [notes, setNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(['pipe_completion_photo_1.jpg', 'valve_fitting_photo_2.jpg']);

  // Validation: Notes must not be empty
  const isFormValid = useMemo(() => {
    return notes.trim().length > 0;
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    if (onConfirm) {
      onConfirm({ notes, uploadedFiles });
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-bottom px-4 py-3" style={{ backgroundColor: '#f8fafc' }}>
        <div>
          <Modal.Title className="fw-bold fs-6 text-dark" style={{ marginBottom: '8px', lineHeight: '1.25' }}>
            Confirm Fitout Completion
          </Modal.Title>
          <div className="text-muted small" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
            Verify on-site renovation completion and proceed to final inspection.
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4 bg-white">
          <div className="alert alert-info d-flex align-items-center gap-2 mb-4 py-2 px-3 border-0" style={{ backgroundColor: '#f0f9ff', color: '#0369a1' }}>
            <span style={{ fontSize: '0.8rem' }}>
              ℹ️ Completing the fitout work will progress the permit status to <strong>FINAL INSPECTION</strong>.
            </span>
          </div>

          {/* 1. Upload Completion Evidence Photos */}
          <div className="mb-4">
            <Form.Label className="fw-bold text-dark small mb-1">
              On-Site Completion Evidence Photos <span className="text-danger">*</span>
            </Form.Label>
            <div className="text-muted small mb-2" style={{ fontSize: '0.74rem' }}>
              Upload photo documentation of the completed renovation verified in the unit.
            </div>

            <div className="d-flex flex-wrap gap-2 align-items-center">
              {uploadedFiles.map((file, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 border rounded-2 d-flex align-items-center gap-2 bg-white"
                  style={{ fontSize: '0.78rem', borderColor: '#e2e8f0' }}
                >
                  <Camera size={16} weight="fill" color="#27b29b" />
                  <span className="fw-semibold text-dark">{file}</span>
                  <span className="badge bg-success-subtle text-success small">Uploaded</span>
                </div>
              ))}
              <div
                className="px-3 py-2 border border-dashed rounded-2 d-flex align-items-center gap-2 cursor-pointer bg-white"
                style={{ fontSize: '0.78rem', borderColor: '#27b29b', color: '#27b29b', cursor: 'pointer' }}
              >
                <UploadSimple size={16} weight="bold" />
                <span>Add Photo</span>
              </div>
            </div>
          </div>

          {/* 2. Tenant Relation / Engineering Notes */}
          <div className="mb-3">
            <Form.Label className="fw-bold text-dark small mb-1" style={{ fontSize: '0.82rem' }}>
              Tenant Relation / Engineering Evaluation Notes <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter work evaluation notes and verification summary..."
              style={{
                fontSize: '0.84rem',
                color: '#0f172a',
                backgroundColor: '#ffffff',
                borderColor: '#cbd5e1',
                borderRadius: '0.45rem',
                lineHeight: '1.45',
              }}
              required
            />
          </div>
        </Modal.Body>

        {/* Modal Footer */}
        <Modal.Footer
          className="border-top px-4 py-3 d-flex align-items-center justify-content-end gap-2"
          style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
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
              transition: 'all 0.2s ease',
            }}
            onClick={onHide}
          >
            Cancel
          </button>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="btn fw-bold d-flex align-items-center gap-2 px-4 py-2"
            style={{
              backgroundColor: isFormValid ? '#27b29b' : '#e2e8f0',
              borderColor: isFormValid ? '#27b29b' : '#e2e8f0',
              color: isFormValid ? '#ffffff' : '#64748b',
              borderRadius: '0.45rem',
              fontSize: '0.84rem',
              boxShadow: 'none',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
            }}
            title={!isFormValid ? 'Please fill in evaluation notes to confirm completion' : 'Confirm & Proceed to Final Inspection'}
          >
            <CheckCircle size={18} weight="bold" />
            <span>Confirm & Proceed to Final Inspection</span>
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
