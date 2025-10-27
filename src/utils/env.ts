import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MICROCMS_SERVICE_DOMAIN: z.string().min(1),
    MICROCMS_API_KEY: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
