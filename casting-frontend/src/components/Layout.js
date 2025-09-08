import * as React from "react";

import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Container,
    Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

export default function Layout({ title = "My App", isLoggedIn = false, onLogout, children }) {
    const [open, setOpen] = React.useState(true); // simple desktop toggle

    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
            {/* Top AppBar */}
            <AppBar
                position="fixed"
                elevation={0}
                color="inherit"
                sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
                <Toolbar>
                    <IconButton edge="start" onClick={() => setOpen(!open)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ ml: 1 }}
                                sx={{ fontFamily: "'Fondamento', cursive", fontWeight: "Bold", fontStyle: "normal" }}
                    >
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="persistent"
                open={open}
                PaperProps={{
                    sx: {
                        width: drawerWidth,
                        borderRight: "1px solid",
                        borderColor: "divider",
                        top: 64
                    }
                }}
            >
                <Toolbar />
                <List>
                    {!isLoggedIn ? (
                        <>
                            <ListItemButton component={Link} to="/">
                                <ListItemIcon><LoginIcon /></ListItemIcon>
                                <ListItemText primary="Login"
                                              primaryTypographyProps={{ sx: { fontFamily: "'Fondamento', cursive" } }}
                                />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/register">
                                <ListItemIcon><AppRegistrationIcon /></ListItemIcon>
                                <ListItemText primary="Register"
                                              primaryTypographyProps={{ sx: { fontFamily: "'Fondamento', cursive" } }}
                                />
                            </ListItemButton>
                        </>
                    ) : (
                        <>
                            <ListItemButton component={Link} to="/profile">
                                <ListItemIcon><PersonIcon /></ListItemIcon>
                                <ListItemText primary="Profile"
                                              primaryTypographyProps={{ sx: { fontFamily: "'Rancho', cursive" } }}
                                />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/create">
                                <ListItemIcon><AddBoxIcon /></ListItemIcon>
                                <ListItemText primary="Create Casting Ad"
                                              primaryTypographyProps={{ sx: { fontFamily: "'Fondamento', cursive" } }}
                                />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/adList">
                                <ListItemIcon><ListAltIcon /></ListItemIcon>
                                <ListItemText primary="Ad List"
                                              primaryTypographyProps={{ sx: { fontFamily: "'Fondamento', cursive" } }}
                                />
                            </ListItemButton>
                            <ListItemButton onClick={onLogout}>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout"
                                              primaryTypographyProps={{ sx: { fontFamily: "'Fondamento', cursive" } }}
                                />
                            </ListItemButton>
                        </>
                    )}
                </List>
                <Divider />
            </Drawer>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    
                    flexGrow: 1,
                    ml: open ? `${drawerWidth}px` : 0,
                    transition: "margin-left 200ms ease",
                }}
            >
                <Toolbar /> {/* pushes content under AppBar */}
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {children}
                </Container>
            </Box>
        </Box>
    );
}
