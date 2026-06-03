# QA-CHECKLIST.md — Deniz Et · Kasap Orhan

> Adım 10 çıktısı. Lansman öncesi madde madde geçilecek kontrol listesi.

---

## 1. İçerik & Dil
- [ ] Tüm metinler content JSON'dan; hardcode metin yok.
- [ ] TR ve EN tam; eksik çeviri/anahtar yok.
- [ ] Hero başlığı doğru: "Kırk yıldır aynı el, aynı söz."
- [ ] Klişe yok; her bölüm CONTENT-STRATEGY tonunda.

## 2. Dönüşüm
- [ ] WhatsApp linki çalışır (wa.me + önceden yazılmış mesaj).
- [ ] Telefon tel: linki mobilde tek dokunuşla arar.
- [ ] Yüzen WhatsApp + mobil sabit CTA her ekranda görünür ve tıklanır.
- [ ] Bölüm içi CTA'lar doğru hedefe gider.

## 3. 3D İmza Özellik
- [ ] Dana/kuzu toggle çalışır; her birinde 10 parça.
- [ ] Parçaya tıklayınca kamera smooth zoom + panel açılır (yemek + pişirme).
- [ ] Reveal (b): deri kalkar, çiğ et görünür (dissolve) — pürüzsüz.
- [ ] Hikâye 3D karuseli sürükle/scroll/ok + klavye ile gezilir.
- [ ] 3D lazy mount (yalnız bölüm görününce); ilk yük etkilenmiyor.
- [ ] WebGL yok / mobil düşük cihaz → 2D fallback aynı içerikle çalışır.

## 4. Responsive & Hareket
- [ ] **Font: Bonny tek aile; 60/30/10 tretman uygulanmış** — %10 statement nadir ve dev.
- [ ] **Blog:** /blog + yazılar çalışır; çarpıcı arka plan + dar okuma ölçüsü; BlogPosting schema geçer.
- [ ] Bonny Türkçe karakterleri (ş/ğ/ı/İ/ç/ö/ü) doğru gösteriyor.
- [ ] 360px–1440px arası kırılma yok; tek elle gezinme.
- [ ] Dokunma hedefleri ≥44px.
- [ ] prefers-reduced-motion açıkken animasyonlar kapanır.

## 5. Performans
- [ ] Lighthouse Performance ≥95 (mobil + masaüstü).
- [ ] LCP < 2.0s (3D'siz); CLS ~0.
- [ ] Görseller next/image, doğru boyut, AVIF/WebP, lazy.
- [ ] 3D GLB + doku < ~3–4MB sıkıştırılmış.

## 6. SEO
- [ ] LocalBusiness/Butcher JSON-LD — Rich Results Test geçer.
- [ ] Metadata (TR/EN), Open Graph, OG görseli her dilde.
- [ ] sitemap.xml + robots.txt + hreflang + canonical doğru.
- [ ] Yerel anahtar kelimeler başlık/açıklama/içerikte doğal.

## 7. Erişilebilirlik
- [ ] Lighthouse Accessibility ≥95; kontrast AA+.
- [ ] Klavyeyle tüm etkileşimlere ulaşılır; görünür odak.
- [ ] Görsellerde alt; 3D parçalarda aria-label; semantik başlık hiyerarşisi.

## 8. Lansman
- [ ] Vercel deploy + özel alan adı + HTTPS.
- [ ] Analytics aktif.
- [ ] 404/hata durumları düzgün.
- [ ] Placeholder'lar (WhatsApp no, foto, 3D model) gerçeğiyle değişti.

---

## Açık veriler (lansmandan önce doldur)
- WhatsApp sipariş numarası (wa.me formatı)
- Çalışma saatleri
- Gerçek ürün/tezgah fotoğrafları
- Tripo AI dana + kuzu modelleri (Blender hazırlığı sonrası GLB)

---

*Durum: ✅ Adım 10 üretildi. 10/10 tamam — paket hazır.*
