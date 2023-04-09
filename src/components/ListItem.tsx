import { PropsWithChildren } from 'react';
import { View } from 'react-native';

export const ListItem = ({ children }: PropsWithChildren<unknown>) => (
  <View className="bg-base-200 rounded-lg px-3 py-3 border-base-300 border">
    {children}
  </View>
);
