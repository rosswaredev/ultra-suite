const  plugin = require( "tailwindcss/plugin");

const { extractSemanticTailwindColorsFromTokens } = require( "./src/theme/utils");

const semanticColors = extractSemanticTailwindColorsFromTokens();

module.exports = {
  content: ["index.js", "./{app,src}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: semanticColors
  }
};
