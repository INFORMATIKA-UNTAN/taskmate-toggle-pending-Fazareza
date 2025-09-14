import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  Pressable,
} from "react-native";
import TaskItem from "../src/components/TaskItem";
import { dummyTasks } from "../src/data/dummyTasks";

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [filter, setFilter] = useState("all"); // all | todo | done

  const handleToggle = (task) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id
          ? { ...t, status: t.status === "done" ? "pending" : "done" }
          : t
      )
    );
  };

  // filter data sebelum ditampilkan
  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "todo") return t.status === "pending";
    if (filter === "done") return t.status === "done";
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        <Pressable
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => setFilter("all")}
        >
          <Text>All</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === "todo" && styles.activeFilter,
          ]}
          onPress={() => setFilter("todo")}
        >
          <Text>Todo</Text>
        </Pressable>

        <Pressable
          style={[
            styles.filterButton,
            filter === "done" && styles.activeFilter,
          ]}
          onPress={() => setFilter("done")}
        >
          <Text>Done</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { fontSize: 20, fontWeight: "700", padding: 16 },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
  },
  activeFilter: {
    backgroundColor: "#38bdf8",
  },
});
