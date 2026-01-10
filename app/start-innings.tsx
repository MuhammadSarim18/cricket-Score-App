import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import {
    Comfortaa_400Regular,
    Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa';

export default function StartInnings() {
    // const [match, setMatch] = useState(null);
    const [match, setMatch] = useState<Match | null>(null);

    useEffect(() => {
        const loadMatch = async () => {
            const data = await AsyncStorage.getItem('currentMatch');
            if (data) {
                setMatch(JSON.parse(data));
            }
        };
        loadMatch();
    }, []);


    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold
    });
    const [strikeBatsman, setstrikeBatsman] = useState("");
    const [nonStrikeBatsman, setnonStrikeBatsman] = useState("");
    const [bowler, setBowler] = useState("");
    const [wide, setWide] = useState(false);
    const [noBall, setNoBall] = useState(false);
    const [byes, setByes] = useState(false);
    const [legByes, setLegByes] = useState(false);
    const [wicket, setWicket] = useState(false);

    const handleCreate = () => {
        console.log("Match Created:", {
            strikeBatsman,
            nonStrikeBatsman,
            bowler,

        });

        // Here you would navigate to the match screen or save the data
    };
    type Match = {
        team1: string;
        team2: string;
        battingTeam: string;
        bowlingTeam: string;
        totalOvers: number;
        totalWickets: number;
    };

    if (!match) {
        return <Text>Loading match...</Text>;
    }

    return (
        <View style={styles.container}>

            {/* Total Overs */}
            <Text style={styles.totalOvers}>Total Overs : {match.totalOvers}</Text>

            {/* Top Score Bar */}
            <View style={styles.topBar}>
                <View>
                    <Text style={styles.teamName}>{match.battingTeam}</Text>
                    <Text style={styles.score}>0 / 0</Text>
                </View>

                <View style={styles.scorecardBtn}>
                    <Text style={styles.scorecardText}>Scorecard</Text>
                </View>

                <View>
                    <Text style={styles.teamName}>Overs</Text>
                    <Text style={styles.score}>0.0</Text>
                </View>
            </View>

            {/* Batsman Table */}
            <View style={styles.card}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>Batsman</Text>
                    <Text style={styles.headerText}>Runs</Text>
                    <Text style={styles.headerText}>Balls</Text>
                    <Text style={styles.headerText}>4s</Text>
                    <Text style={styles.headerText}>6s</Text>
                    <Text style={styles.headerText}>SR</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.cell}>Babar*</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.cell}>Rizwan</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                </View>

                {/* Bowler */}
                <View style={styles.bowlerHeader}>
                    <Text style={styles.headerText}>Bowler</Text>
                    <Text style={styles.headerText}>Over</Text>
                    <Text style={styles.headerText}>Wickets</Text>
                    <Text style={styles.headerText}>Runs</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.cell}>Shaheen</Text>
                    <Text style={styles.cell}>0.0</Text>
                    <Text style={styles.cell}>0</Text>
                    <Text style={styles.cell}>0</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionContainer}>
                <View style={styles.actionRow}>
                    <View>
                        <Pressable style={styles.grayBtn}><Text style={[{ fontFamily: 'Comfortaa_400Regular', fontSize: 16 }]}>Swap</Text></Pressable>
                        <Pressable style={styles.grayBtn}><Text style={[{ fontFamily: 'Comfortaa_400Regular', fontSize: 16 }]}>Retire</Text></Pressable>
                        <Pressable style={styles.grayBtn}><Text style={[{ fontFamily: 'Comfortaa_400Regular', fontSize: 16 }]}>End Innings</Text></Pressable>
                    </View>


                </View>
                <View style={[styles.actionRow, { flex: 1, marginLeft: 10 }]}>
                    <View style={styles.checkRow}>
                        <Pressable style={styles.checkItem} onPress={() => setWide(!wide)}>
                            <View style={[styles.checkbox, wide && styles.checked]} />
                            <Text style={styles.checkText}>Wide</Text>
                        </Pressable>

                        <Pressable style={styles.checkItem} onPress={() => setNoBall(!noBall)}>
                            <View style={[styles.checkbox, noBall && styles.checked]} />
                            <Text style={styles.checkText}>No Ball</Text>
                        </Pressable>
                    </View>

                    {/* Row 2 */}
                    <View style={styles.checkRow}>
                        <Pressable style={styles.checkItem} onPress={() => setByes(!byes)}>
                            <View style={[styles.checkbox, byes && styles.checked]} />
                            <Text style={styles.checkText}>Byes</Text>
                        </Pressable>

                        <Pressable style={styles.checkItem} onPress={() => setLegByes(!legByes)}>
                            <View style={[styles.checkbox, legByes && styles.checked]} />
                            <Text style={styles.checkText}>Leg Byes</Text>
                        </Pressable>
                    </View>

                    {/* Wicket */}
                    <Pressable style={styles.checkItem} onPress={() => setWicket(!wicket)}>
                        <View style={[styles.checkbox, wicket && styles.checked]} />
                        <Text style={styles.checkText}>Wicket</Text>
                    </Pressable>
                </View>
            </View>

            {/* Score Buttons */}
            <View style={styles.actionRow}>
                <Text style={styles.selectText}>Select Score to update</Text>

                <View style={styles.scoreButtons}>
                    {[0, 1, 2, 3, 4, 6].map((run) => (
                        <View key={run} style={styles.runBtn}>
                            <Text style={styles.runBtnText}>{run}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Extras */}
            <View style={styles.extraBox}>
                <Text style={[{ fontFamily: 'Comfortaa_400Regular', fontSize: 16 }]}>Innings Extra : 0 (0 WD, 0 No, 0 B)</Text>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#021a2d',
        padding: 16,
    },
    totalOvers: {
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 20,
        fontFamily: 'Comfortaa_700Bold',
    },
    topBar: {
        backgroundColor: '#dcdfe1',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    teamName: {
        fontFamily: 'Comfortaa_700Bold',
        fontSize: 16,
    },
    score: {
        fontSize: 18,
        fontFamily: 'Comfortaa_700Bold',
    },
    scorecardBtn: {
        backgroundColor: '#5b3cc4',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 6,
    },
    scorecardText: {
        color: '#fff',
        fontFamily: 'Comfortaa_700Bold',
        fontSize: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginTop: 14,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#D7D7D7',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 4,
    },
    bowlerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderBottomColor: '#D7D7D7',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingBottom: 4,
    },
    headerText: {
        color: '#5b3cc4',
        flex: 1,
        fontFamily: 'Comfortaa_700Bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    cell: {
        flex: 1,
        fontFamily: 'Comfortaa_400Regular',
        textAlign: 'center',
    },
    actionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionRow: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 14,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
    },
    grayBtn: {
        backgroundColor: '#d3d6d9',
        padding: 8,
        borderRadius: 6,
        marginVertical: 4,
        alignItems: 'center',
    },
    selectText: {
        textAlign: 'center',
        marginTop: 14,
        fontFamily: 'Comfortaa_700Bold',
    },
    scoreButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    runBtn: {
        backgroundColor: '#d3d6d9',
        width: 40,
        height: 30,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    runBtnText: {
        fontFamily: 'Comfortaa_400Regular',
        fontSize: 14,
    },
    extraBox: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    checkRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 8,
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // width: '48%',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 2,
        borderColor: '#444',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#5b3cc4',
    },
    checkText: {
        fontSize: 14,
        fontFamily: 'Comfortaa_400Regular',
    },
});
