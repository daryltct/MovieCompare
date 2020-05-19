const autocompleteConfig = {
	async fetchData(searchQuery) {
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
	},
	renderOption(movie) {
		return `
            <img src="${movie.Poster}">
            ${movie.Title}
        `;
	},
	inputValue(movie) {
		return movie.Title;
	}
};

createAutocomplete({
	...autocompleteConfig,
	root: document.querySelector('#left-autocomplete'),
	onOptionSelect(movie) {
		onMovieSelect(movie, document.querySelector('#left-details'));
	}
});
createAutocomplete({
	...autocompleteConfig,
	root: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		onMovieSelect(movie, document.querySelector('#right-details'));
	}
});

const onMovieSelect = async (movie, detailsElement) => {
	//Fetch movie details of selected movie
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			i: movie.imdbID
		}
	});

	//Render movie details
	renderMovieDetails(response.data, detailsElement);
};

const renderMovieDetails = (movieDetails, parentElement) => {
	parentElement.innerHTML = `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetails.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetails.Title}</h1>
                    <h4>${movieDetails.Genre}</h4>
                    <p>${movieDetails.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetails.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetails.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetails.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetails.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetails.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};
