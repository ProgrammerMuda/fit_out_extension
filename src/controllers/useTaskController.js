import { useState } from 'react';
import { TaskModel, TASK_CATEGORY } from '../models/TaskModel';

const INITIAL_TASKS = [
  new TaskModel({
    id: 't-1',
    projectId: 'proj-1',
    title: 'Instalasi Acoustic Ceiling & Ducting AC',
    category: TASK_CATEGORY.STRUCTURE,
    assignee: 'Budi (MEP Lead)',
    dueDate: '2026-08-20',
    isCompleted: true,
    estimatedCost: 35000000,
  }),
  new TaskModel({
    id: 't-2',
    projectId: 'proj-1',
    title: 'Pemasangan Frameless Glass Partition & Sandblast Film',
    category: TASK_CATEGORY.STRUCTURE,
    assignee: 'Agus (Aluminium Team)',
    dueDate: '2026-08-28',
    isCompleted: true,
    estimatedCost: 48000000,
  }),
  new TaskModel({
    id: 't-3',
    projectId: 'proj-1',
    title: 'Pekerjaan Custom Workstation & Power Track Cable',
    category: TASK_CATEGORY.CARPENTRY,
    assignee: 'Joko (Woodwork Team)',
    dueDate: '2026-09-10',
    isCompleted: false,
    estimatedCost: 75000000,
  }),
  new TaskModel({
    id: 't-4',
    projectId: 'proj-2',
    title: 'Pengecoran & Finishing Terrazzo Counter Bar',
    category: TASK_CATEGORY.CARPENTRY,
    assignee: 'Wawan (Finishing)',
    dueDate: '2026-08-18',
    isCompleted: true,
    estimatedCost: 28000000,
  }),
  new TaskModel({
    id: 't-5',
    projectId: 'proj-3',
    title: 'Pemasangan Slab Marmer Statuario Ruang Tamu',
    category: TASK_CATEGORY.FLOORING,
    assignee: 'Bambang (Stone Master)',
    dueDate: '2026-09-01',
    isCompleted: false,
    estimatedCost: 120000000,
  }),
];

/**
 * CONTROLLER: useTaskController
 * Manages fitout task list, status toggling, and task creation.
 */
export function useTaskController() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const getTasksByProject = (projectId) => {
    return tasks.filter((t) => t.projectId === projectId);
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return new TaskModel({
            ...task,
            isCompleted: !task.isCompleted,
          });
        }
        return task;
      })
    );
  };

  const addTask = (taskData) => {
    const newTask = new TaskModel({
      ...taskData,
      id: `task-${Date.now()}`,
    });
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return {
    tasks,
    getTasksByProject,
    toggleTask,
    addTask,
    deleteTask,
  };
}
