import React from "react";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <AppBar position="static">
            <Toolbar sx={{ backgroundColor: "black" }}>
                <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                    Staff Management
                </Typography>

                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                <Button color="inherit" component={Link} to="/contact">Contact</Button>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;