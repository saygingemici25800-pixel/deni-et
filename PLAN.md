# PLAN.md — Deniz Et · Kasap Orhan · Master Build Planı

> Adım 7 çıktısı. Tüm kararların tek sayfada özeti. Claude Code build'i bu plana göre ilerler.
> Detaylar ilgili dosyalarda: PROJECT · CONTENT-STRATEGY · SITEMAP · DESIGN-SYSTEM · TECH-STACK · SKILLS-MCP.

---

## 1. Özet

Fethiye'nin 40 yıllık kasabı **Deniz Et · Kasap Orhan** için ödüllü hissi veren,
tek sayfa, iki dilli (TR/EN), sipariş odaklı (WhatsApp) bir web sitesi.
Konumlandırma: *fabrika değil, turist restoranı değil — ustanın eliyle çalışan, tanıyabileceğin kasap.*

---

## 2. Karar Özeti

- **Hero başlığı:** "Kırk yıldır aynı el, aynı söz." (kilitli)
- **Yapı:** Tek sayfa, anchor nav, mobil-öncelikli. TR `/`, EN `/en`.
- **Birincil aksiyon:** WhatsApp/telefon sipariş — her ekranda erişilebilir.
- **Palet:** Kömür #1A1411 · Krem #F4EEE4 · Et kırmızısı #9A2424 · Derin bordo #6E1A1A · Pirinç #C8951C.
- **Font:** Fraunces (display) × Hanken Grotesk (gövde).
- **Yön:** Editoryal/zanaat; sade, premium, hafif film greni; az ama zarif hareket.
- **İmza 3D özellik:** ürünlerde interaktif et-parçası kâşifi (10 parça, kamera zoom, reveal) + hikâyede 3D karusel. Detay: **3D-FEATURE.md.**
- **Yığın:** Next.js + TS + Tailwind v4 + next-intl + Motion + **R3F/drei/three** + lucide + next/image → Vercel.
- **SEO:** LocalBusiness JSON-LD, metadata, sitemap, hreflang, yerel anahtar kelimeler.

---

## 3. Bölümler (build sırası)

1. Header (sticky, TR/EN, WhatsApp)
2. Hero (başlık A + alt metin + CTA)
3. Güven şeridi (1980 · 40+ · ustanın eli)
4. Hikâye
5. Ürünler (dana/kuzu/mangallık/şarküteri/sakatat)
6. İmza lezzetler (ev yapımı sucuk + kuzu lokum)
7. Mangal & davet hizmeti (+ CTA)
8. Nasıl sipariş (3 adım)
9. Instagram/sosyal kanıt
10. Konum & iletişim (harita, adres, saatler)
11. Footer
12. Kalıcı: yüzen WhatsApp + mobil alt CTA bar

Tüm metinler `content/tr.json` & `content/en.json`'dan; CONTENT-STRATEGY referans.

---

## 4. Build Aşamaları (Claude Code için makro adımlar)

1. **İskelet:** Next.js + TS + Tailwind kurulumu, klasör yapısı, next-intl, fontlar.
2. **Token & layout:** DESIGN-SYSTEM paletini Tailwind config + CSS değişkenlerine taşı; Header/Footer.
3. **Bölümler:** yukarıdaki sırayla bileşenler; içerik JSON'dan.
4. **Responsive & motion:** mobil-öncelikli düzen, sabit CTA, scroll reveal, reduced-motion.
5. **SEO & schema:** metadata, JSON-LD, sitemap, robots, OG görselleri, hreflang.
6. **QA:** Lighthouse 95+, a11y, iki dil kontrolü, link/WhatsApp testleri.
7. **Deploy:** Vercel + alan adı.

---

## 5. Kabul Kriterleri (Definition of Done)

- [ ] Tek sayfa, 11 bölüm + kalıcı CTA, iki dilde eksiksiz.
- [ ] Lighthouse: Performance/SEO/Best Practices/Accessibility ≥ 95.
- [ ] Mobilde tek elle gezilebilir; WhatsApp tek dokunuş.
- [ ] LocalBusiness schema doğrulanır (Rich Results Test).
- [ ] `prefers-reduced-motion` çalışır; klavye erişimi tam; kontrast AA+.
- [ ] Metinler CONTENT-STRATEGY ile birebir; klişe yok.

---

## 6. Açık Blokerler (build'i çalıştırmadan önce)

- ⏳ **WhatsApp numarası** (wa.me formatı) — yoksa placeholder ile kurulur, sonra değişir.
- ⏳ **Fotoğraflar** — Instagram'dan (izinle) ya da çekim; yoksa geçici görsellerle iskelet kurulur.
- ⏳ **Çalışma saatleri** — schema + iletişim için.
- ⏳ **3D model** — dana/kuzu, 10 parçaya segment (3D-FEATURE.md §C). 3D'nin en kritik bağımlılığı; MVP hotspot ile başlanabilir.

> Bu üçü prompt'u ve build iskeletini engellemez; placeholder ile kurulur, gelince güncellenir.

---

*Durum: Adım 7 üretildi. → Adım 8: Bileşen/Build Dökümü, ardından Adım 9: Claude Code Prompt'u.*
