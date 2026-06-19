// Haftanın ürünü — TEK kaynak. Header'da gösterilir. {/* her hafta burayı değiştir */}
export type Bi = {tr: string; en: string};

export const weeklyProduct: {name: Bi; image?: string; href: string} = {
  name: {tr: 'Dana Antrikot — Dry Age', en: 'Beef Ribeye — Dry-Aged'},
  image: undefined, // {/* TODO: gerçek foto (28-32px thumb) */}
  href: '/tekne',
};
