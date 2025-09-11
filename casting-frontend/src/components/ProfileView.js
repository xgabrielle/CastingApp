import {Link} from 'react-router-dom';
import {Typography, Card, CardContent, Box, Button} from "@mui/material";

function ProfileView({ user })
{
    return(
        <Card sx={{ maxWidth: 1000, m: "auto", p: 3 }}>
            <CardContent>
                <Typography variant="h5"
                            color="grey"
                            sx={{ fontFamily: "Oswald, sans-serif", fontWeight: "Bold" }}           
                            gutterBottom>
                    Your Profile
                </Typography>
                <br/>
            <img
                src={user?.profileImageUrl ? `http://localhost:5049${user.profileImageUrl}` : "https://placehold.co/100x100"}
                alt={"Profile"}
                style={{borderRadius: "20%", width: "100px", height: "100px"}}
            />
                
                <ProfileLayout label="Name" value={user?.profileName}/>
                <ProfileLayout label="Email" value={user?.email}/>
            <br/>    
            <Link to="edit">

                <Button
                    type="submit"
                    variant="outlined"
                    color="Black"
                    sx={{ fontFamily: "Oswald, sans-serif", fontWeight: "Bold", color: "Black" }}
                >
                    Edit Profile
                </Button>
            </Link>

            </CardContent>
        </Card>
    );
}

function ProfileLayout({label, value})
{
    return(
       <Box>
           <br/>
            <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "Oswald, sans-serif", fontWeight: "Bold" }}
            >
                {label}:
                
            </Typography>{" "}
            <Typography
                component="span"
                variant="body1"
                sx={{ fontFamily: "Oswald, sans-serif", fontWeight: "200" }}
            >
                {value}
            </Typography>
       </Box>
    );
}
export default ProfileView;
