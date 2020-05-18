const fetchData = async (searchQuery) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			s: searchQuery
		}
	});
	return response.data.Search;
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

const options = document.querySelector('.dropdown-content');
const input = document.querySelector('input');
input.addEventListener(
	'input',
	debounce(async (event) => {
		const movies = await fetchData(event.target.value);

		document.querySelector('.dropdown').classList.add('is-active');
		onInput(movies, options);
	})
);

const onInput = (movies, parentElement) => {
	for (let movie of movies) {
		//create a tag element
		const option = document.createElement('a');
		option.innerHTML = `
            <img src="${movie.Poster}">
            ${movie.Title}
        `;
		option.classList.add('dropdown-item');
		parentElement.appendChild(option);
	}
};
