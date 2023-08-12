export const INITIAL_STATE = {
	name: '',
	category: null,
	expiryDate: null,
	description: '',
	costPrice: '',
	sellPrice: '',
	discount: '',
	discountedSellPrice: '',
	finalPrice: '',
};

export const CATEGORY_OPTIONS = [
	{ label: 'Jewelry', value: 'jewelry' },
	{ label: 'Clothes', value: 'clothes' },
	{ label: 'Makeup', value: 'makeup' },
	{ label: 'Software', value: 'software' },
	{ label: 'Toys & games', value: 'toysAndGames' },
	{ label: 'Home appliance', value: 'homeAppliance' },
	{ label: 'Electronics', value: 'electronics' },
];
