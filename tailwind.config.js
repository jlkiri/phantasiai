const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        header: ["Georgia", ...defaultTheme.fontFamily.serif],
        mono: ["Source Code Pro", ...defaultTheme.fontFamily.mono],
        postHeader: ["Georgia", ...defaultTheme.fontFamily.serif],
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans]
      },
      transitionProperty: {
        color: "color"
      },
      colors: {
        bg: `var(--bg)`,
        text: `var(--text)`,
        tag: `var(--tag)`,
        auxbg: `var(--auxbg)`,
        auxtext: `var(--auxtext)`,
        codeBg: `var(--codeBg)`
      }
    }
  }
}
