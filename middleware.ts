import createMiddleware from "next-intl/middleware";
import { routing } from "./app/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

// Creamos el middleware de internacionalización
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Ejecutar middleware de next-intl
  const intlResponse = intlMiddleware(request);
  const response =
    intlResponse instanceof Promise ? await intlResponse : intlResponse;

  // Extraer pathname (sin dominio)
  const pathname = request.nextUrl.pathname;

  // Obtener lista de locales desde config
  const locales = routing.locales;

  // Regex: /{locale}/dashboard o /{locale}/dashboard/*
  const isProtectedRoute = locales.some(
    (locale) =>
      pathname === `/${locale}/dashboard` ||
      pathname.startsWith(`/${locale}/dashboard/`)
  );

  if (isProtectedRoute) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
    }
  }

  return response;
}

// ⚠️ Actualizar matcher para que incluya todas las rutas relevantes
export const config = {
  matcher: [
    // Necesario para que next-intl funcione correctamente
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
