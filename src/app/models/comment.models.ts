export interface comment {
    id: string;
    taskId: string;
    body: string;
    userId: string;
    createdAt?: Date;
}

export interface addComment {
    taskId: string;
    body: string;
    userId: number;
}