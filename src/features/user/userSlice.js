import { createSlice } from '@reduxjs/toolkit';

const loadInitialState = () => {
  try {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      return {
        preferences: JSON.parse(savedPreferences),
      };
    }
  } catch (error) {
    console.error('Failed to load user preferences:', error);
  }
  return {
    preferences: {
      postsPerPage: 10,
      defaultSort: 'hot',
    },
  };
};

const initialState = loadInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePreferences(state, action) {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
      try {
        localStorage.setItem(
          'userPreferences',
          JSON.stringify(state.preferences)
        );
      } catch (error) {
        console.error('Failed to save user preferences:', error);
      }
    },

    resetPreferences(state) {
      state.preferences = {
        postsPerPage: 10,
        defaultSort: 'hot',
      };
      try {
        localStorage.removeItem('userPreferences');
      } catch (error) {
        console.error('Failed to reset user preferences:', error);
      }
    },
  },
});

export const { updatePreferences, resetPreferences } = userSlice.actions;

export default userSlice.reducer;
