import { useEffect, useState } from "react";
import tasks from "./Data JSON/tasks.json"

const STORAGE_KEY = "tasks_data";

export const saveTasksLS = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const saved = localStorage.getItem(STORAGE_KEY);
if (!saved){
    saveTasksLS(tasks.slice(0, 3));
} // initialize localStorage with first 3 tasks

export const fetchTasks = async (accessToken) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
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

export const updateTask = async (accessToken, { id, status }) => {
    // get local tasks
    const tasks = await fetchTasks();
    const next_state = status === "in-progress" ? "qa" : "done" 

    const updatedTasks = tasks.map(task =>
        task.id === id
            ? { ...task, status, next_state: status === "done" ? null : next_state }
            : task
    );
    // save state in localStorage
    saveTasksLS(updatedTasks);
    // return updated task
    return updatedTasks.find(t => t.id === id);
};

export const getById = async (accessToken, id) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    setInterval(() => {}, 2000);
    const tasks = await fetchTasks(accessToken);
    const task = tasks.find((task) => task.id === id);
    return task;
}

