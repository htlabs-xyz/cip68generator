/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from "lodash";

export function convertEmpty(value: any): any {
  if (value === null || (Array.isArray(value) && isEmpty(value)) || (typeof value === "object" && isEmpty(value))) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map((item) => convertEmpty(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, convertEmpty(val)]));
  }

  return value;
}
