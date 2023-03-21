const { colors } = require("./src/theme/colors");

module.exports = {
  content: ["index.js", "./{app,src}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
  },
};
