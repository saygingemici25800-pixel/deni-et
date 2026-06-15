// Tekne kumanya ürün verisi — iki dilli, PLACEHOLDER. Sipariş = WhatsApp (sepet/fiyat yok).
// TODO: gerçek ürünler + fiyat + görseller (image alanı şimdilik undefined).

export type Locale = 'tr' | 'en';
export type Bi = {tr: string; en: string};

export type Category = {id: string; label: Bi};
export type BoatProduct = {
  id: string;
  name: Bi;
  category: string; // Category.id
  unit: Bi;
  note?: Bi;
  image?: string; // varsa <Image>, yoksa zarif placeholder
};

export const CATEGORIES: Category[] = [
  {id: 'kirmizi', label: {tr: 'Kırmızı Et', en: 'Red Meat'}},
  {id: 'tavuk', label: {tr: 'Tavuk & Beyaz Et', en: 'Poultry & White'}},
  {id: 'sarkuteri', label: {tr: 'Şarküteri', en: 'Deli'}},
  {id: 'mangal', label: {tr: 'Mangal & Hazır', en: 'Grill & Ready'}},
  {id: 'kahvalti', label: {tr: 'Kahvaltılık', en: 'Breakfast'}},
  {id: 'ekstra', label: {tr: 'Ekstra', en: 'Extras'}},
];

const KG: Bi = {tr: 'kg', en: 'kg'};
const ADET: Bi = {tr: 'adet', en: 'each'};
const PAKET: Bi = {tr: 'paket', en: 'pack'};

