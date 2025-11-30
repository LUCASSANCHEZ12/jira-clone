import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

export const showSnackbar = createAsyncThunk(
    "snackbar/show",
    async ({ message, type}, {rejectWithValue}) => {
        try {
            console.log("Showing snackbar:", message, type);
            return { message, type};
        }
        catch (error) {
            throw new Error("Error showing success snackbar: " + error.message)
        }
    }
)

export const closeSnackbar = createAsyncThunk(
    "snackbar/close",
    async (_, {rejectWithValue}) => {
        try {
            return _;
        }
        catch (error) {
            throw new Error("Error showing success snackbar: " + error.message)
        }
    }
)

const initialState = {
    openSuccessSnackBar: false,
    openErrorSnackBar: false,
    openNormalSnackBar: false,
    snackBarMessage: "",
    isLoading:false,
    error: null
}

const snackbarSlice = createSlice({
    name: "snackbar-slice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Show Snackbar
            .addCase(showSnackbar.fulfilled, (state, action) => {
                state.snackBarMessage = action.payload.message;
                switch(action.payload.type) {
                    case 'success':
                        state.openSuccessSnackBar = true;
                        break;
                    case 'error':
                        state.openErrorSnackBar = true;
                        break;
                    case 'normal':
                        state.openNormalSnackBar = true;
                        break;
                    default:
                        break;
                }
            })
            .addCase(showSnackbar.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(showSnackbar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // Close Snackbar
            .addCase(closeSnackbar.fulfilled, (state, action) => {
                state.snackBarMessage = "";
                state.openSuccessSnackBar = false;
                state.openErrorSnackBar = false;
                state.openNormalSnackBar = false;
            })
            .addCase(closeSnackbar.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(closeSnackbar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
        }
});

export default snackbarSlice.reducer;
