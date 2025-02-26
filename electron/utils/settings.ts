import { getMainWindow } from "../main-window";

/**
 * @description LocalStorage wrapper for the main window
 * @example
 * import { settings } from "./utils/settings";
 *
 * // Get a value
 * const value = settings.get("key", true);
 *
 * // Set a value
 * settings.set("key", value);
 */
export const settings = {
  get: (key: string, parse: boolean = false) => {
    const mainWindow = getMainWindow();
    if (!mainWindow) return;
    let result = null;
    mainWindow.webContents
      .executeJavaScript(`localStorage.getItem("${key}");`, true)
      .then((localStorageValue: any) => {
        if (localStorageValue) {
          result = parse ? JSON.parse(localStorageValue) : localStorageValue;
        }
      });
    return result;
  },
  set: (key: string, value: any) => {
    const mainWindow = getMainWindow();
    if (!mainWindow) return;
    mainWindow.webContents.executeJavaScript(
      `localStorage.setItem("${key}", ${JSON.stringify(value)});`,
      true
    );
  },
};
