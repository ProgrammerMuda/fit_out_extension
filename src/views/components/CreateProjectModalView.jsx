import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Plus, FloppyDisk } from '@phosphor-icons/react';
import { PROJECT_STATUS } from '../../models/ProjectModel';

export function CreateProjectModalView({ show, onHide, onAddProject }) {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Commercial Office',
    location: '',
    budget: '',
    deadline: '',
    description: '',
    status: PROJECT_STATUS.PLANNING,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onAddProject(formData);
    if (!result.success) {
      setErrors(result.errors);
    } else {
      // Reset form & close
      setFormData({
        title: '',
        client: '',
        category: 'Commercial Office',
        location: '',
        budget: '',
        deadline: '',
        description: '',
        status: PROJECT_STATUS.PLANNING,
      });
      setErrors({});
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">Tambah Proyek Fitout Baru</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="pt-3">
          <Row className="g-3">
            <Col md={12}>
              <Form.Group controlId="projTitle">
                <Form.Label className="small fw-semibold text-secondary">
                  Nama / Judul Proyek <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Contoh: Renovasi Kantor Fintech Lt. 12"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="projClient">
                <Form.Label className="small fw-semibold text-secondary">
                  Nama Klien / Perusahaan <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="client"
                  placeholder="Contoh: PT Surya Cemerlang"
                  value={formData.client}
                  onChange={handleChange}
                  isInvalid={!!errors.client}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.client}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="projCategory">
                <Form.Label className="small fw-semibold text-secondary">
                  Kategori Fitout
                </Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="F&B Retail">F&B Retail (Cafe & Restaurant)</option>
                  <option value="Retail Store">Retail Store & Boutique</option>
                  <option value="Residential Luxury">Residential Luxury</option>
                  <option value="Healthcare & Clinic">Healthcare & Clinic</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="projBudget">
                <Form.Label className="small fw-semibold text-secondary">
                  Nilai Anggaran (IDR) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="budget"
                  placeholder="Contoh: 500000000"
                  value={formData.budget}
                  onChange={handleChange}
                  isInvalid={!!errors.budget}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.budget}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="projDeadline">
                <Form.Label className="small fw-semibold text-secondary">
                  Target Selesai (Deadline) <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  isInvalid={!!errors.deadline}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.deadline}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="projLocation">
                <Form.Label className="small fw-semibold text-secondary">
                  Lokasi / Alamat Proyek
                </Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Contoh: Menara Astra Lt. 25, Jakarta Pusat"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="projDescription">
                <Form.Label className="small fw-semibold text-secondary">
                  Deskripsi / Scope of Work
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Details of fitout work scope, special materials, specifications, etc."
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={onHide} className="fw-semibold">
            Cancel
          </Button>
          <Button variant="primary" type="submit" className="d-flex align-items-center gap-1 fw-semibold px-4">
            <FloppyDisk size={18} weight="bold" />
            Save Project
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
