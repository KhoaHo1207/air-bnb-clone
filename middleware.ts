import {
  getSafeCallbackUrl,
  isAuthPath,
  isProtectedPath,
} from "@/lib/auth-routes";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_COOKIE_NAMES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
] as const;

function stripSessionCookies(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  const filtered = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(
      (part) =>
        !SESSION_COOKIE_NAMES.some((name) => part.startsWith(`${name}=`)),
    );
  return filtered.length > 0 ? filtered.join("; ") : undefined;
}

function clearInvalidSession(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const cookieHeader = stripSessionCookies(request.headers.get("cookie"));
  if (cookieHeader) {
    requestHeaders.set("cookie", cookieHeader);
  } else {
    requestHeaders.delete("cookie");
  }
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  for (const name of SESSION_COOKIE_NAMES) {
    response.cookies.delete(name);
  }
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSessionCookie = SESSION_COOKIE_NAMES.some((name) =>
    request.cookies.has(name),
  );

  let token = null;
  if (hasSessionCookie) {
    try {
      token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });
    } catch {
      token = null;
    }

    if (!token) {
      if (isProtectedPath(pathname)) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/login";
        loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
        const response = NextResponse.redirect(loginUrl);
        for (const name of SESSION_COOKIE_NAMES) {
          response.cookies.delete(name);
        }
        return response;
      }
      return clearInvalidSession(request);
    }
  }

  if (isProtectedPath(pathname) && !token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthPath(pathname)) {
    const callbackUrl = getSafeCallbackUrl(
      request.nextUrl.searchParams.get("callbackUrl"),
    );
    return NextResponse.redirect(new URL(callbackUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
