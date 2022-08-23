import { setDarkMode, themeSlice, ThemeState } from "redux/theme/themeSlice";

const reducer = themeSlice.reducer;

describe("Theme Store", () => {
  const initialState: ThemeState = {
    name: "default",
    darkMode: true,
  };

  it("can toggle dark mode", () => {
    const toggledState = reducer(
      initialState,
      setDarkMode(!initialState.darkMode)
    );
    expect(toggledState.darkMode).toEqual(!initialState.darkMode);

    const revertedState = reducer(
      toggledState,
      setDarkMode(!toggledState.darkMode)
    );
    expect(revertedState.darkMode).toEqual(initialState.darkMode);
  });
});
