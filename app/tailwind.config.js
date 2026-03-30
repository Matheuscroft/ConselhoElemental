/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Cores Elementais - Tema Místico
        void: {
          DEFAULT: "#0A0A0F",
          light: "#12121A",
        },
        mystic: {
          purple: "#1A1025",
          blue: "#0D1420",
          gold: "#FFD700",
          arcane: "#9D4EDD",
          cyan: "#00D9FF",
        },
        terra: {
          DEFAULT: "#3E5F44",
          light: "#4CAF50",
          glow: "rgba(62, 95, 68, 0.4)",
          dark: "#2A4030",
        },
        fogo: {
          DEFAULT: "#D14900",
          light: "#FF6B35",
          glow: "rgba(209, 73, 0, 0.5)",
          dark: "#8B3000",
        },
        agua: {
          DEFAULT: "#1B4965",
          light: "#48CAE4",
          glow: "rgba(27, 73, 101, 0.4)",
          dark: "#0F2D3D",
        },
        ar: {
          DEFAULT: "#A8DADC",
          light: "#E0F7FA",
          glow: "rgba(168, 218, 220, 0.3)",
          dark: "#6B9B9D",
        },
        mana: {
          DEFAULT: "#FFD700",
          dim: "#B8860B",
        },
      },
      fontFamily: {
        mystic: ['Cinzel', 'serif'],
        display: ['Cinzel Decorative', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: {
          terra: "0 0 20px rgba(62, 95, 68, 0.4), 0 0 40px rgba(62, 95, 68, 0.2)",
          fogo: "0 0 20px rgba(209, 73, 0, 0.5), 0 0 40px rgba(209, 73, 0, 0.3)",
          agua: "0 0 20px rgba(27, 73, 101, 0.4), 0 0 40px rgba(72, 202, 228, 0.2)",
          ar: "0 0 20px rgba(168, 218, 220, 0.3), 0 0 40px rgba(224, 247, 250, 0.2)",
          mana: "0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(157, 78, 221, 0.3)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
      },
      backgroundImage: {
        'gradient-mystic': 'linear-gradient(135deg, #1A1025 0%, #0D1420 50%, #1A1025 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(26, 16, 37, 0.9) 0%, rgba(13, 20, 32, 0.95) 100%)',
        'gradient-terra': 'linear-gradient(135deg, rgba(62, 95, 68, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)',
        'gradient-fogo': 'linear-gradient(135deg, rgba(209, 73, 0, 0.2) 0%, rgba(255, 107, 53, 0.1) 100%)',
        'gradient-agua': 'linear-gradient(135deg, rgba(27, 73, 101, 0.2) 0%, rgba(72, 202, 228, 0.1) 100%)',
        'gradient-ar': 'linear-gradient(135deg, rgba(168, 218, 220, 0.2) 0%, rgba(224, 247, 250, 0.1) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
