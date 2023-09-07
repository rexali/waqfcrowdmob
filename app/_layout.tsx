import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import stores from '../stores/stores';
import { useJWToken } from '../hooks/useJWToken';
import { StatusBar } from 'expo-status-bar';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',

};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Provider store={stores}>
        <StatusBar style="light" backgroundColor='green' />
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(donations)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="news" options={{ headerShown: false }} />
            <Stack.Screen name="partners" options={{ headerShown: false }} />
            <Stack.Screen name="volunteers" options={{ headerShown: false }} />
            <Stack.Screen name="beneficiaries" options={{ headerShown: false }} />
            <Stack.Screen name="helptabs" options={{ headerShown: true, title: "helps" }} />
            <Stack.Screen name="abouts" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="(users)" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="(settings)" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="modal" options={{ headerShown: false, presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default function RootLayout() {

  useJWToken();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

