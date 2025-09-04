import {Link} from 'react-router-dom';
import {Typography, Card, CardContent, Box, Button} from "@mui/material";

function ProfileView({ user })
{
    return(
        <Card sx={{ maxWidth: 1000, m: "auto", p: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Your Profile
                </Typography>
            <img
                src={user?.profileImageUrl ? `http://localhost:5049${user.profileImageUrl}` : "https://placehold.co/100x100"}
                alt={"Profile"}
                style={{borderRadius: "20%", width: "100px", height: "100px"}}
            />
                <ProfileLayout label="Name" value={user?.profileName}/>
                <ProfileLayout label="Email" value={user?.email}/>
                
            <Link to="edit">
                <Button>Edit Profile</Button>
            </Link>

            </CardContent>
        </Card>
    );
}

function ProfileLayout({label, value})
{
    return(
       <Box>
            <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 500 }}
            >
                {label}:
                
            </Typography>{" "}
            <Typography
                component="span"
                variant="body1"
                sx={{ fontWeight: 400 }}
            >
                {value}
            </Typography>
       </Box>
    );
}
export default ProfileView;
