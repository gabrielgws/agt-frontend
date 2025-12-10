import { useAuth } from "@/context/AuthContext";
import { Button, Text, View } from "react-native";

export default function Logout() {
  const { logout } = useAuth();
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Deseja realmente sair?</Text>
      <Button title="Confirmar Logout" onPress={logout} />
    </View>
  );
}
