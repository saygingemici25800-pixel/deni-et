# BLOG.md — Deniz Et · Blog ("Tezgah Notları")

> Yeni modül. Bilgilendirici + çarpıcı et içerikleri. Amaç: SEO (yerel + bilgi aramaları),
> uzmanlık/güven, ve siparişe yumuşak köprü. Dil TR + EN. Tip: Bonny 60/30/10 (DESIGN-SYSTEM §3).

---

## 1. Konumlandırma
Blog adı: **"Tezgah Notları"** (EN: *Notes from the Counter*). Ustanın ağzından, kısa, net,
çarpıcı bilgi. Akademik değil; "kasaptan sana" tonu. Her yazı bir somut fayda öğretir.

---

## 2. Yapı & Rotalar
- `/blog` (TR) · `/en/blog` (EN) — yazı listesi (grid, çarpıcı kapaklar).
- `/blog/[slug]` — yazı sayfası.
- İçerik **MDX / content collection** olarak tutulur (yazıları geliştiriciden bağımsız ekle).
- Ana sayfadan link: nav'da "Blog" + footer + ilgili bölümlerde ("mangal" → mangal yazısı).

---

## 3. Çarpıcı Arka Plan Tasarım Dili
Her yazının kendi **tam-en (full-bleed) arka plan kompozisyonu** olur; statik + hafif hareketli:
- Tam ekran et/doku fotoğrafı veya koyu kömür zemin + dev **Bonny statement** başlık (%10 tretman).
- Bol boşluk; başlık ortada/asimetrik, küçük üst etiket + okuma süresi.
- Hafif hareket: scroll'da başlıkta yavaş paralaks, grenli doku overlay, görselde çok yavaş zoom.
- Okuma gövdesi dar ölçü (max ~68ch), nefesli satır aralığı — premium dergi hissi.
- Pull-quote'lar dev Bonny ile (statement %10). Bölüm araları ince hairline ayraç.
- `prefers-reduced-motion`: paralaks/zoom kapanır, kompozisyon statik kalır.

---

## 4. Başlangıç Yazıları (TR — EN karşılıkları content'te)

1. **Etini tanı: dananın 10 parçası ve hangisi neye yakışır**
2. **Mangalda kusursuz et: ateş, dinlendirme ve üç hata**
3. **Ev yapımı sucuk neden farklı: baharat, sabır, zaman**
4. **Taze et nasıl anlaşılır: renk, koku, doku rehberi**
5. **Kuzu lokum: adındaki incelik nereden gelir**
6. **Eti dinlendirmek (resting) neden lezzeti ikiye katlar**

Her yazı: çarpıcı statement başlık + 3-5 kısa bölüm + somut ipucu + sonda yumuşak CTA
("Bu parçayı tezgahtan iste / WhatsApp").

---

## 5. Örnek Yazı (tonu sabitlemek için) — "Mangalda kusursuz et"

> **Statement başlık (%10):** Ateş aceleye gelmez.
>
> Mangalın sırrı ette değil, sabırda. Çoğu kişi üç yerde yanılır: eti soğuk koyar, sık çevirir,
> dinlendirmeden keser.
>
> **Ateş.** Köz olmadan et koyma. Alev pişirmez, kurutur. Avucunu ızgaranın 10 cm üstünde
> 3 saniye tutabiliyorsan ateş hazırdır.
>
> **Çevirme.** Eti bırak. Bir yüz mühürlenmeden çevirme; sık çevirmek suyu kaçırır.
>
> **Dinlendirme.** Ateşten alınca 5 dakika beklet. Lifler suyu geri emer; ilk kesişte masaya akmaz.
>
> *Doğru parça yarı iş: antrikot ve pirzola mangalın yıldızıdır.*
> **CTA:** Mangallık etini tezgahtan seç — WhatsApp'tan yaz.

*(Tam metinler + EN: content/blog altında MDX olarak; bu örnek tonu belirler.)*

---

## 6. SEO
- Her yazı: özgün title/description, OG görseli, `Article`/`BlogPosting` JSON-LD, yayın tarihi, yazar (Kasap Orhan).
- Yerel + bilgi anahtarları: "mangalda et pişirme", "dana parçaları", "ev yapımı sucuk", "Fethiye kasap".
- Blog index + yazılar sitemap'e dahil; hreflang TR/EN.

---

*Durum: Blog spec hazır. SITEMAP/TECH-STACK/CLAUDE-CODE-PROMPT/BUILD-TASKS güncellendi; content'e blog anahtarları eklendi.*
