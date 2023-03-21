module.exports = {
  source: ['./src/theme/tokens.resolved.json'],
  platforms: {
    rn: {
      transformGroup: 'react-native',
      buildPath: './src/theme/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json',
        },
      ],
    },
  },
};