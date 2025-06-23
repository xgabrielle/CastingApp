import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function AdsListPage() {
    const [ads, setAds] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await API.get('/castad', {
                    params: { search: search || undefined }
                });
                console.log('API Response:', response.data); // Debug log
                
                // Handle the case where the API returns an object with $values property
                let adsData = response.data;
                if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
                    adsData = response.data.$values;
                }
                
                // Ensure we have an array
                if (Array.isArray(adsData)) {
                    setAds(adsData);
                } else {
                    console.error('Expected array but got:', typeof adsData, adsData);
                    setAds([]);
                    setError('Invalid data format received from server');
                }
            } catch (error) {
                console.error('Failed to fetch ads:', error);
                setAds([]);
                if (error.response?.status === 404) {
                    setError('API endpoint not found. Please check if the backend is running.');
                } else if (error.response?.status === 401) {
                    setError('Please log in to view ads.');
                } else {
                    setError('Failed to fetch ads: ' + (error.response?.data || error.message));
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [search]);

    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">All Ads</h1>
                <p>Loading ads...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">All Ads</h1>
                <p className="mb-2 text-gray-600">{ads.length} ads found</p>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">All Ads</h1>
            <p className="mb-2 text-gray-600">{ads.length} ads found</p>
            <input
                type="text"
                placeholder="Search ads..."
                className="mb-4 p-2 border rounded w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ads.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No ads found.</p>
                ) : (
                    ads.map((ad) => {
                        // Check for valid date
                        let dateString = "Unknown";
                        if (ad.uploadDate) {
                            const date = new Date(ad.uploadDate);
                            if (!isNaN(date.getTime())) {
                                dateString = date.toLocaleDateString();
                            }
                        }
                        return (
                            <div key={ad.id} className="bg-white shadow p-4 rounded">
                                <h2 className="text-xl font-semibold">{ad.adTitle || "No Title"}</h2>
                                <p className="text-gray-700">{ad.description || "No description provided."}</p>
                                <p className="text-sm text-gray-500">Uploaded: {dateString}</p>
                            </div>
                        );
                    })
                )}
            </div>
            <button type="search" className="bg-blue-500 text-white p-2 rounded">
                Search Ad
            </button>
        </div>
    );
}
 