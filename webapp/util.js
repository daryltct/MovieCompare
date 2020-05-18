//DEBOUNCER
const debounce = (func, delay = 1000) => {
	let timerId;
	return (...args) => {
		//clears timeout of the previous function call unless no event for (delay)
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			func.apply(null, args);
		}, delay);
	};
};
