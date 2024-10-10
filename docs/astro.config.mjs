// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://leafio.github.io',
	base: '/soon-i18n',
	integrations: [
		starlight({
			title: 'soon-i18n',
			social: {
				github: 'https://github.com/leafio/soon-i18n',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Introduction', slug: 'guides/introduction' },
						{ label: 'Formatting', slug: 'guides/formatting' },
						{ label: 'Lazy loading', slug: 'guides/lazy' },
					],
				},
				{
					label: 'Usage',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'General', slug: 'usage/soon-i18n' },
						{ label: 'React', slug: 'usage/react' },
						{ label: 'Vue', slug: 'usage/vue' },
						{ label: 'Solid', slug: 'usage/solid' },
						{ label: 'Svelte', slug: 'usage/svelte' },
					],
				},
			],
		}),
	],
});
