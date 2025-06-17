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
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white shadow rounded w-full"
        >
            <label className="flex flex-col text-sm font-medium w-full">
                Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 p-2 border rounded w-full"
                    placeholder="Enter ad title"
                />
            </label>

            <label className="flex flex-col text-sm font-medium w-full">
                Description
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 p-2 border rounded w-full resize-vertical"
                    placeholder="Enter ad description"
                    rows="4"
                />
            </label>

            <label className="flex flex-col text-sm font-medium w-full">
                Upload PDF
                <input
                    type="filen"
                    accept=".pdf"
                    onChange={(e) => setPdfFile(e.target.files[0])}
                    className="mt-1 w-full"
                />
            </label>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
            >
                Create Ad
            </button>
        </form>
    );
}
