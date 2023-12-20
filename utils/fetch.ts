import { PORTAL_BASE_URL } from "@/constants";
import { FetchAsync } from "./api";

const Fetch = async (
  url: string,
  method: string,
  body: any,
  headers: Record<string, string>
) => {
  const res = await fetch(PORTAL_BASE_URL + url, {
    method: method,
    body: body,
    headers: headers,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res;
};

export default Fetch;

export const selectFieldDataFetcher = async (
  endpoint: string,
  customName: string | undefined,
  jwtToken: string
) => {
  let options: Array<any> = [];
  try {
    const response = await FetchAsync(
      "GET",
      {},
      {
        // Origin: window.location.origin,
        Authorization: jwtToken,
      },
      `${PORTAL_BASE_URL}${endpoint}`
    );

    options = response.data.map((item: any) => ({
      label: item[`${customName}`],
      value: item.pid,
    }));
  } catch (err) {
    options = [
      {
        label: "Couldn't fetch data",
        options: [],
      },
    ];
    console.error(err);
  }
  return options;
};
