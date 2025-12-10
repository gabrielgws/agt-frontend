// app/(tabs)/blog/_layout.tsx
import { Stack } from 'expo-router';

export default function BlogLayout() {
  return (
    <Stack>
      {/* Página principal do Blog (lista) */}
      <Stack.Screen name="index" options={{ title: 'Blog', headerShown: false }} />

      {/* Página do post individual (sem header) */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
