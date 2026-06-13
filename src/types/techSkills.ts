export interface Course {
    name: string;
    institution: string;
    date: string;
    description?: string;
}

export interface TechSkills {
    programming: string[];
    analysisMethods: string[];
    systems: string[];
    courses: Course[];
    other: string[];
}
