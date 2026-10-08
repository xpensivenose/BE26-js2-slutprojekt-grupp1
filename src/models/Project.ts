export class Project {
  readonly id: string;
  name: string;
  description: string;
  deadline: string;
  memberIds: string[];

  constructor(
    id: string,
    name: string,
    description: string,
    deadline: string,
    memberIds: string[] = [],
  ) {
    this.id = id;
    this.memberIds = memberIds;
    this.name = name;
    this.description = description;
    this.deadline = deadline;
  }

  getName() {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }

  getDeadline(): string {
    return this.deadline;
  }

  getMemberIds(): string[] {
    return this.memberIds;
  }

  getMemberCount(): number {
    return this.memberIds.length;
  }
}
