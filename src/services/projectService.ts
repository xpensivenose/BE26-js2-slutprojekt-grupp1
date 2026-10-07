import { BASE_URL } from "../constants";
import { Project } from "../models/Project";

type ProjectData = {
    name: string;
    description: string;
    deadline: string;
    memberIds?: string[];
};

type ProjectsFirebase = {
    [id: string]: ProjectData;
};

async function fetchProjects(): Promise<ProjectsFirebase | null> {
    try {
        const response = await fetch(`${BASE_URL}/projects.json`);

        if (!response.ok) {
            throw new Error(`Misslyckad hämtning, status ${response.status}`);
        }
        return await response.json();
        
    } catch (error) {
        throw new Error("Kunde inte hämta projekten");
    }
}

function makeProjectList(data: ProjectsFirebase | null): Project[] {
    if (!data) {
        return [];
    }
    const allProjects: Project[] = [];

    for (const id in data) {
        const p = data[id];
        allProjects.push(new Project(id, p.name, p.description, p.deadline, p.memberIds ?? []));
    }

    return allProjects;
}

export async function getAllProjects(): Promise<Project[]> {
    const data = await fetchProjects();
    return makeProjectList(data);
}



