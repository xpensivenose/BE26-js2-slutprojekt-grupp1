export type Category = "frontend" | "backend" | "ux";
export type TaskStatus = "new" | "ongoing" | "done";
export type Priority = "low" | "medium" | "high";

export interface ProjectData {
    name: string;
    description: string;
    deadline: string;
    memberIds?: string[];
}
