export type Category = "frontend" | "backend" | "ux";
export type TaskStatus = "new" | "ongoing" | "done";
export type Priority = "low" | "medium" | "high";

export interface MemberData {
  name: string;
  category: Category;
  projectIds?: string[];
}
