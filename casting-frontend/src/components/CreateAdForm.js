import { useState } from 'react';
import API from '../api/axios';

export default function CreateAdForm() {
    const [title, setTitle] = useState('');
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('AdTitle', title);
        formData.append('UserName', userName);
        formData.append('Description', description);
        formData.append('PdfFile', pdfFile);
        if (pdfFile) formData.append('PdfFile', pdfFile);

        try {
            const res = await API.post('/castad', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Ad created:', res.data);
            alert('Ad created successfully!');
            // Clear form
            setTitle('');
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
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
            <input
                type="text"
                placeholder="Ad Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <textarea
                placeholder="Ad Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="block"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Create Ad
            </button>
        </form>
    );
}
