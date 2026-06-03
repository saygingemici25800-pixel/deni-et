# CLAUDE-CODE-PROMPT.md — Deniz Et · Kasap Orhan

> Adım 9 çıktısı. Aşağıdaki bloğu Claude Code'a yapıştır. Önce bu repo'ya planlama
> dosyalarını (cvcvcv.zip içindekiler) koy; prompt onlara referans verir.

---

## ⚠️ ÖNCE BUNU YAP (skill + MCP bağlama — UNUTMA)
Koda geçmeden **SETUP.md**'yi uygula:
1. `docs/` + `assets/logo.png` + **`assets/fonts/bonny/` (Bonny woff2'ler) + content/ (tr.json, en.json)** yerleştir.
2. **Skill'ler:** komut yok — `~/.claude/skills/` altında 9 skill mevcut mu doğrula (`ls ~/.claude/skills/`), `3d-web-experience` dahil.
3. **MCP'ler:** terminalde ekle →
   `claude mcp add --scope project playwright -- npx -y @playwright/mcp@latest`
   `claude mcp add --scope project context7 -- npx -y @upstash/context7-mcp@latest`
   sonra Claude Code'u **yeniden başlat** ve `claude mcp list` ile doğrula.
4. Hepsi ✅ olunca aşağıdaki prompt'u yapıştır.

---

## Kullanım
1. Yeni bir klasör aç, planlama `.md` dosyalarını `/docs` altına koy (PROJECT, CONTENT-STRATEGY,
   SITEMAP, DESIGN-SYSTEM, TECH-STACK, SKILLS-MCP, PLAN, 3D-FEATURE, BUILD-TASKS, QA-CHECKLIST, SETUP, BLOG).
2. Logoyu `/assets/logo.png`, Bonny fontlarını `/assets/fonts/bonny/`, metinleri `/content/`e koy.
3. Gerekli MCP'leri ekle: tarayıcı/Playwright MCP + Context7 (docs MCP). Detay: SETUP.md.
4. Aşağıdaki prompt'u yapıştır.

---

## ⬇️ YAPIŞTIRILACAK PROMPT

```
Rolün: ödüllü işler çıkaran kıdemli bir frontend ekibi. Fethiye'nin 40 yıllık kasabı
"Deniz Et · Kasap Orhan" için tek sayfa, iki dilli (TR varsayılan + EN), sipariş odaklı,
3D imza özelliği olan bir web sitesi kuracaksın.

ÖNCE OKU (bunlar tek doğruluk kaynağı, hepsine uy):
- docs/PROJECT.md, docs/CONTENT-STRATEGY.md, docs/SITEMAP.md, docs/DESIGN-SYSTEM.md,
  docs/TECH-STACK.md, docs/SKILLS-MCP.md, docs/PLAN.md, docs/3D-FEATURE.md,
  docs/BUILD-TASKS.md, docs/QA-CHECKLIST.md, docs/SETUP.md, docs/BLOG.md
Çelişki olursa PLAN.md > diğerleri. Tasarım kararlarını kendin uydurma; bu dosyalardaki
token, metin ve akışa sadık kal.

BAŞLAMADAN DOĞRULA (SETUP.md):
- `~/.claude/skills/` altında gerekli 9 skill var mı (3d-web-experience dahil)?
- `claude mcp list` → playwright + context7 bağlı mı? Değilse SETUP.md §3 komutlarıyla ekle, devam et.

KULLAN — SKILL'ler (sırasıyla):
senior-frontend + react-best-practices (mimari/kod) → ui-design-system + tailwind-patterns
(token/stil) → frontend-design + ui-ux-pro-max (görsel + dönüşüm UX) → mobile-design (responsive)
→ seo-optimizer (SEO/schema) → 3d-web-experience (3D modüller).

KULLAN — MCP'ler:
Her görünür değişiklikten sonra tarayıcı/Playwright MCP ile ekran görüntüsü al, masaüstü +
mobilde kontrol et, kendini düzelt. Kütüphane API'lerinde Context7 (docs MCP) ile GÜNCEL
kalıpları doğrula (Next.js App Router, Tailwind v4, next-intl, R3F/drei) — eski kalıp kullanma.

YIĞIN (TECH-STACK.md):
Next.js (App Router) + TypeScript + Tailwind v4 + next-intl + Motion + three/@react-three/fiber/
@react-three/drei + lucide-react + next/image. Deploy hedefi Vercel.

TASARIM (DESIGN-SYSTEM.md):
Yön: editoryal/zanaat; sade, premium, BOŞLUKLU (bol beyaz alan); STATİK + hafif hareketli.
Jenerik AI estetiği YOK. Palet: Kömür #1A1411, Krem #F4EEE4, Et kırmızısı #9A2424, Derin bordo
#6E1A1A, Pirinç #C8951C. FONT: TEK aile **Bonny** (assets/fonts/bonny/*.woff2 → next/font/local,
self-host). Üç tretman, kullanım oranı **60/30/10**: %60 Light/Regular (gövde/çoğunluk),
%30 Medium (başlık/yapı), %10 Bold|Thin DEV PUNTO yalnız en keskin/çarpıcı statement cümlelerde
(bölüm başına en fazla bir). Türkçe karakter kapsamını doğrula; eksikse sadece blog gövdesi için
sessiz okuma fontu fallback (yoksa her yer Bonny). Köşeler keskin/az; ince hairline ayraçlar.

İÇERİK (CONTENT-STRATEGY.md):
Tüm metinler content/tr.json ve content/en.json'dan gelsin. Hero başlığı: "Kırk yıldır aynı el,
aynı söz." Marka dili: klişe yok; her sıfat somut faydaya bağlı; kısa, vurucu, samimi. EN metinleri
spec'teki karşılıklarla; eksikleri aynı tonda üret.

YAPI (SITEMAP.md) — tek sayfa, anchor nav, mobil-öncelikli:
Header(sticky, TR/EN, WhatsApp) → Hero → Güven şeridi → Hikâye(+3D karusel) → Ürünler(+3D et kâşifi)
→ İmza lezzetler → Mangal & davet → Nasıl sipariş(3 adım) → Instagram → Konum/iletişim → Footer.
Kalıcı: yüzen WhatsApp + mobil sabit alt CTA bar.

DÖNÜŞÜM:
Birincil aksiyon WhatsApp/telefon sipariş, her ekranda erişilebilir. WhatsApp linki
wa.me + önceden yazılmış mesaj; telefon tel: linki. Numara için lib/contact.ts içinde tek sabit
kullan: WHATSAPP="+90XXXXXXXXXX" (placeholder, sonra değişecek). Tel placeholder: 0537 410 8842.

İMZA 3D ÖZELLİK (3D-FEATURE.md — birebir uygula):
- Hikâye: 3D karusel (1980→bugün), sürükle/scroll/ok; hover'da durur; klavye erişilebilir.
- Ürünler: orta plan (middle-shot) DANA + KUZU, toggle ile geçişli. Her hayvanda 10 kasap parçası.
  Parçaya tıkla → kamera smooth zoom + hafif yörünge; gövde soluklaşır; aynı sayfada panel açılır
  (parça adı + uygun yemek + pişirme tavsiyesi + küçük "WhatsApp'tan iste" CTA).
- Reveal: SEÇİLEN davranış (b) — parçaya yaklaşınca DERİ KALKAR, altından ÇİĞ ET görünür.
  Teknik: dissolve (erime) shader + iki doku (deri → çiğ et). Tam iç geometri şart değil.
- Modeller Tripo AI'dan gelecek (tek mesh GLB). Blender hazırlığı: 10 parça için UV zonu/material slot,
  kamera anchor'ları, deri+çiğ et doku setleri, dissolve maske, Draco/Meshopt optimize (<~3-4MB).
- 3D'yi dynamic import + ssr:false + IntersectionObserver ile yalnız bölüm görününce yükle.
- Model henüz yokken: bölümü etiketli 2D kasap-parça haritası (fallback) ile çalışır kur; GLB gelince
  aynı arayüze tak. WebGL yoksa/düşük cihazda da bu 2D fallback devreye girsin.

BLOG (BLOG.md — "Tezgah Notları"):
- Rotalar: /blog + /blog/[slug] (EN: /en/blog...). İçerik MDX/content collection.
- Her yazı: tam-en (full-bleed) ÇARPICI arka plan kompozisyonu (et dokusu/koyu zemin + dev Bonny
  statement başlık = %10 tretman), bol boşluk, dar okuma ölçüsü (~68ch), pull-quote'lar dev Bonny.
- Statik + hafif hareket: scroll paralaks + çok yavaş görsel zoom; prefers-reduced-motion'da kapanır.
- Nav'a "Blog" ekle; ilgili bölümlerden ilgili yazıya link (örn. mangal → mangal yazısı).
- SEO: BlogPosting/Article JSON-LD, özgün title/description/OG, yayın tarihi, yazar Kasap Orhan.
- Başlangıç yazıları ve örnek ton BLOG.md §4-5'te; content/blog altında MDX olarak kur.

PERFORMANS / SEO / ERİŞİLEBİLİRLİK:
- Lighthouse hedefi ≥95 (Performance/SEO/Best Practices/Accessibility). 3D'siz LCP < 2.0s korunur.
- JSON-LD LocalBusiness/Butcher (ad, adres: Cumhuriyet Mah. 97. Sk. No:42 Fethiye/Muğla, tel, saat,
  geo, sosyal). Metadata API (TR/EN), Open Graph, sitemap, robots, hreflang, canonical.
- Yerel anahtar kelimeler: "Fethiye kasap", "Fethiye et", "ev yapımı sucuk Fethiye", "mangallık et Fethiye".
- Semantik HTML, görünür odak (pirinç outline), kontrast AA+, dokunma hedefi ≥44px,
  prefers-reduced-motion tüm animasyonu kapatır.

ÇALIŞMA YÖNTEMİ:
- BUILD-TASKS.md sırasını izle (Faz 0→6). Küçük commit'ler. Her bölümden sonra tarayıcı MCP ile
  masaüstü+mobil ekran görüntüsü al, kendini eleştir, düzelt.
- Placeholder politikası: numara/foto/3D model hazır olmasa da iskeleti placeholder ile çalışır kur;
  tek noktadan değişebilsin.
- Bitince QA-CHECKLIST.md'yi madde madde geç ve sonucu raporla.

ŞİMDİ BAŞLA: Faz 0 (kurulum) ile başla, plana göre ilerle. Belirsizlik olursa docs'a bak;
gerçekten gerekiyorsa tek net soru sor, yoksa en iyi kararı verip devam et.
```

---

*Durum: Adım 9 üretildi. → Adım 10: QA-CHECKLIST.md.*
