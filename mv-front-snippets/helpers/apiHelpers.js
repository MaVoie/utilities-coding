export const withQueries = (queries) => (path) =>
  path +
  (Object.keys(queries).length > 0
    ? "?" +
      Object.keys(queries)
        .map((queryKey) =>
          queries[queryKey] ? queryKey + "=" + queries[queryKey] : undefined
        )
        // Filter nullable and falsy values
        .filter((value) => value)
        .join("&")
    : "");

export const withPathParams = (pathParams) => (path) => {
  let modifiedPath = path;
  Object.keys(pathParams).forEach((param) => {
    modifiedPath = modifiedPath.replace(":" + param, pathParams[param]);
  });
  return modifiedPath;
};

