createAutocomplete({
	root: document.querySelector('.autocomplete'),
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
	onOptionSelect(movie) {
		onMovieSelect(movie);
	},
	inputValue(movie) {
		return movie.Title;
	}
});

const onMovieSelect = async (movie) => {
	//Fetch movie details of selected movie
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			i: movie.imdbID
		}
	});

	console.log(response);

	//Render movie details
	const detailsElement = document.querySelector('.details');
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
