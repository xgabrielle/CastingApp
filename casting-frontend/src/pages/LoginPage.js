import LoginForm from '../components/LoginForm'
import {Typography, Box} from "@mui/material";

function LoginPage( {onLogin} )
{
    return (
        <Box sx={{textAlign: "center", mt:4 }}>
            <Typography variant="h3" 
                sx={{
                    fontFamily: "Rancho, cursive",
                    fontWeight: "400",
                    fontStyle: "normal"
            }}>
                Welcome to Our Casting App
            </Typography>
            <LoginForm onLogin={onLogin} />
        </Box>
    );
}

export default LoginPage;