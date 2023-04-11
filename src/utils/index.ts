export const slop = {
  all: (value: number) => ({
    top: value,
    bottom: value,
    left: value,
    right: value,
  }),
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
