import { useAuth } from '@/context/AuthContext';
import { StyleSheet, Text, View } from 'react-native';

export default function Perfil() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.text}>Nome: {user?.name}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, color: '#fff', marginBottom: 20 },
  text: { color: '#ddd', fontSize: 16, marginBottom: 10 },
});
