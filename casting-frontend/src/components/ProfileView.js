function ProfileView({ user })
{
    return(
        <div>
            <h2>My Profile</h2>
            <img
                src={user.profileImage || "https://placehold.co/100x100"}
                alt={"Profile"}
                style={{borderRadius: "50%", width: "100px", height: "100px"}}
            />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
        </div>
    );
}

export default ProfileView;