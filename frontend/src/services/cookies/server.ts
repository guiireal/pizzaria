import { cookies } from "next/headers";

export async function getSessionTokenServer() {
  const cookieStore = await cookies();

  return cookieStore.get("session")?.value;
}
