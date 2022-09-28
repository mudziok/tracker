import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadInitialState } from 'redux/loadInitialState';
import { RootState } from 'redux/store';
import { z } from 'zod';
import { themes, themeNames } from './themes';

const themeSliceName = 'theme';

const themeStateValidator = z.object({
  name: z.enum(themeNames),
  isDarkMode: z.boolean(),
  isCollapsed: z.boolean(),
});

export type ThemeState = z.infer<typeof themeStateValidator>;

const defaultThemeState: ThemeState = {
  name: 'default',
  isDarkMode: true,
  isCollapsed: false,
};

const initialThemeState: ThemeState = loadInitialState(
  themeSliceName,
  themeStateValidator.parse,
  defaultThemeState,
);

export const themeSlice = createSlice({
  name: themeSliceName,
  initialState: initialThemeState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
    nextTheme(state) {
      const currentThemeIndex = themeNames.findIndex(
        (themeName) => themeName === state.name,
      );
      state.name = themeNames[(currentThemeIndex + 1) % themeNames.length];
    },
    setIsCollapsed(state, action: PayloadAction<boolean>) {
      state.isCollapsed = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => themes[state.theme.name];
export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode;
export const selectIsCollapsed = (state: RootState) => state.theme.isCollapsed;

export const { setDarkMode, nextTheme, setIsCollapsed } = themeSlice.actions;
