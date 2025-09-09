import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  content: string;
  bgColor: string;
}

interface NoteState {
  notes: Note[];
  searchTerm: string;
}

const initialState: NoteState = {
  notes: [],
  searchTerm: "",
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setSearchNote: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    isEditNote: (
      state,
      action: PayloadAction<{ value: boolean; noteId?: string }>
    ) => {},
  },
});

export const { addNote, editNote, deleteNote, setSearchNote, isEditNote } =
  noteSlice.actions;
export default noteSlice.reducer;
