import React, { useState } from 'react';
import { Receipt, FileText } from '@phosphor-icons/react';
import { Button, Modal, Table } from 'react-bootstrap';

export function ExtensionBillInformationCard({
  billDate = '10/08/2026 15:57',
  dueDate = '11/08/2026 23:59',
  permitNumber = 'PRO/FP/082026/000104',
  invoiceNumber = 'PRO/INV/082026/000032',
  additionalDays = 3,
  endDate = '13 Aug 2026',
  amount = 'Rp 450.000,00',
  isPaid = false,
}) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  return (
    <div className="proa-card overflow-hidden mb-3">
      {/* Light Gray Card Header (Primary Green/Teal Icon, Matching Other Cards) */}
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
          EXTENSION BILL INFORMATION
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Bill Meta Row & Unpaid Badge */}
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

          {/* Unpaid Badge (Orange Theme, No Dot, No Outline) */}
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

        {/* Bill Items Box */}
        <div className="border rounded-2 mb-3 bg-white" style={{ borderColor: '#e2e8f0' }}>
          <div
            className="p-3 d-flex justify-content-between align-items-start border-bottom"
            style={{ borderColor: '#f1f5f9' }}
          >
            <div>
              <div className="fw-bold text-dark mb-1" style={{ fontSize: '0.82rem' }}>
                Fit Out Extension Fee
              </div>
              <div className="text-muted small" style={{ fontSize: '0.74rem' }}>
                Fee for extended period up to {endDate} for Permit #{permitNumber}
              </div>
            </div>
            <div className="fw-bold text-dark text-nowrap ms-3" style={{ fontSize: '0.85rem' }}>
              {amount}
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
              {amount}
            </span>
          </div>
        </div>

        {/* Action Button: View Detail Invoice (Matching Primary Style) */}
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
      <Modal
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
          <div>
            <Modal.Title className="fw-bold fs-6 text-dark mb-1">
              Extension Invoice #{invoiceNumber}
            </Modal.Title>
            <div className="text-muted small" style={{ fontSize: '0.76rem' }}>
              Permit: {permitNumber} &bull; Issued Date: {billDate} &bull; Due Date: <strong className="text-danger">{dueDate}</strong>
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
                <div className="fw-bold text-dark fs-5">{amount}</div>
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
                    Fee for extended period up to {endDate}
                  </div>
                </td>
                <td className="text-center align-middle" style={{ fontSize: '0.82rem' }}>
                  +{additionalDays} Days
                </td>
                <td className="text-end align-middle fw-bold" style={{ fontSize: '0.84rem' }}>
                  {amount}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2} className="text-end fw-bold" style={{ fontSize: '0.82rem' }}>
                  Total Invoice:
                </th>
                <th className="text-end fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                  {amount}
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
    </div>
  );
}
