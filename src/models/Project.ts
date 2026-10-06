export class Project {
    readonly id: string; 
    name: string; 
    description: string;
    deadline: string;
    memberIds: string[];

    constructor(id: string, name: string, description:string, 
        deadline:string, memberIds: string[] = []){
            this.id = id;
            this.memberIds = memberIds; 
            this.name = name; 
            this.description = description; 
            this.deadline = deadline; 
        }

        getName(){
            return this.name;
        }
        getMemberCount(): number {
            return this.memberIds.length;
        }
        getDescription() {
            return this.description;
        }
        getDeadline() {
            return this.deadline;
        }

        setRemoveMember(memberId: string): void {
            const remaining: string[] = [];
            for (const id of this.memberIds) {
                if (id !== memberId) {
                    remaining.push(id);
                }
            }
            this.memberIds = remaining;
        }
        setName(newName: string): void {
            if (newName.trim() === "") {
                throw new Error("Project name cannot be empty");
            }
            this.name = newName;
        }
        setHaveMember(memberId: string): boolean {
            return this.memberIds.includes(memberId);
        }
        
        setAddMember(memberId: string): void {
            if (!this.setHaveMember(memberId)) {
                this.memberIds.push(memberId);
            }
        }
       
}
