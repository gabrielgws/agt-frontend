import AgtLogoBranco from "@/assets/images/agt-logo-branco";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const colorScheme = "light";
const { azulPadrao, borderColorPadrao, text, background, textWhite } =
  Colors[colorScheme];

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      // navegação está no login() do context
    } catch (err: any) {
      const message =
        err?.response?.data?.message ??
        "Erro ao autenticar. Verifique suas credenciais.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AgtLogoBranco style={styles.agtLogo} fill="white" />
        <View style={styles.boxForm}>
          <View>
            <Text style={styles.Pform}>
              Nome de usuário ou endereço de e-mail
            </Text>
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.inputForm}
            />
          </View>

          <View>
            <Text style={styles.Pform}>Senha</Text>
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.inputForm}
            />
          </View>
          <View style={styles.ButtonForm}>
            <TouchableOpacity
              style={[styles.ButtonForm, loading && styles.ButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.ButtonText}>
                {loading ? "Entrando..." : "Entrar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: azulPadrao,
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: azulPadrao,
  },
  agtLogo: {
    marginBottom: 20,
  },
  boxForm: {
    backgroundColor: background,
    borderRadius: 8,
    padding: 26,
    minWidth: 200,
    borderColor: borderColorPadrao,
    borderWidth: 1,
  },
  Pform: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 400,
    color: text,
  },
  inputForm: {
    minHeight: 40,
    borderWidth: 1,
    borderColor: borderColorPadrao,
    marginBottom: 16,
    padding: 8,
    borderRadius: 6,
    color: text,
  },
  ButtonForm: {
    backgroundColor: azulPadrao,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  ButtonText: {
    color: textWhite,
    fontWeight: "600",
  },
  ButtonDisabled: {
    opacity: 0.7,
  },
});
