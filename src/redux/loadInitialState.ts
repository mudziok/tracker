export const loadInitialState = <T>(
  name: string,
  isCorrect: (o: any) => boolean,
  defaultState: T
): T => {
  if (localStorage.getItem(name)) {
    const localData = JSON.parse(localStorage.getItem(name)!);
    if (isCorrect(localData)) {
      return localData;
    }
  }
  return defaultState;
};
