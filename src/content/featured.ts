// Haftanın ürünü — TEK kaynak. {/* her hafta name + image + text buradan değiştir */}
export type Bi = {tr: string; en: string};

export const weeklyProduct: {name: Bi; text: Bi; image?: string; href: string} = {
  name: {tr: 'Dana Antrikot — Dry Age', en: 'Beef Ribeye — Dry-Aged'},
  text: {
    tr: 'Bu hafta tezgahın yıldızı: haftalarca kuru dinlendirilmiş dana antrikot. Yoğun, fındıksı, mermerlenmesi bol. Yüksek ateşte mühürleyin, beş dakika dinlendirin — gerisini et anlatır.',
    en: "This week's star of the counter: beef ribeye, dry-aged for weeks. Deep, nutty and beautifully marbled. Sear it hot, rest it five minutes — and let the meat do the talking.",
  },
  image: undefined, // {/* TODO: gerçek foto */}
  href: '/tekne',
};
