import { useEffect, useMemo, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import {Avatar, Box, ListItem, ListItemAvatar, List, ListItemText, Typography, TextField, Button} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';

export default function AdsListPage() {
    const [ads, setAds] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const visibleAds = useMemo(() => {
        if (!searchInput.trim()) {
            return ads;
        }
        const query = searchInput.trim().toLowerCase();
        const scoreTitle = (title) => {
            const t = (title || '').toLowerCase();
            const idx = t.indexOf(query);
            if (idx === -1) return Number.POSITIVE_INFINITY; // filtered out later
            return idx + Math.abs(t.length - query.length) * 0.01;
        };
        return ads
            .filter(a => (a?.adTitle || '').toLowerCase().includes(query))
            .sort((a, b) => scoreTitle(a?.adTitle) - scoreTitle(b?.adTitle));
    }, [ads, searchInput]);

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await API.get('/castad', {
                    params: { search: undefined }
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
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.get('/castad', {
                params: { search: searchInput || undefined }
            });
            let adsData = response.data;
            if (response.data && response.data.$values && Array.isArray(response.data.$values)) {
                adsData = response.data.$values;
            }
            if (Array.isArray(adsData)) {
                setAds(adsData);
            } else {
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
            <Typography variant="h5"
                        color="grey"
                        sx={{ fontFamily: "'Fondamento', cursive", fontWeight: "Bold" }}>
                All Ads
            </Typography>
            <br/>
            <Typography variant="body2"
                        color="grey"
                        sx={{ fontFamily: "'Fondamento', cursive", fontWeight: "Bold" }}>
                Number of ads: {searchInput.trim() ? visibleAds.length : ads.length}
            </Typography>
            <br/>
            <TextField
                type="text"
                placeholder="Search ads..."
                className="mb-4 p-2 border rounded w-full"
                value={searchInput}
                variant="standard"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button onClick={handleSearch}
                    variant="outlined"
                    sx={{ fontFamily: "'Fondamento', cursive", fontWeight: "Bold" }}>
                Search
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(searchInput.trim() ? visibleAds.length === 0 : ads.length === 0) ? (
                    <p className="col-span-full text-center text-gray-500">No ads found.</p>
                ) : (
                    (searchInput.trim() ? visibleAds : ads).map((ad) => {
                        // Check for valid date
                        let dateString = "Unknown";
                        if (ad.uploadDate) {
                            const date = new Date(ad.uploadDate);
                            if (!isNaN(date.getTime())) {
                                dateString = date.toLocaleDateString();
                            }
                        }
                        return (
                            <Box key={ad.id} className="bg-white shadow p-4 rounded">
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography 
                                                    variant="h6"
                                                    sx={{fontFamily: "'Fondamento', cursive"}}
                                                >
                                                    <Link to={`/adview/${ad.id}`}>{ad.adTitle || "No Title"}</Link>
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography
                                                    variant="body2"
                                                    sx={{fontFamily: "'Fondamento', cursive"}}
                                                >
                                                    {dateString}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                </List>
                                
                            </Box>
                        );
                    })
                )}
            </div>
        </div>
    );
}
 