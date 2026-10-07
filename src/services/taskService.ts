import { BASE_URL } from "../constants";
import { Task } from "../models/Task";
import type { TaskData } from "../types/types";

export async function getTasksByProjectId(projectId: string): Promise<Task[]> {
	const url = `${BASE_URL}/tasks.json`;

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
		},
	};

	try {
		const response = await fetch(url, options);

		// Hantera HTTP-fel från Firebase
		if (!response.ok) {
			console.error("Firebase-fel:", response.status);
			throw new Error("Kunde inte hämta tasks.");
		}

		const data = await response.json();

		// Inga tasks finns i databasen
		if (!data) return [];

		const tasks: Task[] = [];

		for (const [taskId, value] of Object.entries(data)) {
			tasks.push(new Task({ ...(value as TaskData), id: taskId }));
		}

		// console.log(tasks);

		// Returnera endast tasks som tillhör det valda projektet
		const projectTasks = tasks.filter((task) => task.projectId === projectId);
		// console.log(projectTasks);

		return projectTasks;
	} catch (error) {
		// Hantera nätverks-/fetch-fel och logga felet för felsökning
		console.error("Fel vid hämtning av tasks:", error);
		throw error;
	}
}
