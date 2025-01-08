import { getCookie } from "cookies-next";

export function getSessionTokenServer() {
  return getCookie("session");
}
