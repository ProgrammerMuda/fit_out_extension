/**
 * MODEL: ProjectModel
 * Represents a Fitout Project Entity and its business logic/formatting methods.
 */

export const PROJECT_STATUS = {
  PLANNING: 'Planning',
  IN_PROGRESS: 'In Progress',
  REVIEW: 'Review',
  COMPLETED: 'Completed',
};

export class ProjectModel {
  constructor({
    id = Date.now().toString(),
    title = '',
    category = 'Commercial Fitout',
    location = 'Jakarta, Indonesia',
    client = '',
    budget = 0,
    spent = 0,
    progress = 0,
    startDate = new Date().toISOString().split('T')[0],
    deadline = '',
    status = PROJECT_STATUS.PLANNING,
    tasksCount = 0,
    completedTasksCount = 0,
    description = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.location = location;
    this.client = client;
    this.budget = Number(budget);
    this.spent = Number(spent);
    this.progress = Math.min(100, Math.max(0, Number(progress)));
    this.startDate = startDate;
    this.deadline = deadline;
    this.status = status;
    this.tasksCount = tasksCount;
    this.completedTasksCount = completedTasksCount;
    this.description = description;
  }

  // Format budget to IDR Currency
  static formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  get formattedBudget() {
    return ProjectModel.formatCurrency(this.budget);
  }

  get formattedSpent() {
    return ProjectModel.formatCurrency(this.spent);
  }

  get statusBadgeClass() {
    switch (this.status) {
      case PROJECT_STATUS.COMPLETED:
        return 'badge-completed';
      case PROJECT_STATUS.IN_PROGRESS:
        return 'badge-in-progress';
      case PROJECT_STATUS.REVIEW:
        return 'bg-warning-subtle text-warning-emphasis';
      default:
        return 'badge-planning';
    }
  }

  // Model Validation
  validate() {
    const errors = {};
    if (!this.title.trim()) errors.title = 'Nama proyek wajib diisi.';
    if (!this.client.trim()) errors.client = 'Nama klien wajib diisi.';
    if (this.budget <= 0) errors.budget = 'Anggaran (budget) harus lebih dari 0.';
    if (!this.deadline) errors.deadline = 'Batas waktu (deadline) wajib diisi.';
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }
}
