export function getSafeCallbackUrl(requested: string | null | undefined) {
  if (!requested || !requested.startsWith("/") || requested.startsWith("//")) {
    return "/";
  }
  return requested;
}

export const PROTECTED_PATH_PREFIXES = [
  "/trips",
  "/reservations",
  "/favorites",
  "/host",
  "/account",
] as const;

export const AUTH_PATHS = ["/login", "/register"] as const;

export function isProtectedPath(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function isAuthPath(pathname: string) {
  return AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}
