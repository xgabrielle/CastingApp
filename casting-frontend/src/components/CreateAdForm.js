import { useState } from 'react';
import API from '../api/axios';
import {TextField, Button, Box} from "@mui/material";

export default function CreateAdForm() {
    const [title, setTitle] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const [error, setError] = useState({title:'', userName:'', description:'', pdfFile:''});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('AdTitle', title);
        formData.append('UserName', userName);
        formData.append('Description', description);
        formData.append('PdfFile', pdfFile);
        if (pdfFile) formData.append('PdfFile', pdfFile);
        let newErrors = {title:'', userName:'', description:'',pdfFile:''}
        
        let hasError = false;
        if (!title.trim()){
            hasError = true;
            newErrors.title = "Ad title needed"   
        }
        if (!userName.trim()) {
            hasError = true;
            newErrors.userName = "Username is required";
        }

        if (!description.trim()) {
            hasError = true;
            newErrors.description = "Description is required";
        }

        if (!pdfFile) {
            hasError = true;
            newErrors.pdfFile = "Please upload a PDF file";
        }
        setError(newErrors);
        if (hasError) return;
        try {
            const res = await API.post('/castad', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Ad created:', res.data);
            alert('Ad created successfully!');
            // Clear form
            setTitle('');
            setUserName('');
            setDescription('');
            setPdfFile(null);
        } catch (err) {
           
            console.error('Failed to create ad:', err);
            if (err.response?.status === 401) {
                alert('Please log in first');
            } else if (err.response?.status === 404) {
                alert('API endpoint not found. Please check if the backend is running.');
            } else {
                alert('Failed to create ad: ' + (err.response?.data || err.message));
            }
        }
    };

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1.5, width: '30ch' } }}
            onSubmit={handleSubmit}>
            <TextField
                type="text"
                placeholder="Ad Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full"
                variant="standard"
                error={Boolean(error.title)}
                helperText={error.title}
                
            />
            <br/>
            
            <TextField
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 w-full"
                variant="standard"
                error={Boolean(error.userName)}
                helperText={error.userName}
            />
            <br/>
            <TextField
                placeholder="Ad Description"
                value={description}
                id="standard-multiline-flexible"
                multiline
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
                error={Boolean(error.description)}
                helperText={error.description}
            />
            <br/>
            <TextField
                type="file"
                accept=".pdf"
                variant="standard"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="block"
                error={Boolean(error.pdfFile)}
                helperText={error.pdfFile}
            />
            <br/>
            <br/>
            <Button
                type="submit"
                variant="outlined"
                color="black"
                sx={{ fontFamily: "Oswald, sans-serif", fontWeight: "Bold" }}
                >
                Create Ad
            </Button>
        </Box>
    );
}
