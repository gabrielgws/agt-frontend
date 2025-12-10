import { StyleSheet, Text, View } from 'react-native';

export default function Config() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.text}>Aqui você poderá ajustar preferências futuras.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, color: '#fff', marginBottom: 20 },
  text: { color: '#ddd', fontSize: 16, marginBottom: 10 },
});
