export interface Project {
    name: string | null;
    files: File[];
}

export interface File {
    name: string;
    language: string;
    content: string;
}