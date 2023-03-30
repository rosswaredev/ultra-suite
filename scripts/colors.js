const fs = require("fs");
const tokensJson = require("../src/theme/tokens.json");

const { semantic } = tokensJson;
const semanticTokenGroups = Object.entries(semantic);

const colors = semanticTokenGroups.reduce(
  (acc, [groupName, tokens]) => {
    const tokenEntries = Object.entries(tokens);

    const groupUtilities = tokenEntries.reduce(
      (acc, [tokenName, tokenValue]) => {
        const utilityName = `${groupName}-${tokenName}`;

        return {
          ...acc,
          [utilityName]: tokenValue.value,
        };
      },
      {}
    );

    return {
      ...acc,
      ...groupUtilities,
    };
  },
  { transparent: "transparent" }
);

fs.writeFile("./src/theme/colors.json", JSON.stringify(colors), (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
