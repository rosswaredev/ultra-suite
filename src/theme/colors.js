const tokensJson = require("./tokens.json");

const { semantic } = tokensJson;
const semanticTokenGroups = Object.entries(semantic);

const colors = semanticTokenGroups.reduce((acc, [groupName, tokens]) => {
  const tokenEntries = Object.entries(tokens);

  const groupUtilities = tokenEntries.reduce((acc, [tokenName, tokenValue]) => {
    const utilityName = `${groupName}-${tokenName}`;

    return {
      ...acc,
      [utilityName]: tokenValue.value,
    };
  }, {});

  return {
    ...acc,
    ...groupUtilities,
  };
}, {});

module.exports = { colors };
