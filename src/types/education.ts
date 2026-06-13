import type { Thesis } from "./thesis";

export interface Education {
    school: string,
    name: string,
    type: string,
    to: string,
    from: string,
    grade?: string,
    subjects: string[],
    thesis?: Thesis
}