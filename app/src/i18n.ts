import type { AstroInstance } from 'astro';

export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function getLocalePaths(): { params: { locale: string }; props: { locale: string } }[] {
  return locales.map((locale) => ({
    params: { locale },
    props: { locale },
  }));
}

export function useTranslations(locale: Locale) {
  const translations = {
    en: {
      // Navigation
      nav: {
        chapters: 'Chapters',
        about: 'About',
      },
      // Hero
      hero: {
        badge: 'Hugging Face Open Source',
        cta: 'Start Reading',
        viewOnGithub: 'View on GitHub',
      },
      // Chapters
      chapters: {
        title: 'Chapter Overview',
        subtitle: 'Start your journey here',
      },
      // Common
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
      },
    },
    zh: {
      // Navigation
      nav: {
        chapters: '章节',
        about: '关于',
      },
      // Hero
      hero: {
        badge: 'Hugging Face 开源项目',
        cta: '开始阅读',
        viewOnGithub: '在 GitHub 上查看',
      },
      // Chapters
      chapters: {
        title: '章节概览',
        subtitle: '从这里开始你的旅程',
      },
      // Common
      common: {
        loading: '加载中...',
        error: '发生错误',
        back: '返回',
        next: '下一章',
        previous: '上一章',
      },
    },
  };

  return translations[locale] || translations.en;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && locales.includes(lang as Locale)) {
    return lang as Locale;
  }
  return defaultLocale;
}
