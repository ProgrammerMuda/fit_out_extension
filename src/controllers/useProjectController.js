import { useState, useMemo } from 'react';
import { ProjectModel, PROJECT_STATUS } from '../models/ProjectModel';

// Mock Initial Data
const INITIAL_PROJECTS = [
  new ProjectModel({
    id: 'proj-1',
    title: 'Modern Tech Office Fitout',
    category: 'Commercial Office',
    location: 'SCBD Lot 8, Jakarta Selatan',
    client: 'PT Inovasi Digital Nusantara',
    budget: 850000000,
    spent: 595000000,
    progress: 70,
    startDate: '2026-06-01',
    deadline: '2026-09-30',
    status: PROJECT_STATUS.IN_PROGRESS,
    tasksCount: 12,
    completedTasksCount: 8,
    description: 'Renovasi interior lantai 18 dengan konsep open-space, acoustic paneling, glass partition & smart lighting.',
  }),
  new ProjectModel({
    id: 'proj-2',
    title: 'Artisan Cafe & Bakery Interior',
    category: 'F&B Retail',
    location: 'Senopati, Jakarta Selatan',
    client: 'Kopi Kenari Hospitality',
    budget: 420000000,
    spent: 380000000,
    progress: 90,
    startDate: '2026-05-15',
    deadline: '2026-08-30',
    status: PROJECT_STATUS.REVIEW,
    tasksCount: 10,
    completedTasksCount: 9,
    description: 'Fitout outlet cafe 2 lantai bergaya japandi dengan custom counter bar terrazzo & instalasi exhaust ducting.',
  }),
  new ProjectModel({
    id: 'proj-3',
    title: 'Penthouse Luxury Residence',
    category: 'Residential Luxury',
    location: 'Sudirman Suites, Jakarta Pusat',
    client: 'Dr. Hendrawan & Family',
    budget: 1200000000,
    spent: 360000000,
    progress: 30,
    startDate: '2026-07-10',
    deadline: '2026-12-15',
    status: PROJECT_STATUS.IN_PROGRESS,
    tasksCount: 16,
    completedTasksCount: 5,
    description: 'Interior fitout mewah dengan marmer import Statuario, walk-in closet HPL premium, dan smart home integration.',
  }),
  new ProjectModel({
    id: 'proj-4',
    title: 'Boutique Fashion Showroom',
    category: 'Retail Store',
    location: 'Grand Indonesia, Jakarta Pusat',
    client: 'Velvet Haute Studio',
    budget: 310000000,
    spent: 310000000,
    progress: 100,
    startDate: '2026-04-01',
    deadline: '2026-07-25',
    status: PROJECT_STATUS.COMPLETED,
    tasksCount: 8,
    completedTasksCount: 8,
    description: 'Desain butik premium dengan floating display shelves, fitting room aksen brass emas, dan LED track light.',
  }),
];

/**
 * CONTROLLER: useProjectController
 * Handles project state management, filtering, searching, and calculations.
 */
export function useProjectController() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [activeTab, setActiveTab] = useState('ALL');

  // Filtered & Searched Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === 'ALL' || project.status === filterStatus;

      const matchesTab =
        activeTab === 'ALL' ||
        (activeTab === 'ACTIVE' &&
          project.status !== PROJECT_STATUS.COMPLETED) ||
        (activeTab === 'COMPLETED' &&
          project.status === PROJECT_STATUS.COMPLETED);

      return matchesSearch && matchesStatus && matchesTab;
    });
  }, [projects, searchQuery, filterStatus, activeTab]);

  // Overall Statistics Metrics
  const statistics = useMemo(() => {
    const total = projects.length;
    const active = projects.filter(
      (p) => p.status === PROJECT_STATUS.IN_PROGRESS || p.status === PROJECT_STATUS.PLANNING || p.status === PROJECT_STATUS.REVIEW
    ).length;
    const completed = projects.filter((p) => p.status === PROJECT_STATUS.COMPLETED).length;
    const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
    const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
    const avgProgress = total > 0
      ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / total)
      : 0;

    return {
      total,
      active,
      completed,
      totalBudget,
      totalSpent,
      avgProgress,
      formattedTotalBudget: ProjectModel.formatCurrency(totalBudget),
      formattedTotalSpent: ProjectModel.formatCurrency(totalSpent),
    };
  }, [projects]);

  // Add new project
  const addProject = (projectData) => {
    const newProject = new ProjectModel({
      ...projectData,
      id: `proj-${Date.now()}`,
    });
    const validation = newProject.validate();
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    setProjects((prev) => [newProject, ...prev]);
    return { success: true };
  };

  // Update existing project
  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === id) {
          const updated = new ProjectModel({
            ...project,
            ...updatedFields,
          });
          return updated;
        }
        return project;
      })
    );
  };

  // Delete project
  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Update Progress & Status quick action
  const updateProgress = (id, newProgress) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const progressVal = Number(newProgress);
          const status = progressVal >= 100 ? PROJECT_STATUS.COMPLETED : p.status === PROJECT_STATUS.COMPLETED ? PROJECT_STATUS.IN_PROGRESS : p.status;
          return new ProjectModel({
            ...p,
            progress: progressVal,
            status,
          });
        }
        return p;
      })
    );
  };

  return {
    projects: filteredProjects,
    allProjects: projects,
    statistics,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    activeTab,
    setActiveTab,
    addProject,
    updateProject,
    deleteProject,
    updateProgress,
  };
}
