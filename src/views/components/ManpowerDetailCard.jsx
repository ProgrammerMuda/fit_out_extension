import React, { useState } from 'react';
import { Users, IdentificationCard, UserCheck, FilePdf } from '@phosphor-icons/react';
import { Button, Modal } from 'react-bootstrap';

export function ManpowerDetailCard({
  workersCount = 2,
  workers = [
    { id: 'w-1', name: 'Zaki', hasKtp: true, ktpNumber: '3171028374920001', fileName: 'KTP_ZAKI.PDF' },
    { id: 'w-2', name: 'Raga', hasKtp: true, ktpNumber: '3171028374920002', fileName: 'KTP_RAGA.PDF' },
  ],
}) {
  const [selectedWorker, setSelectedWorker] = useState(null);

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
            <Users size={21} weight="bold" />
          </div>
          <div>
            <span
              className="fw-bold text-dark text-uppercase d-block"
              style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
            >
              MANPOWER DETAIL
            </span>
            <div className="text-muted small mt-1" style={{ fontSize: '0.66rem', letterSpacing: '0.04em' }}>
              NUMBER OF WORKERS: {workersCount}
            </div>
          </div>
        </div>
      </div>

      {/* Card Body: Worker list */}
      <div className="p-3 px-4">
        {workers.map((worker, index) => (
          <div
            key={worker.id || index}
            className={`d-flex align-items-center justify-content-between py-2 ${
              index < workers.length - 1 ? 'border-bottom' : ''
            }`}
            style={{ borderColor: '#f1f5f9' }}
          >
            {/* Worker Name & Icon */}
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                style={{ width: '30px', height: '30px', backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <IdentificationCard size={18} weight="fill" />
              </div>
              <span className="fw-bold text-dark" style={{ fontSize: '0.86rem' }}>
                {worker.name}
              </span>
            </div>

            {/* Right Action: VIEW FILE button */}
            <div>
              <Button
                variant="outline-primary"
                className="px-3 py-1 fw-semibold btn-preview-action"
                style={{ fontSize: '0.74rem' }}
                onClick={() => setSelectedWorker(worker)}
              >
                VIEW FILE
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* KTP / File Preview Modal */}
      <Modal show={!!selectedWorker} onHide={() => setSelectedWorker(null)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-6">
            Identitas Tenaga Kerja: {selectedWorker?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center">
          <div className="border rounded-3 p-4 bg-light">
            <UserCheck size={48} weight="fill" color="#27b29b" className="mb-2" />
            <h6 className="fw-bold text-dark mb-1">{selectedWorker?.name}</h6>
            <div className="text-muted small mb-1">NIK: {selectedWorker?.ktpNumber}</div>
            <div className="text-muted small mb-3">Dokumen Lampiran: {selectedWorker?.fileName}</div>
            <span className="badge bg-success-subtle text-success px-3 py-2 fw-semibold">
              KTP & Izin Kerja Terverifikasi
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
