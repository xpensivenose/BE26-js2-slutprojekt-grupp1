import { BASE_URL } from "../constants";
import { Project } from "../models/Project";
import type { ProjectData } from "../types/types";
import { request } from "./api";


const urlProject = `${BASE_URL}/projects.json`;

export async function getAllProjects(): Promise<Project[]> {

    // Record gör så att värdet inte blir any. Så att man inte kan koda tex "Deadline."
    const data = await request<Record<string, ProjectData> | null>(urlProject);

    if (!data) return [];

    // Nya arrayen skapar projekt för varje par, Så att id:t följer med i objektet
    // om värdet är null används en ny [], för att firebase inte sparar tomma listor
    return Object.entries(data).map(function ([id, p]) {
        return new Project(id, p.name, p.description, p.deadline, p.memberIds ?? []);
    });
}

export async function addProject(input: ProjectData): Promise<Project> {
    const result = await request<{ name: string }>(urlProject, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    return new Project(result.name, input.name, input.description, input.deadline, input.memberIds ?? []);
}

