import { Navigate } from "react-router";
import { authenticateUser } from "../../services/UserService";
import { useState } from "react";
import { Box, Container, Paper,Typography, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { authUser } from "../../store/slices/userSlice"

export default function Login() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        dispatch(authUser({email, password}))
        .unwrap()
        .then(() => {
            setIsAuthenticated(true);
        })
        .catch(() => {
            setError(true);
        });
    }

    if (isAuthenticated) {
        return (<Navigate to="/project/dashboard" replace={true} />);
    }

    return (
        <>

            <Container component="main" sx={{ height: "90vh", display: "flex", flexDirection:"column", gap:4 ,alignItems: "center", justifyContent: "center", }}>
                <Typography variant="h4" fontWeight="bold" fontFamily="sans-serif">
                    Jira Clone
                </Typography>
                <Typography variant="h5" fontWeight="bold" fontFamily="sans-serif">
                    Showcase Project Repo
                </Typography>
                <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        {error && <Typography component="h6" variant="h6" style={{ color: 'red' }}>Invalid email or password</Typography>}
                        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                Sign In
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}