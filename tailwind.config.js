/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
					"GeneralSans-Variable",
					/** {
						fontFeatureSettings: "'ss01'", // Alternate lowercase 'a'.
						fontVariationSettings: "'wght'"
					}, -- fix rendering settings **/
					...defaultTheme.fontFamily.sans
				],
      },
      colors: {
        "grayscale": {
          "50": "rgb(253, 253, 253)",
          "100": "rgb(249, 249, 249)",
          "200": "rgb(242, 242, 242)",
          "300": "rgb(233, 233, 233)",
          "400": "rgb(218, 218, 218)",
          "500": "rgb(194, 194, 194)",
          "600": "rgb(166, 166, 166)",
          "700": "rgb(142, 142, 142)",
          "800": "rgb(121, 121, 121)",
          "900": "rgb(104, 104, 104)",
          "950": "rgb(90, 90, 90)"
        },
      }
    },
  },
  plugins: [],
}

