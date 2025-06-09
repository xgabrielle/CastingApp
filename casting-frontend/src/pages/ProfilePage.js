import { useEffect, useState } from 'react';
import ProfileView from '../components/ProfileView'
import ProfileEditForm from '../components/ProfileEditForm'
import axios from 'axios'

function ProfilePage()
{
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5049/api/profile', {
                headers: {Authorization: `Bearer ${token}`},
            });
            setUser(res.data);
        };
        fetchProfile();
    }, []);
    
    const handleSave = async (updatedUser) => {
        const token = localStorage.getItem('token');
        const res = await axios.put('http://localhost:5000/api/profile', updatedUser, {
            headers: {Authorization: `Bearer ${token}`},
        });
        setUser(res.data);
        setEditing(false);
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