import { envVars } from "@/env-var/envVars";
import axios from "axios";

export const BREEZY_API_URL = envVars.NEXT_PUBLIC_BREEZY_API_URL;

export const breezyApiClient = axios.create({
  baseURL: BREEZY_API_URL,
});
