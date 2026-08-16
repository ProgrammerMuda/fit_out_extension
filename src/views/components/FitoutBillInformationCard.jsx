import React, { useState } from 'react';
import { Receipt, FileText } from '@phosphor-icons/react';
import { Button, Modal, Table } from 'react-bootstrap';

export function FitoutBillInformationCard({
  invoiceNumber = 'PRO/INV/082026/000008',
  issuedDate = '04/08/2026 08:10',
  paidDate = '04/08/2026 08:25',
  permitNumber = 'PRO/FP/082026/000104',
  items = [
    {
      name: 'Deposit 2026',
      description: 'Deposit 2026 for Fit Out Permit #PRO/FP/082026/000104',
      amount: 'Rp 2.000.000,00',
    },
    {
      name: 'Supervisi 2026',
      description: 'Supervisi 2026 for Fit Out Permit #PRO/FP/082026/000104',
      amount: 'Rp 200.000,00',
    },
  ],
  totalAmount = 'Rp 2.200.000,00',
}) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Clean Minimalist & Centered) */}
      <div
        className="p-3 px-4 d-flex align-items-center gap-2 border-bottom"
        style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}
      >
        <div className="d-flex align-items-center flex-shrink-0" style={{ color: '#27b29b' }}>
          <Receipt size={21} weight="bold" />
        </div>
        <span
          className="fw-bold text-dark text-uppercase"
          style={{ letterSpacing: '0.04em', fontSize: '0.84rem', lineHeight: 1 }}
        >
          FIT OUT BILL INFORMATION
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Bill Meta Row & Paid Badge */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>
              Fit Out Bill Information
            </h6>
            <div className="d-flex flex-wrap align-items-center gap-2 text-secondary small fw-medium mt-1" style={{ fontSize: '0.74rem' }}>
              <span>Invoice: <strong style={{ color: '#27b29b' }}>{invoiceNumber}</strong></span>
              <span>&bull;</span>
              <span>Issued: {issuedDate}</span>
              <span>&bull;</span>
              <span className="text-success fw-bold">Paid on: {paidDate}</span>
            </div>
          </div>

          {/* Paid Badge (Clean Text, No Dot, No Outline) */}
          <div
            className="px-3 py-1 rounded-pill fw-bold"
            style={{
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              border: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.04em',
            }}
          >
            PAID
          </div>
        </div>

        {/* Bill Items Box */}
        <div className="border rounded-2 mb-3 bg-white" style={{ borderColor: '#e2e8f0' }}>
          {items.map((item, index) => (
            <div
              key={index}
              className="p-3 d-flex justify-content-between align-items-start border-bottom"
              style={{ borderColor: '#f1f5f9' }}
            >
              <div>
                <div className="fw-bold text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                  {item.name}
                </div>
                <div className="text-muted" style={{ fontSize: '0.72rem' }}>
                  {item.description}
                </div>
              </div>
              <div className="fw-bold text-dark text-nowrap ms-3" style={{ fontSize: '0.82rem' }}>
                {item.amount}
              </div>
            </div>
          ))}

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

        {/* Action Button: View Detail Invoice */}
        <Button
          variant="outline-primary"
          className="w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold btn-preview-action"
          onClick={() => setShowInvoiceModal(true)}
        >
          <FileText size={16} weight="bold" />
          <span>View Detail Invoice</span>
        </Button>
      </div>

      {/* Invoice Detail Modal */}
      <Modal show={showInvoiceModal} onHide={() => setShowInvoiceModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
          <div>
            <Modal.Title className="fw-bold fs-6 text-dark mb-1">
              Fit Out Invoice #{invoiceNumber}
            </Modal.Title>
            <div className="text-muted small" style={{ fontSize: '0.76rem' }}>
              Permit: {permitNumber} &bull; Issued Date: {issuedDate} &bull; Paid on: <strong className="text-success">{paidDate}</strong>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
            <div>
              <h5 className="fw-bold text-dark mb-1">INVOICE FITOUT PRO</h5>
              <div className="text-muted small">No. Tagihan: {invoiceNumber}</div>
              <div className="text-muted small">Tanggal Terbit: {issuedDate}</div>
              <div className="text-success small fw-semibold">Tanggal Lunas: {paidDate}</div>
            </div>
            <span className="badge bg-success-subtle text-success px-3 py-2 fw-bold">
              STATUS: LUNAS (PAID)
            </span>
          </div>

          <Table responsive className="small mb-3">
            <thead>
              <tr className="bg-light">
                <th>Deskripsi Item</th>
                <th className="text-end">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td>
                    <strong>{item.name}</strong>
                    <div className="text-muted">{item.description}</div>
                  </td>
                  <td className="text-end fw-semibold">{item.amount}</td>
                </tr>
              ))}
              <tr className="table-light fw-bold">
                <td>Total Pembayaran:</td>
                <td className="text-end">{totalAmount}</td>
              </tr>
            </tbody>
          </Table>

          <div className="bg-light p-3 rounded-2 text-muted small">
            <strong>Metode Pembayaran:</strong> Virtual Account Bank BCA • Transaksi Berhasil pada 04/08/2026 08:10:22 WIB.
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
