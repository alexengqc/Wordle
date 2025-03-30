import { Ionicons } from '@expo/vector-icons';
import {Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Platform } from 'react-native';

type OnScreenKeyboardProps = {
    onKeyPressed: (key: string) => void;
    greenLetters: string[];
    yellowLetters: string[];
    grayLetters: string[];
};

export const ENTER = 'ENTER';
export const BACKSPACE = 'BACKSPACE';

const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [ENTER, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', BACKSPACE],
];

  const OnScreenKeyboard = ({
    onKeyPressed,
    greenLetters,
    yellowLetters,
    grayLetters,
    }: OnScreenKeyboardProps)  => {
    const {width} = useWindowDimensions();
    const keyWidth = Platform.OS === 'web' ? 58 : (width - 60) / keys[0].length;
    const keyHeight = 60;
    
    const isSpecialKey = (key : string) => [ENTER, BACKSPACE].includes(key);

    const isInLetters = (key :string) => 
        [...greenLetters,...yellowLetters,...grayLetters].includes(key) 

    return (
        <View style={styles.container}>
          {keys.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((key, keyIndex) => (
                <Pressable
                  key={`key-${key}`}
                  onPress={() => onKeyPressed(key)}
                  style={({ pressed }) => [
                    styles.key,
                    { width: keyWidth, height: keyHeight, backgroundColor: '#ddd' },
                    isSpecialKey(key) && { width: keyWidth * 1.5 },
                    pressed && { backgroundColor: '#868686' },
                    {
                      backgroundColor: greenLetters.includes(key)
                        ? Colors.light.green
                        : yellowLetters.includes(key)
                        ? Colors.light.yellow
                        : grayLetters.includes(key)
                        ? Colors.light.gray
                        : '#ddd',
                    },
                    pressed && { backgroundColor: '#868686'},
                  ]}>
                  <Text
                    style={[
                      styles.keyText,
                      key === 'ENTER' && { fontSize: 12 },
                      isInLetters(key) && { color: 'white' },
                    ]}>
                    {isSpecialKey(key) ? (
                      key === ENTER ? (
                        'ENTER'
                      ) : (
                        <Ionicons name="backspace-outline" size={24} color="black" />
                      )
                    ) : (
                      key
                    )}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      );
    };   

export default OnScreenKeyboard;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    gap: 6,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  key: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  keyText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});