import { useEffect, useState } from "react";
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
import { loadTasks, saveTasks } from "../src/storage/taskStorage";

export default function HomeScreen() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [filter, setFilter] = useState("all"); // all | todo | pending | done

  // useEffect → dijalankan sekali saat komponen dimount
  useEffect(() => {
    (async () => {
      const data = await loadTasks();
      if (data && data.length > 0) {
        setTasks(data);
      }
    })();
  }, []);

  // Toggle status: todo → pending → done → todo
  const handleToggle = async (task) => {
    let newStatus = "pending";

    if (task.status === "pending") {
      newStatus = "todo";
    } else if (task.status === "todo") {
      newStatus = "done";
    } else if (task.status === "done") {
      newStatus = "pending";
    }

    const updated = tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );

    setTasks(updated);
    await saveTasks(updated);
  };

  // Hapus per-item
  const handleDelete = async (task) => {
    const updated = tasks.filter((t) => t.id !== task.id);
    setTasks(updated);
    await saveTasks(updated);
  };

  // Filter data sebelum ditampilkan
  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    if (filter === "todo") return t.status === "todo";
    if (filter === "pending") return t.status === "pending";
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
            filter === "pending" && styles.activeFilter,
          ]}
          onPress={() => setFilter("pending")}
        >
          <Text>Pending</Text>
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

      {/* Daftar tugas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={handleToggle}
            onDelete={handleDelete} // hapus per item
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>Tidak ada tugas</Text>
        }
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
