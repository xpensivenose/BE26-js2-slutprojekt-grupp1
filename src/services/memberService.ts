import { Member } from "../models/Member";
import type { Category, MemberData } from "../types/types";
import { BASE_URL } from "../constants";
import { request } from "./api";

export async function getAllMembers(): Promise<Member[]> {
  const url = `${BASE_URL}members.json`;

  const data = await request<Record<string, MemberData> | null>(url);

  console.log("getAllMembers data:", data);

  if (!data) return [];

  return Object.entries(data).map(
    ([id, member]) => new Member({ ...member, id }),
  );
}

export async function addMember(
  name: string,
  category: Category,
): Promise<Member> {
  const url = `${BASE_URL}members.json`;

  const result = await request<{ name: string }>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, category, projectIds: [] }),
  });

  return new Member({ id: result.name, name, category, projectIds: [] });
}

export async function updateMember(
  id: string,
  data: Partial<MemberData>,
): Promise<void> {
  const url = `${BASE_URL}members/${id}.json`;

  await request<void>(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
