import { isString } from "es-toolkit";

export const isNonEmptyString = (value: unknown): value is string => {
  return isString(value) && value.length > 0;
};
