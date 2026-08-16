import React, { useState, useMemo, useEffect } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { CalendarPlus, Clock, Wrench, WarningCircle, XCircle, CheckCircle } from '@phosphor-icons/react';

export function FitoutExtensionModal({
  show,
  onHide,
  currentStartDate = '04 Aug 2026',
  currentEndDate = '10 Aug 2026',
  engineeringRequest = null,
  onSaveExtension,
  onRejectExtension,
}) {
  const [newEndDate, setNewEndDate] = useState('2026-08-13');
  const [extensionType, setExtensionType] = useState('free'); // 'free' or 'chargeable'
  const [freeReason, setFreeReason] = useState('');
  const [customCharge, setCustomCharge] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [notes, setNotes] = useState('');
  const [isRejectMode, setIsRejectMode] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Check if this modal is being opened to review an active pending request from engineering
  const isPendingEngineering = engineeringRequest && engineeringRequest.status === 'PENDING_TR_REVIEW';

  // Automatically reset reject mode and form states when modal opens
  useEffect(() => {
    if (show) {
      setIsRejectMode(false);
      setRejectReason('');
    }
  }, [show]);

  // Handle clean single-digit typing without trailing 00 interference
  const handleChargeChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    const cleanDigits = digits.replace(/^0+(?!$)/, '');
    setCustomCharge(cleanDigits);
  };

  const getDisplayValue = () => {
    if (!customCharge) return '';
    const num = parseInt(customCharge, 10);
    if (isNaN(num)) return '';
    const thousand = new Intl.NumberFormat('id-ID').format(num);
    return isFocused ? thousand : `${thousand},00`;
  };

  const formatAccountingCurrency = (digits) => {
    if (!digits || Number(digits) === 0) return 'Rp 0,00';
    const num = parseInt(digits, 10);
    return `Rp ${new Intl.NumberFormat('id-ID').format(num)},00`;
  };

  // Form Validation
  const isFormValid = useMemo(() => {
    if (isRejectMode) {
      return rejectReason.trim().length > 0;
    }
    if (!newEndDate) return false;
    if (extensionType === 'free' && !freeReason.trim()) return false;
    if (extensionType === 'chargeable' && (!customCharge || Number(customCharge) <= 0)) return false;
    return true;
  }, [isRejectMode, rejectReason, newEndDate, extensionType, freeReason, customCharge]);

  // Calculate additional days for schedule display only
  const additionalDays = useMemo(() => {
    try {
      const baseEnd = new Date('2026-08-10');
      const targetEnd = new Date(newEndDate);
      const diffTime = targetEnd.getTime() - baseEnd.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : (isPendingEngineering ? (engineeringRequest?.requestedDays || 3) : 3);
    } catch {
      return isPendingEngineering ? (engineeringRequest?.requestedDays || 3) : 3;
    }
  }, [newEndDate, isPendingEngineering, engineeringRequest]);

  const totalCharge = useMemo(() => {
    return extensionType === 'chargeable' ? Number(customCharge || 0) : 0;
  }, [extensionType, customCharge]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (isRejectMode) {
      if (onRejectExtension) {
        onRejectExtension({
          rejectReason: rejectReason.trim(),
        });
      }
      onHide();
      return;
    }

    if (onSaveExtension) {
      onSaveExtension({
        newEndDateStr: '13 Aug 2026', // formatted
        newEndDateIso: newEndDate,
        additionalDays,
        extensionType,
        freeReason,
        totalCharge,
        notes,
        fromEngineeringRequest: isPendingEngineering,
        engineeringRequestDetails: isPendingEngineering ? engineeringRequest : null,
      });
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      {/* Modal Header: Exact 16px Padding */}
      <Modal.Header closeButton className="border-bottom" style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
        <div>
          <Modal.Title className="fw-bold fs-6 text-dark" style={{ marginBottom: '4px', lineHeight: '1.25' }}>
            {isPendingEngineering ? 'Review Engineering Extension Request' : 'Fitout Schedule Extension'}
          </Modal.Title>
          <div className="text-muted small" style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
            {isPendingEngineering
              ? 'Review extension request submitted by Engineering and determine the fee policy.'
              : 'Extend renovation period and determine fee policy for this permit.'}
          </div>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        {/* Modal Body: Exact 16px Padding */}
        <Modal.Body className="bg-white" style={{ padding: '20px' }}>
          {/* If Engineering Request exists and is PENDING: Display Engineering Request Summary Box */}
          {isPendingEngineering && (
            <div
              className="rounded-3 border overflow-hidden"
              style={{ borderColor: '#e2e8f0', backgroundColor: '#ffffff', marginBottom: '20px' }}
            >
              {/* Header Box */}
              <div
                className="d-flex align-items-center justify-content-between border-bottom"
                style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0', padding: '14px 18px' }}
              >
                <span className="fw-bold text-uppercase text-dark" style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}>
                  ENGINEERING REQUEST SUBMISSION
                </span>
                <span
                  className="badge rounded-pill fw-bold"
                  style={{
                    backgroundColor: '#fff7ed',
                    color: '#ea580c',
                    border: 'none',
                    fontSize: '0.72rem',
                    padding: '0.35rem 0.75rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  WAITING FOR APPROVAL
                </span>
              </div>

              {/* Body Box */}
              <div style={{ padding: '16px 18px' }}>
                <div className="row g-3 mb-3">
                  <div className="col-12 col-sm-6">
                    <div className="text-muted small fw-medium mb-0.5" style={{ fontSize: '0.74rem' }}>
                      Requested By:
                    </div>
                    <div className="fw-bold text-dark" style={{ fontSize: '0.86rem' }}>
                      {engineeringRequest.requestedBy || 'Budi Santoso (Engineering Lead 01)'}
                    </div>
                  </div>
                  <div className="col-12 col-sm-6">
                    <div className="text-muted small fw-medium mb-0.5" style={{ fontSize: '0.74rem' }}>
                      Requested Period:
                    </div>
                    <div className="fw-bold text-dark" style={{ fontSize: '0.86rem' }}>
                      {engineeringRequest.currentEndDate || '10 Aug 2026'} &rarr; {engineeringRequest.requestedEndDate || '13 Aug 2026'} (+{engineeringRequest.requestedDays || 3}D)
                    </div>
                  </div>
                </div>

                {engineeringRequest.status === 'REJECTED' && engineeringRequest.rejectReason && (
                  <div className="p-2.5 px-3 rounded-2 border mb-3" style={{ backgroundColor: '#fee2e2', borderColor: '#fca5a5' }}>
                    <div className="fw-bold text-danger mb-0.5" style={{ fontSize: '0.72rem', letterSpacing: '0.03em' }}>
                      REJECTION REASON (TENANT RELATION):
                    </div>
                    <div className="text-danger small fst-italic" style={{ fontSize: '0.82rem' }}>
                      &ldquo;{engineeringRequest.rejectReason}&rdquo;
                    </div>
                  </div>
                )}

                <div className="border-top" style={{ borderColor: '#e2e8f0', paddingTop: '12px', marginTop: '4px' }}>
                  <div className="fw-bold text-uppercase text-dark mb-1.5" style={{ fontSize: '0.74rem', letterSpacing: '0.03em' }}>
                    NOTES
                  </div>
                  <div className="fst-italic text-secondary" style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
                    &ldquo;{engineeringRequest.technicalReason || 'Field technical issue requiring additional working days.'}&rdquo;
                  </div>
                </div>

                {/* Engineering Documentation Photos */}
                {engineeringRequest.photos && engineeringRequest.photos.length > 0 && (
                  <div className="border-top" style={{ borderColor: '#e2e8f0', marginTop: '14px', paddingTop: '12px' }}>
                    <div className="mb-2">
                      <span className="fw-bold text-uppercase text-dark" style={{ fontSize: '0.74rem', letterSpacing: '0.03em' }}>
                        REQUEST PHOTOS ({engineeringRequest.photos.length} PHOTOS)
                      </span>
                    </div>
                    <div className="d-flex gap-2 flex-wrap">
                      {engineeringRequest.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="position-relative rounded-2 overflow-hidden border cursor-pointer shadow-xs"
                          style={{
                            width: '84px',
                            height: '62px',
                            borderColor: '#cbd5e1',
                            backgroundColor: '#ffffff',
                          }}
                          onClick={() => setSelectedPhoto(photo)}
                          title={`View Photo #${idx + 1}`}
                        >
                          <img
                            src={photo}
                            alt={`Photo #${idx + 1}`}
                            className="w-100 h-100"
                            style={{ objectFit: 'cover' }}
                          />
                          <div
                            className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-1.5 py-0.5"
                            style={{ fontSize: '0.62rem', borderTopLeftRadius: '4px', fontWeight: 600 }}
                          >
                            #{idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isRejectMode ? (
            <>
              {/* Summary Box Current vs Target Schedule */}
              <div
                className="rounded-3 border bg-white"
                style={{ padding: '16px', marginBottom: '16px', borderColor: '#e2e8f0' }}
              >
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <div>
                    <div className="text-muted fw-semibold mb-1" style={{ fontSize: '0.74rem' }}>
                      Current Schedule
                    </div>
                    <div className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>
                      {currentStartDate} &mdash; {currentEndDate} (6 Days Duration)
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="text-muted fw-semibold mb-1" style={{ fontSize: '0.74rem' }}>
                      Period End Date
                    </div>
                    <div className="fw-bold d-flex align-items-center gap-2" style={{ color: '#dc2626', fontSize: '0.9rem' }}>
                      <Clock size={18} weight="bold" />
                      <span>{currentEndDate} (Today)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. Select New Scheduled End Date */}
              <div style={{ marginBottom: '16px' }}>
                <Form.Label className="fw-bold text-dark small mb-1" style={{ fontSize: '0.82rem' }}>
                  1. Select New Scheduled End Date <span className="text-danger">*</span>
                </Form.Label>
                <Row className="g-2 align-items-center">
                  <Col xs={12} md={6}>
                    <Form.Control
                      type="date"
                      value={newEndDate}
                      min="2026-08-11"
                      onChange={(e) => setNewEndDate(e.target.value)}
                      style={{
                        height: '40px',
                        fontSize: '0.86rem',
                        padding: '0 0.75rem',
                        borderColor: '#cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                      }}
                      required
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <div
                      className="rounded-2 border small d-flex align-items-center justify-content-between flex-wrap gap-2"
                      style={{
                        height: '40px',
                        padding: '0 14px',
                        backgroundColor: '#fff7ed',
                        borderColor: '#fed7aa',
                        fontSize: '0.78rem',
                      }}
                    >
                      <div className="fw-bold" style={{ color: '#ea580c' }}>
                        +{additionalDays} Days Extended
                      </div>
                      <div className="fw-bold text-dark" style={{ color: '#0f172a' }}>
                        Total Duration: {6 + additionalDays} Days
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              {/* 2. Extension Fee Policy */}
              <div style={{ marginBottom: '16px' }}>
                <Form.Label className="fw-bold text-dark small mb-2" style={{ fontSize: '0.82rem' }}>
                  2. Extension Fee Policy <span className="text-danger">*</span>
                </Form.Label>

                <Row className="g-2">
                  {/* Option A: Free */}
                  <Col xs={12} md={6}>
                    <div
                      className={`p-3 rounded-3 border h-100 cursor-pointer transition-all ${
                        extensionType === 'free'
                          ? 'border-primary bg-primary-subtle text-primary fw-bold'
                          : 'border-secondary-subtle bg-white text-secondary'
                      }`}
                      onClick={() => setExtensionType('free')}
                      style={{
                        cursor: 'pointer',
                        borderColor: extensionType === 'free' ? '#27b29b' : '#cbd5e1',
                        backgroundColor: extensionType === 'free' ? '#e6f8f5' : '#ffffff',
                        color: extensionType === 'free' ? '#27b29b' : '#475569',
                      }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Form.Check
                          type="radio"
                          id="opt-free"
                          name="extensionType"
                          checked={extensionType === 'free'}
                          onChange={() => setExtensionType('free')}
                        />
                        <Form.Check.Label htmlFor="opt-free" className="fw-bold mb-0 cursor-pointer" style={{ fontSize: '0.86rem' }}>
                          FREE OF CHARGE (Tolerance / Grace Period)
                        </Form.Check.Label>
                      </div>
                      <p className="small mb-0 ps-4 text-muted" style={{ fontSize: '0.74rem' }}>
                        Granted tolerance without additional fitout supervision fee.
                      </p>
                    </div>
                  </Col>

                  {/* Option B: Chargeable */}
                  <Col xs={12} md={6}>
                    <div
                      className={`p-3 rounded-3 border h-100 cursor-pointer transition-all ${
                        extensionType === 'chargeable'
                          ? 'border-primary bg-primary-subtle text-primary fw-bold'
                          : 'border-secondary-subtle bg-white text-secondary'
                      }`}
                      onClick={() => setExtensionType('chargeable')}
                      style={{
                        cursor: 'pointer',
                        borderColor: extensionType === 'chargeable' ? '#27b29b' : '#cbd5e1',
                        backgroundColor: extensionType === 'chargeable' ? '#e6f8f5' : '#ffffff',
                        color: extensionType === 'chargeable' ? '#27b29b' : '#475569',
                      }}
                    >
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Form.Check
                          type="radio"
                          id="opt-chargeable"
                          name="extensionType"
                          checked={extensionType === 'chargeable'}
                          onChange={() => setExtensionType('chargeable')}
                        />
                        <Form.Check.Label htmlFor="opt-chargeable" className="fw-bold mb-0 cursor-pointer" style={{ fontSize: '0.86rem' }}>
                          CHARGEABLE (Additional Bill)
                        </Form.Check.Label>
                      </div>
                      <p className="small mb-0 ps-4 text-muted" style={{ fontSize: '0.74rem' }}>
                        Subject to fitout supervision charge and issuance of a new invoice.
                      </p>
                    </div>
                  </Col>
                </Row>

                {/* Sub-form Detail Policy */}
                {extensionType === 'free' ? (
                  <div
                    className="rounded-3 border bg-white mt-3"
                    style={{
                      borderColor: '#e2e8f0',
                      padding: '16px',
                    }}
                  >
                    <Form.Label className="fw-bold text-dark small d-block mb-2" style={{ fontSize: '0.82rem' }}>
                      Reason for Fee Exemption / Tolerance Notes: <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={freeReason}
                      onChange={(e) => setFreeReason(e.target.value)}
                      placeholder="Enter reason for fee exemption or management tolerance policy..."
                      style={{
                        fontSize: '0.84rem',
                        borderColor: '#cbd5e1',
                        backgroundColor: '#ffffff',
                        color: '#0f172a',
                        padding: '8px 12px',
                      }}
                      required={extensionType === 'free'}
                    />
                  </div>
                ) : (
                  <div
                    className="rounded-3 border bg-white mt-3"
                    style={{
                      borderColor: '#e2e8f0',
                      padding: '16px',
                    }}
                  >
                    <Form.Label className="fw-bold text-dark small d-block mb-2" style={{ fontSize: '0.82rem' }}>
                      Extension Fee Amount <span className="text-danger">*</span>
                    </Form.Label>
                    <div className="input-group mb-2">
                      <span className="input-group-text bg-light fw-bold text-secondary px-3" style={{ borderColor: '#cbd5e1', fontSize: '0.84rem' }}>
                        Rp
                      </span>
                      <Form.Control
                        type="text"
                        inputMode="numeric"
                        value={getDisplayValue()}
                        onChange={handleChargeChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="0,00"
                        style={{
                          fontSize: '0.86rem',
                          color: '#0f172a',
                          backgroundColor: '#ffffff',
                          borderColor: '#cbd5e1',
                          padding: '8px 12px',
                          fontWeight: '600',
                        }}
                        required={extensionType === 'chargeable'}
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center text-muted pt-2 border-top" style={{ borderColor: '#f1f5f9', fontSize: '0.78rem' }}>
                      <span>Total Invoice Amount to be Issued:</span>
                      <span className="fw-bold fs-6" style={{ color: '#ea580c' }}>
                        {formatAccountingCurrency(customCharge)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Notes */}
              <div style={{ marginBottom: '0px' }}>
                <Form.Label className="fw-bold text-dark small mb-1" style={{ fontSize: '0.82rem' }}>
                  3. Notes <span className="text-muted fw-normal">(Optional)</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter decision details, supervision guidelines, or approval notes..."
                  style={{
                    fontSize: '0.84rem',
                    borderColor: '#cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                    lineHeight: '1.45',
                  }}
                />
              </div>
            </>
          ) : (
            /* Rejection Form Mode */
            <div className="p-2">
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-3" style={{ fontSize: '0.82rem' }}>
                <WarningCircle size={20} weight="bold" />
                <span>
                  You are about to <strong>reject</strong> the extension request from Engineering. The fitout schedule will remain ending on <strong>{currentEndDate}</strong>.
                </span>
              </div>

              <Form.Group>
                <Form.Label className="fw-bold small text-dark mb-1" style={{ fontSize: '0.8rem' }}>
                  Rejection Reason <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Explain the reason why this extension request is rejected..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  required
                  style={{
                    fontSize: '0.84rem',
                    borderColor: '#cbd5e1',
                    backgroundColor: '#ffffff',
                    color: '#0f172a',
                  }}
                />
              </Form.Group>
            </div>
          )}
        </Modal.Body>

        {/* Modal Footer: Exact 16px Padding */}
        <Modal.Footer className="d-flex justify-content-between border-top" style={{ backgroundColor: '#f8fafc', padding: '16px' }}>
          <div>
            {isRejectMode && (
              <button
                type="button"
                className="btn btn-link text-secondary text-decoration-none btn-sm fw-semibold"
                onClick={() => setIsRejectMode(false)}
              >
                &larr; Back to Decision Form
              </button>
            )}
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* If NOT Engineering Request (Scenario 2: TR Direct or post-rejection), show Cancel button */}
            {!isPendingEngineering && !isRejectMode && (
              <button
                type="button"
                className="btn fw-semibold"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  color: '#475569',
                  fontSize: '0.84rem',
                  padding: '0.5rem 1.15rem',
                }}
                onClick={onHide}
              >
                Cancel
              </button>
            )}

            {/* If Engineering Request is PENDING_TR_REVIEW in standard mode, show Reject Request with gray outline & red text */}
            {isPendingEngineering && !isRejectMode && (
              <button
                type="button"
                className="btn fw-semibold d-flex align-items-center gap-2"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  color: '#dc2626',
                  fontSize: '0.84rem',
                  padding: '0.5rem 1.15rem',
                }}
                onClick={() => setIsRejectMode(true)}
              >
                <XCircle size={17} weight="bold" />
                <span>Reject Request</span>
              </button>
            )}

            {isRejectMode ? (
              <>
                <button
                  type="button"
                  className="btn fw-semibold"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                    color: '#475569',
                    fontSize: '0.84rem',
                    padding: '0.5rem 1.15rem',
                  }}
                  onClick={() => setIsRejectMode(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="btn fw-bold d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: isFormValid ? '#dc2626' : '#e2e8f0',
                    borderColor: isFormValid ? '#dc2626' : '#e2e8f0',
                    color: isFormValid ? '#ffffff' : '#64748b',
                    fontSize: '0.84rem',
                    padding: '0.5rem 1.25rem',
                    cursor: isFormValid ? 'pointer' : 'not-allowed',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <XCircle size={17} weight="bold" />
                  <span>Confirm Rejection</span>
                </button>
              </>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid}
                className="btn fw-bold d-flex align-items-center gap-2"
                style={{
                  backgroundColor: isFormValid ? '#27b29b' : '#e2e8f0',
                  borderColor: isFormValid ? '#27b29b' : '#e2e8f0',
                  color: isFormValid ? '#ffffff' : '#64748b',
                  fontSize: '0.84rem',
                  padding: '0.5rem 1.35rem',
                  cursor: isFormValid ? 'pointer' : 'not-allowed',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease',
                }}
                title={!isFormValid ? 'Please fill in all required fields to proceed' : 'Submit'}
              >
                <CheckCircle size={17} weight="bold" />
                <span>Submit</span>
              </button>
            )}
          </div>
        </Modal.Footer>
      </Form>

      {/* Engineering Photo Lightbox Modal */}
      {selectedPhoto && (
        <Modal
          show={!!selectedPhoto}
          onHide={() => setSelectedPhoto(null)}
          centered
          size="lg"
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="fw-bold fs-6">
              Field Documentation — Engineering
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
              Main pipe connection hydraulic pressure test documentation by Engineering Lead
            </div>
          </Modal.Body>
        </Modal>
      )}
    </Modal>
  );
}
