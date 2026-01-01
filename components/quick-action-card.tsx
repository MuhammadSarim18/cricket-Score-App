import { View, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  title: string;
  color: string;
  icon: string;
  onPress?: () => void;
};

export default function QuickActionCard({ title, color, icon, onPress }: Props) {
  return (
    <Pressable style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    height: 90,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 26,
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    // fontWeight: "600",
    fontFamily: 'Comfortaa_700Bold',
  },
});
