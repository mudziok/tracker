import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { themes } from "./themes";

const themeNames = Object.keys(themes) as Array<keyof typeof themes>;

interface ThemeState {
  name: keyof typeof themes;
  darkMode: boolean;
}

const defaultThemeState: ThemeState = {
  name: "default",
  darkMode: true,
};

const initialThemeState: ThemeState = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme")!)
  : defaultThemeState;

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    nextTheme(state) {
      const currentThemeIndex = themeNames.findIndex(
        (themeName) => themeName === state.name
      );
      state.name = themeNames[(currentThemeIndex + 1) % themeNames.length];
    },
  },
});

export const selectTheme = (state: RootState) => themes[state.theme.name];
export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export const { setDarkMode, nextTheme } = themeSlice.actions;
