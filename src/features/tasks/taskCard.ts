import { Task } from "../../models/Task";
import type { TaskStatus, Priority } from "../../types/types";

type TaskAction = "assign" | "edit" | "complete" | "delete";

const actionsByStatus: Record<TaskStatus, TaskAction[]> = {
	new: ["assign", "edit"],
	ongoing: ["complete", "edit"],
	done: ["delete"],
};

const actionLabels: Record<TaskAction, string> = {
	assign: "→ Tilldela",
	edit: "✎ Ändra",
	complete: "✓ Slutför",
	delete: "× Radera",
};

const actionClasses: Record<TaskAction, string> = {
	assign: "btn-outline-primary",
	edit: "btn-outline-dark",
	complete: "btn-outline-success",
	delete: "btn-outline-danger",
};

const priorityLabels: Record<Priority, string> = {
	low: "Låg prioritet",
	medium: "Medel prioritet",
	high: "Hög prioritet",
};

const priorityClasses: Record<Priority, string> = {
	low: "bg-success text-white",
	medium: "bg-warning text-dark",
	high: "bg-danger text-white",
};

function createBadges(task: Task): HTMLDivElement {
	const badgesContainer = document.createElement("div");
	badgesContainer.className = "d-flex gap-2 mb-2";

	const categoryBadge = document.createElement("span");
	categoryBadge.className = "badge bg-body-secondary text-body fw-normal";
	const categoryText = task.getCategory();
	categoryBadge.textContent = categoryText.charAt(0).toUpperCase() + categoryText.slice(1);

	const priorityBadge = document.createElement("span");
	priorityBadge.className = `badge fw-normal ${priorityClasses[task.getPriority()]}`;
	const priorityText = task.getPriority();
	priorityBadge.textContent = priorityLabels[priorityText];

	badgesContainer.append(priorityBadge, categoryBadge);

	return badgesContainer;
}

function createActions(task: Task): HTMLDivElement {
	const buttonsContainer = document.createElement("div");
	buttonsContainer.className = "d-flex gap-2 mt-3";

	const taskActions = actionsByStatus[task.getStatus()];

	for (const action of taskActions) {
		const button = document.createElement("button");
		button.className = `btn btn-sm ${actionClasses[action]}`;
		button.textContent = actionLabels[action];

		buttonsContainer.append(button);
	}

	return buttonsContainer;
}

export function createTaskCard(task: Task): HTMLDivElement {
	const card = document.createElement("div");
	card.className = "card mb-2";
	card.dataset.taskId = task.getId();

	const cardBody = document.createElement("div");
	cardBody.className = "card-body";

	const title = document.createElement("h3");
	title.className = "h6 fw-bold";
	title.textContent = task.getTitle();

	const description = document.createElement("p");
	description.className = "small text-muted";
	description.textContent = task.getDescription();

	const badgesContainer = createBadges(task);
	const buttonsContainer = createActions(task);

	const created = document.createElement("div");
	created.className = "small text-muted";
	// TODO: Formatera datum och tid för visning.
	created.textContent = `Skapad: ${task.getCreated()}`;

	if (task.getStatus() === "done") {
		// TODO: Formatera datum och tid för visning.
		created.textContent += ` · Slutförd: ${task.getCompleted()}`;
	}

	const deadline = document.createElement("div");
	deadline.className = "small text-muted";
	// TODO: Formatera datum och tid för visning.
	deadline.textContent = "Deadline: " + task.getDeadline();

	const assignedMember = document.createElement("div");
	assignedMember.className = "small text-muted";

	// TODO: Visa medlemmens namn i stället för medlems-ID.
	if (task.getStatus() !== "new") {
		assignedMember.textContent = "Tilldelad: " + "{Förnamn Efternamn}";
	}

	cardBody.append(
		badgesContainer,
		title,
		description,
		assignedMember,
		created,
		deadline,
		buttonsContainer,
	);
	card.append(cardBody);

	return card;
}
