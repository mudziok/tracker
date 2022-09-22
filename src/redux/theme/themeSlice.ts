import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadInitialState } from 'redux/loadInitialState';
import { RootState } from 'redux/store';
import { themes } from './themes';

const themeSliceName = 'theme';

const themeNames = Object.keys(themes) as Array<keyof typeof themes>;

export interface ThemeState {
  name: keyof typeof themes;
  darkMode: boolean;
}

const isThemeState = (o: any): o is ThemeState => {
  return 'name' in o && 'darkMode' in o && themeNames.includes(o.name);
};

const defaultThemeState: ThemeState = {
  name: 'default',
  darkMode: true,
};

const initialThemeState: ThemeState = loadInitialState(
  themeSliceName,
  isThemeState,
  defaultThemeState,
);

export const themeSlice = createSlice({
  name: themeSliceName,
  initialState: initialThemeState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
    nextTheme(state) {
      const currentThemeIndex = themeNames.findIndex(
        (themeName) => themeName === state.name,
      );
      state.name = themeNames[(currentThemeIndex + 1) % themeNames.length];
    },
  },
});

export const selectTheme = (state: RootState) => themes[state.theme.name];
export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export const { setDarkMode, nextTheme } = themeSlice.actions;
