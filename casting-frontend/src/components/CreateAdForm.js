import { useState } from 'react';
import axios from 'axios';

export default function CreateAdForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Description', description);
        if (pdfFile) formData.append('PdfFile', pdfFile);

        try {
            const res = await axios.post('/api/ads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Ad created:', res.data);
        } catch (err) {
            console.error('Failed to create ad:', err);
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
            />
            <textarea
                placeholder="Ad Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full"
            />
            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files[0])}
                className="block"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Create Ad
            </button>
        </form>
    );
}
