import type { NoticeType } from "../types/types";

const noticeClasses: Record<NoticeType, string> = {
	success: "alert-success",
	error: "alert-danger",
};

// Error visas längre än success notiser (millisekunder)
const noticeDurations: Record<NoticeType, number> = {
	success: 4000,
	error: 8000,
};

let noticeTimeout: number | undefined;

// Visar en notice. Den globala döljs automatiskt, en egen ruta (t.ex. i ett formulär) står kvar tills den rensas
export function renderNotice(message: string, type: NoticeType, element?: HTMLElement): void {
	const notice = element ?? document.querySelector<HTMLDivElement>("#notice");

	if (!notice) {
		console.error("renderNotice: saknar #notice i HTML");
		return;
	}

	if (!element) {
		clearNotice();
	}

	notice.textContent = message;
	notice.classList.remove(...Object.values(noticeClasses));
	notice.classList.add(noticeClasses[type]);
	notice.classList.remove("d-none");

	if (!element) {
		noticeTimeout = window.setTimeout(() => clearNotice(), noticeDurations[type]);
	}
}

// Rensar och döljer en notice. Utan element rensas den globala
export function clearNotice(element?: HTMLElement): void {
	const notice = element ?? document.querySelector<HTMLDivElement>("#notice");

	if (!notice) return;

	if (!element) {
		clearTimeout(noticeTimeout);
	}

	notice.textContent = "";
	notice.classList.remove(...Object.values(noticeClasses));
	notice.classList.add("d-none");
}
