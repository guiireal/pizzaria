import { getCookie } from "cookies-next";

export function getSessionTokenClient() {
  return getCookie("session");
}
