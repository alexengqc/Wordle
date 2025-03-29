import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, FrankRuhlLibre_800ExtraBold,
  FrankRuhlLibre_500Medium,
  FrankRuhlLibre_900Black,
} from '@expo-google-fonts/frank-ruhl-libre';
import { useEffect } from "react";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Colors } from '@/constants/Colors';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from "@/utils/cache";
import Logo from '@/assets/images/nyt-logo.svg';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

// Load the fonts first before hiding the splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const router = useRouter(); 

  let [fontsLoaded] = useFonts({
    FrankRuhlLibre_800ExtraBold,
    FrankRuhlLibre_500Medium,
    FrankRuhlLibre_900Black,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded){
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name ="index" options={{headerShown: false}} />
            <Stack.Screen 
              name ="login" 
              options={{presentation: 'modal',
              headerShadowVisible: false,
              headerTitle: () => <Logo width={150} height={40}/>,
              headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name='close' size={26} color={Colors.light.gray} />
                </TouchableOpacity>
              )
              }}/>

              <Stack.Screen name="game" 
              options={{
                headerBackTitle:'Wordle', 
                headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
                title: '',
                headerBackTitleStyle: {
                  fontSize: 26,
                  fontFamily: 'FrankRuhlLibre_800ExtraBold',
                }
              }}/>


          </Stack> 
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
