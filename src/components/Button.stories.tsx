import { Plus } from 'lucide-react-native';
import { Platform, View } from 'react-native';
import { tw } from '../theme';
import { Button } from './Button';
import { Space } from './Space';

export const Index = () => {
  return (
    <View>
      <View style={tw`flex-row mb-4`}>
        <Button variant="primary" title="Primary" />
        <Space />
        <Button variant="primary" title="Primary" isRound />
        <Space />
        <Button variant="primary" icon="check" title="Primary" isRound />
        <Space />
        <Button variant="primary" icon="plus" />
        <Space />
        <Button variant="primary" icon="delete" isRound />
      </View>
      <View style={tw`flex-row mb-4`}>
        <Button title="Default" />
        <Space />
        <Button title="Default" isRound />
        <Space />
        <Button title="Default" icon="check" />
        <Space />
        <Button icon="plus" />
        <Space />
        <Button icon="delete" isRound />
      </View>
      <View style={tw`flex-row mb-4`}>
        <Button variant="error" title="Error" />
        <Space />
        <Button variant="error" title="Error" isRound />
        <Space />
        <Button variant="error" icon="check" title="Error" />
        <Space />
        <Button variant="error" icon="plus" />
        <Space />
        <Button variant="error" icon="delete" isRound />
      </View>
      <View style={tw`flex-row`}>
        <Button variant="ghost" title="Ghost" />
        <Space />
        <Button variant="ghost" title="Ghost" isRound />
        <Space />
        <Button variant="ghost" icon="check" title="Ghost" />
        <Space />
        <Button variant="ghost" icon="plus" />
        <Space />
        <Button variant="ghost" icon="delete" isRound />
      </View>
    </View>
  );
};
