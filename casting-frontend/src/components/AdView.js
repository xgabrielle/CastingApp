import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';

function AdView (){
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [ad, setAd] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAd = async () => {
            setLoading(true);
            setError(null);
            try{
                const response = await API.get(`/castad/${id}`);
                setAd(response.data);
            }
            catch (e) {
                setError(e.response?.data || e.message );
            }
            finally {
                setLoading(false);
            }
            
        };
        fetchAd()
    },[id]);
    
    if (isLoading) return <div className="p-6">Loading ad ...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!ad) return <div className="p-6">Ad not found.</div>;

    let dateString = 'Unknown';
    if (ad.uploadDate) {
        const date = new Date(ad.uploadDate);
        if (!isNaN(date.getTime())) {
            dateString = date.toLocaleDateString();
        }
    }
    
    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-2">{ad.adTitle || 'No Title'}</h1>
            <p className="mb-2 text-gray-700">{ad.description || 'No description provided.'}</p>
            <p className="mb-2 text-gray-600">Created by: {ad.userName || 'Unknown'}</p>
            <p className="mb-2 text-gray-500">Uploaded: {dateString}</p>
            {ad.pdfDownloadUrl ? (
                <a href={`http://localhost:5049${ad.pdfDownloadUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View PDF</a>
            ) : (
                <p className="text-red-500">No PDF available</p>
                )
            }
            
        </div>
    );
}
export default AdView;