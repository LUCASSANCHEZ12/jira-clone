
export const fetchTasks = async (accessToken) => {
    /**
     * GET https://api.escuelajs.co/api/v1/tasks
     *   Authorization: Bearer {your_access_token}
     * 
     */
     try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
            method: "GET"
        })
        return response
    } catch (error) {
        throw new Error("Invalid form")
    }
}