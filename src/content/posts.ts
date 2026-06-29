// Blog içerik kaynağı — "Tezgah Notları" (BLOG.md). Hafif: salt TS veri, MDX/CMS yok.
// İki dil paralel; aynı slug TR/EN sayfayı eşler. UI etiketleri content/<locale>.json'da (blog.*).

export type Locale = 'tr' | 'en' | 'ru';

// Blog metni yalnız tr/en'de var; ru içeriği henüz yok → ru, içerikte tr'ye düşer (UI ru kalır).
type ContentLocale = 'tr' | 'en';
const contentLocale = (l: Locale): ContentLocale => (l === 'ru' ? 'tr' : l);

// Gövde bloğu: düz paragraf ya da dev Bonny pull-quote (BLOG.md §3).
export type PostBlock = {type: 'p'; text: string} | {type: 'quote'; text: string};

// Placeholder kapak teması — ton (gradyan) + motif (SVG). Gerçek foto gelene dek.
export type PostCoverSpec = {tone: 'char' | 'bordo' | 'cream'; motif: 'cleaver' | 'ember' | 'smoke'};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  statement: string; // çarpıcı üst alan başlığı (Bonny statement %10)
  date: string; // ISO "YYYY-MM-DD"
  readingMinutes: number;
  hook?: string; // kısa çarpıcı soru/vaat — editoryal hook (öne çıkar)
  category?: string; // etiket: "Tezgah Notları", "Pişirme", "Kumanya"...
  cover?: PostCoverSpec; // placeholder kapak teması (yoksa META'dan türetilir)
  draft?: boolean; // taslak: kısa gövde, listede excerpt ile durur
  body: PostBlock[];
};

