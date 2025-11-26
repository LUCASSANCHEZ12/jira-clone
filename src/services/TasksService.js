import tasks from "./Data JSON/tasks.json"

export const fetchTasks = async (accessToken) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    setInterval(() => {}, 2000);
    const response = tasks;
    return response.slice(0,10);
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

export const updateTask = async (accessToken, {id, status}) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    setInterval(() => {}, 2000);
    
    tasks.map((task) => {
        console.log(task);
        if (task.id === id) {
            task.status = status;
        }
        console.log(task);
        return task;
    });

    const updatedTask = tasks.find((task) => task.id === id);
    return updatedTask;
}

