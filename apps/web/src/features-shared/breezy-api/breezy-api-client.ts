import { envVars } from "@/env-var/envVars";
import axios from "axios";
import { USER_CONSTANTS } from "../user/constants";
import Cookies from "js-cookie";
import { getAccessTokenValidator } from "../user/validation/validateAccessToken";

export const BREEZY_API_URL = envVars.NEXT_PUBLIC_BREEZY_API_URL;

export const breezyApiClient = axios.create({
  baseURL: BREEZY_API_URL,
});

breezyApiClient.interceptors.request.use(
  function (config) {
    const rawAccessToken = Cookies.get(USER_CONSTANTS.userAccessToken);

    const tokenValidator = getAccessTokenValidator(rawAccessToken);
    const accessTokenValidation = tokenValidator.safeParse(rawAccessToken);

    if (accessTokenValidation.success) {
      config.headers.Authorization = `Bearer ${accessTokenValidation.data}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
