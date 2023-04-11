import { View } from "react-native";
import { Svg, Path } from "react-native-svg";
import { tw } from "../theme";
import { Text } from "./Text";

type ProgressProps = {
  value: number;
};

export const Progress = ({ value }: ProgressProps) => (
  <View>
    <Svg style={tw`w-6 h-6`} viewBox="0 0 10 10">
      <Path
        d="M 5 1 A 1 1 0 1 1 5 9 A 1 1 0 1 1 5 1"
        stroke={tw.color("primary-base/25")}
        strokeWidth="2"
      />
      <Path
        d="M 5 1 A 1 1 0 1 1 5 9 A 1 1 0 1 1 5 1"
        stroke={tw.color("primary-base")}
        strokeWidth="2"
        strokeDasharray={"25"}
        strokeDashoffset={25 - value * 25}
        strokeLinecap="round"
      />
    </Svg>
  </View>
);
