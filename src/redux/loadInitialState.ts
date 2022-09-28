export const loadInitialState = <T>(
  name: string,
  parse: (o: unknown) => T,
  defaultState: T,
): T => {
  try {
    const localData: unknown = JSON.parse(localStorage.getItem(name) || '');
    return parse(localData);
  } catch {
    return defaultState;
  }
};
