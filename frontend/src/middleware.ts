import { NextResponse, type NextRequest } from "next/server";
import { api } from "./services/api";
import { getSessionTokenServer } from "./services/cookies/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/_next" || pathname === "/") {
    return NextResponse.next();
  }

  const sessionToken = await getSessionTokenServer();

  if (
    pathname.startsWith("/dashboard") &&
    !(await validateSessionToken(sessionToken))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

async function validateSessionToken(sessionToken?: string) {
  if (!sessionToken) {
    return false;
  }

  try {
    await api.get("/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
