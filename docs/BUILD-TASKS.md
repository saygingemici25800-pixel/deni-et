# BUILD-TASKS.md — Deniz Et · Bileşen & Build Dökümü

> Adım 8 çıktısı. Claude Code'un sırayla ilerleyeceği görev listesi. Her faz bitince işaretle.

---

## Faz 0 — Kurulum
- [ ] Next.js (App Router) + TypeScript + Tailwind v4 kur.
- [ ] next-intl ile `[locale]` (tr varsayılan, en) yapısı.
- [ ] next/font/local: **Bonny** (assets/fonts/bonny/*.woff2) — Thin/Light/Regular/Medium/Bold.
- [ ] Tipografi 60/30/10 tretman yardımcıları (DESIGN-SYSTEM §3): gövde / başlık / statement.
- [ ] Motion, three, @react-three/fiber, @react-three/drei, lucide-react ekle.
- [ ] `styles/tokens.css` → DESIGN-SYSTEM paleti (CSS değişkenleri) + tailwind.config eşlemesi.
- [ ] `content/tr.json` & `content/en.json` (CONTENT-STRATEGY metinleri).

## Faz 1 — İskelet & Layout
- [ ] Header (sticky, condense-on-scroll, TR/EN switch, WhatsApp buton).
- [ ] Footer (logo, slogan, hızlı linkler, WhatsApp).
- [ ] WhatsAppFab + mobil StickyCTA bar (her sayfada).
- [ ] Bölüm iskeletleri (anchor'lı) ve genel grid/spacing.

## Faz 2 — Bölümler (içerik JSON'dan)
- [ ] Hero (SPLIT-SCREEN · HERO.md: knockout DENİZ/ET lockup + tagline + CTA + 3D/still sağ panel).
- [ ] (Güven şeridi KALDIRILDI — yerine hero'da "Üç nesildir" miras satırı.)
- [ ] Story (+ 3D karusel — 3D-FEATURE §A).
- [ ] Products (+ interaktif 3D et kâşifi — 3D-FEATURE §B; ilk etapta fallback 2D ile iskelet).
- [ ] Signature (ev yapımı sucuk + kuzu lokum feature bloğu).
- [ ] GrillService (mangal & davet + CTA).
- [ ] OrderSteps (3 adım).
- [ ] InstagramGrid (sosyal kanıt).
- [ ] Contact (adres, harita derin link, saatler, tel).

## Faz 3 — 3D (imza özellik · 3D-FEATURE.md)
- [ ] Tripo AI → dana + kuzu GLB üret (referans: Instagram fotoğrafları).
- [ ] Blender → 10 parça bölge/UV + kamera anchor'ları + deri/çiğ et iki doku + dissolve maske.
- [ ] Draco/Meshopt optimize export (< ~3–4MB).
- [ ] R3F sahne: dynamic import + ssr:false + IntersectionObserver ile lazy mount.
- [ ] Dana/kuzu toggle; hover outline; tıkla → kamera tween + panel + deri→çiğ et reveal.
- [ ] Mobil + WebGL-yok fallback (etiketli 2D kasap-parça haritası, aynı içerik).

## Faz 4 — Responsive & Motion (doz: abartısız premium + 1-2 imza · MOTION.md)
- [ ] Mobil-öncelikli düzen; dokunma hedefi ≥44px; tek elle gezinme.
- [ ] Motion + Lenis kur (yalnız bu fazda). Taban: scroll reveal (stagger), ince paralaks, hover (2px/zoom).
- [ ] İmza #1: hero Bonny variable kinetik statement. İmza #2: tek scroll-scrub vurgu YA DA blog kömür-wipe geçişi.
- [ ] Magnetic yalnız WhatsApp CTA; custom cursor site geneline YOK (sadece et kâşifi).
- [ ] `prefers-reduced-motion`: inertia/paralaks/kinetik/scrub/wipe kapanır; içerik anında tam görünür. Lighthouse ≥95 korunur.

## Faz 4.5 — Blog ("Tezgah Notları" · BLOG.md)
- [ ] /blog + /blog/[slug] rotaları (TR/EN); MDX/content collection.
- [ ] Yazı şablonu: tam-en çarpıcı arka plan + dev Bonny statement başlık + dar okuma ölçüsü + pull-quote.
- [ ] Statik + hafif paralaks/zoom; prefers-reduced-motion'da kapanır.
- [ ] Başlangıç yazıları (BLOG.md §4) + örnek ton (§5); nav + footer + bölüm içi linkler.

## Faz 5 — SEO & Schema
- [ ] Metadata API (TR/EN), Open Graph + OG görselleri.
- [ ] Blog için BlogPosting/Article JSON-LD + yayın tarihi + yazar.
- [ ] JSON-LD LocalBusiness/Butcher (ad, adres, tel, saat, geo, sosyal).
- [ ] sitemap.ts + robots.ts + hreflang + canonical.

## Faz 6 — QA & Deploy
- [ ] QA-CHECKLIST.md'yi geç (Lighthouse 95+, a11y, 2 dil, link/WhatsApp).
- [ ] Vercel deploy + alan adı + analytics.

---

## Placeholder politikası
- WhatsApp numarası: `+90XXXXXXXXXX` → tek sabitte (`lib/contact.ts`) tut, gelince değiştir.
- Fotoğraflar: geçici görsellerle kur; gerçekleri `public/`e gelince swap.
- 3D model: hazır olana dek bölüm 2D fallback ile çalışır; GLB gelince devreye girer.

---

*Durum: Adım 8 üretildi. → Adım 9: CLAUDE-CODE-PROMPT.md.*
