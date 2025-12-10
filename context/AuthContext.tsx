import api from '@/api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: number; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false);
    };
    load();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/login', { email, password });
      const { token, user } = res.data;

      if (!token || !user) {
        throw new Error('Resposta inesperada do servidor.');
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      // Redireciona ao dashboard
      router.replace('/(tabs)/dashboard');
    } catch (err: any) {
      console.log('Erro ao autenticar:', err.response?.data || err.message);
      alert('Erro ao autenticar. Verifique suas credenciais.');
    }
  };

  const logout = async () => {
    try {
      // chama endpoint logout (opcional)
      await api.post('/logout');
    } catch (e) {
      // ignore erros (p.ex. token expirado) ainda assim remove localmente
    }
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
    router.replace('/(tabs)/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
