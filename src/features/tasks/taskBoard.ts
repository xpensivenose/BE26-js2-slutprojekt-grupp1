import { renderNotice, clearNotice } from "../../components/notice";

import { getTasksByProject, deleteTask } from "../../services/taskService";
import { createTaskCard } from "./taskCard";
import type { Task } from "../../models/Task";

import { clearElements } from "../../utils/dom";

let tasks: Task[] = [];

// Kopplar en lyssnare till boarden för knapparna på korten
export function setupTaskBoard(): void {
	const taskBoard = document.querySelector<HTMLDivElement>("#task-board");

	if (!taskBoard) {
		console.error("setupTaskBoard: saknar #task-board i HMTL");
		return;
	}

	taskBoard.addEventListener("click", handleTaskBoardClick);
}

// Hanterar klick på knapparna på uppgiftskort
function handleTaskBoardClick(event: MouseEvent): void {
	const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-action]");
	const card = button?.closest<HTMLElement>("[data-task-id]");

	if (!button || !card) return;

	const taskId = card.dataset.taskId as string;

	if (button.dataset.action === "delete") {
		handleDeleteTask(taskId);
	}
}

//
async function handleDeleteTask(taskId: string): Promise<void> {
	try {
		await deleteTask(taskId);

		tasks = tasks.filter((task) => task.getId() !== taskId);
		renderTasks();

		renderNotice("Uppgiften har tagits bort.", "success");
	} catch (error) {
		renderNotice("Kunde inte radera uppgiften.", "error");
		console.error("Kunde inte radera uppgiften.", error);
	}
}

function renderTasks(): void {
	const newColumn = document.querySelector<HTMLDivElement>("#column-new");
	const ongoingColumn = document.querySelector<HTMLDivElement>("#column-ongoing");
	const doneColumn = document.querySelector<HTMLDivElement>("#column-done");

	if (!newColumn || !ongoingColumn || !doneColumn) {
		console.error("Kunde inte hitta boardens kolumner.");
		return;
	}

	const columns = {
		new: newColumn,
		ongoing: ongoingColumn,
		done: doneColumn,
	};

	clearElements([newColumn, ongoingColumn, doneColumn]);

	for (const task of tasks) {
		const card = createTaskCard(task);
		const column = columns[task.getStatus()];

		column.append(card);
	}
}

export async function renderTaskBoard(projectId: string): Promise<void> {
	try {
		tasks = await getTasksByProject(projectId);

		renderTasks();

		if (tasks.length === 0) {
			renderNotice("Projektet innehåller inga uppgifter ännu.", "error");
			return;
		}

		clearNotice();
	} catch (error) {
		renderNotice("Det gick inte att hämta uppgifterna. Försök igen senare.", "error");
		console.error("Kunde inte hämta uppgifterna:", error);
	}
}

export function renderNewTask(task: Task): void {
	tasks.push(task);
	renderTasks();
}
