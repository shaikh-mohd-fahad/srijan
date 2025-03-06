/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                customGreen: "	#355E3B9",
                customHeroBg: "#eeeee6" // Add your custom green color
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
}