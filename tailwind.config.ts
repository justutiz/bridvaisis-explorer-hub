
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
				// Updated color palette with more vibrant tones
				'lake-blue': {
					50: '#e6f0f7',
					100: '#cce0ef',
					200: '#99c2df',
					300: '#66a3cf',
					400: '#3385bf',
					500: '#0066af', // Main blue from the hero image
					600: '#00528c',
					700: '#003e69',
					800: '#002946', // Darker blue from hero image
					900: '#001523',
				},
				'lake-teal': {
					50: '#e6f7f7',
					100: '#ccefef',
					200: '#99dfdf',
					300: '#66cfcf',
					400: '#33bfbf',
					500: '#00afaf', // Teal from hero image
					600: '#008c8c',
					700: '#006969',
					800: '#004646',
					900: '#002323',
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
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'glow': {
					'0%, 100%': { 
						boxShadow: '0 0 20px rgba(148, 174, 213, 1)' 
					},
					'50%': { 
						boxShadow: '0 0 40px rgba(148, 174, 213, 0.7)' 
					}
				},
				'morph': {
					'0%': { 
						borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' 
					},
					'50%': { 
						borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' 
					},
					'100%': { 
						borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' 
					}
				},
				'float': {
					'0%, 100%': { 
						transform: 'translateY(0)' 
					},
					'50%': { 
						transform: 'translateY(-15px)' 
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
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						filter: 'brightness(1.1) drop-shadow(0 0 15px rgba(0, 102, 175, 0.7))' 
					},
					'50%': { 
						opacity: '0.8',
						filter: 'brightness(0.9) drop-shadow(0 0 5px rgba(0, 102, 175, 0.3))'
					}
				},
				'scale-in-out': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'blur-in-out': {
					'0%, 100%': { filter: 'blur(0px)' },
					'50%': { filter: 'blur(2px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glow': 'glow 4s ease-in-out infinite',
				'morph': 'morph 12s ease-in-out infinite',
				'float': 'float 8s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
				'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
				'scale-in-out': 'scale-in-out 8s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 30s linear infinite',
				'blur-in-out': 'blur-in-out 10s ease-in-out infinite'
			},
			backdropFilter: {
				'none': 'none',
				'blur': 'blur(20px)'
			},
			boxShadow: {
				'neon': '0 0 10px theme(colors.lake-blue.200), 0 0 30px theme(colors.lake-blue.500)',
				'glass': '0 10px 40px rgba(0, 0, 0, 0.2)',
				'modern': '0 20px 80px -20px rgba(0,0,0,0.25)',
				'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
				'glow-blue': '0 0 15px rgba(0, 102, 175, 0.8)',
				'glow-teal': '0 0 15px rgba(0, 175, 175, 0.8)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
