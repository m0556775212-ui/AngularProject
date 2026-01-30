import { User } from "./auth.models";

export interface ProjectMember {
    user: User;
}

export interface project {
    _id: string;
    id?: number;
    team_id: number,
    name: string,
    description: string | null,
    status: string,
    created_at: string,
    count?: number,
    members?: ProjectMember[]
}

export interface addProject {
    teamId: string;
    name: string;
}