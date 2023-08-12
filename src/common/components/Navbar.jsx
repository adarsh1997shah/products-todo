import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function NavBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5" component="div" sx={{ flexGrow: 1, px: 1.5, py: 3 }}>
						Product Tracker App
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default NavBar;
