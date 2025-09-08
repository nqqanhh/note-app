import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NoteState {
  notes: Note[];
  searchTerm: string;
  isEdit: boolean;
  editingNoteId?: string | null;
}

const initialState: NoteState = {
  notes: [],
  searchTerm: "",
  isEdit: false,
  editingNoteId: null,
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
      state.isEdit = false;
      state.editingNoteId = null;
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
    ) => {
      state.isEdit = action.payload.value;
      state.editingNoteId = action.payload.noteId ?? null;
    },
  },
});

export const { addNote, editNote, deleteNote, setSearchNote, isEditNote } =
  noteSlice.actions;
export default noteSlice.reducer;
