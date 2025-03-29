import { StyleSheet, Text, View,useColorScheme } from 'react-native'
import { Colors } from '@/constants/Colors';
import { Stack, useRouter} from 'expo-router';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


const ROWS = 6;

const Page = () => {
    const colorScheme = useColorScheme();
    const backgroundColor = Colors[colorScheme ?? 'light'].gameBg;
    const textColor = Colors[colorScheme ?? 'light'].text;
    const grayColor = Colors[colorScheme ?? 'light'].gray;
    const router = useRouter();

    const [rows, setRows] = useState<string[][]>(new Array(ROWS).fill(new Array(5).fill('')));
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, _setCurrentCol] = useState(0);

    const [greenLetters, setGreenLetters] = useState<string[]>([]);
    const [yellowLetters, setYellowLetters] = useState<string[]>([]);
    const [grayLetters, setGrayLetters] = useState<string[]>([]);

    const addKey = (key:string) => {
        console.log('addKey', key);
        //To Do
    };

    return (
        <View style={[styles.container, {backgroundColor}]}>
            <Stack.Screen
                options={{
                headerRight: () => (
                    <View style={styles.headerIcons}>
                        <Ionicons name="help-circle-outline" size={28} color={textColor}/>
                        <Ionicons name="podium-outline" size={24} color={textColor}/>
                        <Ionicons name="settings-sharp" size={24} color={textColor}/>
                    </View>),}}/>

                    <View style={styles.gameField}>
                        {rows.map((row, rowIndex) => (
                            <View style={styles.gameFieldRow} key={`row-${rowIndex}`}>
                                {row.map((cell, cellIndex) => (
                                    <View style={styles.cell} key={`cell-${rowIndex}-${cellIndex}`}>
                                        <Text style={styles.cellText}>{cell}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                    
            <Text>Page</Text>
        </View>
    );
};

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 10,
    },
    gameField: {
        alignItems: 'center',
        gap: 8,
    },
    gameFieldRow: {
        flexDirection: 'row',
        gap: 8,
    },
    cell: {
        backgroundColor: '#fff',
        width: 62,
        height: 62,
        borderWidth:2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellText: {
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
})