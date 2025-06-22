import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

export type MCQ = {
  question: string;
  options: Record<MCQOptionKey, string>;
  correctAnswer: MCQOptionKey;
  explanation: string;
};

export type MCQOptionKey = "A" | "B" | "C" | "D";

export interface TestState {
  data: MCQ[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestState = {
    data: null,
    loading: false,
    error: null,
}

export const mockTestSlice=createSlice({
    name: 'mockTest',
    initialState,
    reducers: {
        setMockTestData(state,action: PayloadAction<MCQ[]>) {
            state.data = action.payload;
        },
        clearMockTestData(state) {
            state.data = null;
        }
    }
})

export const { setMockTestData, clearMockTestData } = mockTestSlice.actions;
export default mockTestSlice.reducer;