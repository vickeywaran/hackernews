function handleError(response) {
  if (!response.ok) throw Error(response);
  return response;
}

export { handleError };