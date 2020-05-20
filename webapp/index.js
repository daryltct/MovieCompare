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
		const imgURL = movie.Poster === 'N/A' ? '' : movie.Poster; //Check if there's valid image source
		return `
            <img src="${imgURL}">
            ${movie.Title}
        `;
	},
	inputValue(movie) {
		return movie.Title;
	}
};

//Left Column
createAutocomplete({
	...autocompleteConfig,
	root: document.querySelector('#left-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#left-details'), 'left');
	}
});
//Right Column
createAutocomplete({
	...autocompleteConfig,
	root: document.querySelector('#right-autocomplete'),
	onOptionSelect(movie) {
		document.querySelector('.tutorial').classList.add('is-hidden');
		onMovieSelect(movie, document.querySelector('#right-details'), 'right');
	}
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, detailsElement, column) => {
	//Fetch movie details of selected movie
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			i: movie.imdbID
		}
	});

	//Render movie details
	renderMovieDetails(response.data, detailsElement);

	//Compare movies
	if (column === 'left') {
		leftMovie = response.data;
	} else {
		rightMovie = response.data;
	}

	if (leftMovie && rightMovie) {
		compareMovies(leftMovie, rightMovie);
	}
};

const renderMovieDetails = (movieDetails, detailsElement) => {
	//Retrieve and parse movie statistics to number to run comparison
	const boxOffice =
		movieDetails.BoxOffice === 'N/A' ? 0 : parseInt(movieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
	const metascore = movieDetails.Metascore === 'N/A' ? 0 : parseInt(movieDetails.Metascore);
	const imdbRating = movieDetails.imdbRating === 'N/A' ? 0 : parseFloat(movieDetails.imdbRating);
	const imdbVotes = movieDetails.imdbVotes === 'N/A' ? 0 : parseInt(movieDetails.imdbVotes.replace(/,/g, ''));
	const awards = movieDetails.Awards.split(' ').reduce((accumulator, word) => {
		const value = parseInt(word);
		if (isNaN(value)) {
			return accumulator;
		} else {
			return accumulator + value;
		}
	}, 0);

	//Create inner HTML in movie details element
	detailsElement.innerHTML = `
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

        <article data-value=${awards} class="notification is-light">
            <p class="title">${movieDetails.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${boxOffice} class="notification is-light">
            <p class="title">${movieDetails.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-light">
            <p class="title">${movieDetails.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-light">
            <p class="title">${movieDetails.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-light">
            <p class="title">${movieDetails.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};

const compareMovies = (leftMovie, rightMovie) => {
	const leftSideStats = document.querySelectorAll('#left-details .notification');
	const rightSideStats = document.querySelectorAll('#right-details .notification');

	leftSideStats.forEach((leftStat, index) => {
		const rightStat = rightSideStats[index];

		const leftVal = parseFloat(leftStat.dataset.value);
		const rightVal = parseFloat(rightStat.dataset.value);

		leftStat.classList.remove('is-light');
		rightStat.classList.remove('is-light');

		if (leftVal > rightVal) {
			rightStat.classList.remove('is-primary');
			rightStat.classList.add('is-warning');
			leftStat.classList.add('is-primary');
			leftStat.classList.remove('is-warning');
		} else if (rightVal > leftVal) {
			leftStat.classList.remove('is-primary');
			leftStat.classList.add('is-warning');
			rightStat.classList.remove('is-warning');
			rightStat.classList.add('is-primary');
		} else {
			leftStat.classList.remove('is-primary');
			rightStat.classList.remove('is-primary');
			leftStat.classList.add('is-info');
			rightStat.classList.add('is-info');
		}
	});
};