const tr: Post[] = [
  {
    slug: 'etini-tani-dananin-parcalari',
    title: 'Etini tanı: dananın 10 parçası ve hangisi neye yakışır',
    excerpt:
      'Dana tek bir et değil. Sırtından inciğine her parçanın kendi dokusu, kendi işi var. Doğru parçayı seçmek, yemeğin yarısını pişmeden bitirmektir.',
    statement: 'Her parçanın bir işi var.',
    date: '2026-06-04',
    readingMinutes: 5,
    body: [
      {
        type: 'p',
        text: 'Dana tek bir et değildir; sırtından inciğine her parçanın kendi dokusu, kendi yağı, kendi işi vardır. Hayvan ne kadar çok çalıştırdıysa o kası, et o kadar sert ama lezzetli olur. Bunu bilmek, tezgahta doğru soruyu sormanı sağlar.',
      },
      {
        type: 'p',
        text: 'Sırt bölgesi en az çalışan kaslardır, o yüzden en yumuşağı. Antrikot ve kontrfile ızgaranın, steak’in yeridir: yüksek ateş, kısa süre, sonra dinlendir. Bonfile en yağsız ve en narin parçadır; çok kısa pişer, bir saniye fazlası onu kurutur.',
      },
      {
        type: 'p',
        text: 'Kaburga ve pirzola kemikli, sabırlı parçalardır. Mangalı ve fırını sever; orta ateşte, acele etmeden. Kemik, etin tadını içine çeker ve geri verir — bu yüzden kemikli parça her zaman daha lezzetlidir.',
      },
      {
        type: 'p',
        text: 'But — nuar, tranç, kontrnuar — rostonun, bifteğin ve dönerin parçasıdır. Az yağlı, lifi belirgin. Orta pişirme ve ince dilim onu zarif yapar; kalın kesip aceleye getirirsen kuru kalır.',
      },
      {
        type: 'p',
        text: 'Boyun, incik ve döş çok çalışan kaslardır: önce serttir, ama düşük ısıda uzun pişince jelatinleşir, çatalla dağılır. Sulu yemeğin, haşlamanın, fırın inciğin altın parçaları bunlardır. Sabır ister, sabrı fazlasıyla öder.',
      },
      {
        type: 'quote',
        text: 'Ucuz parça yoktur; yanlış pişen parça vardır.',
      },
      {
        type: 'p',
        text: 'Ne alacağını bilmek, kime soracağını bilmekle başlar. Tezgaha geldiğinde önce ne pişireceğini söyle; parçayı birlikte seçelim. Gerisini etin kendisi anlatır.',
      },
    ],
  },
  {
    slug: 'mangalda-kusursuz-et',
    title: 'Mangalda kusursuz et: ateş, dinlendirme ve üç hata',
    excerpt:
      'Mangalın sırrı ette değil, sabırda. Çoğu kişi hep aynı üç yerde yanılır: eti soğuk koyar, sık çevirir, dinlendirmeden keser.',
    statement: 'Ateş aceleye gelmez.',
    date: '2026-05-28',
    readingMinutes: 4,
    body: [
      {
        type: 'p',
        text: 'Mangalın sırrı ette değil, sabırdadır. İyi bir akşamı kötü yapan üç hata hep aynı yerde toplanır: eti soğuk koymak, sık çevirmek, dinlendirmeden kesmek. Üçü de acelenin işidir.',
      },
      {
        type: 'p',
        text: 'Ateş. Köz olmadan et koyma. Alev pişirmez, kurutur; dışı kararır, içi çiğ kalır. Avucunu ızgaranın on santim üstünde üç saniye tutabiliyorsan ateş hazırdır. Köz tek renk, küllenmiş ve sakin yanmalı.',
      },
      {
        type: 'p',
        text: 'Çevirme. Eti ızgaraya koyar koymaz dürtme. Bir yüz mühürlenip kendiliğinden ızgaradan ayrılana kadar bekle; o ince kabuk suyu içeride tutar. Çoğu parça için tek çevirme yeter.',
      },
      {
        type: 'p',
        text: 'Dinlendirme. Ateşten alınca beş dakika dokunma. Pişerken yüzeye kaçan su, dinlenirken liflere geri döner. Sıcak ama acele kesilen et suyunu tabağa bırakır; beklemiş et ağıza.',
      },
      {
        type: 'quote',
        text: 'Doğru parça yarı iştir: antrikot ve pirzola mangalın yıldızıdır.',
      },
      {
        type: 'p',
        text: 'Gerisi senin elinde: tuzu erken at, közü sabırla bekle, bıçağı son anda kullan. Bu üç adımı bir kez oturttuğunda mangal bir daha asla kumar olmaz.',
      },
    ],
  },
  {
    slug: 'ev-yapimi-sucuk',
    title: 'Ev yapımı sucuk neden farklı: baharat, sabır, zaman',
    excerpt:
      'Marketten alınan sucukla tezgahta yapılanın farkı tek kelimede: zaman. Baharatın oturması, etin dinlenmesi acele kaldırmaz.',
    statement: 'Baharat bizden, sabır senden.',
    date: '2026-05-20',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'Bu yazı hazırlanıyor. Ev yapımı sucuğun farkını — baharat dengesi, dinlenme süresi ve doğru et oranı — yakında burada, ustanın ağzından anlatacağız.',
      },
    ],
  },
  {
    slug: 'taze-et-nasil-anlasilir',
    title: 'Taze et nasıl anlaşılır: renk, koku, doku rehberi',
    excerpt:
      'Taze eti gözle, burunla ve parmakla tanırsın. Üç basit işaret seni hiç yanıltmaz — tezgahta neye bakacağını bilmek yeter.',
    statement: 'Göz, burun, parmak.',
    date: '2026-05-12',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'Bu yazı hazırlanıyor. Rengin canlılığı, kokunun temizliği ve dokunun direnci — taze eti anlamanın üç işaretini yakında adım adım paylaşacağız.',
      },
    ],
  },
  {
    slug: 'kuzu-lokum',
    title: 'Kuzu lokum: adındaki incelik nereden gelir',
    excerpt:
      'Adı gibi ağızda dağılan bir parça. Kuzu lokumun inceliği seçimde, kesimde ve pişirmedeki ölçüde saklı.',
    statement: 'Adı gibi: ağızda dağılır.',
    date: '2026-05-05',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'Bu yazı hazırlanıyor. Kuzu lokumun hangi parçadan çıktığını, neden bu kadar narin olduğunu ve nasıl pişirilmesi gerektiğini yakında anlatacağız.',
      },
    ],
  },
  {
    slug: 'eti-dinlendirmek',
    title: 'Eti dinlendirmek neden lezzeti ikiye katlar',
    excerpt:
      'Beş dakikalık sabır, etin suyunu tabakta değil ağızda bırakır. Dinlendirmek pişirmenin değil, lezzetin son adımıdır.',
    statement: 'Beş dakika her şeyi değiştirir.',
    date: '2026-04-28',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'Bu yazı hazırlanıyor. Dinlendirmenin liflerde ne yaptığını ve hangi parçanın ne kadar beklemesi gerektiğini yakında detaylandıracağız.',
      },
    ],
  },
];

