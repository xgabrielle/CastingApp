import LoginForm from '../components/LoginForm'
import {Typography, Box} from "@mui/material";

function LoginPage( {onLogin} )
{
    return (
        <Box sx={{textAlign: "center", mt:4 }}>
            <Typography variant="h3" 
                sx={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: "Bold",
                    fontStyle: "normal"
            }}>
                Welcome to Our Casting App
            </Typography>
            <br/>
            <LoginForm onLogin={onLogin} />
        </Box>
    );
}

export default LoginPage;