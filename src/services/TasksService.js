import tasks from "./Data JSON/tasks.json"

export const fetchTasks = async (accessToken) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    setInterval(() => {}, 2000);
    const response = tasks;
    return response;
}

export const createTask = async (taskData, accessToken) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    setInterval(() => {}, 2000);
    const response = {
        ...taskData,
        id: Math.floor(Math.random() * 10000) // generate random id
    };
    return response;
}