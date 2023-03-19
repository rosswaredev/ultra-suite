import { Link } from 'expo-router';
import { View } from 'react-native';

export default function AppHome() {
  return (
    <View style={{ paddingTop: 200 }}>
      <Link href="_sitemap">Sitemap</Link>
      <Link href="/tasks">Tasks</Link>
      <Link href="_sitemap">Sitemap</Link>
      <Link href="_sitemap">Sitemap</Link>
    </View>
  );
}
