import type { Config } from "tailwindcss";
const config: Config = {content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: {extend: {colors: {navy: "#0D1B3D", red: "#B3192D"}}}, plugins: []};
export default config;
