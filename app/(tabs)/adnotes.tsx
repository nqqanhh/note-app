import { useDispatch, useSelector } from "react-redux";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

import { RootState } from "@/redux/store";
import { addNote, editNote } from "@/redux/noteSlice";

import { IconSymbol } from "@/components/ui/IconSymbol";

export default function AddNoteScreen() {
  const COLORS = [
    "#FD99FF",
    "#FF9E9E",
    "#91F48F",
    "#FFF599",
    "#9EFFFF",
    "#B69CFF",
  ];
  function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  const router = useRouter();
  //get params
  const { isEdit, noteId } = useLocalSearchParams<{
    isEdit?: string;
    noteId?: string;
  }>();
  const editing = isEdit === "true";

  //states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  //find specific note (for Edit)
  const note = useSelector((state: RootState) =>
    state.notes.notes.find((n) => n.id === noteId)
  );
  //show title and content (if isEdit)
  useEffect(() => {
    if (editing && note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);
  //
  const dispatch = useDispatch();
  //Note saving handler
  const handleSaveNote = () => {
    if (editing && noteId) {
      const editedNote = {
        id: noteId,
        title: title.trim(),
        content: content.trim(),
        bgColor: note?.bgColor || getRandomColor(),
      };
      dispatch(editNote(editedNote));
    } else {
      const newNote = {
        id: count.toString(),
        title: title.trim(),
        content: content.trim(),
        bgColor: getRandomColor(),
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
      <Text style={styles.header}>{editing ? "" : "Add new Note"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.contentInput}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        placeholderTextColor="#888"
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
    color: "#000000ff",
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 10,
    alignSelf: "flex-start",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: "15%",
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 40,
  },
  contentInput: {
    textAlignVertical: "top",
    padding: 12,
    fontSize: 20,
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
