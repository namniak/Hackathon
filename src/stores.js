import { writable } from "svelte/store";

export const searchQuery = writable("");
export const searchResults = writable([]);
export const noResults = writable(false);
export const pinnedList = writable([]);
export const currCountryOpen = writable(null);
