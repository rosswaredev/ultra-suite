// tailwind.config.js
const { plugin } = require('twrnc');
const { extractTailwindUtilitiesFromTokens } = require('./src/theme/utils');

const tailwindUtilities = extractTailwindUtilitiesFromTokens();

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => addUtilities(tailwindUtilities)),
  ],
};