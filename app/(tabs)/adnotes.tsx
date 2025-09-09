import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { addNote, editNote } from "@/redux/noteSlice";
import { RootState } from "@/redux/store";

import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

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

  //
  const router = useRouter();
  //states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const { notes } = useSelector((state: RootState) => state.notes);
  const isEditing = !!id;
  const existingNote = isEditing ? notes.find((note) => note.id === id) : null;

  useEffect(() => {
    if (isEditing && existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [isEditing, existingNote]);

  const handleSaveNote = () => {
    if (title.trim() === "" || content.trim() === "") {
      Alert.alert("Error", "Please fill in both title and content.");
      return;
    }

    if (isEditing && existingNote) {
      const updatedNote = {
        id: existingNote.id,
        title: title.trim(),
        content: content.trim(),
        bgColor: existingNote?.bgColor || getRandomColor(),
      };
      dispatch(editNote(updatedNote));
    } else {
      const newNote = {
        id: count.toString(),
        title: title.trim(),
        content: content.trim(),
        bgColor: getRandomColor(),
      };
      dispatch(addNote(newNote));
      setCount((count) => count + 1);
    }

    setTitle("");
    setContent("");
    router.back();
  };
  //check if anything has changed
  const hasChange = () => {
    if (!isEditing) return title.trim() !== "" || content.trim() !== "";
    return title !== existingNote?.title || content !== existingNote?.content;
  };

  const isEmpty = () => {
    return title.trim() === "" || content.trim() === "";
  };
  const handleDiscard = () => {
    if (!isEditing) {
      setTitle(""), setContent("");
    }
    router.replace("/(tabs)/notepage");
    router.reload;
  };
  const handleBack = () => {
    if (hasChange()) {
      Alert.alert(
        "Discard changes",
        "You have unsaved changes. Are you sure you want to discard them?",
        [
          { text: "Keep", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: handleDiscard,
          },
        ]
      );
    } else {
      router.back();
    }
  };
  const handleSave = () => {
    if (hasChange()) {
      Alert.alert("Save changes", "Are you sure you want to save ?", [
        {
          text: "Save",
          style: "cancel",
          onPress: handleSaveNote,
        },
        {
          text: "No",
          style: "destructive",
          onPress: () => console.log("cancelled saving"),
        },
      ]);
    } else {
      router.back();
    }
  };
  return (
    <View>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back-sharp" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.header}>{isEditing ? "" : "Add new Note"}</Text>
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
      {isEmpty() ? (
        <TouchableOpacity style={styles.saveButtonDisabled} disabled>
          <AntDesign name="save" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <AntDesign name="save" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    padding: 12,
    top: 70,
    left: 10,
    alignSelf: "flex-start",
    backgroundColor: "#3B3B3B",
    borderRadius: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: "20%",
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
    position: "absolute",
    top: 70,
    right: 12,
    backgroundColor: "#3B3B3B",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonDisabled: {
    position: "absolute",
    top: 70,
    right: 12,
    backgroundColor: "#ffffffff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});
