import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import catppuccin from '@catppuccin/tailwindcss';

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				mono: ['Fira Mono', 'monospace']
			}
		}
	},

	plugins: [typography, forms, catppuccin]
} satisfies Config;
