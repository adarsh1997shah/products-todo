import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer } from '@mui/material';

import { closeDrawer } from 'reducers/drawer';

export const commonDrawerStyles = {
	width: { xs: '100%', sm: 400 },
	p: 2.5,
	boxSizing: 'border-box',
};

function CustomDrawer({ shouldNotCloseOnBackdropClick = true }) {
	const dispatch = useDispatch();
	const {
		isOpen = false,
		children = null,
		drawerProps = {},
	} = useSelector(({ drawer }) => drawer);

	const handleDrawerClose = (event, reason) => {
		const { type, key } = event;
		const keys = ['Tab', 'Shift', 'Escape'];

		if (
			(shouldNotCloseOnBackdropClick && reason === 'backdropClick') ||
			(type === 'keydown' && keys.includes(key))
		) {
			return;
		}

		dispatch(closeDrawer());
	};

	return (
		<Drawer anchor="right" open={isOpen} onClose={handleDrawerClose} {...drawerProps}>
			{children}
		</Drawer>
	);
}

export default CustomDrawer;
