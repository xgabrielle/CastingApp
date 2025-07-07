import { useEffect, useState } from 'react';
import ProfileView from '../components/ProfileView'
import ProfileEditForm from '../components/ProfileEditForm'
import API from '../api/axios'
import {Routes, Route, useNavigate } from 'react-router-dom';

function ProfilePage()
{
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    
    if (!user) return <p>Loading..</p>;
    
    return (
        <div>
            <Routes>
                <Route index element={<ProfileView user={user}/>}/>
                <Route path="edit" element={<ProfileEditForm user={user} onSave={handleSave}/>}/>
            </Routes>
        </div>
    );
}

export default ProfilePage;