
import { Drawer } from 'expo-router/drawer';
import { ThemeProvider, useTheme } from '../theme/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppDrawer />
    </ThemeProvider>
  );
}

function AppDrawer() {
  const { colors } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: 'Game' }}
      />
      <Drawer.Screen
        name="settings"
        options={{ title: 'Settings' }}
      />
      <Drawer.Screen
        name="about"
        options={{ title: 'About' }}
      />
    </Drawer>
  );
}