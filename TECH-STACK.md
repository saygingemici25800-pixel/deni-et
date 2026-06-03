# TECH-STACK.md — Deniz Et · Kasap Orhan

> Adım 5 çıktısı. Hedef: hızlı, SEO-güçlü, iki dilli, mobil-öncelikli, kolay yayınlanır.
> Senin referans skill'lerine (react-best-practices, tailwind-patterns, seo-optimizer,
> mobile-design, senior-frontend) birebir oturan modern bir yığın.

---

## 1. Çekirdek Yığın (kararlar)

| Katman | Seçim | Neden |
|--------|-------|-------|
| Framework | **Next.js (App Router) + TypeScript** | SSG/SSR ile mükemmel SEO, görsel optimizasyonu, i18n, kolay deploy |
| Stil | **Tailwind CSS v4 + CSS değişkenleri** | DESIGN-SYSTEM tokenları doğrudan; hızlı, tutarlı (tailwind-patterns skill) |
| Tipografi | **Bonny** (tek font), next/font/local self-host | Marka fontu; 60/30/10 tretman (DESIGN-SYSTEM §3); woff2 `assets/fonts/bonny/` |
| Blog | **MDX / content collection** + `/blog` rotaları | Bilgilendirici içerik, BlogPosting schema (BLOG.md) |
| Animasyon | **Motion (Framer Motion)** | Scroll reveal + stagger; reduced-motion saygılı |
| 3D | **React Three Fiber + drei + three** (Draco/Meshopt) | İmza özellik: interaktif et kâşifi + 3D hikâye karuseli (bkz. 3D-FEATURE.md) |
| İkonlar | **lucide-react** | Hafif, tutarlı, tree-shake |
| Çoklu dil | **next-intl** — `tr` (varsayılan) + `en` | Temiz `[locale]` route, SEO uyumlu |
| Görsel | **next/image** (AVIF/WebP) | Lighthouse + LCP için kritik |
| Harita | Google Maps **statik embed / derin link** | Ağır JS yok; "Yol Tarifi" tek tık |
| Analitik | **Vercel Analytics** veya Plausible | Hafif, gizlilik dostu |
| Deploy | **Vercel** | Next.js için en iyi, ücretsiz, alan adı kolay |

**3D notu (güncellendi):** 3D artık **çekirdek imza özellik.** İnteraktif et-parçası kâşifi
(ürünler) + 3D hikâye karuseli (hikâye). Detay ve performans stratejisi: **3D-FEATURE.md.**
3D yalnız ilgili bölümlerde, lazy mount + `ssr:false` ile yüklenir; ilk sayfa hızını bozmaz.
WebGL yoksa etiketli 2D fallback devreye girer.

---

## 2. Dönüşüm Entegrasyonları (sipariş odağı)

- **WhatsApp:** `https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20sipari%C5%9F%20vermek%20istiyorum`
  — önceden yazılmış mesaj. (Numara onayınla netleşecek; şu an telefon 0537 410 8842.)
- **Telefon:** `tel:+90XXXXXXXXXX` — mobilde tek dokunuş.
- **Yüzen WhatsApp butonu** + mobil **sabit alt CTA bar** (SITEMAP §4).

---

## 3. SEO Mimarisi (yerel işletme için kritik)

- **JSON-LD `LocalBusiness` / `Butcher` schema:** ad, adres (Cumhuriyet Mah. 97. Sk. No:42, Fethiye),
  telefon, çalışma saatleri, coğrafi konum, fiyat aralığı, sosyal hesaplar.
- **Metadata API:** her dil için title/description, Open Graph, Twitter card.
- **`sitemap.xml` + `robots.txt`** otomatik (next-sitemap).
- **hreflang** TR/EN; canonical etiketler.
- Yerel anahtar kelimeler: "Fethiye kasap", "Fethiye et", "ev yapımı sucuk Fethiye",
  "mangallık et Fethiye", "Fethiye butcher".
- Hedef: **Lighthouse 95+** (Performance / SEO / Accessibility / Best Practices).

---

## 4. Proje Yapısı (öneri)

```
deniz-et/
├─ app/
│  ├─ [locale]/
│  │  ├─ layout.tsx        # fontlar (Bonny local), header, footer, schema
│  │  ├─ page.tsx          # tek sayfa: tüm bölümler
│  │  └─ blog/
│  │     ├─ page.tsx       # blog listesi
│  │     └─ [slug]/page.tsx# yazı (MDX), BlogPosting schema
│  ├─ sitemap.ts · robots.ts
├─ components/
│  ├─ Header.tsx · Hero.tsx · TrustBar.tsx · Story.tsx
│  ├─ Products.tsx · Signature.tsx · GrillService.tsx
│  ├─ OrderSteps.tsx · InstagramGrid.tsx · Contact.tsx
│  ├─ Footer.tsx · StickyCTA.tsx · WhatsAppFab.tsx · LangSwitch.tsx
├─ content/                # tr.json · en.json (CONTENT-STRATEGY metinleri)
├─ lib/ (seo, schema, wa-link)
├─ public/ (logo, görseller, og)
├─ styles/ (tokens.css → DESIGN-SYSTEM paleti)
└─ tailwind.config.ts
```

İçerik `content/tr.json` ve `content/en.json`'da tutulur → metin/dil değişimi kolay,
geliştiriciden bağımsız güncellenir.

---

## 5. Performans & Kalite Bütçesi

- İlk yük JS < 120KB; görseller lazy + boyutlandırılmış.
- Hero LCP < 2.0s; CLS ~0.
- Klavye erişilebilirliği, görünür odak, AA+ kontrast (DESIGN-SYSTEM §8).
- `prefers-reduced-motion` tüm animasyonları kapatır.

---

*Durum: ✅ Adım 5 KİLİTLİ. → Adım 6: Skill & MCP Bağlantı Planı.*
