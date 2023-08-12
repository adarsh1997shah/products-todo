import React from 'react';
import { Container, Typography, Box, AppBar } from '@mui/material';

function NavBar() {
	return (
		<Box mb={2}>
			<AppBar position="static">
				<Container maxWidth="lg">
					<Typography variant="h5" component="div" py={2}>
						Product Tracker App
					</Typography>
				</Container>
			</AppBar>
		</Box>
	);
}

export default NavBar;