const en: Post[] = [
  {
    slug: 'etini-tani-dananin-parcalari',
    title: 'Know your beef: the 10 cuts and what each one is for',
    excerpt:
      'Beef is not one meat. From loin to shank, every cut has its own texture and its own job. Choosing the right cut is half the cooking, done before the fire.',
    statement: 'Every cut has a job.',
    date: '2026-06-04',
    readingMinutes: 5,
    body: [
      {
        type: 'p',
        text: 'Beef is not a single meat; from the loin to the shank, every cut has its own texture, its own fat, its own job. The harder the animal worked a muscle, the tougher — and the more flavourful — that cut. Knowing this lets you ask the right question at the counter.',
      },
      {
        type: 'p',
        text: 'The loin works least, so it is the most tender. Ribeye and striploin belong on the grill and in the steak pan: high heat, short time, then rest. Tenderloin is the leanest and most delicate of all; it cooks in moments, and one second too long dries it out.',
      },
      {
        type: 'p',
        text: 'Ribs and chops are cuts on the bone, cuts of patience. They love the barbecue and the oven, at medium heat, unhurried. Bone draws in the flavour and gives it back — which is why a cut on the bone is always tastier.',
      },
      {
        type: 'p',
        text: 'The round — topside, silverside — is the cut for roasts, steaks and döner. Lean, with a clear grain. Medium cooking and thin slicing make it elegant; cut it thick and rush it, and it turns dry.',
      },
      {
        type: 'p',
        text: 'Neck, shank and brisket are hard-working muscles: tough at first, but cooked long and low they turn to gelatin and fall apart at the fork. These are the gold of stews, braises and slow roasts. They ask for patience, and they repay it many times over.',
      },
      {
        type: 'quote',
        text: 'There are no cheap cuts; only cuts cooked the wrong way.',
      },
      {
        type: 'p',
        text: 'Knowing what to buy starts with knowing whom to ask. When you come to the counter, tell us what you’ll cook first; we’ll choose the cut together. The meat itself tells the rest.',
      },
    ],
  },
  {
    slug: 'mangalda-kusursuz-et',
    title: 'Perfect meat on the grill: fire, resting and three mistakes',
    excerpt:
      'The secret of the grill is not in the meat but in patience. Most people slip in the same three places: meat too cold, turned too often, cut without resting.',
    statement: 'Fire won’t be rushed.',
    date: '2026-05-28',
    readingMinutes: 4,
    body: [
      {
        type: 'p',
        text: 'The secret of the grill is not in the meat but in patience. The three mistakes that ruin a good evening always gather in the same place: putting the meat on cold, turning it too often, cutting it without resting. All three are the work of haste.',
      },
      {
        type: 'p',
        text: 'Fire. Never lay meat on without embers. Flame doesn’t cook, it dries; the outside chars while the inside stays raw. If you can hold your palm ten centimetres above the grill for three seconds, the fire is ready. The embers should glow one even colour, ashed over and calm.',
      },
      {
        type: 'p',
        text: 'Turning. Don’t poke the meat the moment it touches the grill. Wait until one face has seared and lifts away on its own; that thin crust keeps the juices in. For most cuts, a single turn is enough.',
      },
      {
        type: 'p',
        text: 'Resting. Once it’s off the fire, don’t touch it for five minutes. The juices pushed to the surface while cooking flow back into the fibres as it rests. Hot meat cut in a hurry leaves its juice on the plate; rested meat leaves it on the tongue.',
      },
      {
        type: 'quote',
        text: 'The right cut is half the work: ribeye and chops are the stars of the grill.',
      },
      {
        type: 'p',
        text: 'The rest is up to you: salt early, wait on the embers, reach for the knife last. Once you settle these three steps, the grill is never a gamble again.',
      },
    ],
  },
  {
    slug: 'ev-yapimi-sucuk',
    title: 'Why homemade sucuk is different: spice, patience, time',
    excerpt:
      'The difference between shop-bought sucuk and the kind made at the counter comes down to one word: time. Spice settling and meat resting take no shortcuts.',
    statement: 'Our spice, your patience.',
    date: '2026-05-20',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'This post is in the works. We’ll soon share — in the master’s own words — what sets homemade sucuk apart: the balance of spice, the resting time and the right ratio of meat.',
      },
    ],
  },
  {
    slug: 'taze-et-nasil-anlasilir',
    title: 'How to tell fresh meat: a guide to colour, smell and texture',
    excerpt:
      'You know fresh meat by eye, by nose and by finger. Three simple signs never mislead you — you just need to know what to look for at the counter.',
    statement: 'Eye, nose, finger.',
    date: '2026-05-12',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'This post is in the works. We’ll soon walk through the three signs of fresh meat step by step: the vividness of colour, the cleanness of smell and the spring of the texture.',
      },
    ],
  },
  {
    slug: 'kuzu-lokum',
    title: 'Lamb delight: where the finesse in the name comes from',
    excerpt:
      'A cut that melts on the tongue, just like its name. The finesse of lamb delight lies in the choosing, the cutting and the measure in the cooking.',
    statement: 'Like its name: it melts.',
    date: '2026-05-05',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'This post is in the works. We’ll soon explain which cut lamb delight comes from, why it is so tender and how it should be cooked.',
      },
    ],
  },
  {
    slug: 'eti-dinlendirmek',
    title: 'Why resting meat doubles the flavour',
    excerpt:
      'Five minutes of patience keep the juices on your tongue, not on the plate. Resting is the last step not of cooking, but of flavour.',
    statement: 'Five minutes change everything.',
    date: '2026-04-28',
    readingMinutes: 3,
    draft: true,
    body: [
      {
        type: 'p',
        text: 'This post is in the works. We’ll soon detail what resting does inside the fibres, and how long each cut should wait.',
      },
    ],
  },
];

