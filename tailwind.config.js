const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        backgroundColor: {
            'primary': '#110F23',
            'light': '#e4e5f1',
        },
        textColor: {
            'primary': '#E6DAFE',
            'light': '#000000',
        },
        borderColor: {
            'primary': '#E6DAFE',
            'light': '#000000',
        }
      },
    },
    darkMode: "class",
    plugins: [nextui()]
  }