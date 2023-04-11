import { useState } from "react";
import { View } from "react-native";
import { tw } from "../theme";
import { Checkbox } from "./Checkbox";
import { Space } from "./Space";

export const Index = () => {
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);

  return (
    <View style={tw`flex-row`}>
      <Checkbox
        isChecked={isChecked1}
        onToggle={() => setIsChecked1(!isChecked1)}
      />
      <Space />
      <Checkbox
        isChecked={isChecked2}
        onToggle={() => setIsChecked2(!isChecked2)}
      />
    </View>
  );
};
