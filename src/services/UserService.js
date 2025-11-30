import users from "./Data JSON/user.json"

const USERS_STORAGE_KEY = "users_data";

const saved = localStorage.getItem(USERS_STORAGE_KEY);
if (!saved) localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

export const authenticateUser = async (form) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    setInterval(() => {}, 2000);
    const usersData = localStorage.getItem(USERS_STORAGE_KEY);
    console.log("Users data:", form);
    if (!usersData) throw new Error("No users data found");
    const { email, password } = form;
    const users = JSON.parse(usersData);
    const user = users.find(u => u.email === email && u.password === password);
    console.log("Authenticated user:", user);
    if (!user) throw new Error("Invalid email or password");
    const savedToken = localStorage.getItem("accessToken");
    if (!savedToken) localStorage.setItem("accessToken", "dummy_token_12345");

    // save role and email in local storage
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userEmail", user.email);
    
    const savedRefreshToken = localStorage.getItem("refreshToken");
    if (!savedRefreshToken) localStorage.setItem("refreshToken", "dummy_token_12345");
    return {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken")
    };
}

export const getUserProfile = async (accessToken, userEmail) => {
    // using .json files to simulate API calls
    // wait 2 seconds to simulate network delay
    const usersData = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersData) throw new Error("No users data found");
    const users = JSON.parse(usersData);
    // in real scenario, we would decode the token to get user id
    const user = users.find(u => u.email === userEmail );
    return user;
}
