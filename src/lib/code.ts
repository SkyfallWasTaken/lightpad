export interface Project {
    name: string | null;
    Item: Item[];
}

export interface Item {
    name: string;
    type: "file" | "folder";
    children?: Item[];

    language: string;
    content: string;
}