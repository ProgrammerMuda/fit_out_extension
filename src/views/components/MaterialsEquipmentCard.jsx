import React, { useState } from 'react';
import { Package, FilePdf, Wrench, CheckCircle } from '@phosphor-icons/react';
import { Button, Modal } from 'react-bootstrap';

export function MaterialsEquipmentCard({
  materials = [
    {
      id: 'mat-1',
      name: 'Daftar_Material_Pipa_PPR_Fitting.pdf',
      type: 'MATERIAL LIST',
      description: 'Rincian spesifikasi teknis pipa PPR PN-10, pipa PVC D/AW, valve kuningan, seal tape, dan fitting sambungan.',
      size: '1.15 MB',
    },
    {
      id: 'mat-2',
      name: 'Daftar_Peralatan_Kerja_Safety_K3.pdf',
      type: 'EQUIPMENT & TOOLS',
      description: 'Daftar mesin pipe cutter, alat pemanas socket fusion PPR, kunci pipa, APAR portable, dan APD K3.',
      size: '745.20 KB',
    },
  ],
}) {
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
            <Package size={21} weight="bold" />
          </div>
          <span
            className="fw-bold text-dark text-uppercase"
            style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
          >
            MATERIALS & EQUIPMENT
          </span>
        </div>
        <span
          className="badge rounded-pill border px-2.5 py-1 fw-semibold"
          style={{ backgroundColor: '#ffffff', color: '#64748b', borderColor: '#e2e8f0', fontSize: '0.72rem' }}
        >
          {materials.length} Dokumen
        </span>
      </div>

      {/* Card Body */}
      <div className="p-3 px-4">
        {materials.map((item, index) => (
          <div
            key={item.id || index}
            className={`d-flex align-items-center justify-content-between py-3 flex-wrap gap-2 ${
              index < materials.length - 1 ? 'border-bottom' : ''
            }`}
            style={{ borderColor: '#f1f5f9' }}
          >
            {/* File Info */}
            <div className="d-flex align-items-center gap-3 overflow-hidden">
              <div
                className="d-flex align-items-center justify-content-center rounded-2 flex-shrink-0"
                style={{ width: '34px', height: '34px', backgroundColor: '#fee2e2', color: '#ef4444' }}
              >
                <FilePdf size={22} weight="fill" />
              </div>
              <div className="overflow-hidden">
                <div className="fw-bold text-dark text-truncate" style={{ fontSize: '0.86rem' }}>
                  {item.name}
                </div>
                <div className="text-muted small mt-0.5" style={{ fontSize: '0.72rem' }}>
                  <span className="fw-semibold text-secondary">{item.type}</span> • {item.size}
                </div>
              </div>
            </div>

            {/* View File Button */}
            <Button
              variant="outline-primary"
              className="px-3 py-1 fw-semibold btn-preview-action"
              style={{ fontSize: '0.74rem' }}
              onClick={() => setSelectedMaterial(item)}
            >
              VIEW FILE
            </Button>
          </div>
        ))}
      </div>

      {/* Material/Equipment Document Preview Modal */}
      <Modal show={!!selectedMaterial} onHide={() => setSelectedMaterial(null)} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <div className="d-flex align-items-center gap-2">
            <FilePdf size={22} weight="fill" className="text-danger" />
            <Modal.Title className="fw-bold fs-6">Dokumen: {selectedMaterial?.name}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="border rounded-3 p-4 bg-light text-center mb-3">
            <FilePdf size={64} weight="fill" className="text-danger mb-2" />
            <h6 className="fw-bold text-dark mb-1">{selectedMaterial?.name}</h6>
            <div className="text-muted small mb-2">
              Kategori: <strong>{selectedMaterial?.type}</strong> • Ukuran: {selectedMaterial?.size}
            </div>
            <span className="badge bg-success-subtle text-success px-3 py-2 fw-semibold">
              Terverifikasi Sesuai Standar Prosedur Gedung
            </span>
          </div>

          <div className="p-3 bg-white border rounded-2">
            <div className="fw-bold text-dark small mb-1">Keterangan Material / Peralatan:</div>
            <p className="text-muted small mb-0">{selectedMaterial?.description}</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
