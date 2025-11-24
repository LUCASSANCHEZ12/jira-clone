import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { authenticateUser } from "../../services/UserService";


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

const initialState = {
    user_email: "",
    user_psswd: "",
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

    }
})

export default userSlice.reducer;