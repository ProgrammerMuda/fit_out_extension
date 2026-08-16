import React, { useState } from 'react';
import { Modal, Button, Form, Badge, ListGroup, ProgressBar } from 'react-bootstrap';
import {
  CheckCircle,
  Circle,
  Plus,
  Trash,
  User,
  CalendarCheck,
  Tag,
} from '@phosphor-icons/react';
import { TASK_CATEGORY } from '../../models/TaskModel';

export function TaskChecklistView({
  show,
  onHide,
  project,
  tasks,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(TASK_CATEGORY.MEP);
  const [newAssignee, setNewAssignee] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  if (!project) return null;

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalCount = tasks.length;
  const taskProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleAddNewTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      projectId: project.id,
      title: newTitle.trim(),
      category: newCategory,
      assignee: newAssignee.trim() || 'Tim Fitout',
      dueDate: newDueDate || new Date().toISOString().split('T')[0],
      isCompleted: false,
    });

    setNewTitle('');
    setNewAssignee('');
    setNewDueDate('');
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-bottom-0 pb-0">
        <div>
          <span className="badge bg-light text-secondary border rounded-pill mb-1">
            {project.category}
          </span>
          <Modal.Title className="fw-bold">{project.title}</Modal.Title>
          <p className="text-muted small mb-0">Checklist & Milestone Pekerjaan Fitout</p>
        </div>
      </Modal.Header>

      <Modal.Body className="pt-3">
        {/* Progress Bar Header */}
        <div className="bg-light p-3 rounded-3 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fw-semibold small text-dark">
              Status Penyelesaian Checklist:
            </span>
            <span className="fw-bold text-primary">
              {completedCount} dari {totalCount} Selesai ({taskProgress}%)
            </span>
          </div>
          <div className="progress" style={{ height: '8px' }}>
            <div
              className="progress-bar progress-bar-custom"
              role="progressbar"
              style={{ width: `${taskProgress}%` }}
              aria-valuenow={taskProgress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
        </div>

        {/* Task List */}
        <h6 className="fw-bold text-dark mb-3">Daftar Pekerjaan & Subkontraktor</h6>

        {tasks.length === 0 ? (
          <div className="text-center py-4 text-muted bg-light rounded-3">
            <p className="mb-0">Belum ada item checklist pekerjaan untuk proyek ini.</p>
          </div>
        ) : (
          <ListGroup variant="flush" className="mb-4">
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className="d-flex align-items-center justify-content-between px-3 py-2 mb-2 rounded-3 border bg-white shadow-sm"
              >
                <div
                  className="d-flex align-items-center gap-3 flex-grow-1 cursor-pointer"
                  onClick={() => onToggleTask(task.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {task.isCompleted ? (
                    <CheckCircle size={24} weight="fill" color="#27b29b" />
                  ) : (
                    <Circle size={24} color="#94a3b8" />
                  )}

                  <div className="overflow-hidden">
                    <span
                      className={`fw-semibold d-block text-truncate ${
                        task.isCompleted
                          ? 'text-decoration-line-through text-muted'
                          : 'text-dark'
                      }`}
                    >
                      {task.title}
                    </span>
                    <div className="d-flex flex-wrap align-items-center gap-2 small text-muted">
                      <span className="badge bg-light text-secondary border">
                        {task.category}
                      </span>
                      {task.assignee && (
                        <span className="d-flex align-items-center gap-1">
                          <User size={14} /> {task.assignee}
                        </span>
                      )}
                      {task.dueDate && (
                        <span className="d-flex align-items-center gap-1">
                          <CalendarCheck size={14} /> {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="link"
                  size="sm"
                  className="text-danger p-1 ms-2"
                  onClick={() => onDeleteTask(task.id)}
                  title="Hapus task"
                >
                  <Trash size={18} />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}

        {/* Add New Task Form */}
        <div className="border rounded-3 p-3 bg-light">
          <h6 className="fw-bold text-dark small mb-2 d-flex align-items-center gap-1">
            <Plus size={16} weight="bold" className="text-primary" />
            Tambah Item Pekerjaan Baru
          </h6>
          <Form onSubmit={handleAddNewTask}>
            <div className="row g-2">
              <div className="col-12 col-md-6">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Nama pekerjaan (mis: Pemasangan Lampu Downlight)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-6">
                <Form.Select
                  size="sm"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  {Object.values(TASK_CATEGORY).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-6 col-md-4">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="PIC / Subcon (mis: Tim MEP)"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                />
              </div>
              <div className="col-6 col-md-4">
                <Form.Control
                  size="sm"
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4">
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="w-100 fw-semibold"
                  disabled={!newTitle.trim()}
                >
                  Tambahkan Task
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onHide} className="fw-semibold px-4">
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
