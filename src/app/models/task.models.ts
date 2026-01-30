export interface AddTask {
    projectId: string;
    title: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
}

export interface task {
    _id: string; // MongoDB ID
    id?: string; // Optional alias
    project_id: number,
    title: string | null | undefined,
    description: string | null,
    status: string,
    priority: string,
    assignee_id: string | null,
    due_date: null | string,
    order_index: string,
    created_at: Date,
    updated_at: Date
}

