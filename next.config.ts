import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// next-intl plugin — request config lives at src/i18n/request.ts (TECH-STACK §1).
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
