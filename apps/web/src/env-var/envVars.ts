import { cleanEnv, str } from "envalid";

const processEnv = {
  NEXT_PUBLIC_BREEZY_API_URL: process.env.NEXT_PUBLIC_BREEZY_API_URL,
};
export const envVars = cleanEnv(processEnv, {
  NEXT_PUBLIC_BREEZY_API_URL: str(),
});
