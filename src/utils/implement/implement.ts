export function implement<T>() {
	return <U extends T>(constructor: U) => {
		constructor;
	};
}
