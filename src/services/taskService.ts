import { BASE_URL } from "../constants";
import { request } from "./api";
import { Task } from "../models/Task";
import type { TaskData } from "../types/types";

export async function getTasksByProject(projectId: string): Promise<Task[]> {
	const url = `${BASE_URL}/tasks.json`;

	// Hämtar alla tasks från Firebase
	const data = await request<Record<string, TaskData> | null>(url);

	// Firebase returnerar null om det inte finns några tasks
	if (!data) return [];

	// Gör om Firebase-datan till Task-objekt
	// Firebase-ID:t är nyckeln och skickas som eget argument till Task
	const tasks: Task[] = Object.entries(data).map(([taskId, taskData]) => {
		return new Task(taskId, taskData);
	});

	// Filtrerar bort tasks som tillhör andra projekt
	const projectTasks = tasks.filter((task) => {
		return task.getProjectId() === projectId;
	});

	return projectTasks;
}
