import { getTasksByProject } from "../../services/taskService";
import { createTaskCard } from "./taskCard";

/**
 * Helper functions (flytta till /utils)
 */

export function clearElements(elements: HTMLElement[]): void {
	for (const element of elements) {
		element.replaceChildren();
	}
}

export async function renderTaskBoard(projectId: string): Promise<void> {
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

	try {
		const tasks = await getTasksByProject(projectId);

		clearElements([newColumn, ongoingColumn, doneColumn]);

		if (tasks.length === 0) {
			// TODO: Visa "Inga uppgifter har lagts till i projektet ännu."
			return;
		}

		for (const task of tasks) {
			const card = createTaskCard(task);
			const column = columns[task.getStatus()];

			column.append(card);
		}
	} catch (error) {
		// TODO: Visa "Det gick inte att hämta uppgifterna. Försök igen senare."
		console.error("Kunde inte hämta uppgifterna:", error);
	}
}
