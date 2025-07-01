import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TestRes } from '../pages/MockTest';

interface TestState {
  currentTest: TestRes | null;
}

const initialState: TestState = {
  currentTest: null,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestData: (state, action: PayloadAction<TestRes>) => {
      state.currentTest = action.payload;
    },
    clearTestData: (state) => {
      state.currentTest = null;
    },
  },
});

export const { setTestData, clearTestData } = testSlice.actions;
export default testSlice.reducer;