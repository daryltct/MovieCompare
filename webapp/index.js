const fetchData = async (searchQuery) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			s: searchQuery
		}
	});
	console.log(response.data);
};

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

const input = document.querySelector('input');
input.addEventListener(
	'input',
	debounce((event) => {
		fetchData(event.target.value);
	})
);
