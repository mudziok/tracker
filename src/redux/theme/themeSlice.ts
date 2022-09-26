import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadInitialState } from 'redux/loadInitialState';
import { RootState } from 'redux/store';
import { themes } from './themes';

const themeSliceName = 'theme';

const themeNames = Object.keys(themes) as Array<keyof typeof themes>;

export interface ThemeState {
  name: keyof typeof themes;
  isDarkMode: boolean;
  isCollapsed: boolean;
}

const isThemeState = (o: any): o is ThemeState => {
  return (
    'name' in o &&
    'isDarkMode' in o &&
    'isCollapsed' in o &&
    themeNames.includes(o.name)
  );
};

const defaultThemeState: ThemeState = {
  name: 'default',
  isDarkMode: true,
  isCollapsed: false,
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
