import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
            />
            <input
                type="file"
                accept="image/jpeg, image/jpg"
                onChange={(e) => setProfileImageUrl(e.target.files[0])}
                placeholder="Profile Image"
            />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default ProfileEditForm;