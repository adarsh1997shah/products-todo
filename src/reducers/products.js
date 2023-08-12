import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: [],
	filterData: [],
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		createProduct: (state, action) => {
			state.data.push(action.payload);
			state.filterData.push(action.payload);
		},
		editProduct: (state, action) => {
			const index = state.data.findIndex(({ id }) => id === action.payload.id);

			state.data[index] = action.payload;
			state.filterData = state.data;
		},
		deleteProduct: (state, action) => {
			const index = state.data.findIndex(({ id }) => id === action.payload.id);

			state.data.splice(index, 1);
			state.filterData = state.data;
		},
		bulkDeleteProducts: (state, action) => {
			const data = state.data.filter(({ id }) => !action.payload.has(id));

			state.data = data;
			state.filterData = state.data;
		},
		filterProducts: (state, action) => {
			const { payload } = action;

			state.filterData = state.data.filter(({ name, category }) => {
				return (
					(payload.name ? name === payload.name : true) &&
					(payload.category ? category.value === payload.category : true)
				);
			});
		},
	},
});

export const { createProduct, editProduct, deleteProduct, filterProducts } =
	productsSlice.actions;

export default productsSlice.reducer;
