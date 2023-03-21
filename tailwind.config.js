// tailwind.config.js
const { plugin } = require('twrnc');

module.exports = {
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        btn: {
          padding: 3,
          borderRadius: 10,
          textTransform: `uppercase`,
          backgroundColor: `#333`,
        },
        "bg-success": {
          backgroundColor: `#0f0`,
        }
      });
    }),
  ],
};