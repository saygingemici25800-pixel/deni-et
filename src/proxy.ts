import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Next.js 16 "proxy" konvansiyonu (eski middleware.ts). next-intl locale yönlendirmesi.
export default createMiddleware(routing);

export const config = {
  // Kök "/" + locale-prefix'li yollar + (api/_next/_vercel ve nokta içeren statikler hariç) her şey.
  matcher: ['/', '/(tr|en|ru)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
