
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
				// Refined lake-inspired palette
				'lake-blue': {
					50: '#e6f7ff',
					100: '#b3e5fc',
					200: '#81d4fa',
					300: '#4fc3f7',
					400: '#29b6f6',
					500: '#03a9f4',
					600: '#039be5',
					700: '#0288d1',
					800: '#0277bd',
					900: '#01579b',
				},
				'lake-teal': {
					50: '#e0f7fa',
					100: '#b2ebf2',
					200: '#80deea',
					300: '#4dd0e1',
					400: '#26c6da',
					500: '#00bcd4',
					600: '#00acc1',
					700: '#0097a7',
					800: '#00838f',
					900: '#006064',
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
				'3xl': '1.5rem',
				'4xl': '2rem',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Outfit', 'system-ui', 'sans-serif'],
				display: ['Space Grotesk', 'system-ui', 'sans-serif'],
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
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(0, 200, 255, 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(0, 200, 255, 0.6)' 
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-12px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-400% 0' },
					'100%': { backgroundPosition: '400% 0' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'blur-in': {
					'0%': { filter: 'blur(8px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 2.5s linear infinite',
				'gradient-shift': 'gradient-shift 4s ease infinite',
				'scale-in': 'scale-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-up': 'slide-up 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
				'blur-in': 'blur-in 0.4s ease-out'
			},
			backdropBlur: {
				'xs': '2px',
				'3xl': '64px'
			},
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.25)',
				'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.35)',
				'glow-sm': '0 0 15px rgba(0, 200, 255, 0.3)',
				'glow': '0 0 30px rgba(0, 200, 255, 0.4)',
				'glow-lg': '0 0 50px rgba(0, 200, 255, 0.5)',
				'glow-accent': '0 0 30px rgba(0, 255, 200, 0.4)',
				'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'elevated': '0 12px 40px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
				'aurora': 'radial-gradient(ellipse at 20% 0%, rgba(0,200,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(0,255,200,0.1) 0%, transparent 50%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
