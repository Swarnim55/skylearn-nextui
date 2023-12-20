import Fetch from './fetch';

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const FetchAsync = async (
  method: Methods,
  queryParams: any,
  header: Record<string, string>,
  url: string
) => {
  // Construct the full URL with query parameters
  const fullUrl = new URL(url);

  // If queryParams is an object, append key-value pairs to URL's search parameters
  queryParams &&
    Object.keys(queryParams).forEach((key) => {
      fullUrl.searchParams.append(key, queryParams[key]);
    });

  //  // Perform the HTTP request with the updated URL
  const response = await fetch(fullUrl.toString(), {
    method,
    headers: {
      ...header,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const PostAsync = async (
  method: Methods,
  body: any,
  header: Record<string, string>,
  url: string
) => {
  const res = await Fetch(url, method, JSON.stringify(body), header);
  return res.json();
};