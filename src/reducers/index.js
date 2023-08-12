import drawerReducer from 'reducers/drawer';
import snackbarReducer from 'reducers/snackbar';
import productsReducer from 'reducers/products';

export const rootReducers = {
	drawer: drawerReducer,
	snackbar: snackbarReducer,
	products: productsReducer,
};
