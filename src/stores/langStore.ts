import { writable } from "svelte/store";

export type Language = "no";

export const language = writable<Language>("no");

export const setLanguage = () => {
    language.set("no");
};

export type Translation = {
    [x: string]: string;
}
