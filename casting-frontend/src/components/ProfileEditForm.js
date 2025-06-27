import { useState } from 'react'

function ProfileEditForm({ user, onSave})
{
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [location, setLocation] = useState(user?.location || '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ name, email, location });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
            />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="Location"
            />
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default ProfileEditForm;