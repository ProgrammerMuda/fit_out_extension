import React, { useState } from 'react';
import { Container, Row, Col, Nav, Form, Button, Alert } from 'react-bootstrap';
import {
  Funnel,
  PlusCircle,
  FolderOpen,
  CheckCircle,
  Clock,
  Sparkle,
} from '@phosphor-icons/react';
import { StatCardView } from '../components/StatCardView';
import { ProjectCardView } from '../components/ProjectCardView';
import { CreateProjectModalView } from '../components/CreateProjectModalView';
import { TaskChecklistView } from '../components/TaskChecklistView';
import { useProjectController } from '../../controllers/useProjectController';
import { useTaskController } from '../../controllers/useTaskController';
import { PROJECT_STATUS } from '../../models/ProjectModel';

export function DashboardView({
  searchQuery,
  isNewProjectModalOpen,
  setIsNewProjectModalOpen,
}) {
  // MVC Controller Bindings
  const {
    projects,
    statistics,
    filterStatus,
    setFilterStatus,
    activeTab,
    setActiveTab,
    addProject,
    deleteProject,
    updateProgress,
  } = useProjectController();

  const {
    tasks,
    getTasksByProject,
    toggleTask,
    addTask,
    deleteTask,
  } = useTaskController();

  // Selected Project for Tasks View Modal
  const [selectedProjectForTasks, setSelectedProjectForTasks] = useState(null);

  const handleOpenTasksModal = (project) => {
    setSelectedProjectForTasks(project);
  };

  const handleCloseTasksModal = () => {
    setSelectedProjectForTasks(null);
  };

  return (
    <Container fluid className="px-3 px-md-4 py-4">
      {/* Banner / Header Title */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-primary-subtle-custom text-primary-custom fw-semibold rounded-pill px-3 py-1">
              <Sparkle size={14} className="me-1" weight="fill" /> Fitout Project Portal
            </span>
          </div>
          <h2 className="fw-extrabold text-dark mb-0" style={{ letterSpacing: '-0.02em' }}>
            Dashboard Manajemen Proyek Fitout
          </h2>
          <p className="text-secondary small mb-0 mt-1">
            Pantau progres konstruksi interior, timeline MEP, dan realisasi anggaran secara real-time.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            className="d-flex align-items-center gap-2 px-3 py-2 fw-semibold"
            onClick={() => setIsNewProjectModalOpen(true)}
          >
            <PlusCircle size={20} weight="bold" />
            <span>Tambah Proyek Baru</span>
          </Button>
        </div>
      </div>

      {/* Statistics Section (VIEW) */}
      <StatCardView statistics={statistics} />

      {/* Filter & Navigation Bar */}
      <div className="bg-white p-3 rounded-3 shadow-sm border mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          {/* Tab Filter */}
          <Nav
            variant="pills"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="gap-2"
          >
            <Nav.Item>
              <Nav.Link
                eventKey="ALL"
                className={`rounded-pill px-3 fw-semibold small ${
                  activeTab === 'ALL' ? 'bg-primary text-white' : 'text-muted'
                }`}
              >
                Semua ({statistics.total})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="ACTIVE"
                className={`rounded-pill px-3 fw-semibold small ${
                  activeTab === 'ACTIVE' ? 'bg-primary text-white' : 'text-muted'
                }`}
              >
                Sedang Berjalan ({statistics.active})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="COMPLETED"
                className={`rounded-pill px-3 fw-semibold small ${
                  activeTab === 'COMPLETED' ? 'bg-primary text-white' : 'text-muted'
                }`}
              >
                Selesai ({statistics.completed})
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Status Dropdown */}
          <div className="d-flex align-items-center gap-2">
            <Funnel size={18} className="text-secondary" />
            <Form.Select
              size="sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-pill px-3"
              style={{ minWidth: '180px' }}
            >
              <option value="ALL">Status: Semua</option>
              <option value={PROJECT_STATUS.PLANNING}>Planning</option>
              <option value={PROJECT_STATUS.IN_PROGRESS}>In Progress</option>
              <option value={PROJECT_STATUS.REVIEW}>Review</option>
              <option value={PROJECT_STATUS.COMPLETED}>Completed</option>
            </Form.Select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-3 border shadow-sm">
          <FolderOpen size={48} className="text-muted mb-2" weight="duotone" />
          <h5 className="fw-bold text-dark">Tidak ada proyek yang sesuai</h5>
          <p className="text-muted small mb-3">
            Coba ubah kata kunci pencarian atau filter status Anda.
          </p>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => {
              setFilterStatus('ALL');
              setActiveTab('ALL');
            }}
          >
            Reset Filter
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          {projects.map((project) => (
            <Col xs={12} md={6} xl={4} key={project.id}>
              <ProjectCardView
                project={project}
                onOpenTasksModal={handleOpenTasksModal}
                onDeleteProject={deleteProject}
                onUpdateProgress={updateProgress}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Create Project Modal (VIEW) */}
      <CreateProjectModalView
        show={isNewProjectModalOpen}
        onHide={() => setIsNewProjectModalOpen(false)}
        onAddProject={addProject}
      />

      {/* Task Checklist Modal (VIEW) */}
      <TaskChecklistView
        show={!!selectedProjectForTasks}
        onHide={handleCloseTasksModal}
        project={selectedProjectForTasks}
        tasks={
          selectedProjectForTasks
            ? getTasksByProject(selectedProjectForTasks.id)
            : []
        }
        onToggleTask={toggleTask}
        onAddTask={addTask}
        onDeleteTask={deleteTask}
      />
    </Container>
  );
}
