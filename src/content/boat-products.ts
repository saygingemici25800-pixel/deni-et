// Kasap ürün verisi — iki dilli. Sipariş = WhatsApp (fiyat YOK). {/* TODO: gerçek foto + fiyat */}
// note alanı = parantez içi varyant/açıklama. image şimdilik undefined → zarif placeholder.

export type Locale = 'tr' | 'en';
export type Bi = {tr: string; en: string};

export type Category = {id: string; label: Bi};
export type BoatProduct = {
  id: string;
  name: Bi;
  category: string; // Category.id
  note?: Bi; // varyant/açıklama (parantez içi)
  unit?: Bi; // opsiyonel — çoğu kg; belirtilmezse gösterilmez
  image?: string; // varsa <Image>, yoksa zarif placeholder
  dryAged?: boolean; // kuru dinlendirilmiş ürünler
};

export const CATEGORIES: Category[] = [
  {id: 'kuzu', label: {tr: 'Kuzu', en: 'Lamb'}},
  {id: 'dana', label: {tr: 'Dana', en: 'Beef'}},
  {id: 'tavuk', label: {tr: 'Tavuk', en: 'Chicken'}},
  {id: 'mangal', label: {tr: 'Mangal & Kebap', en: 'Grill & Kebab'}},
  {id: 'sarkuteri', label: {tr: 'Şarküteri', en: 'Deli'}},
  {id: 'dryage', label: {tr: 'Dry Age', en: 'Dry Aged'}},
  {id: 'sakatat', label: {tr: 'Sakatat & Ekstra', en: 'Offal & Extras'}},
];