export const BOAT_PRODUCTS: BoatProduct[] = [
  // ---- Kırmızı Et ----
  {id: 'dana-antrikot', category: 'kirmizi', unit: KG, name: {tr: 'Dana Antrikot', en: 'Beef Ribeye'}, note: {tr: 'Mermerli, mangalın yıldızı.', en: 'Marbled, the grill star.'}},
  {id: 'dana-kontrfile', category: 'kirmizi', unit: KG, name: {tr: 'Dana Kontrfile', en: 'Beef Striploin'}, note: {tr: 'Steak için ideal, dengeli.', en: 'Ideal for steak, balanced.'}},
  {id: 'dana-bonfile', category: 'kirmizi', unit: KG, name: {tr: 'Dana Bonfile', en: 'Beef Tenderloin'}, note: {tr: 'En yağsız, en narin parça.', en: 'The leanest, most tender cut.'}},
  {id: 'dana-kusbasi', category: 'kirmizi', unit: KG, name: {tr: 'Dana Kuşbaşı', en: 'Beef Cubes'}, note: {tr: 'Güveç, sote, şiş için.', en: 'For stews, sauté, skewers.'}},
  {id: 'dana-kiyma', category: 'kirmizi', unit: KG, name: {tr: 'Dana Kıyma', en: 'Ground Beef'}, note: {tr: 'Günlük çekim, köfteye birebir.', en: 'Freshly ground, perfect for köfte.'}},
  {id: 'dana-kaburga', category: 'kirmizi', unit: KG, name: {tr: 'Dana Kaburga', en: 'Beef Short Rib'}, note: {tr: 'Fırın ya da mangalda, sulu.', en: 'Oven or grill, juicy.'}},
  {id: 'dana-biftek', category: 'kirmizi', unit: KG, name: {tr: 'Dana Biftek', en: 'Beef Steak'}, note: {tr: 'Kalın kesim, yüksek ateş.', en: 'Thick cut, high heat.'}},
  {id: 'kuzu-pirzola', category: 'kirmizi', unit: KG, name: {tr: 'Kuzu Pirzola', en: 'Lamb Chops'}, note: {tr: 'Mangalın klasiği, kemikli.', en: 'A grill classic, on the bone.'}},
  {id: 'kuzu-but', category: 'kirmizi', unit: KG, name: {tr: 'Kuzu But', en: 'Lamb Leg'}, note: {tr: 'Fırın but, çevirme.', en: 'Roast leg, spit-roast.'}},
  {id: 'kuzu-kol', category: 'kirmizi', unit: KG, name: {tr: 'Kuzu Kol', en: 'Lamb Shoulder'}, note: {tr: 'Yavaş pişir, çatalla dağılır.', en: 'Slow-cook, falls apart.'}},

  // ---- Tavuk & Beyaz Et ----
  {id: 'butun-tavuk', category: 'tavuk', unit: ADET, name: {tr: 'Bütün Tavuk', en: 'Whole Chicken'}, note: {tr: 'Fırın ya da çevirme.', en: 'Oven or rotisserie.'}},
  {id: 'tavuk-gogus', category: 'tavuk', unit: KG, name: {tr: 'Tavuk Göğüs', en: 'Chicken Breast'}, note: {tr: 'Yağsız, ızgaraya uygun.', en: 'Lean, great grilled.'}},
  {id: 'tavuk-but', category: 'tavuk', unit: KG, name: {tr: 'Tavuk But', en: 'Chicken Thigh'}, note: {tr: 'Sulu ve lezzetli.', en: 'Juicy and flavourful.'}},
  {id: 'tavuk-kanat', category: 'tavuk', unit: KG, name: {tr: 'Tavuk Kanat', en: 'Chicken Wings'}, note: {tr: 'Mangalın gözdesi.', en: 'A barbecue favourite.'}},
  {id: 'tavuk-baget', category: 'tavuk', unit: KG, name: {tr: 'Tavuk Baget', en: 'Chicken Drumstick'}, note: {tr: 'Çocukların favorisi.', en: 'Kids love these.'}},
  {id: 'hindi-fume', category: 'tavuk', unit: PAKET, name: {tr: 'Hindi Füme', en: 'Smoked Turkey'}, note: {tr: 'Dilimli, hazır servis.', en: 'Sliced, ready to serve.'}},

  // ---- Şarküteri ----
  {id: 'ev-sucuk', category: 'sarkuteri', unit: KG, name: {tr: 'Ev Yapımı Sucuk', en: 'Homemade Sucuk'}, note: {tr: 'Baharatı bizden, dinlenmesi sabırdan.', en: 'Our spice, rested with patience.'}},
  {id: 'kangal-sucuk', category: 'sarkuteri', unit: KG, name: {tr: 'Kangal Sucuk', en: 'Coil Sucuk'}, note: {tr: 'Kahvaltıya ve mangala.', en: 'For breakfast and the grill.'}},
  {id: 'pastirma', category: 'sarkuteri', unit: PAKET, name: {tr: 'Pastırma', en: 'Pastırma'}, note: {tr: 'İnce dilim, çemenli.', en: 'Thin-sliced, fenugreek-cured.'}},
  {id: 'dana-salam', category: 'sarkuteri', unit: PAKET, name: {tr: 'Dana Salam', en: 'Beef Salami'}, note: {tr: 'Tost ve atıştırmalık.', en: 'For toasties and snacks.'}},
  {id: 'hindi-jambon', category: 'sarkuteri', unit: PAKET, name: {tr: 'Hindi Jambon', en: 'Turkey Ham'}, note: {tr: 'Hafif, dilimli.', en: 'Light, sliced.'}},
  {id: 'kavurma', category: 'sarkuteri', unit: KG, name: {tr: 'Kavurma', en: 'Confit Kavurma'}, note: {tr: 'Kendi yağında, hazır ısıt-ye.', en: 'In its own fat, heat & eat.'}},

  // ---- Mangal & Hazır ----
  {id: 'marine-kanat', category: 'mangal', unit: KG, name: {tr: 'Marine Tavuk Kanat', en: 'Marinated Wings'}, note: {tr: 'Marine edilmiş, ateşe hazır.', en: 'Marinated, ready for the fire.'}},
  {id: 'izgara-kofte', category: 'mangal', unit: KG, name: {tr: 'Izgara Köfte', en: 'Grill Meatballs'}, note: {tr: 'Elde yoğrulmuş, baharatlı.', en: 'Hand-kneaded, spiced.'}},
  {id: 'dana-sis', category: 'mangal', unit: KG, name: {tr: 'Dana Şiş', en: 'Beef Skewers'}, note: {tr: 'Şişe dizili, hazır.', en: 'Skewered, ready to grill.'}},
  {id: 'adana', category: 'mangal', unit: KG, name: {tr: 'Adana', en: 'Adana Kebab'}, note: {tr: 'Zırh kıyma, acılı/acısız.', en: 'Hand-minced, mild or hot.'}},
  {id: 'cop-sis', category: 'mangal', unit: PAKET, name: {tr: 'Çöp Şiş', en: 'Çöp Şiş Skewers'}, note: {tr: 'Küçük şişler, hızlı pişer.', en: 'Small skewers, quick to cook.'}},
  {id: 'marine-pirzola', category: 'mangal', unit: KG, name: {tr: 'Marine Kuzu Pirzola', en: 'Marinated Lamb Chops'}, note: {tr: 'Dinlendirilmiş marine.', en: 'Rested in marinade.'}},

  // ---- Kahvaltılık ----
  {id: 'kasar', category: 'kahvalti', unit: KG, name: {tr: 'Kaşar Peyniri', en: 'Kaşar Cheese'}, note: {tr: 'Tost ve mangal yanı.', en: 'For toasties and the grill.'}},
  {id: 'beyaz-peynir', category: 'kahvalti', unit: KG, name: {tr: 'Beyaz Peynir', en: 'White Cheese'}, note: {tr: 'Tam yağlı, kahvaltılık.', en: 'Full-fat, for breakfast.'}},
  {id: 'tereyagi', category: 'kahvalti', unit: PAKET, name: {tr: 'Köy Tereyağı', en: 'Village Butter'}, note: {tr: 'Günlük, taze.', en: 'Daily, fresh.'}},
  {id: 'zeytin', category: 'kahvalti', unit: PAKET, name: {tr: 'Yeşil Zeytin', en: 'Green Olives'}, note: {tr: 'Kahvaltı sofrasına.', en: 'For the breakfast table.'}},
  {id: 'yumurta', category: 'kahvalti', unit: PAKET, name: {tr: 'Köy Yumurtası (30’lu)', en: 'Village Eggs (30s)'}, note: {tr: 'Gezen tavuk.', en: 'Free-range.'}},

  // ---- Ekstra ----
  {id: 'mangal-komuru', category: 'ekstra', unit: PAKET, name: {tr: 'Mangal Kömürü', en: 'Grill Charcoal'}, note: {tr: 'Uzun yanan meşe.', en: 'Long-burning oak.'}},
  {id: 'et-baharati', category: 'ekstra', unit: PAKET, name: {tr: 'Et Baharatı', en: 'Meat Spice Mix'}, note: {tr: 'Usta harmanı.', en: "The master's blend."}},
  {id: 'marinasyon', category: 'ekstra', unit: PAKET, name: {tr: 'Marinasyon Sosu', en: 'Marinade Sauce'}, note: {tr: 'Eti gece bekletmeden.', en: 'No overnight wait needed.'}},
];
