import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import QuickActionCard from "@/components/quick-action-card";
import MatchCard from "@/components/MatchCard";
import { useFonts } from 'expo-font';
import {
  Comfortaa_400Regular,
  Comfortaa_700Bold
} from '@expo-google-fonts/comfortaa';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Comfortaa_700Bold
  });
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.heading, { fontFamily: 'Comfortaa_700Bold' }]}>Quick Actions</Text>

      <View style={styles.row}>
        <QuickActionCard title="Create Team" color="#B9F6CA" icon="👥" onPress={() => router.push("/create-match")} />
        <QuickActionCard title="Create Match" color="#F8BBD0" icon="⚔️" onPress={() => router.push("/create-match")} />
      </View>

      <View style={styles.row}>
        <QuickActionCard title="Points Table" color="#FFF59D" icon="🏆" />
        <QuickActionCard title="Match History" color="#80DEEA" icon="🕘" />
      </View>

      <Text style={[styles.heading, { fontFamily: 'Comfortaa_700Bold' }]}>Recent Matches</Text>

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
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    color: "#FFF",
    // fontSize: 18,
    // fontWeight: "bold",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
