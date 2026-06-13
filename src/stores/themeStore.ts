import { writable } from "svelte/store";

export const theme = writable("dark");

export const toggleTheme = () => {
    theme.set("dark");
};
