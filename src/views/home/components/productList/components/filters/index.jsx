import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { filterProducts } from 'reducers/products';

import { CATEGORY_OPTIONS } from 'views/home/constants';

const INITIAL_FILTERS = {
	name: '',
	category: '',
};

function Filters() {
	const [filters, setFilters] = useState(INITIAL_FILTERS);

	const dispatch = useDispatch();

	const { name, category } = filters;

	const onSelectOptionClose = () => {
		setTimeout(() => {
			document.activeElement.blur();
		}, 0);
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;

		setFilters({ ...filters, [name]: value });
	};

	const handleFormClear = () => {
		setFilters(INITIAL_FILTERS);

		dispatch(filterProducts(INITIAL_FILTERS));
	};

	const handleSave = () => {
		dispatch(filterProducts(filters));
	};

	return (
		<Box mt={2}>
			<Typography variant="h6">Filters</Typography>

			<Box display="flex" gap={2} alignItems="baseline" flexWrap="wrap">
				<TextField
					label="Name"
					name="name"
					variant="standard"
					size="small"
					onChange={handleFormChange}
					value={name}
				/>

				<FormControl variant="standard" sx={{ width: 160 }}>
					<InputLabel>Select Category</InputLabel>
					<Select
						name="category"
						onChange={handleFormChange}
						value={category}
						onClose={onSelectOptionClose}>
						{CATEGORY_OPTIONS.map(({ value, label }) => (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>

			<Box>
				<Button variant="outlined" sx={{ mr: 1, my: 2 }} onClick={handleFormClear}>
					Clear
				</Button>
				<Button variant="contained" onClick={handleSave}>
					Search
				</Button>
			</Box>
		</Box>
	);
}

export default Filters;
