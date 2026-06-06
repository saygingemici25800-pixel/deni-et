# HERO.md — Deniz Et · Split-Screen Hero (referans uyarlaması)

> Referans (EMBER.dsgn) ilkeleri uyarlandı — kopya değil. Hikâye: **çiğ → köz → sofra**
> ("primal into powerful"in kasap karşılığı). Font Bonny 60/30/10; palet kömür/krem/et/pirinç.

---

## 1. Düzen
- Tam ekran (100vh), **iki panel**: SOL ~%52 krem (#F4EEE4), SAĞ ~%48 kömür (#1A1411).
- Üstte iki paneli kesen ince bar: logo (sol) · nav · TR/EN · **WhatsApp** (sağ).
- Mobil: paneller alt alta yığılır (SOL üst, SAĞ alt); dev tipografi ölçeklenir.

## 2. Tipografi yerleşimi (knockout lockup)
- **"DENİZ"** — sol-üst, DEV Bonny Bold (%10 statement), harf içleri **köz/ateş dokusu** ile
  doldurulur (background-clip:text). Hafif taşar, kompozisyona güç verir.
- **"ET"** — sağ-alt, DEV Bonny, krem dolu (referanstaki STUDIO gibi). Marka adı split okunur:
  DENİZ … ET.
- **H1 (semantik):** "Deniz Et · Kasap Orhan" (görsel olarak split lockup; ekran okuyucuya tek H1).
- **Tagline:** "Kırk yıldır aynı el, aynı söz." — sol orta, Bonny Medium (%30).
- **Üst etiket:** FETHİYE · 1980'DEN BERİ (pirinç, uppercase, küçük).

## 3. Sol panel "about" bloğu (referanstaki manifesto konumu)
- Üst etiket → tagline → kısa alt metin (hero.subtitle).
- Alt satır: **[WhatsApp'tan Sipariş Ver]** (birincil) · Instagram · adres (Cumhuriyet Mah. 97. Sk. No:42).

## 4. Sağ panel — 3D hero objesi
- **Közün üstünde süzülen et** (hero objesi): kömür/köz + parlayan et; ince yörünge çizgisi + küçük
  kıvılcım/asterisk aksanlar (pirinç #C8951C).
- Tripo modeli gelince buraya oturur; gelene kadar **çarpıcı still** (et + köz) ile çalışır.
- Not: interaktif 10-parça **et kâşifi** burada DEĞİL — o Ürünler bölümünde (3D-FEATURE §B).

## 5. Hareket (statik + hafif)
- "DENİZ" içindeki köz dokusu çok yavaş parlar/akışır (resim 1→3 tutuşma hissi).
- 3D obje yavaş süzülür/paralaks; kıvılcımlar hafif titrer.
- Giriş: tipografi + obje kademeli belirir (stagger).
- `prefers-reduced-motion`: tutuşmuş/yerleşmiş statik karede donar.

## 6. Renk/kontrast
- "Bold contrast": açık sol ↔ koyu sağ. Köz dokusu = et-kırmızısı + pirinç geçişi (magenta yok).
- Erişilebilirlik: knockout başlık dekoratiftir; gerçek H1 metni DOM'da okunur kalır, kontrast AA+.

---

## 7. Sahiplik notu
Referanstan **ilke** alındı (split, knockout type, yazı konumları, statik duruş, primal→powerful);
görsel dil tamamen Deniz Et (kasap/ateş/Türkçe). Klonlama yok.

---

*Durum: Hero spec hazır. DESIGN-SYSTEM/SITEMAP/CLAUDE-CODE-PROMPT güncellendi. H1 = "Deniz Et",
tagline = locked cümle.*
