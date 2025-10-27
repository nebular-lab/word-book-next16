import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const queryParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  q: parseAsString,
  orders: parseAsString,
  offset: parseAsInteger,
});
