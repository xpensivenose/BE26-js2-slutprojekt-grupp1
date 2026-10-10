import { Modal } from "bootstrap";

import { CATEGORIES, PRIORITIES, PRIORITY_LABELS, CATEGORY_LABELS } from "../../constants";

import { renderNotice, clearNotice } from "../../components/notice";
import { addTask } from "../../services/taskService";
import { createSelectOption } from "../../utils/dom";
import { getProjectId } from "../../utils/urls";

import type { Category, Priority, TaskData } from "../../types/types";

import { renderNewTask } from "./taskBoard";

// Kopplar ihop formuläret för ny uppgift (select, reset och submit)
export function setupAddTaskForm(): void {
	const modal = document.querySelector<HTMLDivElement>("#add-task-modal");
	const form = document.querySelector<HTMLFormElement>("#add-task-form");

	const categorySelect = document.querySelector<HTMLSelectElement>("#add-task-category");
	const prioritySelect = document.querySelector<HTMLSelectElement>("#add-task-priority");

	if (!modal || !form || !categorySelect || !prioritySelect) {
		console.error("setupAddTaskForm: saknar element i HTML");
		return;
	}

	// Nollställ formuläret när modalen har stängts helt
	modal.addEventListener("hidden.bs.modal", () => {
		form.reset();
	});

	// Fyll i kategorier i select-listan
	for (const category of CATEGORIES) {
		const option = createSelectOption(CATEGORY_LABELS[category], category);
		categorySelect.append(option);
	}

	// Fyll i prioritet i select-listan
	for (const priority of PRIORITIES) {
		const option = createSelectOption(PRIORITY_LABELS[priority], priority);
		prioritySelect.append(option);
	}

	form.addEventListener("submit", handleAddTaskSubmit);
}

// Hanterar formulärets submit-händelse
async function handleAddTaskSubmit(event: SubmitEvent): Promise<void> {
	event.preventDefault();

	const form = event.currentTarget as HTMLFormElement;
	const formData = new FormData(form);
	const formNotice = form.querySelector("#form-notice") as HTMLDivElement;

	const title = (formData.get("title") as string).trim();
	const description = (formData.get("description") as string).trim();
	const category = formData.get("category") as Category;
	const priority = formData.get("priority") as Priority;
	const deadline = formData.get("deadline") as string;

	const today = new Date().toLocaleDateString("sv-SE");

	// Förhindra att fält innehåller enbart blanksteg
	if (!title || !description) {
		renderNotice("Titel och beskrivning får inte vara tomma.", "error", formNotice);
		return;
	}

	// Förhindra att en uppgift tilldelas ett datum som har passerat
	if (!deadline || deadline < today) {
		renderNotice("Deadline får inte vara tidigare än idag.", "error", formNotice);
		return;
	}

	const projectId = getProjectId();

	if (!projectId) {
		console.error("Projekt-ID saknas i URL:en");
		return;
	}

	const taskData: TaskData = {
		title,
		description,
		category,
		priority,
		deadline,
		status: "new",
		created: new Date().toISOString(),
		projectId,
	};

	try {
		const newTask = await addTask(taskData);
		renderNewTask(newTask);

		renderNotice("Uppgiften har lagts till.", "success");
		clearNotice(formNotice);

		Modal.getOrCreateInstance("#add-task-modal").hide();
	} catch (error) {
		renderNotice("Kunde inte skapa uppgiften.", "error");
		console.error("Kunde inte skapa uppgiften:", error);
	}
}
