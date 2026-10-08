/**
 * ! Interface vs. class
 *
 * Interface tex. TaskData (inkommande rådata) är endast en beskrivning av hur ett objekt ser ut som endast existerar i TypeScript. Används för att få TypeScript att varna vid stavfel eller glömmer ett fält.
 *
 * Används i:
 * - taskService.ts för att tala om vad Firebase skickar tillbaka (ren data)
 * - Task.ts i klassens constructor för att säga vad den tar emot (objekt)
 *
 * Klassen Task.ts är det riktiga objketet som finns när koden körs och skyddar fälten med från ändringar utanför klassen med hjälp av private fields. Kan även ha metoder som getters samt complete() ekker assignTo(memberId)
 *
 */

/**
 * ! Filer och funktioner
 *
 * get = hämtar data | add = skapar i Firebase (POST) | update = ändrar (PATCH) | delete = tar bort
 * create = bygger element | render = sätter in på sidan | handle = hanterar formulär
 *
 * /features/projects
 * - projectCard.ts     createProjectCard
 * - projectList.ts     renderProjectList
 * - projectSummary.ts  createProjectSummary, renderProjectSummary
 * - projectForm.ts     (senare) createProjectForm, renderProjectForm, handleProjectSubmit
 *
 * /features/members
 * - memberCard.ts      createMemberCard
 * - memberList.ts      renderMemberList
 * - memberForm.ts      (senare) createMemberForm, renderMemberForm, handleMemberSubmit
 * - assignForm.ts      (senare) renderAssignForm
 *
 * /features/tasks
 * - taskCard.ts        createTaskCard, (senare) createTaskActions
 * - taskBoard.ts       renderTaskBoard
 * - taskForm.ts        (senare) createTaskForm, renderTaskForm, handleTaskSubmit
 */

/**
 * ! main.ts
 *
 * Importerar render-funktioner från varje feature
 * main.ts renderar ingenting själv, den bestämmer bara vad som ska startas
 */

import { renderProjectList } from "./features/projects/projectList";
import { renderProjectSummary } from "./features/projects/projectSummary";
import { renderMemberList } from "./features/members/memberList";
import { renderTaskBoard } from "./features/tasks/taskBoard";

function initApp() {
	// Läser vilken sida som är öppen från <body data-page="...">
	// index.html har "index" och project.html har "project"
	const page = document.body.dataset.page;

	// Index, översiktsvy
	if (page === "index") {
		renderProjectList();
		renderMemberList();
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
		renderProjectSummary(projectId);
		renderTaskBoard(projectId);
	}
}

// Startar app när filen laddas
initApp();

// ! OBS
// Tagit bort id i interface pga. den ska spegla så som innehållet i ett objekt i Firebase ser ut och ID ligger utanför (Firebase-ID) => skickar in id:string som argument i klassens constructor => ändrar i request till Firebase och ersätter spread med endast [taskId, taskData] eftersom spread användes för att bygga ett nytt objekt av flera delar. Nu är det bara två arguemnt som inte behövs slås ihop med varandra.
