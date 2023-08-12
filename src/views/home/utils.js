export function calcDiscount(amount, discount) {
	return (Number(amount) - (Number(discount) * Number(amount)) / 100).toFixed(2);
}

export function shouldNotSubmitForm(values) {
	return Object.values(values).some((value) => !value);
}

export function formatPrice(price) {
	return `₹ ${new Intl.NumberFormat('en-IN').format(price)}`;
}
