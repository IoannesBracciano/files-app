export type NodeType =
    "dev" | "dir" | "file" | "socket" | "symlink" | "other";

export interface Node {
    uri: string;
    name: string;
    type: NodeType;
}
