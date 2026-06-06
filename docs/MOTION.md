# MOTION.md — Deniz Et · Hareket & Etkileşim Katmanı

> Build in Amsterdam ilkeleri uyarlandı (klon değil). DOZ: **abartısız premium + 1-2 imza anı.**
> Uygulama yeri: **Faz 4 (Motion pass)** — bölümler CSS ile bitince TEK seferde tutarlı katman.
> Kural: GPU-ucuz (transform/opacity), lazy, `prefers-reduced-motion` tam destek, Lighthouse 95+ korunur.

---

## 1. Felsefe
Biz ajans portföyü değil, 40 yıllık kasabız. Hareket **güveni ve sıcaklığı bozmadan** premium his verir;
gösteriş değil, zarafet. Dönüşüm (WhatsApp) her an net ve hızlı kalır. "Az ama kusursuz."

## 2. Taban katman (her yerde, sessiz)
- **Yumuşak inertia scroll (Lenis):** kadifemsi kaydırma. Hafif; reduced-motion'da kapanır.
- **Scroll reveal:** bölüm/öğe girişlerinde 12–16px + fade, stagger; cubic-bezier(.2,.6,.2,1), ~500ms.
- **İnce paralaks:** hero köz objesi + bölüm görsellerinde çok hafif (≤%6 kayma).
- **Hover mikro-etkileşim:** buton 2px yukarı + gölge; görselde yavaş zoom (1.04); link hairline underline.
- **"Sürekli hareket" (çok hafif):** hero köz parıltısı + kıvılcım twinkle (zaten var).

## 3. İmza an #1 — Hero kinetik statement (Bonny variable)
- Bonny **variable** ekseni kullanılır: hero tagline/statement açılırken ağırlık **Thin → Bold** akışıyla
  yerine oturur (ya da scroll'a hafif bağlı weight oynaması). "DENİZ" köz dokusu yavaş parlar.
- Markaya özgü, tek ve güçlü; %10 statement katmanıyla örtüşür. Bir kez, hero'da.

## 4. İmza an #2 — Tek scroll-scrub vurgu
- Sayfada **bir** yerde (öneri: Mangal "Ateş aceleye gelmez" hissi ya da İmza Lezzetler büyük satırı)
  scroll'a bağlı bir reveal: dev Bonny satır, kömür zeminde ağırlık/clip ile yazılır gibi belirir.
- Blog geçişinde (/blog → yazı) **kömür wipe + Bonny kelime** sayfa geçişi (premium, kısa ~500ms).
- (İkisinden hangisi daha çok katarsa o; ikisi birden değil — "1-2 imza" kuralı.)

## 5. Sınırlı/dikkatli
- **Magnetic + custom cursor:** YALNIZ birincil WhatsApp CTA (magnetic) ve et kâşifi üstünde küçük
  cursor aksanı. Site geneline custom cursor YOK (mobil/usability). Touch'ta devre dışı.
- **Yatay scroll / pinned bölüm:** tam sayfa yatay YOK; lateral hareket ihtiyacını Hikâye karuseli karşılar.
- Marquee/kinetik tip: en fazla bir küçük yerde; sıradanlaşmasın.

## 6. Teknoloji (Faz 4'te eklenir)
- **Lenis** (smooth scroll) + **Motion / framer-motion** (reveal, stagger, layout).
- Scroll-scrub imza an için gerekirse **GSAP ScrollTrigger** (tek bölüm; aksi halde Motion yeter).
- three/r3f hâlâ yalnız 3D fazında. Motion kütüphaneleri yalnız gerektiği yerde import (bundle şişmesin).

## 7. Erişilebilirlik & performans
- `prefers-reduced-motion: reduce` → inertia scroll, paralaks, kinetik tip, scrub, wipe KAPANIR;
  içerik anında ve tam görünür. Hiçbir bilgi yalnız harekete bağlı değil.
- Yalnız transform/opacity animasyonu; layout-tetikleyen animasyon yok. will-change ölçülü.
- LCP/CLS korunur; motion JS lazy. Hedef Lighthouse ≥95 sabit.

---

*Durum: Hareket dozu KİLİTLİ (abartısız premium + 1-2 imza). Faz 4'te uygulanır.
TECH-STACK/DESIGN-SYSTEM/BUILD-TASKS/CLAUDE-CODE-PROMPT güncellendi.*
