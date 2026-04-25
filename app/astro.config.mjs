import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://islinxu.github.io/smol-training-playbook',
  base: '/smol-training-playbook',
  integrations: [
    mdx(),
    svelte()
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: false,
      wrap: true
    },
    remarkPlugins: [
      remarkMath
    ],
    rehypePlugins: [
      [rehypeKatex, { trust: true }]
    ]
  },
  vite: {
    build: {
      assetsInlineLimit: 4096
    }
  }
});
