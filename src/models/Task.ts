import type { TaskData, Category, Priority, TaskStatus } from "../types/types";

export class Task {
	private readonly id: string;
	private readonly created: string;
	private readonly projectId: string;
	private title: string;
	private description: string;
	private category: Category;
	private status: TaskStatus;
	private priority: Priority;
	private deadline: string;
	private completed?: string;
	private memberId?: string;

	constructor(id: string, data: TaskData) {
		this.id = id;
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

	getId(): string {
		return this.id;
	}

	getProjectId(): string {
		return this.projectId;
	}

	getTitle(): string {
		return this.title;
	}
}
