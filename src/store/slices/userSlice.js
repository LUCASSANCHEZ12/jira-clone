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
    user_email: "",
    user_psswd: "",
    user_name: "",
    user_role: "",
    user_avatar: "",
    user_id: 0,
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
                state.user_name = action.payload.name;
                state.user_role = action.payload.role;
                state.user_avatar = action.payload.avatar;
                state.user_id = action.payload.id;
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

export const userData = (state) => (
    {
        email: state.user.user_email,
        name: state.user.user_name,
        role: state.user.user_role,
        avatar: state.user.user_avatar,
        id: state.user.user_id,
    }
)
export default userSlice.reducer;