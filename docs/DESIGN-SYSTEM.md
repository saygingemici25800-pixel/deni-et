# DESIGN-SYSTEM.md — Deniz Et · Kasap Orhan

> Adım 4 çıktısı. Renkler logodan birebir çıkarıldı. Yön: **editoryal / zanaat (craft)** —
> sıcak kömür zemin, krem yüzeyler, derin et kırmızısı vurgu, ince pirinç (brass) detay.
> Jenerik AI estetiğinden uzak; sade, premium, akılda kalıcı.

---

## 1. Aesthetic Direction

**Tek cümle:** *Bir kasabın el emeği, editoryal bir derginin sayfasında.*

- Sıcak, koyu zemin (mürekkep gibi kömür) + krem "kağıt" bölümler arasında ritim.
- Büyük, ifadeli serif başlıklar; bol beyaz alan; ince saç-çizgi ayraçlar.
- Tam-en (full-bleed) et/zanaat fotoğrafları; hafif film grenli doku ile sıcaklık.
- Hareket az ve zarif — scroll'da yumuşak beliriş, görselde yavaş zoom. Gösteriş yok.
- Akılda kalan tek şey: **bordo + kömür kontrastı ve ustanın eli vurgusu.**

---

## 2. Renk Paleti (logodan türetildi)

Magenta halka logo görselinde kalır; sitede premium his için kullanılmaz.

```css
:root {
  /* Zemin / koyu */
  --espresso:    #1A1411;  /* ana koyu zemin (sıcak siyah) */
  --espresso-2:  #241B16;  /* yükseltilmiş koyu yüzey */
  /* Açık / kağıt */
  --bone:        #F4EEE4;  /* krem yüzey (logo beyazının sıcak hali) */
  --bone-2:      #E8DECF;  /* ikincil krem */
  /* Marka kırmızısı (logo wordmark) */
  --et:          #9A2424;  /* birincil aksiyon / vurgu */
  --et-deep:     #6E1A1A;  /* derinlik, hover, gölge tonları */
  /* Sıcak pirinç (halkadaki amber) — az kullan */
  --brass:       #C8951C;  /* altın detay, alt çizgi, küçük vurgu */
  /* Nötr metin */
  --ink:         #1A1411;  /* krem üstünde metin */
  --ink-soft:    #5A4F46;  /* ikincil metin */
  --cream-soft:  #C9BEB0;  /* koyu üstünde ikincil metin */
  --line:        rgba(154,36,36,.22); /* ince ayraç */
}
```

