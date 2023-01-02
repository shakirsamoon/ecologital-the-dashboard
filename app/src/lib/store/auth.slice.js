import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import APP_CONFIG from '../constants/config.const';
import authService from '../services/auth.service';
import userService from '../services/user.service';

const token = localStorage.getItem(APP_CONFIG.TOKEN_PROPERTY);

const initialState = {
  token: token ?? null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  currentUser: null,
  message: '',
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.registerUser(user);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.loginUser(credentials);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (token, thunkAPI) => {
    try {
      return await authService.getCurrentUser(token);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logoutUser();
});

export const setupUserAccount = createAsyncThunk(
  'auth/setupUser',
  async ({ token, data }, thunkAPI) => {
    try {
      return await userService.setupUserAccount(token, data);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  'auth/updateData',
  async ({ token, data }, thunkAPI) => {
    try {
      return await userService.updateUserData(token, data);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserAuth = createAsyncThunk(
  'auth/updateAuth',
  async ({ token, data }, thunkAPI) => {
    try {
      return await authService.updateUserAuth(token, data);
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        if (payload.user && payload.user._id) {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.currentUser = payload.user;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.message = payload.message;
          state.isSuccess = false;
        }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
        state.isSuccess = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        if (payload.user && payload.user._id) {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.currentUser = payload.user;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.message = payload.message;
          state.isSuccess = false;
        }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
        state.isSuccess = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        if (payload.user && payload.user._id) {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.currentUser = payload.user;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.message = payload.message;
          state.isSuccess = false;
        }
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
        state.isSuccess = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.token = null;
      })
      .addCase(setupUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setupUserAccount.fulfilled, (state, { payload }) => {
        if (payload.user && payload.user._id) {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.currentUser = payload.user;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.message = payload.message;
          state.isSuccess = false;
        }
      })
      .addCase(setupUserAccount.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
        state.isSuccess = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        if (payload.user && payload.user._id) {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.currentUser = payload.user;
        } else {
          state.isLoading = false;
          state.isError = true;
          state.message = payload.message;
          state.isSuccess = false;
        }
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
        state.isSuccess = false;
      })
      .addCase(updateUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAuth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(updateUserAuth.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.message;
        state.isSuccess = false;
      });
  },
});

export const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
