import React, { useState } from 'react';
import { ListChecks, WarningCircle, User, CalendarBlank, CheckCircle } from '@phosphor-icons/react';
import { Button, Modal, Badge } from 'react-bootstrap';

export function EarlyInspectionCard({
  inspections = [
    {
      id: 'ins-1',
      code: 'PRO/INS/EARLY/082026/AA0711/0003',
      result: 'RESULT: MAJOR',
      resultType: 'danger',
      inspector: 'Staff Engineering',
      date: '04 Aug 2026, 08:30',
      findings: 'Ditemukan perbaikan sambungan pipa air belum memiliki isolasi/sealant waterproof dan perlu pemotongan pipa tambahan.',
    },
  ],
}) {
  const [selectedInspection, setSelectedInspection] = useState(null);

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <ListChecks size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          EARLY INSPECTION
        </span>
      </div>

      {/* Card Body */}
      <div className="p-3 px-4">
        {inspections.map((ins, index) => (
          <div
            key={ins.id || index}
            className="d-flex align-items-center justify-content-between py-2 flex-wrap gap-2"
          >
            {/* Inspection Info */}
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                style={{ width: '32px', height: '32px', backgroundColor: '#fee2e2', color: '#ef4444' }}
              >
                <WarningCircle size={20} weight="fill" />
              </div>
              <div>
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <span className="fw-bold text-dark" style={{ fontSize: '0.86rem' }}>
                    {ins.code}
                  </span>
                  <span
                    className="badge fw-bold"
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      fontSize: '0.66rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '0.25rem',
                    }}
                  >
                    {ins.result}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 text-muted small mt-1" style={{ fontSize: '0.72rem' }}>
                  <div className="d-flex align-items-center gap-1">
                    <User size={12} />
                    <span>{ins.inspector}</span>
                  </div>
                  <span>•</span>
                  <div className="d-flex align-items-center gap-1">
                    <CalendarBlank size={12} />
                    <span>{ins.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* View Detail Button */}
            <Button
              variant="outline-primary"
              className="px-3 py-1 fw-semibold btn-preview-action"
              style={{ fontSize: '0.74rem' }}
              onClick={() => setSelectedInspection(ins)}
            >
              VIEW DETAIL
            </Button>
          </div>
        ))}
      </div>

      {/* Inspection Detail Modal */}
      <Modal show={!!selectedInspection} onHide={() => setSelectedInspection(null)} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <div className="d-flex align-items-center gap-2">
            <ListChecks size={22} weight="bold" color="#27b29b" />
            <Modal.Title className="fw-bold fs-6">
              Detail Hasil Inspeksi: {selectedInspection?.code}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="bg-light p-3 rounded-2 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">Nomor Berita Acara:</span>
              <strong>{selectedInspection?.code}</strong>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">Inspector & Time:</span>
              <span>{selectedInspection?.inspector} ({selectedInspection?.date})</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted small">Inspection Result:</span>
              <span className="badge bg-danger">{selectedInspection?.result}</span>
            </div>
          </div>

          <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.85rem' }}>Field Findings & Notes:</h6>
          <p className="text-muted small mb-0 p-3 border rounded-2" style={{ backgroundColor: '#fff' }}>
            {selectedInspection?.findings}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
