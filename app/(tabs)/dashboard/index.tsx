import { useAuth } from '@/context/AuthContext';
import { StyleSheet, Text, View } from 'react-native';

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {user?.name}</Text>
      <Text style={styles.subtitle}>Aqui você encontrará estatísticas e atalhos rápidos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcome: { fontSize: 22, color: '#fff', fontWeight: 'bold' },
  subtitle: { color: '#ddd', marginTop: 8 },
});
