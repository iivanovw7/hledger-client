import type { Theme } from "#/styles";
import type { Maybe, Nullable } from "#/utils";

import { setStorage, storage, StorageKey } from "./storage";

export const setTheme = (theme?: Maybe<Theme>): void => {
	setStorage(StorageKey.Theme, theme || null);
};

export const getTheme = (): Nullable<Theme> => {
	return (storage[StorageKey.Theme] || null) as unknown as Theme;
};
