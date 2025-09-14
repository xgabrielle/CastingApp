import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api/axios';
import {Card, CardContent, Typography, CardHeader, Avatar, Link} from "@mui/material";

function AdView (user){
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
                console.log("Profile image:", user?.profileImageUrl);
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
        <Card sx={{ p: 2, m: 2 }}>
            <CardContent >
                <Typography 
                    variant="h5" 
                    gutterBottom 
                    fontFamily="Oswald, sans-serif"
                    fontWeight="Bold"
                    color="primary"
                >
                    {ad.title || 'No Title'}
                </Typography>
                <Typography variant="h7" 
                            color="secondary"
                            fontFamily="Oswald, sans-serif"
                            fontWeight="500"
                            sx={{textDecoration: "underline"}}>
                    Synopsis:
                </Typography>
                <Typography variant="body1" 
                            color="primary"
                            fontFamily="Oswald, sans-serif">
                {ad.description || 'No description provided.'}
                </Typography>
                <br/>
                <CardHeader
                    avatar={
                        <Avatar 
                            src={user?.profileImageUrl ? `http://localhost:5049${user.profileImageUrl}` : "https://placehold.co/100x100"}
                            alt="Profile"
                            sx={{ width: 56, height: 56 }}
                        />
                    }
                    title={`By: ${ad.userName || 'Unknown'}`}
                    subheader={`Created on: ${dateString}`}
                    titleTypographyProps={{
                    sx: {fontFamily: "Oswald, sans-serif", fontWeight: "normal"}
                    }}
                    subheaderTypographyProps={{
                        sx: {fontFamily: "Oswald, sans-serif", fontWeight: "normal"}
                    }}
                />
            </CardContent>
            {ad.pdfDownloadUrl ? (
                <Link
                    href={`http://localhost:5049${ad.pdfDownloadUrl}`}
                    sx={{fontFamily: "Oswald, sans-serif"}}
                    style={{color: "primary.main", textDecoration: "none"}}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
                    
                >
                  View Script 
                </Link>
                
            ) : (
                <Typography sx={{fontFamily: "Oswald, sans-serif"}}>
                    No PDF available
                </Typography>
                )
            }
            
        </Card>
    );
}
export default AdView;