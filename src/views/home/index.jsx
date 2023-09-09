import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

import { openDrawer } from 'reducers/drawer';

import AddEditProductForm from './components/addEditProductForm';
import ProductList from './components/productList';

function Home() {
	const dispatch = useDispatch();

	const handleAddProduct = () => {
		dispatch(openDrawer({ component: <AddEditProductForm /> }));
	};

	return (
		<Container maxWidth="lg">
			<Box mb={2}>
				<Typography variant="h5" gutterBottom>
					Track your products
				</Typography>
			</Box>

			<Box display="flex" gap={1.5} mb={2}>
				<Button variant="contained" onClick={handleAddProduct}>
					Add Products
				</Button>
			</Box>

			<ProductList />
		</Container>
	);
}

export default Home;
