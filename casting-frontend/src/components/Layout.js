import * as React from "react";
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
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

export default function Layout({ title = "My App", children }) {
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
                    <Typography variant="h6" sx={{ ml: 1 }}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant="persistent"
                open={open}
                PaperProps={{ sx: { width: drawerWidth, borderRight: "1px solid", borderColor: "divider" } }}
                sx={{ "& .MuiDrawer-paper": { top: 64 } }} // below AppBar (64px default)
            >
                <Toolbar />
                <List>
                    <ListItemButton>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
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
