import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { StyleSheet, Text, View } from "react-native";

const colorScheme = "light";
const { azulPadrao, borderColorPadrao, text, background, textWhite } =
  Colors[colorScheme];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, {user?.name}</Text>
      <Text style={styles.subtitle}>
        Aqui você encontrará estatísticas e atalhos rápidos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  welcome: { fontSize: 22, color: azulPadrao, fontWeight: "bold" },
  subtitle: { color: azulPadrao, marginTop: 8 },
});
