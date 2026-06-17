'use client';

import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';

export type CartItem = {productId: string; qty: number};

type CartContextValue = {
  items: CartItem[];
  count: number; // toplam adet
  hydrated: boolean; // localStorage okundu mu (badge yanıp sönmesini önler)
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  incr: (id: string) => void;
  decr: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'denizet-cart';

/* Sepet state'i — client, localStorage'da kalıcı. Backend YOK. SSR-safe:
   ilk render [] (sunucuyla eşleşir), mount sonrası localStorage okunur → mismatch yok. */
export function CartProvider({children}: {children: ReactNode}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);

  // İlk mount: localStorage'tan oku (window guard).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) {
        setItems(
          parsed
            .filter((x) => x && typeof x.productId === 'string' && Number.isFinite(x.qty) && x.qty > 0)
            .map((x) => ({productId: x.productId as string, qty: Math.floor(x.qty)})),
        );
      }
    } catch {
      /* bozuk veri → yok say */
    }
    setHydrated(true);
  }, []);

  // Değişince yaz (yalnız hydrate sonrası — ilk boş state'i yazıp ezmesin).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* kota/erişim → yok say */
    }
  }, [items, hydrated]);

  const add = useCallback((id: string) => {
    setItems((prev) => {
      const found = prev.find((i) => i.productId === id);
      if (found) return prev.map((i) => (i.productId === id ? {...i, qty: i.qty + 1} : i));
      return [...prev, {productId: id, qty: 1}];
    });
  }, []);

  const incr = useCallback((id: string) => {
    setItems((prev) => prev.map((i) => (i.productId === id ? {...i, qty: i.qty + 1} : i)));
  }, []);

  const decr = useCallback((id: string) => {
    setItems((prev) => prev.flatMap((i) => (i.productId !== id ? [i] : i.qty <= 1 ? [] : [{...i, qty: i.qty - 1}])));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== id));
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
