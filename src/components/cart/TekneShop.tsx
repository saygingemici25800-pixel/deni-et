'use client';

import {CartProvider} from './CartProvider';
import {CartButton} from './CartButton';
import {CartDrawer} from './CartDrawer';
import {BoatGallery} from '../BoatGallery';

/* /tekne mağaza adası — sepet context'i yalnız bu ağacı sarar (global değil).
   Ürün gridi + sabit sepet butonu + sepet/sipariş drawer'ı. */
export function TekneShop() {
  return (
    <CartProvider>
      <BoatGallery />
      <CartButton />
      <CartDrawer />
    </CartProvider>
  );
}
