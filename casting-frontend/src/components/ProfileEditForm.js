import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileEditForm({ user, onSave})
{
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [location, setLocation] = useState(user?.location || '');
    const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email, location, profileImageUrl });
        navigate('api/Profile');
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
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
                onChange={(e) => setProfileImageUrl(e.target.value)}
                placeholder="Profile Image"
            />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default ProfileEditForm;