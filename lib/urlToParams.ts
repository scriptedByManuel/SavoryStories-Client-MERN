export const urlToParams = (url: string | null): Record<string, string | null> => {
  const queryString = (url ?? "").split("?")[1] ?? "";
  const paramsObject = Object.fromEntries(new URLSearchParams(queryString));
  return paramsObject;
};
