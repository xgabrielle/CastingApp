import CreateAdForm from '../components/CreateAdForm'
import {Typography} from "@mui/material";

function CreateAdPage()
{
    return (
        <div>
            <Typography variant="h5"
                        sx={{ fontFamily: "'Fondamento', cursive", fontWeight: "Bold" }}>
                Create Casting Ad
            </Typography>
            <CreateAdForm />
        </div>
    );
}

export default CreateAdPage;