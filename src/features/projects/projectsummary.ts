import { getProjectId } from "../../services/projectService.ts";
import { Project } from "../../models/Project.ts";
import { getAllMembers } from "../../services/memberService.ts"

export async function createProjectSummary(project: Project,): Promise<HTMLElement>{
    const section = document.createElement("section");
    const cardBody = document.createElement("div");
    const title = document.createElement("h1");
    const description = document.createElement("p");
    const membersContainer = document.createElement("div");

    section.className = "card mb-5";
    cardBody.className = "card-body";
    title.className = "h4";
    description.className = "text-muted";
    membersContainer.className = "d-flex flex-wrap gap-2";
    
    title.textContent = project.getName();

    description.textContent =`${project.getDescription()} Deadline ${project.getDeadline()}`;
    
    const memberIds = project.getMemberIds()
    
    if (memberIds.length === 0) {
        membersContainer.textContent = "Inga medlemmar";
    } else {
        const members = await getAllMembers();
        console.log(project);
        
        for (const memberId of memberIds) {
            const member = members.find((member) => member.getId() === memberId,);
            
            if (!member) continue;
            
            const badge = document.createElement("span");
            badge.className = "badge bg-body-secondary text-body fw-normal";
            badge.textContent = member.getName();
            membersContainer.appendChild(badge);
        }
    }
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(membersContainer);
    section.appendChild(cardBody);
    
    return section;
}

export async function renderProjectSummary(projectId: string): Promise<void> {
    const container = document.querySelector("#project-summary"); 
    
    if(!container) {
        return;
    }
    const project = await getProjectId(projectId);
    
    if (!project) {
        container.textContent = "Projektet kunde inte hittas";
        return;
    }
    const summary = await createProjectSummary(project);
    container.innerHTML = "";
    container.appendChild(summary);
}