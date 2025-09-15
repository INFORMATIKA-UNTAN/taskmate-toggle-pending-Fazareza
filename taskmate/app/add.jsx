import { useState } from "react";
import { Button, TextInput, Alert, View, Text, StyleSheet } from "react-native";
import { loadTasks, saveTasks } from "../src/storage/taskStorage";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "expo-router";
export default function Add() {
  const router = useRouter(); // router untuk navigasi
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Judul Tugas Gak Boleh Kosong!");
      return;
    }

    const tasks = await loadTasks();
    const newTask = {
      id: uuidv4(), // generate id unik
      title,
      description: desc,
      category: "Umum",
      deadline: "2025-09-30",
      status: "pending",
    };
    const updated = [...tasks, newTask]; //gabungkan data lama + baru
    await saveTasks(updated); // simpan ke storage
    Alert.alert("Sukses", "Tugas Berhasil Ditambahkan");

    setTitle(""); // reset form
    setDesc("");
    router.push("/"); // kembali ke halaman utama
  };
  // Tampilan UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tugas</Text>

      <Text style={styles.label}>Judul</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Contoh: Tugas Mobile"
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={desc}
        onChangeText={setDesc}
        placeholder="Deskripsi singkat"
        multiline
      />
      <Button title="Simpan Tugas" onPress={handleAdd} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 12 },
  label: { marginTop: 12, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
});
