import {Link} from 'react-router-dom';
function ProfileView({ user })
{
    return(
        <div>
            <h2>My Profile</h2>
            <img
                src={user.profileImageUrl || "https://placehold.co/100x100"}
                alt={"Profile"}
                style={{borderRadius: "50%", width: "100px", height: "100px"}}
            />
            <p><strong>Name:</strong> {user.profileName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <Link to="edit">
                <button>Edit Profile</button>
            </Link>
        </div>
    );
}

export default ProfileView;