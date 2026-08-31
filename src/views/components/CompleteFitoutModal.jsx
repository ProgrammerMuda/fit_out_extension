import React, { useState, useMemo, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { CheckCircle, UploadSimple, Camera, Trash, Image as ImageIcon } from '@phosphor-icons/react';

export function CompleteFitoutModal({ show, onHide, onConfirm }) {
  const [notes, setNotes] = useState('Pekerjaan instalasi pipa air dan perbaikan renovasi unit telah selesai 100% dan telah diverifikasi di lapangan.');
  const [photos, setPhotos] = useState([
    { id: '1', name: 'hasil_renovasi_unit_1.jpg', url: '/images/pipe_1.jpg' },
    { id: '2', name: 'hasil_instalasi_pipa_2.jpg', url: '/images/pipe_2.jpg' },
  ]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newItems = files.map((f, i) => ({
        id: `${Date.now()}-${i}`,
        name: f.name,
        url: URL.createObjectURL(f),
      }));
      setPhotos((prev) => [...prev, ...newItems]);
    }
  };

  const handleRemovePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
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
        photos: photos.map((p) => p.url),
      });
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      {/* Modal Header: Clean 16px 20px padding */}
      <Modal.Header closeButton className="border-bottom" style={{ backgroundColor: '#f8fafc', padding: '16px 20px' }}>
        <div>
          <Modal.Title className="fw-bold fs-6 text-dark mb-1" style={{ lineHeight: '1.25' }}>
            Confirm Fitout Completion
          </Modal.Title>
          <div className="text-muted small" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
            Konfirmasi penyelesaian pekerjaan renovasi unit dan upload dokumentasi foto.
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
              Menyelesaikan pekerjaan fitout akan memajukan status permohonan ke tahap <strong>FINAL INSPECTION</strong>.
            </span>
          </div>

          {/* 1. Upload Completion Evidence Photos */}
          <div className="mb-4">
            <Form.Label className="fw-bold text-dark d-flex align-items-center justify-content-between mb-1" style={{ fontSize: '0.82rem' }}>
              <span>
                Upload Foto Hasil Pekerjaan <span className="text-muted fw-normal">({photos.length} Foto)</span>
              </span>
              <button
                type="button"
                className="btn btn-sm btn-link p-0 text-decoration-none fw-semibold d-flex align-items-center gap-1"
                style={{ color: '#27b29b', fontSize: '0.78rem' }}
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadSimple size={15} weight="bold" />
                <span>+ Upload Foto Baru</span>
              </button>
            </Form.Label>
            <div className="text-muted small mb-2.5" style={{ fontSize: '0.74rem' }}>
              Lampirkan bukti foto dokumentasi bahwa pekerjaan di unit telah selesai dikerjakan.
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              style={{ display: 'none' }}
            />

            {/* Photo Previews Gallery */}
            <div className="d-flex flex-wrap gap-2.5">
              {photos.map((item) => (
                <div
                  key={item.id}
                  className="position-relative rounded-3 overflow-hidden border bg-light shadow-xs"
                  style={{ width: '90px', height: '90px', borderColor: '#e2e8f0' }}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Remove Button */}
                  <button
                    type="button"
                    className="position-absolute top-0 end-0 bg-dark bg-opacity-75 text-white border-0 p-1 d-flex align-items-center justify-content-center"
                    style={{ borderBottomLeftRadius: '6px', width: '22px', height: '22px' }}
                    onClick={() => handleRemovePhoto(item.id)}
                    title="Hapus foto"
                  >
                    <Trash size={12} weight="bold" />
                  </button>
                </div>
              ))}

              {/* Add Photo Button Box */}
              <div
                className="rounded-3 border border-dashed d-flex flex-column align-items-center justify-content-center cursor-pointer hover-opacity"
                style={{
                  width: '90px',
                  height: '90px',
                  borderColor: '#27b29b',
                  backgroundColor: '#f0fdf9',
                  color: '#27b29b',
                  cursor: 'pointer',
                }}
                onClick={() => fileInputRef.current?.click()}
                title="Klik untuk memilih foto dari komputer"
              >
                <Camera size={22} weight="bold" />
                <span className="fw-semibold mt-1" style={{ fontSize: '0.7rem' }}>
                  Tambah Foto
                </span>
              </div>
            </div>
          </div>

          {/* 2. Tenant Relation / Engineering Notes */}
          <div className="mb-2">
            <Form.Label className="fw-bold text-dark mb-1" style={{ fontSize: '0.82rem' }}>
              Catatan Penyelesaian Pekerjaan (Notes) <span className="text-danger">*</span>
            </Form.Label>
            <div className="text-muted small mb-2" style={{ fontSize: '0.74rem' }}>
              Tuliskan ringkasan evaluasi verifikasi lapangan sebelum melanjutkan ke Final Inspection.
            </div>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tulis catatan evaluasi penyelesaian..."
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
            Batal
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
