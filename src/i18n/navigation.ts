import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Dil-farkında gezinme yardımcıları (TR/EN geçişi, locale-aware <Link>).
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
