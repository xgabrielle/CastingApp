import { useEffect, useState } from 'react';
import ProfileView from '../components/ProfileView'
import ProfileEditForm from '../components/ProfileEditForm'
import API from '../api/axios'

function ProfilePage()
{
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/profile');
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);
    
    const handleSave = async (updatedUser) => {
        try {
            const res = await API.put('/profile', updatedUser);
            setUser(res.data);
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    if (!user) return <p>Loading..</p>;
    
    return (
        <div>
            {editing ? (
                <ProfileEditForm user={user} onSave={handleSave} />
            ) : (
                <>
                <ProfileView user={user} />
                <button onClick={() => setEditing(true)}>Edit Profile</button>
                </>
            )}
        </div>
    );
}

export default ProfilePage;