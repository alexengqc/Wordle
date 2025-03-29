import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';
import Icon from '@/assets/images/wordle-icon.svg'; 
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import * as MailComposer from 'expo-mail-composer';


const Page = () => {

    const { win, word, gameField } = useLocalSearchParams<{
        win: string;
        word: string;
        gameField?: string;
    }>();

    const router = useRouter();
    const [userScore, setUserScore] = useState<any>({
        played: 10,
        wins: 5,
        currentStreak: 2,
    });

    const shareGame = () => {
        const game = JSON.parse(gameField!);
        const imageText: string[][] = [];

        const wordLetters = word.split('');
        game.forEach((row: [], rowIndex: number) => {
            imageText.push([]);
            row.forEach((letter, colIndex) => {
              if (wordLetters[colIndex] === letter) {
                imageText[rowIndex].push('🟩');
              } else if (wordLetters.includes(letter)) {
                imageText[rowIndex].push('🟨');
              } else {
                imageText[rowIndex].push('⬜');
              }
            });
        });

        console.log(imageText);

        const html = `
        <html>
            <head>
            <style>

                .game {
                display: flex;
                flex-direction: column;
                }

                .row {
                display: flex;
                flex-direction: row;
                }

                .cell {
                display: flex;
                justify-content: center;
                align-items: center;
                }

            </style>
            </head>
            <body>
            <h1>Wordle</h1>
            <div class="game">
            ${imageText
                .map(
                (row) =>
                    `<div class="row">${row
                    .map((cell) => `<div class="cell">${cell}</div>`)
                    .join('')}</div>`
                )
                .join('')}
            </div>
            </body>
        </html>
        `;

    MailComposer.composeAsync({
      subject: `Let's play Wordle together!`,
      body: html,
      isHtml: true,
    });
  };
    

    const navigateRoot = () => {
        router.dismissAll();
        router.replace('/');
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateRoot} 
            style={{
                alignSelf: 'flex-end',
            }}>
                 <Ionicons name='close' size={30} color={Colors.light.gray}/>
            </TouchableOpacity>

            <View style={styles.header}>
                { win === 'true' ? (
                    <Image source={require('@/assets/images/win.png')} />
                ) : (
                    <Icon width={100} height={70}/>
                )}

                <Text style={styles.title}>
                    {win === 'true' ? 'Congratulations!' : 'Better luck next time!'}
                </Text>

                <SignedOut>
                    <Text style={styles.text}>Want to see your stats and streaks?</Text>

                    <Link href={'/login'} style={styles.btn} asChild>
                        <TouchableOpacity>
                        <Text style={styles.btnText}>Create a free account</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href={'/login'} asChild>
                        <TouchableOpacity>
                        <Text style={styles.textLink}>Already Registered? Log In</Text>
                        </TouchableOpacity>
                    </Link>
                </SignedOut>

                <SignedIn>
                    <Text style={styles.text}>Statistics</Text>
                    <View style={styles.stats}>
                        <View>
                            <Text style={styles.score}>{userScore.played}</Text>
                            <Text style={styles.text}>Played</Text>
                        </View>
                        <View>
                            <Text style={styles.score}>{userScore.wins}</Text>
                            <Text style={styles.text}>Wins</Text>
                        </View>
                        <View>
                            <Text style={styles.score}>{userScore.currentStreak}</Text>
                            <Text style={styles.text}>Current Streak</Text>
                        </View>
                    </View>
                </SignedIn>

                <View style={{
                    height: StyleSheet.hairlineWidth,
                    width: '100%',
                    backgroundColor: "black",
                }}/>

                <TouchableOpacity onPress={shareGame} style={styles.iconBtn}>
                    <Text style={styles.btnText}>Share with friends</Text>
                    <Ionicons name='share-social' size={24} color={'#fff'}/>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Page;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    header: {
        alignItems: 'center',
        gap: 10,
    },
    title:{
        fontSize: 30,
        fontFamily: 'FrankRuhlLibre_800ExtraBold',
    },
    text:{
        fontSize: 26,
        textAlign: 'center',
        fontFamily: 'FrankRuhlLibre_500Medium',
    },
    btn:{
        justifyContent: 'center',
        borderRadius: 30,
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 1,
        width: '100%',
        backgroundColor: '#000',
    },
    btnText:{
        padding: 14,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    textLink:{
        textDecorationLine: 'underline',
        fontSize: 16,
        paddingVertical: 15,
    },
    stats:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        gap: 10,
    },
    score:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    iconBtn:{
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.green,
        borderRadius: 30,
        width: '70%',
    },
});