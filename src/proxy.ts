import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Next.js 16 "proxy" konvansiyonu (eski middleware.ts). next-intl locale yönlendirmesi.
export default createMiddleware(routing);

export const config = {
  // /api, /_next, /_vercel ve nokta içeren (statik) yollar hariç her şeyi eşle.
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
