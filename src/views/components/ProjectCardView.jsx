import React from 'react';
import { Card, Badge, ProgressBar, Dropdown, Button } from 'react-bootstrap';
import {
  MapPin,
  CalendarBlank,
  DotsThreeVertical,
  CheckSquareOffset,
  Trash,
  User,
  CaretUp,
  CaretDown,
} from '@phosphor-icons/react';

export function ProjectCardView({
  project,
  onOpenTasksModal,
  onDeleteProject,
  onUpdateProgress,
}) {
  return (
    <Card className="custom-card border-0 h-100 shadow-sm">
      <Card.Body className="d-flex flex-column p-3 p-lg-4">
        {/* Header: Category & Status & Dropdown */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <span className="badge bg-light text-secondary border fw-medium rounded-pill px-2 py-1 small">
            {project.category}
          </span>

          <div className="d-flex align-items-center gap-2">
            <span className={`badge-status ${project.statusBadgeClass}`}>
              {project.status}
            </span>

            <Dropdown align="end">
              <Dropdown.Toggle
                as={Button}
                variant="light"
                size="sm"
                className="p-1 rounded-circle border-0 text-muted"
                style={{ width: '32px', height: '32px' }}
              >
                <DotsThreeVertical size={18} weight="bold" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow border-0 rounded-3">
                <Dropdown.Item onClick={() => onOpenTasksModal(project)}>
                  <CheckSquareOffset size={16} className="me-2 text-primary" />
                  Lihat Checklist Pekerjaan
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="text-danger"
                  onClick={() => onDeleteProject(project.id)}
                >
                  <Trash size={16} className="me-2" />
                  Hapus Proyek
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Project Title & Client */}
        <h5 className="fw-bold text-dark mb-1">{project.title}</h5>
        <div className="d-flex align-items-center text-muted small mb-3">
          <User size={15} className="me-1 text-secondary" />
          <span className="fw-medium">{project.client}</span>
        </div>

        {/* Description */}
        <p className="text-secondary small mb-3 flex-grow-1" style={{ lineHeight: '1.5' }}>
          {project.description}
        </p>

        {/* Location & Dates */}
        <div className="bg-light rounded-3 p-2 mb-3 small">
          <div className="d-flex align-items-center text-muted mb-1">
            <MapPin size={15} className="me-1 text-danger" weight="fill" />
            <span className="text-truncate">{project.location}</span>
          </div>
          <div className="d-flex align-items-center text-muted">
            <CalendarBlank size={15} className="me-1 text-primary" weight="bold" />
            <span>
              Target: <strong className="text-dark">{project.deadline}</strong>
            </span>
          </div>
        </div>

        {/* Budget info */}
        <div className="d-flex justify-content-between align-items-center mb-2 small">
          <span className="text-muted">Nilai Kontrak:</span>
          <span className="fw-bold text-dark">{project.formattedBudget}</span>
        </div>

        {/* Progress bar with quick +/- buttons */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-1 small">
            <span className="fw-semibold text-muted">Progres Pekerjaan</span>
            <span className="fw-bold" style={{ color: '#27b29b' }}>
              {project.progress}%
            </span>
          </div>
          <div className="progress mb-3" style={{ height: '8px' }}>
            <div
              className="progress-bar progress-bar-custom"
              role="progressbar"
              style={{ width: `${project.progress}%` }}
              aria-valuenow={project.progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          {/* Action Row */}
          <div className="d-flex gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              className="w-100 d-flex align-items-center justify-content-center gap-1 py-2 fw-semibold"
              onClick={() => onOpenTasksModal(project)}
            >
              <CheckSquareOffset size={18} weight="bold" />
              <span>Checklist Fitout</span>
            </Button>

            {/* Quick Step Buttons */}
            <Button
              variant="light"
              size="sm"
              className="border px-2 text-muted"
              title="Kurang 5%"
              onClick={() => onUpdateProgress(project.id, Math.max(0, project.progress - 5))}
            >
              <CaretDown size={16} weight="bold" />
            </Button>
            <Button
              variant="light"
              size="sm"
              className="border px-2 text-muted"
              title="Tambah 5%"
              onClick={() => onUpdateProgress(project.id, Math.min(100, project.progress + 5))}
            >
              <CaretUp size={16} weight="bold" />
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
