import { View } from "react-native";
import { Text } from "./Text";

export const Index = () => (
  <View>
    <Text variant="title">This is an example of some Title text.</Text>
    <Text variant="heading">This is an example of some Heading text.</Text>
    <Text variant="bold">This is an example of some Bold text.</Text>
    <Text variant="body">This is an example of some Body text.</Text>
    <Text variant="small">This is an example of some Small text.</Text>
    <Text variant="tiny">This is an example of some Tiny text.</Text>
  </View>
);
