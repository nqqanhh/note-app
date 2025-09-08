import HeaderComponent from "@/components/HeaderComponent";
import SearchBarComponent from "@/components/SearchBarComponent";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteNote } from "@/redux/noteSlice";
export default function notepage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { notes, searchTerm } = useSelector((state: RootState) => state.notes);
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };
  const renderNote = ({
    item,
  }: {
    item: { id: string; title: string; content: string };
  }) => (
    <View>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <View style={styles.noteButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => console.log("to edit screen")}
        >
          {/* <IconSymbol color="white" name="arrow.backward" /> */}
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteNote(item.id)}
        >
          {/* <IconSymbol color="white" name="information" /> */}
          <Text style={styles.deleteText}>delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View>
      <HeaderComponent />
      <SearchBarComponent />
      <FlatList
        data={filteredNotes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Create your first note!</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/(tabs)/adnotes")}
      >
        {/* <Text style={styles.editText}>add</Text> */}
        <IconSymbol name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  noteItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    marginBottom: 8,
  },
  noteButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#28a745",
    padding: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  editText: {
    color: "#fff",
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  deleteText: {
    color: "#fff",
    fontSize: 12,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
