import type { Category, Priority, TaskData, TaskStatus } from "../types/types";

export class Task {
	public readonly id: string;
	public readonly created: string;
	public readonly projectId: string;

	public title: string;
	public description: string;
	public category: Category;
	public status: TaskStatus;
	public priority: Priority;
	public deadline: string;
	public completed?: string;
	public memberId?: string;

	constructor(data: TaskData) {
		this.id = data.id;
		this.created = data.created;
		this.projectId = data.projectId;
		this.title = data.title;
		this.description = data.description;
		this.category = data.category;
		this.status = data.status;
		this.priority = data.priority;
		this.deadline = data.deadline;
		this.completed = data.completed;
		this.memberId = data.memberId;
	}
}
