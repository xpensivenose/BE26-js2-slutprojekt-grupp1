import { createProjectCard } from "./projectCard";
import { getAllProjects } from "../../services/projectService";

export async function renderProjectList(): Promise<void> {
	const container = document.querySelector("#project-list");

	if (!container) {
		return;
	}

	const projects = await getAllProjects();

	container.innerHTML = "";

	if (projects.length === 0) {
		container.textContent = "Inga projekt";
		return;
	}

	for (const project of projects) {
		container.appendChild(createProjectCard(project));
	}
}
