# SITEMAP.md — Deniz Et · Kasap Orhan

> Adım 3 çıktısı. Karar: **tek sayfa (long-scroll), mobil-öncelikli, iki dilli.**
> Gerekçe: yerel + turist trafiği telefonda geliyor; tek net hedef var (sipariş).
> Çok sayfa, kullanıcıyı aksiyondan uzaklaştırır. Hız ve netlik = "award-winning" hissi.

---

## 1. Yapı Kararı

- **Çekirdek: tek sayfa** (long-scroll), anchor navigasyonlu, akıcı scroll.
- **Blog ayrı rotalarda:** `/blog` + `/blog/[slug]` (EN: `/en/blog`...). Detay: **BLOG.md.**
- **İki dil:** `/` (TR) ve `/en` (EN). Header'da TR/EN geçişi.
- **Kalıcı dönüşüm:** sticky header'da WhatsApp + telefon; mobilde alt sabit CTA bar.
- Site genel olarak **statik + hafif hareketli**, premium ve **boşluklu** (bol beyaz alan).

---

## 2. Navigasyon (Header)

Sol: **logo**. Orta: Hikâye · Ürünler · Mangal · **Blog** · İletişim. Sağ: **TR/EN** + **WhatsApp (birincil buton)**.
Mobilde: logo + hamburger + sabit WhatsApp ikonu. Scroll'da header küçülür (sticky, condensed).

---

## 3. Bölüm Sırası (Akış)

| # | Bölüm | Amaç | Ana metin (CONTENT-STRATEGY) | CTA |
|---|-------|------|------------------------------|-----|
| 1 | **Hero** | 5 sn'de ikna + aksiyon | Başlık A + alt metin | WhatsApp'tan Sipariş Ver |
| 2 | **Güven şeridi** | Anında güven | `1980` · `40+ yıl` · `Ustanın eli` · `Ev yapımı sucuk` | — |
| 3 | **Hikâye** | Duygu + farklılaşma | 6.1 "Bir tezgah, kırk yıl, tek söz." + **3D karusel** | Ustaya Yaz |
| 4 | **Ürünler** | Ne var, netlik | 6.2 + **interaktif 3D et kâşifi** (10 parça) | Bunu Siparişe Ekle |
| 5 | **İmza Lezzetler** | Tek yere özgü değer | 6.3 ev yapımı sucuk + kuzu lokum | Siparişe Ekle |
| 6 | **Mangal & Davet** | Yüksek değerli hizmet | 6.4 "Sen sofrayı düşün." | Mangalını Hazırlatalım |
| 7 | **Nasıl Sipariş** | Sürtünmeyi sıfırla | 6.5 üç adım | WhatsApp'tan Yaz |
| 8 | **Sosyal Kanıt** | Instagram canlılığı/güven | Reel/foto galeri (@denizetfethiye) | Instagram'da Takip Et |
| 9 | **Konum & İletişim** | Offline'a köprü | 6.6 adres + harita + saatler | Yol Tarifi · Hemen Ara |
| 10 | **Footer** | Kapanış + tekrar aksiyon | Logo + slogan + hızlı linkler | WhatsApp |

---

## 4. Dönüşüm Yolu (Conversion Flow)

Her ekranda kullanıcının bir tık uzağında sipariş olmalı:

```
Hero CTA ─┐
Sticky header WhatsApp ─┤
Mobil alt sabit bar ─┼──► WhatsApp (önceden yazılmış mesaj: "Merhaba, sipariş vermek istiyorum")
Bölüm içi CTA'lar ─┤        veya tel: linki (0537 410 8842)
Footer CTA ─┘
```

- WhatsApp linki: `https://wa.me/90537XXXXXXX?text=...` (hazır mesaj şablonu ile).
- Telefon: `tel:+90537XXXXXXX` — mobilde tek dokunuş arama.

---

## 5. Anchor / URL Yapısı

`#hikaye` · `#urunler` · `#imza` · `#mangal` · `#siparis` · `#iletisim`
EN: `/en` altında aynı bölümler. (SEO slug detayları Adım'larda seo-optimizer ile netleşir.)

---

## 6. Bileşen Envanteri (Adım 8 için ön liste)

Header (sticky) · Hero · İstatistik şeridi · Hikâye bloğu · Ürün kart grid'i · İmza ürün
feature bloğu · Mangal hizmet bloğu · 3-adım stepper · Instagram galeri · Harita + iletişim ·
Footer · Mobil sabit CTA bar · TR/EN dil değiştirici · WhatsApp yüzen buton.

---

*Durum: ✅ Adım 3 KİLİTLİ (tek sayfa, sipariş odaklı akış). → Adım 4: Tasarım Sistemi.*
