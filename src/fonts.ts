import localFont from 'next/font/local';

// TEK FONT: Bonny — self-host, 5 ağırlık (DESIGN-SYSTEM §3).
// Tek ailenin altında weight'lerle ayrışır → 60/30/10 tretmanı tek font ile kurulur.
// CSS değişkeni olarak --font yayınlanır; globals.css bunu --font-sans'a bağlar.
export const bonny = localFont({
  src: [
    {path: '../assets/fonts/bonny/Bonny-Thin.woff2', weight: '100', style: 'normal'},
    {path: '../assets/fonts/bonny/Bonny-Light.woff2', weight: '300', style: 'normal'},
    {path: '../assets/fonts/bonny/Bonny-Regular.woff2', weight: '400', style: 'normal'},
    {path: '../assets/fonts/bonny/Bonny-Medium.woff2', weight: '500', style: 'normal'},
    {path: '../assets/fonts/bonny/Bonny-Bold.woff2', weight: '700', style: 'normal'},
  ],
  variable: '--font',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  // Türkçe karakter kapsamı woff2 içinde gelir; ş ğ ı İ ç ö ü test bloğunda doğrulanır.
});
