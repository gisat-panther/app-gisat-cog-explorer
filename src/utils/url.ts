// Get a new searchParams string by merging the current
// searchParams with a provided key/value pair
export const createQueryString = (
  name: string,
  value: string | number,
  searchParams: string[][]
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  // return params.toString();
  return params;
};
