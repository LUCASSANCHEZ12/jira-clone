import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { authenticateUser, getUserProfile } from "../../services/UserService";


export const authUser = createAsyncThunk(
    "auth/user",
    async (user_form, {rejectWithValue}) => {
        try {
            const response = await authenticateUser(user_form);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("userEmail", email);
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("refreshToken", data.refresh_token);
                return data;
            } else {
                throw new Error("Error authenticating user");
            }
        } catch (error) {
            throw new Error("something happend")
        }
    }
)

export const getProfile = createAsyncThunk(
    "auth/profile",
    async (_, {rejectWithValue}) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await getUserProfile(accessToken);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error("Error fetching user profile");
            }
        } catch (error) {
            return rejectWithValue("something happend: " + error.message);
        }
    }
)

const initialState = {
    user_profile: {},
    access_token: "",
    refresh_token:"",
    isLoading:false,
    error: null
}

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            // authetication cases
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.access_token = action.payload.access_token
                state.refresh_token = action.payload.refresh_token
            })
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // get profile cases
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.user_profile = action.payload
            })
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const userData = (state) => state.user.user_profile;
export default userSlice.reducer;