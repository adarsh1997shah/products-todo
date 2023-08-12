import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	children: null,
	drawerProps: {},
};

export const drawerSlice = createSlice({
	name: 'drawer',
	initialState,
	reducers: {
		openDrawer: (state, action) => {
			const { component, drawerProps } = action.payload;

			return {
				isOpen: true,
				children: component,
				drawerProps,
			};
		},
		closeDrawer: (state) => {
			return {
				isOpen: false,
				children: null,
			};
		},
	},
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
