import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import {
  Comfortaa_400Regular,
  Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa';

export default function FirstInnings() {
  // const [match, setMatch] = useState(null);
  const [match, setMatch] = useState<Match | null>(null);
  const router = useRouter();

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

  const handleCreate = () => {
    console.log("Match Created:", {
      strikeBatsman,
      nonStrikeBatsman,
      bowler,

    });
    router.push('/start-innings');

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
      <Text style={styles.heading}>Start First Innings</Text>

      {/* Strike Batsman */}
      <Text style={styles.label}>{match?.battingTeam}</Text>
      <Text style={styles.label}>Strike Batsman</Text>
      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={strikeBatsman}
        onChangeText={setstrikeBatsman}
      />

      {/* Non-Strike Batsman */}
      <Text style={styles.label}>Non-Strike Batsman</Text>
      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={nonStrikeBatsman}
        onChangeText={setnonStrikeBatsman}
      />

      {/* Bowler */}
      <Text style={styles.label}>{match.bowlingTeam}</Text>
      <Text style={styles.label}>Bowler</Text>
      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={bowler}
        onChangeText={setBowler}
      />




      {/* Create Button */}
      <Pressable
        style={[
          styles.button,
          (!strikeBatsman || !nonStrikeBatsman || !bowler) && styles.buttonDisabled
        ]}
        onPress={handleCreate}
        disabled={!strikeBatsman || !nonStrikeBatsman || !bowler}
      >
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A2D",
    padding: 16,
  },
  heading: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    fontFamily: 'Comfortaa_700Bold',
  },
  label: {
    color: "#fff",
    marginTop: 14,
    marginBottom: 6,
    fontSize: 16,
    fontFamily: 'Comfortaa_400Regular',
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Comfortaa_400Regular',
  },
  button: {
    backgroundColor: "#5B3CC4",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: "#666",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'Comfortaa_700Bold',
  },
});