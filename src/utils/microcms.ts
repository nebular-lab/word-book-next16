import "server-only";

import { createClient } from "microcms-js-sdk";
import { env } from "../utils/env";

export const microcmsClient = createClient({
  serviceDomain: env.MICROCMS_SERVICE_DOMAIN,
  apiKey: env.MICROCMS_API_KEY,
});
