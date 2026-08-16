import React, { useState } from 'react';
import {
  CalendarPlus,
  ShieldCheck,
  CurrencyDollar,
  CalendarBlank,
  User,
  FileText,
  Receipt,
} from '@phosphor-icons/react';
import { Button, Modal, Table } from 'react-bootstrap';

export function ExtensionInformationCard({
  permit,
  extensionData = {
    previousEndDate: '10 Aug 2026',
    newEndDate: '13 Aug 2026',
    additionalDays: 3,
    extensionType: 'chargeable', // 'free' or 'chargeable'
    freeReason: 'Toleransi keterlambatan material vendor',
    totalCharge: 'Rp 450.000,00',
    invoiceNumber: 'PRO/INV/082026/000032',
    billDate: '10/08/2026, 03:55 PM',
    dueDate: '11/08/2026, 11:59 PM',
    isPaid: false,
    approvedBy: 'Tenant Relation Lead - Management',
    approvedAt: '10/08/2026, 03:55 PM',
    notes: 'Disetujui perpanjangan pengerjaan finishing & instalasi teknis tambahan dengan kepatuhan terhadap jam kerja gedung.',
  },
}) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const isFree = (permit?.extensionType || extensionData?.extensionType) === 'free';
  const additionalDays = permit?.extensionDays || extensionData?.additionalDays || 3;
  const newEndDate = permit?.scheduledEndDate || extensionData?.newEndDate || '13 Aug 2026';
  const previousEndDate = extensionData?.previousEndDate || '10 Aug 2026';
  const totalAmount = isFree ? 'Rp 0,00 (Free of Charge)' : (extensionData?.totalCharge || extensionData?.amount || 'Rp 450.000,00');
  const invoiceNumber = extensionData?.invoiceNumber || 'PRO/INV/082026/000032';
  const billDate = extensionData?.billDate || '10/08/2026, 03:55 PM';
  const dueDate = extensionData?.dueDate || '11/08/2026, 11:59 PM';
  const isPaid = extensionData?.isPaid || false;

  const notesContent = extensionData?.notes?.trim() || permit?.extensionNotes?.trim() || '';
  const freeReasonContent = extensionData?.freeReason?.trim() || '';
  const authorizedBy = extensionData?.approvedBy || 'Tenant Relation Lead - Management';
  const authorizedAt = extensionData?.approvedAt || '10/08/2026, 03:55 PM';

  const hasEngineeringOrigin = extensionData?.engineeringRequestDetails || extensionData?.fromEngineeringRequest;
  const engineeringPhotos = extensionData?.engineeringRequestDetails?.photos || extensionData?.photos || (hasEngineeringOrigin ? ['/images/pipe_1.jpg', '/images/pipe_2.jpg', '/images/pipe_3.jpg'] : []);

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Primary Icon) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <CalendarPlus size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          EXTENSION INFORMATION
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* 1. Schedule & Scheme Grid (2 Columns Side-by-Side) */}
        <div className="row g-3 mb-3">
          {/* Schedule Extension */}
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <CalendarBlank size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  SCHEDULE EXTENSION
                </div>
                <div className="fw-bold text-dark d-flex align-items-center gap-2 mt-0.5" style={{ fontSize: '0.88rem' }}>
                  <span>{previousEndDate} &rarr; {newEndDate}</span>
                  <span
                    className="badge fw-bold"
                    style={{
                      backgroundColor: isFree ? '#dcfce7' : '#fff7ed',
                      color: isFree ? '#16a34a' : '#ea580c',
                      fontSize: '0.7rem',
                      padding: '0.15rem 0.45rem',
                    }}
                  >
                    +{additionalDays}D
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Extension Scheme */}
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-3">
              <div
                className="info-icon-square flex-shrink-0"
                style={{ backgroundColor: '#e6f8f5', color: '#27b29b' }}
              >
                <ShieldCheck size={20} weight="fill" />
              </div>
              <div>
                <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
                  EXTENSION SCHEME
                </div>
                <div className="fw-bold text-dark mt-0.5" style={{ fontSize: '0.88rem' }}>
                  {isFree ? 'Free Tolerance / Grace Period' : 'Chargeable Daily Supervision'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Engineering Technical Reason & Photos (If request came from Engineering) */}
        {hasEngineeringOrigin && (
          <div className="mb-3 pt-2 border-top" style={{ borderColor: '#f1f5f9' }}>
            <div className="text-muted text-uppercase fw-semibold mb-1 d-flex align-items-center gap-1.5" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
              <span>ENGINEERING TECHNICAL REASON</span>
              <span className="text-secondary fw-normal">
                (by {extensionData?.engineeringRequestDetails?.requestedBy || 'Engineering Lead 01'})
              </span>
            </div>
            <div
              className="text-dark fst-italic mb-2"
              style={{
                fontSize: '0.84rem',
                lineHeight: '1.5',
                color: '#334155',
              }}
            >
              &ldquo;{extensionData?.engineeringRequestDetails?.technicalReason || 'Ditemukan kendala kebocoran pada pipa induk sambungan PVC saat uji tekan hidrolik di area pantry. Diperlukan waktu pembongkaran sambungan dan masa pengeringan (curing) lem sealant bertekanan selama minimal 3 hari kerja sebelum inspeksi kelayakan ulang.'}&rdquo;
            </div>

            {/* Photos thumbnail gallery */}
            {engineeringPhotos.length > 0 && (
              <div className="mt-2 pt-2 border-top" style={{ borderColor: '#f1f5f9' }}>
                <div className="text-muted small fw-semibold mb-1.5" style={{ fontSize: '0.7rem' }}>
                  FOTO TEMUAN KENDALA TEKNIS:
                </div>
                <div className="d-flex gap-2 flex-wrap">
                  {engineeringPhotos.map((photo, idx) => (
                    <div
                      key={idx}
                      className="position-relative rounded-2 overflow-hidden border cursor-pointer shadow-xs"
                      style={{
                        width: '78px',
                        height: '56px',
                        borderColor: '#e2e8f0',
                        backgroundColor: '#f8fafc',
                      }}
                      onClick={() => setSelectedPhoto(photo)}
                      title={`Klik untuk memperbesar Foto #${idx + 1}`}
                    >
                      <img
                        src={photo}
                        alt={`Temuan Engineering #${idx + 1}`}
                        className="w-100 h-100"
                        style={{ objectFit: 'cover' }}
                      />
                      <div
                        className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-1.5 py-0.5"
                        style={{ fontSize: '0.58rem', borderTopLeftRadius: '4px', fontWeight: 600 }}
                      >
                        #{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Free Reason (Only if Free & non-empty) */}
        {isFree && freeReasonContent && (
          <div className="mb-3 pt-2 border-top" style={{ borderColor: '#f1f5f9' }}>
            <div className="text-muted text-uppercase fw-semibold mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
              EXEMPTION REASON
            </div>
            <div
              className="text-dark fst-italic"
              style={{
                fontSize: '0.84rem',
                lineHeight: '1.5',
                color: '#334155',
              }}
            >
              &ldquo;{freeReasonContent}&rdquo;
            </div>
          </div>
        )}

        {/* 4. Tenant Relation Decision Notes (Only if filled & non-empty) */}
        {notesContent && (
          <div className="mb-3 pt-2 border-top" style={{ borderColor: '#f1f5f9' }}>
            <div className="text-muted text-uppercase fw-semibold mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.03em' }}>
              TENANT RELATION DECISION NOTES
            </div>
            <div
              className="text-dark fst-italic"
              style={{
                fontSize: '0.84rem',
                lineHeight: '1.5',
                color: '#334155',
              }}
            >
              &ldquo;{notesContent}&rdquo;
            </div>
          </div>
        )}

        {/* 4. Extension Bill & Invoice Section (Design EXACTLY matching Deposit Bill Card) */}
        {!isFree && (
          <div className="pt-3 mt-3 border-top" style={{ borderColor: '#e2e8f0' }}>
            {/* Bill Meta Row & Paid / Unpaid Badge (Identical to Deposit card) */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>
                  Fit Out Extension Bill Information
                </h6>
                <div className="d-flex flex-wrap align-items-center gap-2 text-secondary small fw-medium mt-1" style={{ fontSize: '0.74rem' }}>
                  <span>Invoice: <strong style={{ color: '#27b29b' }}>{invoiceNumber}</strong></span>
                  <span>&bull;</span>
                  <span>Issued: {billDate}</span>
                  <span>&bull;</span>
                  <span className="text-danger fw-bold">Due Date: {dueDate}</span>
                </div>
              </div>

              {/* Unpaid Badge */}
              <div
                className="px-3 py-1 rounded-pill fw-bold"
                style={{
                  backgroundColor: isPaid ? '#dcfce7' : '#fff7ed',
                  color: isPaid ? '#16a34a' : '#ea580c',
                  border: 'none',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                }}
              >
                {isPaid ? 'PAID' : 'UNPAID'}
              </div>
            </div>

            {/* Bill Items Box (Identical structure to Deposit card) */}
            <div className="border rounded-2 mb-3 bg-white" style={{ borderColor: '#e2e8f0' }}>
              <div
                className="p-3 d-flex justify-content-between align-items-start border-bottom"
                style={{ borderColor: '#f1f5f9' }}
              >
                <div>
                  <div className="fw-bold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                    Fit Out Extension Fee
                  </div>
                  <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                    Fee for extended period up to {newEndDate} for Permit #{permit?.permitNumber || 'PRO/FP/082026/000104'}
                  </div>
                </div>
                <div className="fw-bold text-dark text-nowrap ms-3" style={{ fontSize: '0.82rem' }}>
                  {totalAmount}
                </div>
              </div>

              {/* Total Row */}
              <div
                className="p-3 d-flex justify-content-between align-items-center bg-light"
                style={{
                  backgroundColor: '#f8fafc',
                  borderBottomLeftRadius: '0.45rem',
                  borderBottomRightRadius: '0.45rem',
                }}
              >
                <span className="fw-semibold text-secondary" style={{ fontSize: '0.82rem' }}>
                  Total Amount
                </span>
                <span className="fw-bold text-dark" style={{ fontSize: '0.92rem' }}>
                  {totalAmount}
                </span>
              </div>
            </div>

            {/* Action Button: View Detail Invoice (Identical to Deposit card) */}
            <Button
              variant="outline-primary"
              className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold btn-preview-action"
              onClick={() => setShowInvoiceModal(true)}
            >
              <FileText size={16} weight="bold" />
              <span>View Detail Invoice</span>
            </Button>
          </div>
        )}

        {/* 5. Authorized By (Very Bottom of the Card) */}
        <div className="mt-3 pt-3 border-top text-secondary small" style={{ fontSize: '0.76rem', borderColor: '#f1f5f9' }}>
          Authorized by <strong className="text-dark">{authorizedBy}</strong> &bull; {authorizedAt}
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {!isFree && (
        <Modal
          show={showInvoiceModal}
          onHide={() => setShowInvoiceModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
            <div>
              <Modal.Title className="fw-bold fs-6 text-dark mb-1">
                Fit Out Extension Invoice #{invoiceNumber}
              </Modal.Title>
              <div className="text-muted small" style={{ fontSize: '0.76rem' }}>
                Permit: {permit?.permitNumber || 'PRO/FP/082026/000104'} &bull; Issued Date: {billDate} &bull; Due Date: <strong className="text-danger">{dueDate}</strong>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body style={{ padding: '20px' }}>
            {/* Invoice Summary Header */}
            <div className="p-3 rounded-3 border bg-light mb-3" style={{ borderColor: '#e2e8f0' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">Status Tagihan</div>
                  <div className="fw-bold fs-6" style={{ color: '#ea580c' }}>UNPAID</div>
                </div>
                <div className="text-end">
                  <div className="text-muted small">Total Tagihan</div>
                  <div className="fw-bold text-dark fs-5">{totalAmount}</div>
                </div>
              </div>
            </div>

            <Table responsive bordered hover className="mb-3">
              <thead className="table-light">
                <tr>
                  <th style={{ fontSize: '0.78rem' }}>Description</th>
                  <th className="text-center" style={{ fontSize: '0.78rem', width: '100px' }}>Qty / Days</th>
                  <th className="text-end" style={{ fontSize: '0.78rem', width: '180px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="fw-bold" style={{ fontSize: '0.82rem' }}>
                      Fit Out Extension Fee
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                      Fee for extended period up to {newEndDate}
                    </div>
                  </td>
                  <td className="text-center align-middle" style={{ fontSize: '0.82rem' }}>
                    +{additionalDays} Days
                  </td>
                  <td className="text-end align-middle fw-bold" style={{ fontSize: '0.84rem' }}>
                    {totalAmount}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={2} className="text-end fw-bold" style={{ fontSize: '0.82rem' }}>
                    Total Invoice:
                  </th>
                  <th className="text-end fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                    {totalAmount}
                  </th>
                </tr>
              </tfoot>
            </Table>
          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
            <Button
              variant="outline-secondary"
              className="fw-bold px-4 py-2"
              style={{ backgroundColor: '#ffffff', fontSize: '0.84rem', borderRadius: '0.45rem' }}
              onClick={() => setShowInvoiceModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Engineering Documentation Photo Lightbox Modal */}
      {selectedPhoto && (
        <Modal
          show={!!selectedPhoto}
          onHide={() => setSelectedPhoto(null)}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold fs-6">
              Dokumentasi Temuan Lapangan — Engineering
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center p-3">
            <img
              src={selectedPhoto}
              alt="Full documentation preview"
              className="img-fluid rounded-3 shadow-sm mb-2"
              style={{ maxHeight: '70vh', objectFit: 'contain' }}
            />
            <div className="text-muted small mt-2">
              Foto dokumentasi kendala sambungan pipa PVC saat uji hidrolik oleh Engineering Lead
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
