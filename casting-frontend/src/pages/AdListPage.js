import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdsListPage() {
    const [ads, setAds] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get('/api/ads');
                setAds(response.data);
            } catch (error) {
                console.error('Failed to fetch ads:', error);
            }
        };

        fetchAds();
    }, [search]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">All Ads</h1>
            <input
                type="text"
                placeholder="Search ads..."
                className="mb-4 p-2 border rounded w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ads.map((ad) => (
                    <div key={ad.id} className="bg-white shadow p-4 rounded">
                        <h2 className="text-xl font-semibold">{ad.title}</h2>
                        <p className="text-gray-700">{ad.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
 