/**
 * MODEL: TaskModel
 * Represents a Fitout Milestone or Work Item (e.g. Electrical, Flooring, Partisi, HVAC).
 */

export const TASK_CATEGORY = {
  MEP: 'MEP (Mechanical, Electrical, Plumbing)',
  STRUCTURE: 'Partition & Ceilings',
  FLOORING: 'Flooring & Tiling',
  CARPENTRY: 'Custom Millwork & Carpentry',
  FINISHING: 'Painting & Finishing',
  FURNITURE: 'FF&E (Furniture, Fixtures & Equipments)',
};

export class TaskModel {
  constructor({
    id = Date.now().toString() + Math.random().toString(36).substr(2, 4),
    projectId = '',
    title = '',
    category = TASK_CATEGORY.MEP,
    assignee = 'Fitout Team',
    dueDate = '',
    isCompleted = false,
    estimatedCost = 0,
  } = {}) {
    this.id = id;
    this.projectId = projectId;
    this.title = title;
    this.category = category;
    this.assignee = assignee;
    this.dueDate = dueDate;
    this.isCompleted = isCompleted;
    this.estimatedCost = Number(estimatedCost);
  }

  toggle() {
    this.isCompleted = !this.isCompleted;
  }
}
