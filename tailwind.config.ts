
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for our theme
				nature: {
					50: '#f2f8f2',
					100: '#e0ede0',
					200: '#c1dac2',
					300: '#9bc09d',
					400: '#7d9d7f',
					500: '#5a7e5a', // Primary green
					600: '#4a684c',
					700: '#3d533f',
					800: '#344335',
					900: '#2d392e',
				},
				earth: {
					50: '#f9f6f3',
					100: '#f0e9e0',
					200: '#e2d1c1',
					300: '#d4b99f',
					400: '#c2a887',
					500: '#b19471',
					600: '#8e6c53', // Primary earth tone
					700: '#775b48',
					800: '#604a3d',
					900: '#4f3d35',
				},
			},
			fontFamily: {
				quicksand: ['Quicksand', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif'],
				lora: ['Lora', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-in': 'slide-in 0.6s ease-out'
			},
			backgroundImage: {
				'wood-pattern': "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2U5ZTVkZSIgZmlsbC1vcGFjaXR5PSIwLjQiPjwvcmVjdD48cGF0aCBkPSJNMTMuMzMgMEwwIDBMMCAxMy4zM0wxMy4zMyAyNi42N0wyNi42NyA0MEw0MCA1My4zM0w1My4zMyA2Ni42N0w2Ni42NyA4MEw4MCA5My4zM0w5My4zMyAxMDZMMTA2LjY3IDExOS4zM0wxMjAgMTMyLjY3TDEzMy4zMyAxNDZMMTQ2LjY3IDE1OS4zM0wxNjAgMTcyLjY3TDE3My4zMyAxODZMMTg2LjY3IDE5OS4zM0wyMDAgMjEyLjY3TDIwMCAyMDBMMTg2LjY3IDE4Ni42N0wxNzMuMzMgMTczLjMzTDE2MCAxNjBMMTQ2LjY3IDE0Ni42N0wxMzMuMzMgMTMzLjMzTDEyMCAxMjBMMTA2LjY3IDEwNi42N0w5My4zMyA5My4zM0w4MCA4MEw2Ni42NyA2Ni42N0w1My4zMyA1My4zM0w0MCA0MEwyNi42NyAyNi42N0wxMy4zMyAxMy4zM1oiIGZpbGw9IiM4ZTZjNTMiIGZpbGwtb3BhY2l0eT0iMC4xIj48L3BhdGg+PC9zdmc+')",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
