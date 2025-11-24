export const authenticateUser = async (form) => {
    /**
     * POST https://api.escuelajs.co/api/v1/auth/login
        Content-Type: application/json
        {
            "email": "john@mail.com",
            "password": "changeme"
        }
    */
    try {
        const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST", 
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        return response
    } catch (error) {
        throw new Error("Invalid form")
    }
}

export const getUserProfile = async (accessToken) => {
    /**
     *  GET https://api.escuelajs.co/api/v1/auth/profile
        Authorization: Bearer {your_access_token}
    */
   const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    });
    return response
}
