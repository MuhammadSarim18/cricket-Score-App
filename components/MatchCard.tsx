import { View, Text, StyleSheet } from "react-native";

export default function MatchCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.result}>PAK won the match</Text>

      <View style={styles.row}>
        <View style={styles.team}>
          <Text style={styles.teamName}>PAK</Text>
          <Text style={styles.score}>120/3 (14.2)</Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.team}>
          <Text style={styles.teamName}>IND</Text>
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
    fontSize: 16,
    fontWeight: "bold",
  },
  score: {
    fontSize: 13,
    color: "#555",
  },
  vs: {
    fontWeight: "bold",
  },
  overs: {
    fontSize: 12,
    color: "#555",
    marginTop: 8,
  },
});
