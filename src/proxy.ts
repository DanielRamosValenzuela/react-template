import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const TRACE_ID_COOKIE = 'falabella-starter-trace-id';
const TRACE_ID_HEADER = 'x-trace-id';
const FLOW_STEP_COOKIE = 'falabella-starter-flow-step';

const FLOW_STEPS: Record<string, string[]> = {
  cl: ['/', '/cotizacion'],
  co: ['/', '/cotizacion'],
  pe: ['/', '/cotizacion'],
};

const PROTECTED_ROUTES = ['/cotizacion'];

function getStepIndex(route: string, country: string): number {
  return (FLOW_STEPS[country] ?? FLOW_STEPS.cl).indexOf(route);
}

function getBackPath(route: string, country: string): string {
  const steps = FLOW_STEPS[country] ?? FLOW_STEPS.cl;
  const index = steps.indexOf(route);
  if (index <= 1) return '/';
  return steps[index - 1];
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const country = process.env.NEXT_PUBLIC_COUNTRY ?? 'cl';
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'local';
  const isLocal = environment === 'local';

  if (!isLocal && PROTECTED_ROUTES.includes(pathname)) {
    const completedStep = request.cookies.get(FLOW_STEP_COOKIE)?.value ?? '';
    const completedIndex = getStepIndex(completedStep, country);
    const requestedIndex = getStepIndex(pathname, country);

    if (requestedIndex > completedIndex + 1) {
      return NextResponse.redirect(new URL(getBackPath(pathname, country), request.url));
    }
  }

  const traceId = request.cookies.get(TRACE_ID_COOKIE)?.value ?? crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(TRACE_ID_HEADER, traceId);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  if (!request.cookies.has(TRACE_ID_COOKIE)) {
    response.cookies.set({
      name: TRACE_ID_COOKIE,
      value: traceId,
      sameSite: 'lax',
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};