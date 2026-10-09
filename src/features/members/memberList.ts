import { getAllMembers } from "../../services/memberService";
import { createMemberCard } from "./memberCard";

export async function renderMemberList(): Promise<void> {
	const container = document.getElementById("member-list");
	if (!container) return;

	const members = await getAllMembers();

	container.replaceChildren(...members.map(createMemberCard));
}
