const fetchData = async (searchQuery) => {
	const response = await axios.get('http://www.omdbapi.com/', {
		params: {
			apikey: '9966014d',
			s: searchQuery
		}
	});
	console.log(response.data);
};

const input = document.querySelector('input');
input.addEventListener('input', (event) => {
	fetchData(event.target.value);
});
