import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-noto-serif-jp)', 'serif'],
            },
            colors: {
                primary: "#0077b6",
                "primary-dark": "#004e7a",
                secondary: "#48cae4",
                accent: "#caf0f8",
                "neutral-dark": "#023e8a",
                "text-main": "#1d3557",
                "text-sub": "#457b9d",
            },
        },
    },
    plugins: [],
};
export default config;
