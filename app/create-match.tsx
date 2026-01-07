import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Comfortaa_400Regular,
  Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa';

export default function CreateMatch() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [tossWonBy, setTossWonBy] = useState<"team1" | "team2" | null>(null);
  const [chooseTo, setChooseTo] = useState<"bat" | "ball" | null>(null);
  const [totalWickets, setTotalWickets] = useState("10");
  const [totalOvers, setTotalOvers] = useState("20");
  const [editingWickets, setEditingWickets] = useState(false);
  const [editingOvers, setEditingOvers] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    const matchData = {
      team1,
      team2,
      tossWonBy: tossWonBy === "team1" ? team1 : team2,
      chooseTo,
      totalWickets,
      totalOvers,
      battingTeam: 
      chooseTo === "bat"
        ? (tossWonBy === "team1" ? team1 : team2)
        : (tossWonBy === "team1" ? team2 : team1),
      bowlingTeam: 
      chooseTo === "ball"
        ? (tossWonBy === "team1" ? team1 : team2)
        : (tossWonBy === "team1" ? team2 : team1),
        createdAt: 
        new Date().toISOString(),
    }

    try{
      // Send match data to async storage
       await AsyncStorage.setItem('currentMatch',JSON.stringify(matchData));
       console.log('data saved!', matchData);
       router.push('/first-innings');
    }
    catch(error){
      console.error("Error saving match data:", error);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Match</Text>

      {/* Team 1 */}
      <Text style={styles.label}>Team 1</Text>
      <TextInput
        placeholder="Enter Team Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={team1}
        onChangeText={setTeam1}
      />

      {/* Team 2 */}
      <Text style={styles.label}>Team 2</Text>
      <TextInput
        placeholder="Enter Team Name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={team2}
        onChangeText={setTeam2}
      />

      {/* Toss */}
      <Text style={styles.label}>Toss Won by</Text>
      <View style={styles.radioRow}>
        <Radio
          label={team1 || "Team 1"}
          selected={tossWonBy === "team1"}
          onPress={() => setTossWonBy("team1")}
        />
        <Radio
          label={team2 || "Team 2"}
          selected={tossWonBy === "team2"}
          onPress={() => setTossWonBy("team2")}
        />
      </View>

      {/* Choose */}
      <Text style={styles.label}>Choose To</Text>
      <View style={styles.radioRow}>
        <Radio label="Bat" selected={chooseTo === "bat"} onPress={() => setChooseTo("bat")} />
        <Radio label="Ball" selected={chooseTo === "ball"} onPress={() => setChooseTo("ball")} />
      </View>

      {/* Match Details - Now Editable */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Match Details</Text>

        {/* Total Wickets - Editable */}
        <View style={styles.detailRow}>
          <Text>Total Wickets</Text>
          {editingWickets ? (
            <TextInput
              style={[styles.box, styles.editableBox]}
              value={totalWickets}
              onChangeText={setTotalWickets}
              keyboardType="numeric"
              maxLength={2}
              autoFocus
              onBlur={() => setEditingWickets(false)}
              onSubmitEditing={() => setEditingWickets(false)}
            />
          ) : (
            <Pressable
              style={styles.box}
              onPress={() => setEditingWickets(true)}
            >
              <Text style={styles.boxText}>{totalWickets}</Text>
            </Pressable>
          )}
        </View>

        {/* Total Overs - Editable */}
        <View style={styles.detailRow}>
          <Text>Total Overs</Text>
          {editingOvers ? (
            <TextInput
              style={[styles.box, styles.editableBox]}
              value={totalOvers}
              onChangeText={setTotalOvers}
              keyboardType="numeric"
              maxLength={3}
              autoFocus
              onBlur={() => setEditingOvers(false)}
              onSubmitEditing={() => setEditingOvers(false)}
            />
          ) : (
            <Pressable
              style={styles.box}
              onPress={() => setEditingOvers(true)}
            >
              <Text style={styles.boxText}>{totalOvers}</Text>
            </Pressable>
          )}
        </View>


      </View>

      {/* Create Button */}
      <Pressable
        style={[
          styles.button,
          (!team1 || !team2 || !tossWonBy || !chooseTo) && styles.buttonDisabled
        ]}
        onPress={handleCreate}
        disabled={!team1 || !team2 || !tossWonBy || !chooseTo}
      >
        <Text style={styles.buttonText}>Create Match</Text>
      </Pressable>
    </View>
  );
}

/* 🔘 Radio Button Component */
function Radio({ label, selected, onPress }: any) {
  return (
    <Pressable style={styles.radioItem} onPress={onPress}>
      <View style={[styles.radio, selected && styles.radioActive]} />
      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
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
    fontFamily: 'Comfortaa_700Bold'
  },
  label: {
    color: "#fff",
    marginTop: 14,
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  radioRow: {
    flexDirection: "row",
    gap: 30,
    marginVertical: 8,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  radioActive: {
    backgroundColor: "#5B3CC4",
    borderColor: "#5B3CC4",
  },
  radioLabel: {
    color: "#fff",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#D9DDE0",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  box: {
    backgroundColor: "#0A1E33",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 60,
    alignItems: "center",
  },
  editableBox: {
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
  boxText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  summary: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#999",
  },
  summaryTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 3,
    color: "#333",
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
    fontWeight: "bold",
  },
});