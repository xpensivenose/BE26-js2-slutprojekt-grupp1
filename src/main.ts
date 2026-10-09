import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "bootstrap";

// import { renderProjectList } from "./features/projects/projectList";
// import { renderProjectSummary } from "./features/projects/projectSummary";
// import { renderMemberList } from "./features/members/memberList";
import { renderTaskBoard } from "./features/tasks/taskBoard";

function initApp(): void {
	// Läser vilken sida som är öppen från <body data-page="...">
	// index.html har "index" och project.html har "project"
	const page = document.body.dataset.page;

	// Index, översiktsvy
	if (page === "index") {
		// renderProjectList();
		// renderMemberList();
	}

	// Projektvy
	if (page === "project") {
		// Läser project-id från URL:en, tex. project.html?id=abs123 ger "abc123"
		// get("id") returnerar null om parametern saknas
		const projectId = new URLSearchParams(window.location.search).get("id");

		// Utan id vet vi inte vilket projekt som ska visas, skicka tillbaka användaren till översikten
		if (!projectId) {
			window.location.href = "index.html";
			return;
		}

		// Skickar id vidare så båda vyerna hämtar rätt projekt
		// renderProjectSummary(projectId);
		renderTaskBoard(projectId);
	}
}

// Startar app när filen laddas
initApp();
