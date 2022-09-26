import {
  setDarkMode,
  setIsCollapsed,
  themeSlice,
  ThemeState,
} from 'redux/theme/themeSlice';

const reducer = themeSlice.reducer;

describe('Theme Store', () => {
  const initialState: ThemeState = {
    name: 'default',
    isDarkMode: true,
    isCollapsed: false,
  };

  it('can toggle dark mode', () => {
    const toggledState = reducer(
      initialState,
      setDarkMode(!initialState.isDarkMode),
    );
    expect(toggledState.isDarkMode).toEqual(!initialState.isDarkMode);

    const revertedState = reducer(
      toggledState,
      setDarkMode(!toggledState.isDarkMode),
    );
    expect(revertedState.isDarkMode).toEqual(initialState.isDarkMode);
  });

  it('can toggle collapse', () => {
    const toggledState = reducer(
      initialState,
      setIsCollapsed(!initialState.isCollapsed),
    );
    expect(toggledState.isCollapsed).toEqual(!initialState.isCollapsed);

    const revertedState = reducer(
      toggledState,
      setIsCollapsed(!toggledState.isCollapsed),
    );
    expect(revertedState.isCollapsed).toEqual(initialState.isCollapsed);
  });
});
