const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        header: ["Montserrat", ...defaultTheme.fontFamily.sans],
        mono: ["Roboto Mono", ...defaultTheme.fontFamily.mono],
        serif: ["Lora", ...defaultTheme.fontFamily.serif]
      },
      colors: {
        secondary: `var(--secondary)`,
        primary: `var(--primary)`,
        link: `var(--link)`,
        aux: `var(--aux)`,
        codeBg: `var(--codeBg)`,
        gray: {
          100: "#EAEBEC",
          200: "#C9CDCF",
          300: "#A9AEB2",
          400: "#697279",
          500: "#28353F",
          600: "#243039",
          700: "#182026",
          800: "#12181C",
          900: "#0C1013"
        },
        red: {
          100: "#FDF0EE",
          200: "#FADAD6",
          300: "#F7C4BD",
          400: "#F0988B",
          500: "#EA6C59",
          600: "#D36150",
          700: "#8C4135",
          800: "#693128",
          900: "#46201B"
        }
      }
    }
  }
}