**Kullanım oranı (60/30/10):** %60 kömür/krem zemin · %30 fotoğraf · %10 bordo+pirinç vurgu.
WhatsApp yeşili yalnız WhatsApp butonunda (#25D366); başka yerde kullanılmaz.

---

## 3. Tipografi — TEK FONT: **Bonny** (60/30/10 sistemi)

Tüm site **Bonny** ile kurulur (Indian Type Foundry / Fontshare; lisans web+ticari serbest).
Self-host: `assets/fonts/bonny/*.woff2` → next/font/local. Ağırlıklar: Thin·Light·Regular·Medium·Bold.

**Üç tretman (varyasyon), kullanım oranı 60 / 30 / 10:**

| Oran | Tretman | Rol | Ağırlık |
|------|---------|-----|---------|
| **%60** | İş gören (workhorse) | Gövde, paragraf, UI, açıklama, çoğunluk metin | Bonny **Light/Regular** |
| **%30** | Yapı | Bölüm başlıkları (H2/H3), alt başlık, etiket, nav | Bonny **Medium** |
| **%10** | **Statement** | YALNIZ en keskin/çarpıcı cümleler — dev punto, nadir, unutulmaz | Bonny **Bold** (ya da Thin, çok büyük) |

> %10 kuralı katı: bir bölümde en fazla **bir** statement satırı. Hero H1, bölümün tek vurucu cümlesi,
> blog pull-quote'u. Her yerde büyük punto kullanılırsa %10'un etkisi kaybolur — az = güçlü.

```css
--font: "Bonny", Georgia, serif;            /* tek aile */
/* Tretmanlar weight ile ayrışır: 300/400 (60%), 500 (30%), 700|100 dev punto (10%) */
```

**Ölçek (fluid / clamp):**
| Rol | Boyut | Tretman |
|-----|-------|---------|
| Statement / Hero H1 | clamp(3rem, 8vw, 7rem), sıkı satır | %10 · Bonny Bold/Thin |
| H2 bölüm | clamp(2rem, 4vw, 3.25rem) | %30 · Medium |
| H3 | clamp(1.25rem, 2vw, 1.6rem) | %30 · Medium |
| Gövde | 1.0625–1.1875rem, satır yük. 1.65 | %60 · Light/Regular |
| Etiket/üst başlık | 0.8rem, +0.16em letter-spacing, UPPERCASE | %30 · Medium, brass |

> **Türkçe karakter:** build'de Bonny'nin ş/ğ/ı/İ/ç/ö/ü kapsamı kontrol edilir. Eksikse,
> YALNIZ blog uzun paragrafları için sessiz bir okuma fontu fallback olarak değerlendirilir (QA kararı).
> Varsayılan: her yer Bonny.

**Statik + hareketli + boşluklu:** Tip büyük ve nefesli yerleştirilir; bol beyaz alan premium hissin
belkemiği. Hareket az ama akıcı (scroll reveal, statement satırların gecikmeli belirişi).

---

## 4. Boşluk, Grid, Köşe

- **Spacing skalası:** 4 / 8 / 12 / 16 / 24 / 40 / 64 / 96 / 128 px.
- **Grid:** 12 kolon, max içerik 1200px; kenar boşluğu mobil 20px, masaüstü 48px.
- **Bölüm dikey nefes:** masaüstü 96–128px, mobil 56–72px.
- **Köşe yarıçapı:** çoğunlukla keskin/az (2–6px); kartlar 10px. Premium = az yuvarlama.
- **Ayraçlar:** 1px bordo-şeffaf hairline; köşeli, net.

---

## 5. Bileşen Stili

- **Birincil buton (WhatsApp/Sipariş):** dolu bordo `--et`, krem metin; hover'da `--et-deep` + hafif yukarı kayma. Köşe 4px.
- **İkincil buton:** çerçeveli (1px `--et`), şeffaf zemin; hover'da dolar.
- **Ürün kartı:** krem zemin, tam-en görsel üstte, ince hairline, başlık Fraunces, fiyat/etiket küçük; hover'da görsel yavaş zoom (1.04, 600ms).
- **Hero miras satırı:** eyebrow altında çok sessiz "Üç nesildir / Three generations" (Bonny Light/Thin, ink-soft, küçük; opsiyonel kısa hairline aksanı). (Eski "güven şeridi" bölümü kaldırıldı.)
- **Sticky header:** scroll'da kömür zemine geçer + küçülür; WhatsApp butonu sabit.
- **Mobil alt CTA bar:** sabit, WhatsApp + Ara; tek dokunuş.

---

## 6. Hareket (Motion) — ayrıntı: **MOTION.md**

Doz: **abartısız premium + 1-2 imza anı** (Build in Amsterdam ilkeleri uyarlandı). Faz 4'te uygulanır.
- Taban: Lenis yumuşak scroll, scroll reveal (16px+fade, 500ms, cubic-bezier(.2,.6,.2,1)), ince paralaks, hover (2px/zoom).
- İmza #1: hero Bonny **variable** kinetik statement + köz parıltısı. İmza #2: tek scroll-scrub vurgu ya da blog kömür-wipe geçişi.
- `prefers-reduced-motion`: her şey kapanır, içerik anında tam görünür. Bounce/abartı yok.

---

## 7. Doku & Atmosfer

- Koyu bölümlerde çok hafif film greni (noise) overlay — dijital sterilliği kırar.
- Kesim/satır göndermesi: bölüm geçişlerinde ince "satır izi" benzeri ayraç.
- Fotoğraf yönü: doğal ışık, yakın doku (mermer tezgah, etin lifi, ustanın eli). Stok/yapay parlaklık yok.

---

## 8. Erişilebilirlik

- Kontrast AA+: krem üstünde bordo/ink metin oranları geçer; koyu üstünde krem metin.
- Odak halkaları görünür (brass outline). Dokunma hedefi ≥ 44px. Alt metinler, semantik HTML.

---

*Durum: ✅ Adım 4 KİLİTLİ. → Adım 5: Teknoloji & Mimari Kararı (TECH-STACK.md).*
