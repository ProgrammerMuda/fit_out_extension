import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { CalendarCheck, FloppyDisk } from '@phosphor-icons/react';

export function ScheduleInspectionModal({ show, onHide, currentSchedule, onSave }) {
  const [formData, setFormData] = useState({
    inspectionDate: currentSchedule?.inspectionDate || '2026-08-16',
    inspectionTime: currentSchedule?.inspectionTime || '10:00',
    inspectorName: currentSchedule?.inspectorName || 'Engineering Lead 01',
    notes: currentSchedule?.notes || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: '32px', height: '32px', backgroundColor: '#ffedd5', color: '#f97316' }}
          >
            <CalendarCheck size={20} weight="bold" />
          </div>
          <Modal.Title className="fw-bold fs-6">Set Final Inspection Schedule</Modal.Title>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="pt-3">
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="inspectionDate">
                <Form.Label className="small fw-semibold text-secondary">Tanggal Inspeksi</Form.Label>
                <Form.Control
                  type="date"
                  name="inspectionDate"
                  value={formData.inspectionDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="inspectionTime">
                <Form.Label className="small fw-semibold text-secondary">Waktu / Jam</Form.Label>
                <Form.Control
                  type="time"
                  name="inspectionTime"
                  value={formData.inspectionTime}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="inspectorName">
                <Form.Label className="small fw-semibold text-secondary">Petugas Engineering (PIC)</Form.Label>
                <Form.Control
                  type="text"
                  name="inspectorName"
                  value={formData.inspectorName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="notes">
                <Form.Label className="small fw-semibold text-secondary">Catatan / Instruksi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Catatan persiapan unit sebelum inspeksi..."
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={onHide} className="fw-semibold small">
            Batal
          </Button>
          <Button variant="warning" type="submit" className="btn-orange-action small">
            <FloppyDisk size={16} weight="bold" />
            Konfirmasi Jadwal
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
