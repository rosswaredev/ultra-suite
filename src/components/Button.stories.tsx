import { Plus } from "lucide-react-native";
import { View } from "react-native";
import { tw } from "../theme";
import { Button } from "./Button";

export const Index = () => (
  <View>
    <View style={tw`flex-row mb-4`}>
      <Button variant="primary" title="Primary" />
      <Space />
      <Button variant="primary" title="Primary" round />
      <Space />
      <Button variant="primary" icon="check" title="Primary" round />
      <Space />
      <Button variant="primary" icon="plus" />
      <Space />
      <Button variant="primary" icon="delete" round />
    </View>
    <View style={tw`flex-row mb-4`}>
      <Button title="Default" />
      <Space />
      <Button title="Default" round />
      <Space />
      <Button title="Default" icon="check" />
      <Space />
      <Button icon="plus" />
      <Space />
      <Button icon="delete" round />
    </View>
    <View style={tw`flex-row`}>
      <Button variant="error" title="Error" />
      <Space />
      <Button variant="error" title="Error" round />
      <Space />
      <Button variant="error" icon="check" title="Error" />
      <Space />
      <Button variant="error" icon="plus" />
      <Space />
      <Button variant="error" icon="delete" round />
    </View>
  </View>
);

const Space = () => <View style={tw`w-2`} />;