export const BOAT_PRODUCTS: BoatProduct[] = [
  // ---- KUZU / Lamb ----
  {id: 'kuzu-but', category: 'kuzu', name: {tr: 'Kuzu But', en: 'Lamb Leg'}},
  {id: 'kuzu-kol', category: 'kuzu', name: {tr: 'Kuzu Kol', en: 'Lamb Shoulder'}},
  {id: 'kuzu-gerdan', category: 'kuzu', name: {tr: 'Kuzu Gerdan', en: 'Lamb Neck'}},
  {id: 'kuzu-pirzola', category: 'kuzu', name: {tr: 'Kuzu Pirzola', en: 'Lamb Chops'}, note: {tr: 'Kalem / İstanbul', en: 'Pencil / Istanbul'}},
  {id: 'kuzu-kulbasti', category: 'kuzu', name: {tr: 'Kuzu Külbastı', en: 'Lamb Cutlet'}},
  {id: 'kuzu-sis', category: 'kuzu', name: {tr: 'Kuzu Şiş', en: 'Lamb Skewer'}},
  {id: 'kuzu-kaburga', category: 'kuzu', name: {tr: 'Kuzu Kaburga', en: 'Lamb Ribs'}, note: {tr: 'Kemikli / Kemiksiz (Çakır)', en: 'Bone-in / Boneless (Çakır)'}},
  {id: 'kuzu-kusleme', category: 'kuzu', name: {tr: 'Küşleme (Bonfile)', en: 'Lamb Tenderloin (Küşleme)'}, note: {tr: 'Şiş / Bütün', en: 'Skewer / Whole'}},
  {id: 'kuzu-beyti', category: 'kuzu', name: {tr: 'Kuzu Beyti', en: 'Lamb Beyti'}},
  {id: 'kuzu-lokum', category: 'kuzu', name: {tr: 'Kuzu Lokum', en: 'Lamb Lokum'}, note: {tr: 'Şiş / Cızbız / Yağlıkara', en: 'Skewer / Cızbız / Yağlıkara'}},
  {id: 'kuzu-incik', category: 'kuzu', name: {tr: 'Kuzu İncik', en: 'Lamb Shank'}},
  {id: 'kuzu-kavurma', category: 'kuzu', name: {tr: 'Kuzu Kavurma', en: 'Lamb Kavurma'}},
  {id: 'kuzu-kusbasi', category: 'kuzu', name: {tr: 'Kuzu Kuşbaşı', en: 'Lamb Cubes'}},
  {id: 'kuzu-kelebek', category: 'kuzu', name: {tr: 'Kuzu Kelebek', en: 'Lamb Butterfly'}},
  {id: 'kuzu-fajita', category: 'kuzu', name: {tr: 'Kuzu Fajita', en: 'Lamb Fajita'}},
  {id: 'kuzu-saslik', category: 'kuzu', name: {tr: 'Kuzu Şaşlık', en: 'Lamb Shashlik'}},
  {id: 'kuzu-biftek', category: 'kuzu', name: {tr: 'Kuzu Biftek', en: 'Lamb Steak'}},
  {id: 'kokorec', category: 'kuzu', name: {tr: 'Kokoreç', en: 'Kokoreç'}},
  {id: 'kuzu-ciger', category: 'kuzu', name: {tr: 'Kuzu Ciğer', en: 'Lamb Liver'}, note: {tr: 'Takım / Sade', en: 'Set / Plain'}},

  // ---- DANA / Beef ----
  {id: 'dana-kusbasi', category: 'dana', name: {tr: 'Dana Kuşbaşı', en: 'Beef Cubes'}},
  {id: 'dana-antrikot', category: 'dana', name: {tr: 'Dana Antrikot', en: 'Beef Ribeye'}, note: {tr: 'Standart / Wet age / Dry age', en: 'Standard / Wet-aged / Dry-aged'}, dryAged: true},
  {id: 'dana-bonfile', category: 'dana', name: {tr: 'Dana Bonfile', en: 'Beef Tenderloin'}, note: {tr: 'Standart / Jumbo / Lokum', en: 'Standard / Jumbo / Lokum'}},
  {id: 'dana-tbone', category: 'dana', name: {tr: 'T-Bone', en: 'T-Bone'}},
  {id: 'dana-rosto', category: 'dana', name: {tr: 'Dana Rosto', en: 'Beef Roast'}},
  {id: 'dana-pirzola-dallas', category: 'dana', name: {tr: 'Dana Pirzola (Dallas)', en: 'Beef Chop (Dallas)'}, note: {tr: 'Wet age / Dry age', en: 'Wet-aged / Dry-aged'}, dryAged: true},
  {id: 'dana-sis', category: 'dana', name: {tr: 'Dana Şiş', en: 'Beef Skewer'}, note: {tr: 'Biftekten', en: 'From steak'}},
  {id: 'dana-kavurma', category: 'dana', name: {tr: 'Dana Kavurma', en: 'Beef Kavurma'}, note: {tr: 'Standart / Antrikot', en: 'Standard / Ribeye'}},
  {id: 'dana-kiyma-koftelik', category: 'dana', name: {tr: 'Kıyma (Köftelik)', en: 'Ground Beef (for köfte)'}},
  {id: 'dana-kiyma-yemeklik', category: 'dana', name: {tr: 'Kıyma (Yemeklik)', en: 'Ground Beef (for cooking)'}},
  {id: 'dana-sucuk', category: 'dana', name: {tr: 'Dana Sucuk', en: 'Beef Sucuk'}},
  {id: 'dana-marine-antrikot', category: 'dana', name: {tr: 'Marine Antrikot', en: 'Marinated Ribeye'}, note: {tr: 'Soğanlı / Sarımsaklı', en: 'Onion / Garlic'}},
  {id: 'dana-saslik', category: 'dana', name: {tr: 'Dana Şaşlık', en: 'Beef Shashlik'}},
  {id: 'dana-ossobucco', category: 'dana', name: {tr: 'Ossobucco', en: 'Ossobuco'}},
  {id: 'dana-ciger', category: 'dana', name: {tr: 'Dana Ciğer', en: 'Beef Liver'}, note: {tr: 'Yaprak / Arnavut (Küp)', en: 'Sliced / Albanian (Diced)'}},
  {id: 'dana-kofte', category: 'dana', name: {tr: 'Köfte', en: 'Köfte'}, note: {tr: 'Ev (Soğanlı Maydanozlu) / Kasap (Sade) / Izgara', en: 'Homestyle (Onion-Parsley) / Butcher (Plain) / Grill'}},
  {id: 'dana-poc', category: 'dana', name: {tr: 'Pöç', en: 'Pöç (Rump)'}},

  // ---- TAVUK / Chicken ----
  {id: 'tavuk-kanat', category: 'tavuk', name: {tr: 'Tavuk Kanat', en: 'Chicken Wings'}},
  {id: 'tavuk-pirzola', category: 'tavuk', name: {tr: 'Tavuk Pirzola', en: 'Chicken Chop'}},
  {id: 'tavuk-baget', category: 'tavuk', name: {tr: 'Tavuk Baget', en: 'Chicken Drumstick'}},
  {id: 'tavuk-bonfile', category: 'tavuk', name: {tr: 'Tavuk Bonfile', en: 'Chicken Tenderloin'}},
  {id: 'tavuk-kalcali-but', category: 'tavuk', name: {tr: 'Kalçalı But', en: 'Chicken Leg Quarter'}},
  {id: 'tavuk-kelebek', category: 'tavuk', name: {tr: 'Tavuk Kelebek', en: 'Chicken Butterfly'}},
  {id: 'tavuk-butun', category: 'tavuk', name: {tr: 'Bütün Tavuk', en: 'Whole Chicken'}},
  {id: 'tavuk-sis', category: 'tavuk', name: {tr: 'Tavuk Şiş', en: 'Chicken Skewer'}},
  {id: 'tavuk-izgara-tava', category: 'tavuk', name: {tr: 'Izgara Tava', en: 'Grill-Pan Chicken'}},
  {id: 'koy-tavugu', category: 'tavuk', name: {tr: 'Köy Tavuğu', en: 'Free-range Chicken'}},
  {id: 'citir-tavuk', category: 'tavuk', name: {tr: 'Çıtır Tavuk Ürünleri', en: 'Crispy Chicken Products'}},
  {id: 'tavuk-soslu', category: 'tavuk', name: {tr: 'İsteğe Göre Soslu', en: 'Sauced to Order'}},

  // ---- MANGAL & KEBAP / Grill & Kebab ----
  {id: 'adana-kebab', category: 'mangal', name: {tr: 'Adana Kebab', en: 'Adana Kebab'}},
  {id: 'beyti-sarma', category: 'mangal', name: {tr: 'Beyti Sarma', en: 'Beyti Wrap'}},
  {id: 'hamburger', category: 'mangal', name: {tr: 'Hamburger', en: 'Hamburger'}, note: {tr: '200 gr', en: '200 g'}},
  {id: 'urfa-kebab', category: 'mangal', name: {tr: 'Urfa Kebab', en: 'Urfa Kebab'}},
  {id: 'patlican-kebab', category: 'mangal', name: {tr: 'Patlıcan Kebab', en: 'Aubergine Kebab'}},
  {id: 'tandir-kelle', category: 'mangal', name: {tr: 'Tandır Kelle', en: 'Tandır (Head)'}},

  // ---- ŞARKÜTERİ / Deli (yalnız 3) ----
  {id: 'sucuk', category: 'sarkuteri', name: {tr: 'Sucuk', en: 'Sucuk'}},
  {id: 'pastirma', category: 'sarkuteri', name: {tr: 'Pastırma', en: 'Pastırma'}},
  {id: 'kuru-et', category: 'sarkuteri', name: {tr: 'Kuru Et', en: 'Cured Beef'}},

  // ---- DRY AGE / Dry Aged ----
  {id: 'dry-age-urunler', category: 'dryage', name: {tr: 'Dry Age Ürünler', en: 'Dry-Aged Selection'}, note: {tr: 'Dana antrikot & pirzola', en: 'Beef ribeye & chops'}, dryAged: true},

  // ---- SAKATAT & EKSTRA / Offal & Extras ----
  {id: 'iskembe', category: 'sakatat', name: {tr: 'İşkembe', en: 'Tripe'}, note: {tr: 'Dana / Kuzu', en: 'Beef / Lamb'}},
  {id: 'ayak-paca', category: 'sakatat', name: {tr: 'Ayak Paça', en: 'Trotters'}, note: {tr: 'Dana / Kuzu', en: 'Beef / Lamb'}},
  {id: 'kuzu-bobrek', category: 'sakatat', name: {tr: 'Kuzu Böbrek', en: 'Lamb Kidney'}},
  {id: 'kuyruk-yagi', category: 'sakatat', name: {tr: 'Kuyruk Yağı', en: 'Tail Fat'}},
];