const POSTS: Record<ContentLocale, Post[]> = {tr, en};

// Editoryal placeholder meta — hook/kategori (iki dil) + kapak teması. Postta yoksa doldurulur.
// {/* TODO: gerçek kapak fotoğrafları + içerik */}
type Bi = {tr: string; en: string};
const META: Record<string, {hook: Bi; category: Bi; cover: PostCoverSpec}> = {
  'etini-tani-dananin-parcalari': {
    hook: {tr: 'Hangi parça neye yakışır?', en: 'Which cut is for what?'},
    category: {tr: 'Tezgah Notları', en: 'Counter Notes'},
    cover: {tone: 'char', motif: 'cleaver'},
  },
  'mangalda-kusursuz-et': {
    hook: {tr: 'Mangalda et neden sertleşir?', en: 'Why does grilled meat turn tough?'},
    category: {tr: 'Pişirme', en: 'Cooking'},
    cover: {tone: 'bordo', motif: 'ember'},
  },
  'ev-yapimi-sucuk': {
    hook: {tr: 'Ev sucuğu neden bekler?', en: 'Why does homemade sucuk wait?'},
    category: {tr: 'Şarküteri', en: 'Deli'},
    cover: {tone: 'bordo', motif: 'smoke'},
  },
  'taze-et-nasil-anlasilir': {
    hook: {tr: 'Taze eti nasıl anlarsın?', en: 'How do you spot fresh meat?'},
    category: {tr: 'Tezgah Notları', en: 'Counter Notes'},
    cover: {tone: 'cream', motif: 'cleaver'},
  },
  'kuzu-lokum': {
    hook: {tr: 'Adı neden “lokum”?', en: 'Why is it called “delight”?'},
    category: {tr: 'Kumanya', en: 'Provisions'},
    cover: {tone: 'char', motif: 'ember'},
  },
  'eti-dinlendirmek': {
    hook: {tr: 'Beş dakika neyi değiştirir?', en: 'What do five minutes change?'},
    category: {tr: 'Pişirme', en: 'Cooking'},
    cover: {tone: 'bordo', motif: 'smoke'},
  },
};

function decorate(locale: Locale, p: Post): Post {
  const m = META[p.slug];
  if (!m) return p;
  return {
    ...p,
    hook: p.hook ?? m.hook[contentLocale(locale)],
    category: p.category ?? m.category[contentLocale(locale)],
    cover: p.cover ?? m.cover,
  };
}

// Tarihe göre yeni→eski. Taslaklar da listede durur (excerpt ile).
export function getPosts(locale: Locale): Post[] {
  return [...POSTS[contentLocale(locale)]].sort((a, b) => (a.date < b.date ? 1 : -1)).map((p) => decorate(locale, p));
}

export function getPost(locale: Locale, slug: string): Post | undefined {
  const found = POSTS[contentLocale(locale)].find((p) => p.slug === slug);
  return found ? decorate(locale, found) : undefined;
}

// Tüm slug'lar (statik üretim için; iki dil aynı slug kümesini paylaşır).
export function getAllSlugs(): string[] {
  return POSTS.tr.map((p) => p.slug);
}
