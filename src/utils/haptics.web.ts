const noop = async () => {};

console.log("loaded haptics.web.ts");

export const haptics = {
  light: noop,
  medium: noop,
  heavy: noop,
  success: noop,
};
