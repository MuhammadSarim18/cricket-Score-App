import { View, Text, StyleSheet } from "react-native";
import {
  Comfortaa_400Regular,
  Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa';
export default function MatchCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.result}>PAK won the match</Text>

      <View style={styles.row}>
        <View style={styles.team}>
          <Text style={[styles.teamName, { fontFamily: 'Comfortaa_700Bold' }]}>PAK</Text>
          <Text style={styles.score}>120/3 (14.2)</Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.team}>
          <Text style={[styles.teamName, { fontFamily: 'Comfortaa_700Bold' }]}>IND</Text>
          <Text style={styles.score}>120/3 (14.2)</Text>
        </View>
      </View>

      <Text style={styles.overs}>Total overs : 20</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#DDE1E4",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  result: {
    fontSize: 12,
    color: "#555",
    fontFamily: 'Comfortaa_700Bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  team: {
    alignItems: "center",
  },
  teamName: {
    fontSize: 18,
    fontFamily: 'Comfortaa_700Bold',
    // fontWeight: "bold",
  },
  score: {
    fontSize: 13,
    fontFamily: 'Comfortaa_700Bold',
    color: "#555",
  },
  vs: {
    fontFamily: 'Comfortaa_700Bold',
    fontWeight: "bold",
  },
  overs: {
    fontSize: 12,
    color: "#555",
    fontFamily: 'Comfortaa_700Bold',
    marginTop: 8,
  },
});
