import { Text, View, StyleSheet, Touchable, TouchableOpacity, useColorScheme } from "react-native";
import Icon from '@/assets/images/wordle-icon.svg';
import { useRef } from 'react';
import { Link } from 'expo-router';
import { format} from 'date-fns';
import { Colors} from '@/constants/Colors';
import ThemedText from "@/components/ThemedText";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import Animated, { FadeIn, FadeInDown, FadeInLeft } from "react-native-reanimated";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const {signOut} = useAuth();

  return (
    <View style={[styles.container, {backgroundColor}]}>

      <Animated.View style={styles.header} entering={FadeInDown}>
        <Icon width={100} height={100} />
        <ThemedText style={styles.title}>Wordle Game Project</ThemedText>
        <ThemedText style={styles.text}>Get 6 chances to guess a 5 letter word.</ThemedText>
      </Animated.View>

      <View style={styles.menu}>

        <Link 
          href={'/game'} 
          style={[styles.btn, {backgroundColor: colorScheme === 'light' ? '#000' : '#4a4a4a'}]} 
          asChild>
          <AnimatedTouchableOpacity entering={FadeInLeft.delay(200)}>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </AnimatedTouchableOpacity>
        </Link>

        <SignedOut>
          <Link href={'/login'} style={[styles.btn, {borderColor: textColor}]} asChild>
            <AnimatedTouchableOpacity entering={FadeInLeft.delay(400)}>
              <ThemedText style={styles.btnText}>Log In</ThemedText>
            </AnimatedTouchableOpacity>
          </Link>
        </SignedOut>

        <SignedIn>
          <AnimatedTouchableOpacity entering={FadeInLeft.delay(600)} style={[styles.btn, {borderColor: textColor}]}
            onPress={() => signOut()}>
              <ThemedText style={styles.btnText}>Sign Out</ThemedText>
          </AnimatedTouchableOpacity>
        </SignedIn>

      </View>

      <Animated.View entering={FadeIn.delay(800)} style={styles.footer}>
        <ThemedText style={styles.footerDate}>{format(new Date(), 'd MMMM yyyy')}</ThemedText>
        <ThemedText style={styles.footerText}>Made by Quanchao</ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    gap: 40,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  title:{
    fontSize: 40,
    fontFamily: 'FrankRuhlLibre_800ExtraBold',
  },
  text:{
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'FrankRuhlLibre_500Medium',
  },
  menu:{
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  btn: {
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    width: '60%',
    maxWidth: 200,
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#333',
  },
  primaryItem: {
    backgroundColor: '#000',
  },
  primaryText: {
    color: '#fff',
  },
  footer:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText:{
    fontSize: 14,
  },
  footerDate:{
    fontSize: 14,
    fontWeight: 'bold',
  }
});
