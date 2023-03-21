import tokensJson from "./tokens.json";
const { semantic } = tokensJson;

export const extractTailwindUtilitiesFromTokens = () => {
  const semanticTokenGroups = Object.entries(semantic);

  // For each group
  const utilities = semanticTokenGroups.reduce((acc, [groupName, tokens]) => {
    const tokenEntries = Object.entries(tokens);

    // For each token
    const groupUtilities = tokenEntries.reduce(
      (acc, [tokenName, tokenValue]) => {
        const utilityName = `${groupName}-${tokenName}`;

        return {
          ...acc,
          [`bg-${utilityName}`]: {
            backgroundColor: tokenValue.value,
          },
          [`text-${utilityName}`]: {
            color: tokenValue.value,
          },
        };
      },
      {}
    );

    return {
      ...acc,
      ...groupUtilities,
    };
  }, {});

  return utilities;
};
