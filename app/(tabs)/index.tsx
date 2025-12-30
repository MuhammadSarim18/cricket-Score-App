import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import QuickActionCard from "@/components/quick-action-card";
import MatchCard from "@/components/MatchCard";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Quick Actions</Text>

      <View style={styles.row}>
        <QuickActionCard title="Create Team" color="#B9F6CA" icon="👥"  onPress={() => router.push("/create-match")}/>
        <QuickActionCard title="Create Match" color="#F8BBD0" icon="⚔️"  onPress={() => router.push("/create-match")}/>
      </View>

      <View style={styles.row}>
        <QuickActionCard title="Points Table" color="#FFF59D" icon="🏆" />
        <QuickActionCard title="Match History" color="#80DEEA" icon="🕘" />
      </View>

      <Text style={styles.heading}>Recent Matches</Text>

      <MatchCard />
      <MatchCard />
      <MatchCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A2D",
    padding: 16,
  },
  heading: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
