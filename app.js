<<<<<<< HEAD
// app.js — DOM wiring only; all data logic lives in tasks.js
import {
  addTask,
  toggleTask,
  deleteTask,
  setFilter,
  getFilter,
  getFilteredTasks,
  getStats,
  clearCompleted,
} from "./tasks.js";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTasks() {
  const listEl = document.getElementById("task-list");
  const emptyEl = document.getElementById("empty-state");
  const tasks = getFilteredTasks();

  if (tasks.length === 0) {
    listEl.innerHTML = "";
    emptyEl.hidden = false;
  } else {
    emptyEl.hidden = true;
    listEl.innerHTML = tasks
      .map(
        (task) => `
        <li class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
          <input
            type="checkbox"
            ${task.completed ? "checked" : ""}
            aria-label="Mark ${escapeHtml(task.title)} complete"
            data-action="toggle"
            data-testid="task-item-toggle"
          />
          <span class="task-title">${escapeHtml(task.title)}</span>
          <button
            class="task-delete"
            aria-label="Delete ${escapeHtml(task.title)}"
            data-action="delete"
            data-testid="task-item-delete"
          >✕</button>
        </li>
      `,
      )
      .join("");
  }

  updateStats();
