import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {Typography} from "@mui/material";

function ProfileEditForm({ user, onSave})
{
    const navigate = useNavigate();
    const [profileName, setProfileName] = useState(user?.profileName || user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [location, setLocation] = useState(user?.location || '');
    const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append("profileName", profileName);
        formData.append("email", email);
        formData.append("location", location);
        if (profileImageUrl){
            formData.append("profileImageUrl", profileImageUrl)
        }
        onSave(formData);
        navigate('api/Profile');
    };
    
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 0.5, width: '50ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}>

            <Typography variant="h4" gutterBottom>
                Edit Profile
            </Typography>
            <TextField
                type="text"
                id="filled-disabled"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Name"
                variant="filled"
            />
            <TextField
                type="email"
                id="filled-disabled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                variant="filled"
            />
            <TextField
                type="text"
                id="filled-disabled"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                variant="filled"
            />
            <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCameraIcon/>}
            >
                Upload Photo
            <input
                type="file"
                hidden
                accept="image/jpeg, image/jpg"
                onChange={(e) => setProfileImageUrl(e.target.files[0])}
                placeholder="Profile Image"
            />
            </Button>
            <Button 
                type="submit"
                variant="contained"
                color="success"
            >Save Changes</Button>
        </Box>
    );
}

export default ProfileEditForm;