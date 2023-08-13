import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid, { SelectColumn } from 'react-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';

import { openDrawer } from 'reducers/drawer';
import { deleteProduct } from 'reducers/products';

import AddEditProductsForm from 'views/home/components/addEditProductForm';
import { formatPrice } from 'views/home/utils';

import Filters from './components/filters';

function rowKeyGetter(row) {
	return row.id;
}

function ProductList() {
	const [selectedRows, setSelectedRows] = useState(() => new Set());
	const [sortColumns, setSortColumns] = useState([]);

	const dispatch = useDispatch();
	const confirm = useConfirm();

	const { filterData } = useSelector(({ products }) => products);

	const handleBulkDelete = () => {
		confirm({ description: 'Do You want to delete the selected products ?' })
			.then(() => dispatch(deleteProduct(selectedRows)))
			.catch(() => {
				/* ... */
			});
	};

	const sortedRows = useMemo(() => {
		if (sortColumns.length === 0) return filterData;

		return [...filterData].sort((a, b) => {
			for (const sort of sortColumns) {
				const comparator = getComparator(sort.columnKey);
				const compResult = comparator(a, b);

				if (compResult !== 0) {
					return sort.direction === 'ASC' ? compResult : -compResult;
				}
			}
			return 0;
		});
	}, [filterData, sortColumns]);

	const summaryRows = useMemo(() => {
		return [
			{
				totalCount: filterData.length,
				totalPrice: filterData.reduce(
					(acc, { finalPrice }) => acc + Number(finalPrice),
					0
				),
			},
		];
	}, [filterData]);

	return (
		<Box>
			<Box display={{ xs: 'block', md: 'flex' }} mb={2} justifyContent="space-between">
				<Typography variant="h4" mb={{ xs: 2, md: 0 }}>
					Product Lists
				</Typography>

				<Button
					variant="contained"
					disabled={!sortedRows.length}
					onClick={handleBulkDelete}>
					Bulk Delete Products
				</Button>
			</Box>

			<Filters />

			{filterData.length > 0 ? (
				<DataGrid
					className="rdg-light"
					showEmptyRows
					rowKeyGetter={rowKeyGetter}
					columns={getColumns({ dispatch, confirm })}
					rows={sortedRows}
					rowHeight={50}
					selectedRows={selectedRows}
					onSelectedRowsChange={setSelectedRows}
					sortColumns={sortColumns}
					onSortColumnsChange={setSortColumns}
					bottomSummaryRows={summaryRows}
					defaultColumnOptions={{ sortable: true }}
				/>
			) : (
				<Box display="flex" justifyContent="center" mt={5}>
					<Typography variant="subtitle1">No products created</Typography>
				</Box>
			)}
		</Box>
	);
}

export default ProductList;

function getColumns({ dispatch, confirm }) {
	return [
		SelectColumn,
		{
			key: 'name',
			name: 'Name',
			frozen: true,
			renderSummaryCell() {
				return <strong>Total</strong>;
			},
		},
		{
			key: 'category',
			name: 'Category',
			renderCell({ row }) {
				return row.category.label;
			},
		},
		{ key: 'description', name: 'Description', sortable: false },
		{
			key: 'costPrice',
			name: 'Cost Price',
			renderCell({ row }) {
				return formatPrice(row.costPrice);
			},
		},
		{
			key: 'sellPrice',
			name: 'Sell Price',
			renderCell({ row }) {
				return formatPrice(row.sellPrice);
			},
		},
		{
			key: 'discount',
			name: 'Discount',
			renderCell({ row }) {
				return `${row.discount}%`;
			},
		},
		{
			key: 'discountedSellPrice',
			name: 'Discounted Sell Price',
			renderCell({ row }) {
				return formatPrice(row.discountedSellPrice);
			},
		},
		{
			key: 'finalPrice',
			name: 'Final Price',
			renderCell({ row }) {
				return formatPrice(row.finalPrice);
			},
			renderSummaryCell({ row }) {
				return <strong>{formatPrice(row.totalPrice)}</strong>;
			},
		},
		{
			key: 'expiryDate',
			name: 'Expiry Date',
			renderCell(props) {
				const { row } = props;
				return row.expiryDate?.format('DD-MM-YYYY');
			},
		},
		{
			key: 'actions',
			name: 'Actions',
			headerCellClass: 'actions',
			cellClass: 'actions',
			sortable: false,
			renderCell({ row }) {
				const handleProductEdit = () => {
					dispatch(openDrawer({ component: <AddEditProductsForm editProduct={row} /> }));
				};

				const handleDelete = () => {
					confirm({ description: 'You want to delete this product ?' })
						.then(() => dispatch(deleteProduct(row)))
						.catch(() => {
							/* ... */
						});
				};

				if (!row.id) {
					return null;
				}

				return (
					<>
						<Button onClick={handleProductEdit}>Edit</Button>
						<Button onClick={handleDelete}>Delete</Button>
					</>
				);
			},
		},
	];
}

function getComparator(sortColumn) {
	switch (sortColumn) {
		case 'name':
		case 'category':
			return (a, b) => {
				return a[sortColumn] < b[sortColumn] ? -1 : 1;
			};
		case 'costPrice':
		case 'sellPrice':
		case 'discountedSellPrice':
		case 'finalPrice':
		case 'discount':
			return (a, b) => {
				return Number(a[sortColumn]) - Number(b[sortColumn]);
			};
		case 'expiryDate':
			return (a, b) => {
				return a[sortColumn].valueOf() - b[sortColumn].valueOf();
			};
		default:
			return 0;
	}
}
