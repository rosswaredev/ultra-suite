import { useSearchParams } from "expo-router";

export const useParam = (key: string) => {
  const params = useSearchParams();
  const param = params[key];
  const id =
    typeof param !== "string" && param && param[0]
      ? param[0]
      : (param as string);
  return id;
};
