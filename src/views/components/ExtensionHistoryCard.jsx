import React, { useState } from 'react';
import {
  ClockCounterClockwise,
  XCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  Image as ImageIcon,
  MagnifyingGlassPlus,
  FileText,
} from '@phosphor-icons/react';
import { Modal, Button, Table } from 'react-bootstrap';

export function ExtensionHistoryCard({ extensionLogs = [], permit = null }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeInvoiceItem, setActiveInvoiceItem] = useState(null);

  return (
    <div className="proa-card overflow-hidden mb-4">
      {/* Light Gray Card Header: Exact Match with other cards */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <ClockCounterClockwise size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          EXTENSION HISTORY
        </span>
      </div>

      {/* Card Body: Generous 24px Padding */}
      <div style={{ padding: '24px' }}>
        {extensionLogs.length === 0 ? (
          <div className="text-center py-5 text-muted small">
            No extension records found for this permit.
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {extensionLogs.map((item, index) => {
              const isRejected = item.status === 'REJECTED';
              const isPending = item.status === 'PENDING_TR_REVIEW';
              const isApproved =
                item.status === 'APPROVED_FREE' || item.status === 'APPROVED_CHARGEABLE';
              const isChargeable =
                item.status === 'APPROVED_CHARGEABLE' || item.feeType === 'chargeable';

              // Status Badge Config
              let badgeBg = '#f1f5f9';
              let badgeColor = '#475569';
              let badgeText = 'RECORDED';

              if (isRejected) {
                badgeBg = '#ffffff';
                badgeColor = '#dc2626';
                badgeText = 'REJECTED';
              } else if (isPending) {
                badgeBg = '#fff7ed';
                badgeColor = '#ea580c';
                badgeText = 'WAITING FOR APPROVAL';
              } else if (isApproved) {
                badgeBg = '#ecfdf5';
                badgeColor = '#059669';
                badgeText =
                  item.status === 'APPROVED_FREE' ? 'APPROVED (FREE)' : 'APPROVED (CHARGEABLE)';
              }

              return (
                <div
                  key={item.id || index}
                  className="rounded-3 border overflow-hidden bg-white shadow-xs"
                  style={{
                    borderColor: isRejected ? '#fca5a5' : '#e2e8f0',
                  }}
                >
                  {/* Card Item Header: Clean Title on Left, Status Badge on Right */}
                  <div
                    className="d-flex align-items-center justify-content-between flex-wrap gap-3 border-bottom"
                    style={{
                      backgroundColor: isRejected ? '#fee2e2' : '#f8fafc',
                      borderColor: isRejected ? '#fca5a5' : '#e2e8f0',
                      padding: '16px 24px',
                    }}
                  >
                    <span
                      className="fw-bold"
                      style={{ fontSize: '0.92rem', color: isRejected ? '#991b1b' : '#0f172a' }}
                    >
                      {item.title}
                    </span>

                    <span
                      className="badge rounded-pill fw-bold"
                      style={{
                        backgroundColor: badgeBg,
                        color: badgeColor,
                        border: isRejected ? '1px solid #fca5a5' : 'none',
                        fontSize: '0.72rem',
                        padding: '0.35rem 0.85rem',
                        letterSpacing: '0.03em',
                      }}
                    >
                      {badgeText}
                    </span>
                  </div>

                  {/* Card Item Body: Generous 24px Padding */}
                  <div style={{ padding: '24px' }}>
                    {/* Submitter & Extension Period Info Row: 3 Columns */}
                    <div
                      className="row g-3 border-bottom"
                      style={{
                        borderColor: '#f1f5f9',
                        paddingBottom: '20px',
                        marginBottom: '24px',
                      }}
                    >
                      {/* 1. Requested By */}
                      <div className="col-12 col-md-4">
                        <div
                          className="text-muted fw-semibold text-uppercase"
                          style={{ fontSize: '0.7rem', letterSpacing: '0.04em', marginBottom: '6px' }}
                        >
                          REQUESTED BY
                        </div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                          {item.requestedBy || 'Budi Santoso (Engineering Lead 01)'}
                        </div>
                      </div>

                      {/* 2. Requested Extension Period (Stacked with vertical spacing) */}
                      <div className="col-12 col-md-4">
                        <div
                          className="text-muted fw-semibold text-uppercase"
                          style={{ fontSize: '0.7rem', letterSpacing: '0.04em', marginBottom: '6px' }}
                        >
                          REQUESTED EXTENSION
                        </div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.94rem' }}>
                          +{item.requestedDays || 3} Days
                        </div>
                        <div
                          className="fw-semibold text-secondary"
                          style={{ fontSize: '0.9rem', marginTop: '6px', letterSpacing: '0.01em' }}
                        >
                          (until {item.targetDate})
                        </div>
                      </div>

                      {/* 3. Submitted At (Dark bold text) */}
                      <div className="col-12 col-md-4">
                        <div
                          className="text-muted fw-semibold text-uppercase"
                          style={{ fontSize: '0.7rem', letterSpacing: '0.04em', marginBottom: '6px' }}
                        >
                          SUBMITTED AT
                        </div>
                        <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>
                          {item.requestedAt}
                        </div>
                      </div>
                    </div>

                    {/* Engineering Technical Reason Section: Spacious 18px 22px Box */}
                    {item.requestReason && (
                      <div style={{ marginBottom: '24px' }}>
                        <div
                          className="fw-bold text-uppercase text-dark"
                          style={{ fontSize: '0.74rem', letterSpacing: '0.04em', marginBottom: '10px' }}
                        >
                          TECHNICAL NOTES
                        </div>
                        <div
                          className="fst-italic rounded-2 border"
                          style={{
                            backgroundColor: '#f8fafc',
                            borderColor: '#e2e8f0',
                            padding: '16px 20px',
                            fontSize: '0.88rem',
                            lineHeight: '1.6',
                            color: '#334155',
                          }}
                        >
                          &ldquo;{item.requestReason}&rdquo;
                        </div>
                      </div>
                    )}

                    {/* Attached Photos: Spacious Gallery with Proper Gap */}
                    {item.photos && item.photos.length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        <div
                          className="fw-bold text-uppercase text-dark d-flex align-items-center gap-2.5"
                          style={{ fontSize: '0.74rem', letterSpacing: '0.04em', marginBottom: '12px' }}
                        >
                          <ImageIcon size={17} weight="bold" />
                          <span>
                            REQUEST PHOTOS ({item.photos.length}{' '}
                            {item.photos.length === 1 ? 'PHOTO' : 'PHOTOS'})
                          </span>
                        </div>
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                          {item.photos.map((src, pIdx) => (
                            <div
                              key={pIdx}
                              className="position-relative rounded-3 overflow-hidden border cursor-pointer group shadow-xs"
                              style={{ width: '64px', height: '64px', borderColor: '#e2e8f0' }}
                              onClick={() => setSelectedPhoto(src)}
                              title="Click to view full photo"
                            >
                              <img
                                src={src}
                                alt={`Documentation ${pIdx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <div
                                className="position-absolute bottom-0 end-0 bg-dark text-white d-flex align-items-center justify-content-center"
                                style={{
                                  width: '20px',
                                  height: '20px',
                                  opacity: 0.85,
                                  borderTopLeftRadius: '5px',
                                }}
                              >
                                <MagnifyingGlassPlus size={12} weight="bold" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TENANT RELATION REJECTION DECISION BOX */}
                    {isRejected && (
                      <div
                        className="rounded-3 border"
                        style={{
                          backgroundColor: '#fff5f5',
                          borderColor: '#fca5a5',
                          padding: '22px 24px',
                          marginTop: '24px',
                        }}
                      >
                        {/* Rejection Header Row */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2"
                          style={{ marginBottom: '16px' }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <XCircle size={18} weight="bold" color="#dc2626" />
                            <span
                              className="fw-bold text-danger text-uppercase"
                              style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}
                            >
                              TENANT RELATION DECISION NOTES (REJECTED)
                            </span>
                          </div>
                          <span className="text-muted small" style={{ fontSize: '0.74rem' }}>
                            {item.decidedAt}
                          </span>
                        </div>

                        {/* Rejection Reason Text in Spacious Pure White Card */}
                        <div
                          className="bg-white rounded-2 border fst-italic text-dark"
                          style={{
                            borderColor: '#fca5a5',
                            padding: '16px 20px',
                            fontSize: '0.88rem',
                            lineHeight: '1.6',
                            color: '#1e293b',
                            marginBottom: '16px',
                          }}
                        >
                          &ldquo;{item.decisionReason}&rdquo;
                        </div>

                        {/* Evaluator Footer with Generous Top Padding */}
                        <div
                          className="d-flex align-items-center justify-content-between flex-wrap gap-2 text-muted border-top"
                          style={{
                            borderColor: '#fecaca',
                            paddingTop: '14px',
                            fontSize: '0.76rem',
                          }}
                        >
                          <span>
                            Decided by: <strong>{item.decidedBy || 'Tenant Relation Lead - Management'}</strong>
                          </span>
                          <span>
                            Decision: <strong className="text-danger">Request Rejected</strong>
                          </span>
                        </div>
                      </div>
                    )}



                    {/* 4. FIT OUT EXTENSION BILL INFORMATION (Integrated for Chargeable Extensions) */}
                    {isChargeable && (
                      <div className="pt-3 mt-3 border-top" style={{ borderColor: '#e2e8f0' }}>
                        {/* Bill Meta Row & Paid / Unpaid Badge */}
                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                          <div>
                            <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>
                              Fit Out Extension Bill Information
                            </h6>
                            <div
                              className="d-flex flex-wrap align-items-center gap-2 text-secondary small fw-medium mt-1"
                              style={{ fontSize: '0.74rem' }}
                            >
                              <span>
                                Invoice:{' '}
                                <strong style={{ color: '#27b29b' }}>
                                  {item.invoiceNumber || 'PRO/INV/082026/000032'}
                                </strong>
                              </span>
                              <span>&bull;</span>
                              <span>Issued: {item.billDate || item.decidedAt || '10/08/2026, 03:55 PM'}</span>
                              <span>&bull;</span>
                              <span className="text-danger fw-bold">
                                Due Date: {item.dueDate || '11/08/2026, 11:59 PM'}
                              </span>
                            </div>
                          </div>

                          {/* Paid / Unpaid Status Badge */}
                          <div
                            className="px-3 py-1 rounded-pill fw-bold"
                            style={{
                              backgroundColor: item.isPaid ? '#dcfce7' : '#fff7ed',
                              color: item.isPaid ? '#16a34a' : '#ea580c',
                              border: 'none',
                              fontSize: '0.75rem',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {item.isPaid ? 'PAID' : 'UNPAID'}
                          </div>
                        </div>

                        {/* Bill Breakdown Box */}
                        <div className="border rounded-2 mb-3 bg-white" style={{ borderColor: '#e2e8f0' }}>
                          <div
                            className="p-3 d-flex justify-content-between align-items-start border-bottom"
                            style={{ borderColor: '#f1f5f9' }}
                          >
                            <div>
                              <div className="fw-bold text-dark mb-1" style={{ fontSize: '0.82rem' }}>
                                Fit Out Extension Fee - Daily Technical Supervision
                              </div>
                              <div className="text-muted" style={{ fontSize: '0.74rem' }}>
                                Fee for extended period (+{item.requestedDays || 3} Days) up to {item.targetDate}{' '}
                                for Permit #{permit?.permitNumber || 'PRO/FP/082026/000104'}
                              </div>
                            </div>
                            <div className="fw-bold text-dark text-nowrap ms-3" style={{ fontSize: '0.84rem' }}>
                              {item.totalCharge || 'Rp 450.000,00'}
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
                              {item.totalCharge || 'Rp 450.000,00'}
                            </span>
                          </div>
                        </div>

                        {/* Action Button: View Detail Invoice */}
                        <Button
                          variant="outline-primary"
                          className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold btn-preview-action"
                          onClick={() => setActiveInvoiceItem(item)}
                        >
                          <FileText size={16} weight="bold" />
                          <span>View Detail Invoice</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Documentation Photos */}
      <Modal show={!!selectedPhoto} onHide={() => setSelectedPhoto(null)} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#f8fafc', padding: '16px 20px' }}>
          <Modal.Title className="fs-6 fw-bold text-dark">Technical Inspection Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center bg-dark">
          {selectedPhoto && (
            <img
              src={selectedPhoto}
              alt="Full Preview"
              className="img-fluid rounded"
              style={{ maxHeight: '75vh', objectFit: 'contain' }}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Invoice Detail Modal for Chargeable Extension Bills */}
      {activeInvoiceItem && (
        <Modal
          show={!!activeInvoiceItem}
          onHide={() => setActiveInvoiceItem(null)}
          size="lg"
          centered
        >
          <Modal.Header closeButton style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
            <div>
              <Modal.Title className="fw-bold fs-6 text-dark mb-1">
                Fit Out Extension Invoice #{activeInvoiceItem.invoiceNumber || 'PRO/INV/082026/000032'}
              </Modal.Title>
              <div className="text-muted small" style={{ fontSize: '0.76rem' }}>
                Permit: {permit?.permitNumber || 'PRO/FP/082026/000104'} &bull; Issued Date:{' '}
                {activeInvoiceItem.billDate || activeInvoiceItem.decidedAt || '10/08/2026, 03:55 PM'} &bull; Due Date:{' '}
                <strong className="text-danger">
                  {activeInvoiceItem.dueDate || '11/08/2026, 11:59 PM'}
                </strong>
              </div>
            </div>
          </Modal.Header>

          <Modal.Body style={{ padding: '20px' }}>
            {/* Invoice Summary Header */}
            <div className="p-3 rounded-3 border bg-light mb-3" style={{ borderColor: '#e2e8f0' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-muted small">Invoice Status</div>
                  <div
                    className="fw-bold fs-6"
                    style={{ color: activeInvoiceItem.isPaid ? '#16a34a' : '#ea580c' }}
                  >
                    {activeInvoiceItem.isPaid ? 'PAID' : 'UNPAID'}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-muted small">Total Amount</div>
                  <div className="fw-bold text-dark fs-5">
                    {activeInvoiceItem.totalCharge || 'Rp 450.000,00'}
                  </div>
                </div>
              </div>
            </div>

            <Table responsive bordered hover className="mb-3">
              <thead className="table-light">
                <tr>
                  <th style={{ fontSize: '0.78rem' }}>Description</th>
                  <th className="text-center" style={{ fontSize: '0.78rem', width: '100px' }}>
                    Qty / Days
                  </th>
                  <th className="text-end" style={{ fontSize: '0.78rem', width: '180px' }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="fw-bold" style={{ fontSize: '0.82rem' }}>
                      Fit Out Extension Fee - Daily Technical Supervision
                    </div>
                    <div className="text-muted small" style={{ fontSize: '0.72rem' }}>
                      Fee for extended period up to {activeInvoiceItem.targetDate}
                    </div>
                  </td>
                  <td className="text-center align-middle" style={{ fontSize: '0.82rem' }}>
                    +{activeInvoiceItem.requestedDays || 3} Days
                  </td>
                  <td className="text-end align-middle fw-bold" style={{ fontSize: '0.84rem' }}>
                    {activeInvoiceItem.totalCharge || 'Rp 450.000,00'}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={2} className="text-end fw-bold" style={{ fontSize: '0.82rem' }}>
                    Total Invoice:
                  </th>
                  <th className="text-end fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                    {activeInvoiceItem.totalCharge || 'Rp 450.000,00'}
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
              onClick={() => setActiveInvoiceItem(null)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
