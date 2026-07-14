'use client';

import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';

export type CartItem = {productId: string; qty: number; cut?: string};

type CartContextValue = {
  items: CartItem[];
  count: number; // toplam adet
  hydrated: boolean; // localStorage okundu mu (badge yanıp sönmesini önler)
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string, cut?: string) => void;
  incr: (id: string, cut?: string) => void;
  decr: (id: string, cut?: string) => void;
  remove: (id: string, cut?: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'denizet-cart';

// Birleşik satır kimliği: aynı ürün farklı kesimle (cut) AYRI satır. cut yoksa boş → eski davranış.
const lineKey = (productId: string, cut?: string) => `${productId}::${cut ?? ''}`;
const sameLine = (i: CartItem, id: string, cut?: string) => i.productId === id && (i.cut ?? '') === (cut ?? '');

/* Sepet state'i — client, localStorage'da kalıcı. Backend YOK. SSR-safe:
   ilk render [] (sunucuyla eşleşir), mount sonrası localStorage okunur → mismatch yok. */
export function CartProvider({children}: {children: ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  // İlk mount: localStorage'tan oku (window guard). Sanitize + aynı productId'leri TEK satırda
  // birleştir → bozuk/yinelenen veri badge'i şişiremez (çift sayma engellenir).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) {
        // Aynı (productId + cut) satırlarını birleştir → çift sayma engellenir; farklı cut ayrı kalır.
        const merged = new Map<string, CartItem>();
        for (const x of parsed) {
          if (x && typeof x.productId === 'string' && Number.isFinite(x.qty) && x.qty > 0) {
            const cut = typeof x.cut === 'string' && x.cut ? x.cut : undefined;
            const key = lineKey(x.productId, cut);
            const existing = merged.get(key);
            if (existing) existing.qty += Math.floor(x.qty);
            else merged.set(key, {productId: x.productId, qty: Math.floor(x.qty), ...(cut ? {cut} : {})});
          }
        }
        setItems(Array.from(merged.values()));
      }
    } catch {
      /* bozuk veri → yok say */
    }
    setHydrated(true);
  }, []);

  // Değişince yaz (yalnız hydrate sonrası — ilk boş state'i yazıp ezmesin).
  // Sepet boşsa anahtarı TAMAMEN sil → "Sepeti Boşalt" sonrası localStorage gerçekten temiz.
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (items.length === 0) window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* kota/erişim → yok say */
    }
  }, [items, hydrated]);

  const add = useCallback((id: string, cut?: string) => {
    setItems((prev) => {
      const found = prev.find((i) => sameLine(i, id, cut));
      if (found) return prev.map((i) => (sameLine(i, id, cut) ? {...i, qty: i.qty + 1} : i));
      return [...prev, {productId: id, qty: 1, ...(cut ? {cut} : {})}];
    });
  }, []);

  const incr = useCallback((id: string, cut?: string) => {
    setItems((prev) => prev.map((i) => (sameLine(i, id, cut) ? {...i, qty: i.qty + 1} : i)));
  }, []);

  const decr = useCallback((id: string, cut?: string) => {
    setItems((prev) => prev.flatMap((i) => (!sameLine(i, id, cut) ? [i] : i.qty <= 1 ? [] : [{...i, qty: i.qty - 1}])));
  }, []);

  const remove = useCallback((id: string, cut?: string) => {
    setItems((prev) => prev.filter((i) => !sameLine(i, id, cut)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({items, count, hydrated, open, setOpen, add, incr, decr, remove, clear}),
    [items, count, hydrated, open, add, incr, decr, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
