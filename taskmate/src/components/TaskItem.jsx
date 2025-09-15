import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

export default function TaskItem({ task, onToggle, onDelete }) {
  // mapping warna kategori
  const categoryColors = {
    Mobile: "#38bdf8", // biru
    RPL: "#4ade80", // hijau
    IoT: "#facc15", // kuning
  };

  return (
    <TouchableOpacity onPress={() => onToggle?.(task)} activeOpacity={0.7}>
      <View style={styles.card}>
        {/* Info task */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, task.status === "done" && styles.strike]}>
            {task.title}
          </Text>
          <Text style={styles.desc}>{task.description}</Text>
          <Text style={styles.meta}>
            {task.category} • Due {task.deadline}
          </Text>
        </View>

        {/* Badge status */}
        <View
          style={[
            styles.badge,
            task.status === "todo" && styles.badgeTodo,
            task.status === "pending" && styles.badgePending,
            task.status === "done" && styles.badgeDone,
          ]}
        >
          <Text style={styles.badgeText}>
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Text>
        </View>

        {/* Tombol delete */}
        <Pressable onPress={() => onDelete?.(task)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>✕</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "600" },
  desc: { fontSize: 14, color: "#64748b" },
  meta: { fontSize: 12, color: "#94a3b8", marginTop: 4 },
  strike: { textDecorationLine: "line-through", color: "#94a3b8" },

  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  badgeText: { color: "white", fontWeight: "600" },

  badgeTodo: { backgroundColor: "#38bdf8" },
  badgePending: { backgroundColor: "#facc15" },
  badgeDone: { backgroundColor: "#22c55e" },

  deleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#ef4444",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
});
