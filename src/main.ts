import "bootstrap";

import { getProjectId } from "./utils/urls";

import { renderProjectList } from "./features/projects/projectList";
import { renderProjectSummary } from "./features/projects/projectSummary";

import { renderMemberList } from "./features/members/memberList";

import { setupAddTaskForm } from "./features/tasks/addTaskForm";
import { renderTaskBoard } from "./features/tasks/taskBoard";

function initApp(): void {
	const page = document.body.dataset.page;

	// Index, översiktsvy
	if (page === "index") {
		renderProjectList();
		renderMemberList();
	}

	// Projektvy
	if (page === "project") {
		const projectId = getProjectId();

		if (!projectId) {
			window.location.href = "index.html";
			return;
		}

		setupAddTaskForm();

		renderProjectSummary(projectId);
		renderTaskBoard(projectId);
	}
}

initApp();
