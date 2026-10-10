import { renderNotice, clearNotice } from "../../components/notice";

import { getTasksByProject } from "../../services/taskService";
import { createTaskCard } from "./taskCard";
import type { Task } from "../../models/Task";

import { clearElements } from "../../utils/dom";

let tasks: Task[] = [];

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
