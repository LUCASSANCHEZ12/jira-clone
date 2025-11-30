import { Container, Typography } from "@mui/material";


export default function NotFound () {

    return (
        <Container sx={{ textAlign: 'center', marginTop: '20vh' }}>
            <Typography variant="h4" >
                404 Error Not Found
            </Typography>
        </Container>
    )
}