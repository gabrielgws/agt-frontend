import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { Drawer } from 'expo-router/drawer';

export default function DashboardLayout() {
  const { logout } = useAuth();
  const colorScheme = 'light';
  const { azulPadrao } = Colors[colorScheme];

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: azulPadrao },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: azulPadrao },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ccc',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: 'Início' }}
      />
      <Drawer.Screen
        name="perfil"
        options={{ title: 'Meu Perfil' }}
      />
      <Drawer.Screen
        name="config"
        options={{ title: 'Configurações' }}
      />
      <Drawer.Screen
        name="logout"
        options={{
          title: 'Logout',
          drawerLabelStyle: {  },
        }}
        listeners={{
          focus: () => logout(),
        }}
      />
    </Drawer>
  );
}
