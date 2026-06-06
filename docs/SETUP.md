# SETUP.md — Claude Code'a Geçmeden ÖNCE Yapılacaklar

> ⚠️ Koda başlamadan bu listeyi uygula. Skill'ler ve MCP'ler FARKLI şekilde bağlanır (aşağıda).
> Komut sözdizimi Claude Code dökümanına göre (code.claude.com/docs/en/mcp).

---

## 1. Dosyaları yerleştir
- [ ] Planlama `.md`'lerini repo'da `docs/` altına koy: PROJECT, CONTENT-STRATEGY, SITEMAP,
      DESIGN-SYSTEM, TECH-STACK, SKILLS-MCP, PLAN, 3D-FEATURE, BUILD-TASKS, QA-CHECKLIST, SETUP.
- [ ] Logoyu `assets/logo.png` olarak koy.

---

## 2. SKILL'ler — komut GEREKMEZ (otomatik keşif)

Senin skill'lerin zaten `~/.claude/skills/<isim>/SKILL.md` altında → Claude Code bunları
kendiliğinden keşfeder. "Bağlama" komutu yok; sadece **orada olduklarını doğrula.**

Kullanılacaklar (prompt bunları isimle çağırıyor):
- [ ] `frontend-design`  [ ] `ui-design-system`  [ ] `ui-ux-pro-max`  [ ] `tailwind-patterns`
- [ ] `react-best-practices`  [ ] `senior-frontend`  [ ] `mobile-design`  [ ] `seo-optimizer`
- [ ] `3d-web-experience`  ← bu projede AKTİF (3D imza özellik)

**Doğrula:** Claude Code'da `/` yazıp skill listesine bak, ya da terminalde:
```bash
ls ~/.claude/skills/
```
Eksik olan varsa ilgili `SKILL.md`'yi o klasöre koy. (Proje'ye özel istersen: `.claude/skills/`.)

---

## 3. MCP'ler — komutla eklenir

Terminalde proje klasörünün içinde çalıştır (proje kapsamı → repo ile birlikte yaşar):

```bash
# 1) Tarayıcı/görsel QA — Playwright MCP (responsive + ekran görüntüsü + akış testi)
claude mcp add --scope project playwright -- npx -y @playwright/mcp@latest

# 2) Güncel doküman — Context7 MCP (Next.js / Tailwind v4 / next-intl / R3F güncel kalıplar)
claude mcp add --scope project context7 -- npx -y @upstash/context7-mcp@latest
```

> Not: Context7 son dönemde API anahtarı isteyebilir — bağlanmazsa kendi sayfasındaki
> güncel komutu/anahtarı kontrol et. Playwright MCP ilk çalıştırmada tarayıcı indirebilir.

**Yönet & doğrula:**
```bash
claude mcp list          # bağlı sunucular + durum
claude mcp get playwright
```
- [ ] Ekledikten sonra **Claude Code'u yeniden başlat** (değişiklikler restart'ta aktif olur).
- [ ] `claude mcp list` ikisini de "connected" gösteriyor.

**Opsiyonel:** Vercel MCP (deploy) — varsa ekle. Google Drive (varlık çekme) — opsiyonel.

---

## 4. Güvenlik notu
Dışarıdan içerik çeken MCP'ler (web/docs) prompt-injection riski taşır; yalnız güvendiğin
sunucuları bağla. Playwright ve Context7 yaygın/bilinen araçlardır.

---

## 5. Pre-flight (başlamadan son kontrol)
- [ ] `docs/` + `assets/logo.png` yerinde.
- [ ] 9 skill mevcut (`ls ~/.claude/skills/`), `3d-web-experience` dahil.
- [ ] `claude mcp list` → playwright + context7 connected.
- [ ] Claude Code yeniden başlatıldı.
- [ ] CLAUDE-CODE-PROMPT.md içindeki blok kopyalandı.

Hepsi ✅ ise prompt'u yapıştır ve Faz 0'dan başla.

---

*Bu dosya, "skilleri/MCP'leri bağlamayı unutma" notunun kalıcı hali.*
