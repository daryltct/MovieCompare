const fetchData = async (searchQuery) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			s: searchQuery
		}
	});

	if (response.data.Error) {
		return [];
	}
	return response.data.Search;
};

const options = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.dropdown');
const input = document.querySelector('input');

const onInput = async (event) => {
	//Fetch data using input search query
	const movies = await fetchData(event.target.value);

	//Check if there are any search results
	if (!movies.length) {
		dropdown.classList.remove('is-active'); //close dropdown
		return;
	}

	//Clear dropdown from previous search
	options.innerHTML = '';

	dropdown.classList.add('is-active');
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
			onOptionSelect(movie);
		});
		options.appendChild(option);
	}
};

input.addEventListener('input', debounce(onInput));

//Close dropdown when user clicks away
document.addEventListener('click', () => {
	if (!dropdown.contains(event.target)) {
		dropdown.classList.remove('is-active');
	}
});

const renderOption = (movie) => {
	return `
        <img src="${movie.Poster}">
        ${movie.Title}
    `;
};

const onOptionSelect = async (movie) => {
	//Fetch movie details of selected movie
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			i: movie.imdbID
		}
	});

	console.log(response);

	//Render movie details
	renderDetails();
};
