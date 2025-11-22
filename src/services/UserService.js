export const authenticateUser = async (email, password) => {
    /**
     * POST https://api.escuelajs.co/api/v1/auth/login
        Content-Type: application/json

        {
        "email": "john@mail.com",
        "password": "changeme"
        }
    */
    const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return response
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
