import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import { fetchTasks, updateTask } from"../../services/TasksService";


export const getTasks = createAsyncThunk(
    "tasks/fetchAll",
    async (_, {rejectWithValue}) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await fetchTasks(accessToken);
            return response
        } catch (error) {
            throw new Error("Error fetching tasks: " + error.message)
        }
    }
)

export const updateTaskStatus = createAsyncThunk(
    "tasks/updateStatus",
    async (task, {rejectWithValue}) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const response = await updateTask(accessToken, task);
            return response
        } catch (error) {
            throw new Error("Error updating task status: " + error.message)
        }
    }
)

const initialState = {
    to_do: [],
    in_progress: [],
    qa: [],
    done: [],
    updatedTask: {},
    isLoading:false,
    error: null
}

const taskSlice = createSlice({
    name: "tasks-slice",
    initialState, 
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch all tasks
            .addCase(getTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                // Clear existing tasks
                state.to_do = [];
                state.in_progress = [];
                state.qa = [];
                state.done = [];
                // Distribute tasks into respective columns based on status
                action.payload.forEach((task) => {
                    if (task.status === "to-do") {
                        state.to_do.push(task);
                    } else if (task.status === "in-progress") {
                        state.in_progress.push(task);
                    } else if (task.status === "qa") {
                        state.qa.push(task);
                    } else if (task.status === "done") {
                        state.done.push(task);
                    }
                })
            })
            .addCase(getTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // update task status
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.updatedTask = action.payload;
            })
            .addCase(updateTaskStatus.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateTaskStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }    
})

export const tasks_list = (state) => (
    {
        to_do: state.task.to_do,
        in_progress: state.task.in_progress,
        qa: state.task.qa,
        done: state.task.done
    }
);
export default taskSlice.reducer;