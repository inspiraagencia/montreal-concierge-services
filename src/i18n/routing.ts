import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      fr: '/services',
    },
    '/services/[slug]': {
      en: '/services/[slug]',
      fr: '/services/[slug]',
    },
    '/blog': {
      en: '/blog',
      fr: '/blogue',
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      fr: '/blogue/[slug]',
    },
    '/locations': {
      en: '/locations',
      fr: '/emplacements',
    },
    '/locations/[city]': {
      en: '/locations/[city]',
      fr: '/emplacements/[city]',
    },
    '/contact': {
      en: '/contact',
      fr: '/contact',
    },
    '/about': {
      en: '/about',
      fr: '/a-propos',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathnames = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
