# SKILLS-MCP.md — Deniz Et · Kasap Orhan

> Adım 6 çıktısı. Claude Code'a hangi skill'i ne için bağladığımız + hangi MCP'lerin
> gerektiği. Bu liste, Adım 9'daki nihai prompt'un "kullanılacak skill/MCP" bölümünü besler.

---

## 1. Skill → Görev Haritası

Senin `~/.claude/skills/` altındaki skill'ler, projede şu işleri üstlenir:

| Skill | Bu projede ne için | Aşama |
|-------|--------------------|-------|
| `frontend-design` | Genel estetik yön, anti-"AI slop", hero & kompozisyon | Tüm UI |
| `ui-design-system` | DESIGN-SYSTEM token'larını sisteme oturtma, tutarlılık | Kurulum + bileşenler |
| `ui-ux-pro-max` | Dönüşüm UX'i, mikro-etkileşim, CTA yerleşimi, hiyerarşi | Bileşen cilası |
| `tailwind-patterns` | Token'ların Tailwind config'e taşınması, util düzeni | Stil katmanı |
| `react-best-practices` | Bileşen mimarisi, hook'lar, render performansı | Kod yapısı |
| `senior-frontend` | Kod kalitesi, klasör düzeni, erişilebilirlik, tip güvenliği | Tüm kod |
| `mobile-design` | Mobil-öncelikli düzen, sabit alt CTA, dokunma hedefleri | Responsive |
| `seo-optimizer` | Metadata, JSON-LD LocalBusiness, sitemap, hreflang, yerel SEO | SEO katmanı |
| `3d-web-experience` | **Çekirdek:** interaktif et kâşifi + 3D hikâye karuseli (3D-FEATURE.md) | 3D modülleri |

**Aktivasyon sırası (Claude Code'da):**
`senior-frontend` + `react-best-practices` (iskelet) → `ui-design-system` + `tailwind-patterns`
(token/stil) → `frontend-design` + `ui-ux-pro-max` (görsel + UX) → `mobile-design` (responsive)
→ `seo-optimizer` (SEO/QA).

---

## 2. Gerekli MCP'ler

Claude Code'da projeye değer katacak MCP'ler (kendi makinende `claude mcp add` ile eklenir):

| MCP | Ne için | Öncelik |
|-----|---------|---------|
| **Playwright / tarayıcı MCP** | Görsel QA: responsive kontrol, ekran görüntüsü, akış testi, Lighthouse benzeri denetim | Yüksek |
| **Context7 (veya docs MCP)** | Güncel Next.js / Tailwind v4 / next-intl dokümanı — eski kalıplardan kaçınmak | Yüksek |
| Filesystem | Proje dosyalarını okuma/yazma | Yerleşik |
| **Vercel MCP** (varsa) | Deploy + önizleme URL'leri | Orta |
| Google Drive (bağlı) | Logo/fotoğraf varlıklarını çekme/saklama | Düşük/Opsiyonel |

**Not:** Bu MCP'ler senin Claude Code ortamında yapılandırılır; ben buradan onları bağlayamam.
**Eklemenin tam komutları ve doğrulama: SETUP.md.** Skill'ler `~/.claude/skills/` altında olduğu
için komut gerektirmez (otomatik keşif); MCP'ler `claude mcp add` ile eklenir + restart ister.
Adım 9 prompt'u hem skill'leri hem MCP'leri isimle çağırır ve başta doğrulatır.

---

## 3. Varlıklar (assets) kontrol listesi

- ✅ Logo (Instagram'dan alındı) — `public/logo.png` olarak konur.
- ⏳ Ürün/tezgah fotoğrafları — Instagram'dan (izinle) ya da çekim. Yüksek çözünürlük, doğal ışık.
- ⏳ WhatsApp numarası (wa.me formatı) — onayın gerekiyor.
- ⏳ Çalışma saatleri (schema + iletişim bölümü için).
- ⏳ **3D model** — dana/kuzu, 10 parçaya segment edilmiş (3D-FEATURE.md §C). En kritik 3D varlığı.

---

*Durum: ✅ Adım 6 KİLİTLİ. → Adım 7: PLAN.md (master plan).*
