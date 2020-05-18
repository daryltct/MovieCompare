const fetchData = async (searchQuery) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			s: searchQuery
		}
	});
	return response.data.Search;
};

const options = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.dropdown');
const input = document.querySelector('input');
input.addEventListener(
	'input',
	debounce(async (event) => {
		const movies = await fetchData(event.target.value);

		dropdown.classList.add('is-active');
		onInput(movies, options);
	})
);

const onInput = (movies, parentElement) => {
	//Clear dropdown
	options.innerHTML = '';

	for (let movie of movies) {
		//Create a tag element, add class, add HTML, addEventListener
		const option = document.createElement('a');
		option.classList.add('dropdown-item');
		option.innerHTML = renderOption(movie);

		option.addEventListener('click', () => {
			//Add title to input
			input.value = movie.Title;
			//Close dropdown
			dropdown.classList.remove('is-active');
			//Fetch and render selected movie data
		});
		parentElement.appendChild(option);
	}
};

const renderOption = (movie) => {
	return `
        <img src="${movie.Poster}">
        ${movie.Title}
    `;
};
