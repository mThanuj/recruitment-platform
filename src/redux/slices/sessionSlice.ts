import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserSelect } from "@/db/schema";

export interface SessionState {
  session: UserSelect | null;
}

const initialState: SessionState = {
  session: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<UserSelect>) => {
      state.session = action.payload;
    },
    clearSession: (state) => {
      state.session = null;
    },
  },
});

export const { addSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
