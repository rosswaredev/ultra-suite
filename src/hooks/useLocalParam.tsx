import { useLocalSearchParams } from "expo-router";

export const useLocalParam = (key: string) => {
  const params = useLocalSearchParams();
  const param = params[key];
  const id =
    typeof param !== "string" && param && param[0]
      ? param[0]
      : (param as string);
  return id;
};
