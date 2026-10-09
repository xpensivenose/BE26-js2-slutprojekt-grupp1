import { createProjectCard } from "./projectCard";
import { getAllProjects } from "../../services/projectService";
import { Project } from "../../models/Project";

// Sparar projekten här så vi kan lägga till nya utan att hämta allt igen
let projects: Project[] = [];

// Ritar ut korten från listan projects
export function buildProjectList() {
	const container = document.querySelector("#project-list");

	if (!container) {
		return;
	}
	container.replaceChildren();

	if (projects.length === 0) {
		container.textContent = "Inga projekt än";
		return;
	}

	for (const project of projects) {
		const card = createProjectCard(project);
		// Klick på kortet öppnar projektsidan, id följer med i urlen
		card.addEventListener("click", function () {
			window.location.href = `project.html?id=${project.getId()}`;
		});
		container.appendChild(card);
	}
}
// Hämtar projekten från firebase och bygger ut dem, körs när index laddas
export async function renderProjectList(): Promise<void> {
	projects = await getAllProjects();
	buildProjectList();
}

// Används av formuläret, lägger till det nya projektet och bygger om.
export function addProjectToList(project: Project): void {
	projects.push(project);
	buildProjectList();
}
