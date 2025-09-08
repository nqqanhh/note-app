import { addNote, editNote } from "@/redux/noteSlice";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
export default function AddNoteScreen() {
  const router = useRouter();

  const { isEdit, noteId } = useLocalSearchParams<{
    isEdit?: string;
    noteId?: string;
  }>();
  const editing = isEdit === "true";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);

  const note = useSelector((state: RootState) =>
    state.notes.notes.find((n) => n.id === noteId)
  );
  useEffect(() => {
    if (editing && note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);
  const dispatch = useDispatch();
  const handleSaveNote = () => {
    if (editing && noteId) {
      const editedNote = {
        id: noteId,
        title: title.trim(),
        content: content.trim(),
      };
      dispatch(editNote(editedNote));
    } else {
      const newNote = {
        id: count.toString(),
        title: title.trim(),
        content: content.trim(),
      };
      dispatch(addNote(newNote));
      setCount((count) => count + 1);
      setTitle("");
      setContent("");
    }
    router.back();
  };
  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <IconSymbol color="black" size={40} name="arrow.backward" />
      </TouchableOpacity>
      <Text style={styles.header}>
        {editing ? "Edit Note" : "Add new Note"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
        <Text style={styles.saveText}>
          {editing ? "Update Note" : "Save Note"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 35,
    backgroundColor: "#fff",
  },
  backButton: {
    marginTop: 30,
    alignSelf: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  contentInput: {
    height: 120,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
