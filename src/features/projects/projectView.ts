import { Project } from "../../models/Project";

function createProjectCard(project: Project): HTMLElement {
    const mainDiv = document.createElement("div");
    const card = document.createElement("div");
    const cardsDic =`${}`
    const cardBody = document.createElement("div");
    const title = document.createElement("h3");
    const description = document.createElement("p");
    const childDiv = document.createElement("div");
    const members = document.createElement("span");
    const ongoing = document.createElement("span");
    const deadline = document.createElement("span");

    mainDiv.className = "col-sm-6";
    card.className = "card";
    cardBody.className = "card-body";
    title.className = "h5 fw-bold";
    description.className = "small text-muted";
    childDiv.className = "d-flex gap-2 flex-wrap";
    members.className = "badge bg-body-secondary text-body fw-normal";
    ongoing.className = "badge bg-body-secondary text-body fw-normal";
    deadline.className = "badge bg-body-secondary text-body fw-normal";

    title.textContent = project.getName();
    description.textContent = project.getDescription();
    members.textContent = project.getMemberCount() + "medlemmar";
    ongoing.textContent = "0 pågående";
    deadline.textContent = project.getDeadline();

    childDiv.appendChild(members);
    childDiv.appendChild(ongoing);
    childDiv.appendChild(deadline);
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(childDiv);
    card.appendChild(cardBody);
    mainDiv.appendChild(card);

    return mainDiv;
}

export function renderProjectsList(projects: Project[]): void {
    const container = document.querySelector("#project-list");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (projects.length === 0) {
        container.textContent = "Inga projekt";
        return;
    }

    for (const project of projects) {
        container.appendChild(createProjectCard(project));
    }
}



