import { User } from "./auth.models";

export interface TeamMember {
    user: User;
}

export interface Team {
    id: string;
    name?: string;
    count: number;
    members: TeamMember[];
    ownerId: string;
}