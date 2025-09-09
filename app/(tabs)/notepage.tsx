import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import HeaderComponent from "@/components/HeaderComponent";
import SearchBarComponent from "@/components/SearchBarComponent";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { deleteNote } from "@/redux/noteSlice";
import { RootState } from "@/redux/store";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function notepage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { notes, searchTerm } = useSelector((state: RootState) => state.notes);
  //filter for searching
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //note deletion handler
  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };
  //render Notes
  const renderNote = ({
    item,
  }: {
    item: { id: string; title: string; content: string; bgColor: string };
  }) => (
    <View>
      <TouchableOpacity
        style={[styles.noteItem, { backgroundColor: item.bgColor }]}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/adnotes",
            params: { id: item.id },
          })
        }
      >
        <Text style={styles.noteTitle}>{item.title}</Text>
        <View style={styles.noteButtons}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteNote(item.id)}
          >
            <FontAwesome name="trash-o" size={24} color="black" />{" "}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
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
        onPress={() =>
          router.push({
            pathname: "/(tabs)/adnotes",
            params: { isEdit: "false" },
          })
        }
      >
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
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    height: 110,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    borderRadius: 10,
    marginTop: 20,
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
    // backgroundColor: "#3B3B3B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
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
    bottom: 100,
    right: 20,
    backgroundColor: "#252525",
    width: 56,
    height: 56,
    borderRadius: 28,
    boxShadow: "",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
