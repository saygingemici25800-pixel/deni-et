# 3D-FEATURE.md — Deniz Et · İnteraktif 3D Et Kâşifi + 3D Hikâye Karuseli

> Sitenin imza ("award-winning") anı. İki 3D modül:
> (A) Hikâye bölümünde 3D karusel, (B) Ürünler bölümünde interaktif et-parçası kâşifi.
> Stack: Next.js + React Three Fiber (R3F) + drei + Motion. Performans kuralları §6.

---

## A. Hikâye — 3D Karusel

- 1980 → bugün akışını anlatan derinlikli karusel (coverflow/parallax).
- Kartlar: kuruluş, ustanın eli, imza sucuk, mangal kültürü, bugün.
- Etkileşim: sürükle/scroll/ok tuşları; yavaş otomatik dönüş (hover'da durur).
- Hafif 3D derinlik + perspektif; abartı yok. Klavye erişilebilir.

---

## B. Ürünler — İnteraktif 3D Et Kâşifi (ana özellik)

### B.1 Sahne
- **Orta plan (middle-shot)** duran hayvan. **Dana + kuzu, geçişli** — kullanıcı bir toggle ile
  ikisi arasında geçer (her birinin kendi 10 parçası + içerik seti). Varsayılan: dana.
- Yumuşak stüdyo ışığı, kömür zemin, hafif gölge.
- Boşta (idle): çok hafif nefes/sallanma. Sınırlı kullanıcı yörüngesi (orbit) — baş aşağı/ters dönüş yok.
- 10 **kasap parçası** bölgesi; hover'da et-kırmızısı ince outline/glow ile belirir.

### B.2 Tıklama Akışı
1. Bölgeye tıkla → kamera o parçaya **smooth tween** (~1.0–1.4s, yumuşak easing) + hafif yörünge.
2. Gövdenin kalanı hafif soluklaşır/desatüre olur; seçili parça vurgulanır.
3. Aynı sayfada **bilgi paneli** kayarak gelir: parça adı · uygun yemekler · pişirme tavsiyesi · küçük "WhatsApp'tan iste" CTA.
4. **Reveal davranışı** (seçilecek — §B.4): yerinde kalır / deri kalkar çiğ et görünür / dışarı gelip pişer.
5. Kapat → kamera orta plana döner.

### B.3 10 Parça (dana) + içerik iskeleti

| # | Parça | Uygun yemek | Pişirme |
|---|-------|-------------|---------|
| 1 | Boyun | Haşlama, sulu yemek, kıyma | Uzun · düşük ısı |
| 2 | Kürek / Kol | Güveç, rosto, kıyma | Yavaş pişirme |
| 3 | Antrikot | Izgara, steak | Yüksek ateş · kısa |
| 4 | Kontrfile | Izgara, steak | Yüksek ateş · dinlendir |
| 5 | Bonfile | Fileto, steak | Çok kısa · az pişmiş |
| 6 | Kaburga / Pirzola | Mangal, fırın | Orta · slow-cook |
| 7 | Döş | Haşlama, slow-cook | Uzun · sulu |
| 8 | But (Nuar/Tranç) | Rosto, biftek, döner | Orta |
| 9 | İncik | Fırın incik, haşlama | Çok uzun · düşük |
| 10 | Pançeta / Etek | Kavurma, fajita, kıyma | Orta-yüksek · ince dilim |

*(Kuzu seçilirse: boyun, kol, kaburga/pirzola, sırt/kotlet, but, incik, döş, bonfile, gerdan, kürek — aynı yapı.)*
Metinler `content/tr.json` & `en.json`'da; CONTENT-STRATEGY diline sadık (kısa, somut).

### B.4 Reveal davranışı — SEÇİLDİ: (b) deri kalkar, çiğ et görünür
- **(b) ✅ Seçildi:** parçaya yaklaşınca dış **deri/post katmanı** kalkar/erir, altından **çiğ et** çıkar.
- **Teknik (Tripo tek-mesh çıktısına uygun):** tam iç geometri yerine **dissolve (erime) shader + iki doku** —
  her parça bölgesinde dış "deri" dokusu bir maske ile erir, altındaki "çiğ et" dokusu görünür.
  (İstenirse ileride gerçek katmanlı geometriye yükseltilir.)
- (a) yerinde kalır ve (c) pişmiş hale döner: ileri faz seçenekleri olarak açık bırakıldı.

---

## C. Model Üretim Yolu — SEÇİLDİ: Tripo AI + Blender hazırlık

**Karar:** Temel modeller **Tripo AI** ile üretilecek (dana + kuzu). Tripo, görsel/metinden
hızlı bir GLB verir — ama **tek mesh, tek katman**. İstenen etkileşim için Tripo sonrası hazırlık şart:

**Pipeline:**
1. **Tripo AI** → dana ve kuzu için referans görsellerden (Instagram fotoğrafları iyi kaynak) GLB üret.
2. **Blender** →
   - Temizlik/retopo (gerekirse poligon azalt), ölçek/yön düzelt, merkeze al.
   - **10 parça bölgesi:** her kasap parçası için ayrı **UV zonu / material slot** ata (veya ayrı mesh).
   - Her parça merkezine kamera için **anchor (empty)** koy.
   - **Reveal (b) için iki doku:** dış "deri" + alttaki "çiğ et" doku setleri + dissolve maskesi.
3. **Optimize export:** Draco/Meshopt sıkıştırma, doku boyutlarını sınırla, GLB < ~3–4MB.
4. **R3F entegrasyonu:** anchors → kamera tween; raycast → parça seçimi; dissolve shader → deri kalkar.

> Tripo "modeli getirme" adımını çözer; **segmentasyon + deri/çiğ et katmanı** Blender işi olarak planlanır.
> Hızlı başlamak istenirse: ilk sürümde dissolve yerine basit "deri dokusu → çiğ et dokusu" geçişi,
> sonra olgunlaştırma.

---

## D. Mimari (R3F)

- 3D canvas **dynamic import + `ssr:false`**; yalnız bölüm görünür olunca mount (IntersectionObserver).
- Kamera tween: drei `CameraControls` / custom; bölge merkezleri modelde "empty/anchor" olarak işaretli.
- Raycast ile parça seçimi; seçili parça state → panel + materyal değişimi.
- glTF **Draco/Meshopt** sıkıştırma; mobilde düşük LOD; doku bütçesi sınırlı.
- Renkler DESIGN-SYSTEM paletinden (kömür sahne, et-kırmızısı vurgu, krem panel).

---

## E. Fallback & Erişilebilirlik

- **WebGL yok / düşük cihaz:** etiketli statik kasap-parça görseli (tıklanabilir 2D harita) + aynı içerik.
- **`prefers-reduced-motion`:** idle/otomatik hareket ve tween kapanır; tıklama anında geçiş.
- Klavye: parçalar liste olarak da gezilebilir (sekme + enter). Her parça `aria-label`.
- Mobil: model üstünde tıklama + altında parça listesi; reveal sade.

---

## F. Performans Bütçesi (3D dahil)

- 3D yalnız ürünler bölümünde, lazy. İlk sayfa yükünü etkilemez.
- Hedef: 3D'siz LCP < 2.0s korunur; 3D mount sonrası 60fps hedefi (mobilde 30+).
- Toplam glTF + doku < ~3–4MB (sıkıştırılmış); aksi halde MVP/2D fallback.

---

*Durum: ✅ KİLİTLİ — dana+kuzu (geçişli), Tripo AI + Blender, reveal (b) deri→çiğ et.
Build dökümü ve Code prompt buna göre yazıldı (BUILD-TASKS.md, CLAUDE-CODE-PROMPT.md).*
