import React, { useState, useMemo, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import {
  CheckCircle,
  CloudArrowUp,
  FileImage,
  FileText,
  File,
  Trash,
  X,
} from '@phosphor-icons/react';

export function CompleteFitoutModal({ show, onHide, onConfirm }) {
  const [notes, setNotes] = useState(
    'All water pipe installations and unit renovation works have been 100% completed and verified on site.'
  );
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 'file-1',
      name: 'unit_renovation_completion_photo_1.jpg',
      size: '2.4 MB',
      type: 'image/jpeg',
    },
    {
      id: 'file-2',
      name: 'pipe_installation_completion_photo_2.jpg',
      size: '1.8 MB',
      type: 'image/jpeg',
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFilesAdded = (filesList) => {
    const filesArray = Array.from(filesList || []);
    if (filesArray.length === 0) return;

    const newEntries = filesArray.map((f, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: f.name,
      size: formatFileSize(f.size),
      type: f.type,
      rawFile: f,
    }));

    setUploadedFiles((prev) => [...prev, ...newEntries]);
  };

  const handleFileChange = (e) => {
    handleFilesAdded(e.target.files);
    e.target.value = ''; // reset so same file can be selected again
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleRemoveFile = (id) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const isFormValid = useMemo(() => {
    return notes.trim().length > 0;
  }, [notes]);

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

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      {/* Modal Header: Exact 16px 20px padding */}
      <Modal.Header closeButton className="border-bottom" style={{ backgroundColor: '#f8fafc', padding: '16px 20px' }}>
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
          {/* Info Banner */}
          <div
            className="rounded-3 border mb-4 p-3 d-flex align-items-center gap-2.5"
            style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}
          >
            <CheckCircle size={20} weight="fill" className="flex-shrink-0" />
            <span style={{ fontSize: '0.82rem', lineHeight: '1.45' }}>
              Confirming completion of fitout works will advance the permit status to <strong>FINAL INSPECTION</strong>.
            </span>
          </div>

          {/* 1. Modern File Upload Dropzone */}
          <div className="mb-4">
            <Form.Label className="fw-bold text-dark d-flex align-items-center justify-content-between mb-1" style={{ fontSize: '0.82rem' }}>
              <span>
                Upload Documentation Files <span className="text-muted fw-normal">({uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'} attached)</span>
              </span>
            </Form.Label>
            <div className="text-muted small mb-2.5" style={{ fontSize: '0.74rem' }}>
              Upload completion photos, inspection forms, or technical handover documents.
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,.pdf,.doc,.docx"
              style={{ display: 'none' }}
            />

            {/* Clean Drag & Drop Area */}
            <div
              className="rounded-3 border border-2 text-center p-4 transition-all cursor-pointer"
              style={{
                borderStyle: 'dashed',
                borderColor: isDragging ? '#27b29b' : '#cbd5e1',
                backgroundColor: isDragging ? '#f0fdf9' : '#f8fafc',
                cursor: 'pointer',
              }}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="d-flex justify-content-center mb-2">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: '48px', height: '48px', backgroundColor: '#e6f8f5', color: '#27b29b' }}
                >
                  <CloudArrowUp size={28} weight="bold" />
                </div>
              </div>
              <div className="fw-bold text-dark" style={{ fontSize: '0.88rem', marginBottom: '2px' }}>
                <span style={{ color: '#27b29b', textDecoration: 'underline' }}>Click to upload</span> or drag and drop
              </div>
              <div className="text-muted small" style={{ fontSize: '0.74rem' }}>
                Supported formats: PNG, JPG, JPEG, PDF, DOCX (Max 10MB per file)
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="d-flex flex-column gap-2 mt-3">
                {uploadedFiles.map((file) => {
                  const isPdf = file.name.toLowerCase().endsWith('.pdf');
                  const isImage =
                    file.name.toLowerCase().endsWith('.jpg') ||
                    file.name.toLowerCase().endsWith('.jpeg') ||
                    file.name.toLowerCase().endsWith('.png');

                  return (
                    <div
                      key={file.id}
                      className="p-2.5 px-3 rounded-2 border d-flex align-items-center justify-content-between bg-white shadow-xs"
                      style={{ borderColor: '#e2e8f0' }}
                    >
                      <div className="d-flex align-items-center gap-2.5 overflow-hidden">
                        <div
                          className="rounded-2 p-2 d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            backgroundColor: isPdf ? '#fee2e2' : isImage ? '#e6f8f5' : '#f1f5f9',
                            color: isPdf ? '#dc2626' : isImage ? '#27b29b' : '#64748b',
                          }}
                        >
                          {isPdf ? (
                            <FileText size={18} weight="bold" />
                          ) : isImage ? (
                            <FileImage size={18} weight="bold" />
                          ) : (
                            <File size={18} weight="bold" />
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <div
                            className="fw-semibold text-dark text-truncate"
                            style={{ fontSize: '0.82rem' }}
                            title={file.name}
                          >
                            {file.name}
                          </div>
                          <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                            {file.size} &bull; <span className="text-success fw-medium">Ready</span>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        className="btn btn-sm btn-link p-1 text-muted hover-danger flex-shrink-0 ms-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile(file.id);
                        }}
                        title="Remove file"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
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

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className="btn fw-bold d-flex align-items-center gap-2 px-4 py-2 text-white"
            style={{
              backgroundColor: isFormValid ? '#16a34a' : '#94a3b8',
              borderColor: isFormValid ? '#16a34a' : '#94a3b8',
              borderRadius: '0.45rem',
              fontSize: '0.84rem',
              boxShadow: isFormValid ? '0 2px 4px rgba(22, 163, 74, 0.2)' : 'none',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
            }}
          >
            <CheckCircle size={18} weight="bold" />
            <span>Confirm Complete</span>
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
