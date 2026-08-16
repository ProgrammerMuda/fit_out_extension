import React, { useState } from 'react';
import { FileText, FilePdf, FileCode, CheckCircle, Eye } from '@phosphor-icons/react';
import { Button, Modal } from 'react-bootstrap';

export function TechnicalSupportingDocsCard({
  documents = [
    {
      id: 'doc-1',
      name: 'MEP_Plumbing_Sanitary_Drawing_Rev02.pdf',
      type: 'MEP DRAWING',
      description: 'Gambar teknis jalur instalasi pipa air bersih, air kotor, dan posisi pemotongan valve.',
      size: '2.45 MB',
    },
    {
      id: 'doc-2',
      name: 'Denah_Layout_Unit_AG0311_Fitout.pdf',
      type: 'DENAH & ARSITEKTUR',
      description: 'Denah as-built layout unit dan rencana tata letak kabinet baru.',
      size: '1.82 MB',
    },
    {
      id: 'doc-3',
      name: 'Single_Line_Diagram_Electrical_Pantry.pdf',
      type: 'ELECTRICAL DRAWING',
      description: 'Diagram kelistrikan, panel MCB, dan grounding area kerja pantry.',
      size: '890.12 KB',
    },
    {
      id: 'doc-4',
      name: 'Surat_Pernyataan_Patuhi_Aturan_Fitout.pdf',
      type: 'SUPPORTING DOCUMENT',
      description: 'Surat jaminan kepatuhan jam kerja bising & keselamatan kerja (K3).',
      size: '340.50 KB',
    },
  ],
}) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center justify-content-between border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
            <FileText size={21} weight="bold" />
          </div>
          <span
            className="fw-bold text-dark text-uppercase"
            style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
          >
            TECHNICAL & SUPPORTING DOCUMENTS
          </span>
        </div>
        <span
          className="badge rounded-pill border px-2.5 py-1 fw-semibold"
          style={{ backgroundColor: '#ffffff', color: '#64748b', borderColor: '#e2e8f0', fontSize: '0.72rem' }}
        >
          {documents.length} Dokumen
        </span>
      </div>

      {/* Card Body */}
      <div className="p-3 px-4">
        {documents.map((doc, index) => (
          <div
            key={doc.id || index}
            className={`d-flex align-items-center justify-content-between py-3 flex-wrap gap-2 ${
              index < documents.length - 1 ? 'border-bottom' : ''
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
                  {doc.name}
                </div>
                <div className="text-muted small mt-0.5" style={{ fontSize: '0.72rem' }}>
                  <span className="fw-semibold text-secondary">{doc.type}</span> • {doc.size}
                </div>
              </div>
            </div>

            {/* View File Button */}
            <Button
              variant="outline-primary"
              className="px-3 py-1 fw-semibold btn-preview-action"
              style={{ fontSize: '0.74rem' }}
              onClick={() => setSelectedDoc(doc)}
            >
              VIEW FILE
            </Button>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      <Modal show={!!selectedDoc} onHide={() => setSelectedDoc(null)} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <div className="d-flex align-items-center gap-2">
            <FilePdf size={22} weight="fill" className="text-danger" />
            <Modal.Title className="fw-bold fs-6">Detail Dokumen: {selectedDoc?.name}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="border rounded-3 p-4 bg-light text-center mb-3">
            <FilePdf size={64} weight="fill" className="text-danger mb-2" />
            <h6 className="fw-bold text-dark mb-1">{selectedDoc?.name}</h6>
            <div className="text-muted small mb-2">
              Kategori: <strong>{selectedDoc?.type}</strong> • Ukuran File: {selectedDoc?.size}
            </div>
            <span className="badge bg-success-subtle text-success px-3 py-2 fw-semibold">
              Status: Verified by Building Engineering
            </span>
          </div>

          <div className="p-3 bg-white border rounded-2">
            <div className="fw-bold text-dark small mb-1">Deskripsi Dokumen Teknis:</div>
            <p className="text-muted small mb-0">{selectedDoc?.description}</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
