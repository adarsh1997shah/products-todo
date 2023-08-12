import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	Input,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';

import { commonDrawerStyles } from 'common/components/CustomDrawer';

import { closeDrawer } from 'reducers/drawer';
import { createProduct, editProduct } from 'reducers/products';

import { CATEGORY_OPTIONS, INITIAL_STATE } from 'views/home/constants';
import { calcDiscount, shouldNotSubmitForm } from 'views/home/utils';

function AddEditProductsForm({ editProduct: initialProduct }) {
	const [product, setProduct] = useState(INITIAL_STATE);

	const dispatch = useDispatch();

	const {
		name,
		category,
		expiryDate,
		description,
		costPrice,
		sellPrice,
		discount,
		discountedSellPrice,
		finalPrice,
	} = product;

	useEffect(() => {
		if (initialProduct) {
			setProduct(initialProduct);
		}
	}, [initialProduct]);

	useEffect(() => {
		if (costPrice !== '' && discount !== '') {
			const finalPrice = calcDiscount(costPrice, discount);

			setProduct((prev) => ({ ...prev, finalPrice }));
		}

		if (sellPrice !== '' && discount !== '') {
			const discountedSellPrice = calcDiscount(sellPrice, discount);

			setProduct((prev) => ({ ...prev, discountedSellPrice }));
		}
	}, [costPrice, discount, sellPrice]);

	const onSelectOptionClose = () => {
		setTimeout(() => {
			document.activeElement.blur();
		}, 0);
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;

		setProduct({ ...product, [name]: value });
	};

	const handleDateChange = (value) => {
		const customEvent = { target: { name: 'expiryDate', value } };

		handleFormChange(customEvent);
	};

	const handleCategoryChange = (e) => {
		const { value } = e.target;

		const item = CATEGORY_OPTIONS.find((option) => option.value === value);

		e.target.value = item;

		handleFormChange(e);
	};

	const handleNumber = (e) => {
		const { name, value } = e.target;

		if (!isNaN(value) && Number(value)) {
			if (name === 'discount') {
				if (Number(value) >= 0 && Number(value) <= 100) {
					handleFormChange(e);
				} else if (Number(value) > 100) {
					e.target.value = 100;

					handleFormChange(e);
				}
			} else {
				handleFormChange(e);
			}
		}
	};

	const handleSave = () => {
		if (initialProduct) {
			dispatch(editProduct(product));
		} else {
			dispatch(createProduct({ id: Date.now(), ...product }));
		}

		dispatch(closeDrawer());
	};

	return (
		<Box sx={commonDrawerStyles}>
			<Box>
				<TextField
					label="Name"
					name="name"
					variant="standard"
					margin="normal"
					fullWidth
					required
					onChange={handleFormChange}
					value={name}
				/>

				<FormControl margin="normal" fullWidth variant="standard" required>
					<InputLabel>Select Category</InputLabel>
					<Select
						name="category"
						onChange={handleCategoryChange}
						value={category?.value || ''}
						onClose={onSelectOptionClose}>
						{CATEGORY_OPTIONS.map(({ value, label }) => (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<DatePicker
					label="Select Expiry Date"
					slotProps={{
						textField: { variant: 'standard', required: true },
					}}
					sx={{ width: '100%', mt: 2, mb: 1 }}
					required
					name="expiryDate"
					value={expiryDate}
					format="DD-MM-YYYY"
					onChange={handleDateChange}
					disablePast
				/>

				<TextField
					label="Description"
					name="description"
					variant="standard"
					multiline
					maxRows={4}
					margin="normal"
					fullWidth
					required
					onChange={handleFormChange}
					value={description}
				/>

				<FormControl fullWidth margin="normal" variant="standard">
					<InputLabel required>Cost Price</InputLabel>
					<Input
						name="costPrice"
						value={costPrice}
						onChange={handleNumber}
						startAdornment={<InputAdornment position="start">₹</InputAdornment>}
					/>
				</FormControl>

				<FormControl fullWidth margin="normal" variant="standard">
					<InputLabel required>Sell Price</InputLabel>
					<Input
						name="sellPrice"
						value={sellPrice}
						onChange={handleNumber}
						startAdornment={<InputAdornment position="start">₹</InputAdornment>}
					/>
				</FormControl>

				<FormControl fullWidth margin="normal" variant="standard">
					<InputLabel required>Discount</InputLabel>
					<Input
						name="discount"
						value={discount}
						min="0"
						max="100"
						onChange={handleNumber}
						endAdornment={<InputAdornment position="end">%</InputAdornment>}
					/>
				</FormControl>

				<Box display="flex" gap={1.5}>
					<FormControl fullWidth margin="normal" variant="standard">
						<InputLabel>Discounted Sell Price</InputLabel>
						<Input
							disabled
							name="discountedSellPrice"
							value={discountedSellPrice}
							startAdornment={<InputAdornment position="start">₹</InputAdornment>}
						/>
					</FormControl>

					<FormControl fullWidth margin="normal" variant="standard">
						<InputLabel>Final Price</InputLabel>
						<Input
							disabled
							name="finalPrice"
							value={finalPrice}
							startAdornment={<InputAdornment position="start">₹</InputAdornment>}
						/>
					</FormControl>
				</Box>
			</Box>

			<Box>
				<Button
					variant="outlined"
					sx={{ mr: 1, my: 2 }}
					onClick={() => dispatch(closeDrawer())}>
					Cancel
				</Button>
				<Button
					variant="contained"
					disabled={shouldNotSubmitForm(product)}
					onClick={handleSave}>
					Save
				</Button>
			</Box>
		</Box>
	);
}

export default AddEditProductsForm;
