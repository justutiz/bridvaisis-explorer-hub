
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
				// Modern Bolt-inspired color palette
				'lake-blue': {
					50: '#e6f7ff',
					100: '#b3e0ff',
					200: '#80c9ff',
					300: '#4db2ff',
					400: '#1a9bff',
					500: '#0084ff', // Primary blue
					600: '#0070d6',
					700: '#005cb3',
					800: '#004a8f',
					900: '#00386c',
				},
				'lake-teal': {
					50: '#e6fcfa',
					100: '#b3f6f1',
					200: '#80f0e7',
					300: '#4deade',
					400: '#1ae4d4',
					500: '#00decb', // Accent teal
					600: '#00baaa',
					700: '#00978a',
					800: '#00756a',
					900: '#00524a',
				},
				'graphite': {
					50: '#f0f1f3',
					100: '#d1d5db',
					200: '#b3b9c2',
					300: '#939ca8',
					400: '#75808f',
					500: '#606876', // Medium gray
					600: '#4c535e',
					700: '#383e47',
					800: '#24292f', // Dark gray
					900: '#121418', // Near black
				},
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter var', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(0, 132, 255, 0.8)' 
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(0, 132, 255, 0.5)' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'50%': { 
						transform: 'translateY(-10px)' 
					}
				},
				'shimmer': {
					'0%': { 
						backgroundPosition: '-200% 0' 
					},
					'100%': { 
						backgroundPosition: '200% 0' 
					}
				},
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 4s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'gradient-shift': 'gradient-shift 5s ease infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'slide-up': 'slide-up 0.4s ease-out forwards'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(16px)'
			},
			boxShadow: {
				'neon': '0 0 10px rgba(0, 132, 255, 0.5), 0 0 30px rgba(0, 132, 255, 0.3)',
				'subtle': '0 2px 8px rgba(0, 0, 0, 0.08)',
				'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',
				'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'glow-blue': '0 0 15px rgba(0, 132, 255, 0.6)',
				'glow-teal': '0 0 15px rgba(0, 222, 203, 0.6)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
