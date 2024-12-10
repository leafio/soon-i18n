// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

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
					translations: {
						zh: '概览'
					},
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'Introduction', slug: 'guides/introduction',
							translations: {
								zh: '简介'
							}
						},
						{
							label: 'Formatting', slug: 'guides/formatting', translations: {
								zh: '格式化'
							}
						},
						{
							label: 'Lazy loading', slug: 'guides/lazy', translations: {
								zh: '按需加载'
							}
						},
						{
							label: 'Locale Safe', slug: 'guides/locale-safe', translations: {
								zh: '语言类型安全'
							}
						},
					],
				},
				{
					label: 'Usage',
					translations: {
						zh: '用法'
					},
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'General', slug: 'usage/soon-i18n', translations: {
								zh: '通用'
							}
						},
						{ label: 'React', slug: 'usage/react' },
						{ label: 'Vue', slug: 'usage/vue' },
						{ label: 'Solid', slug: 'usage/solid' },
						{ label: 'Svelte', slug: 'usage/svelte' },
					],
				},
			],
		}),
	],
	i18n: {
		defaultLocale: "en",
		locales: ["en", "zh"],
	}
})
