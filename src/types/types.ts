export type Category = "frontend" | "backend" | "ux";
export type TaskStatus = "new" | "ongoing" | "done";
export type Priority = "low" | "medium" | "high";

export interface TaskData {
	id: string;
	created: string;
	projectId: string;
	title: string;
	description: string;
	category: Category;
	status: TaskStatus;
	priority: Priority;
	deadline: string;
	completed?: string;
	memberId?: string;
}
