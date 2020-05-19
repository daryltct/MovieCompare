//REUSABLE AUTOCOMPLETE (USING BULMA CSS LIBRARY)
const createAutocomplete = ({ root, fetchData, renderOption, onOptionSelect, inputValue }) => {
	//Create required elements insinde of root element
	root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content"></div>
            </div>
        </div>
    `;

	const options = root.querySelector('.dropdown-content');
	const dropdown = root.querySelector('.dropdown');
	const input = root.querySelector('input');

	//When data is provided in textbox
	const onInput = async (event) => {
		//Fetch data using input search query (what data to fetch is up to caller to define the fetchData function)
		const items = await fetchData(event.target.value);

		//Check if there are any search results
		if (!items.length) {
			dropdown.classList.remove('is-active'); //close dropdown
			return;
		}

		//Clear dropdown from previous search
		options.innerHTML = '';

		dropdown.classList.add('is-active');
		for (let item of items) {
			//Create a tag element, add class, add HTML, addEventListener
			const option = document.createElement('a');
			option.classList.add('dropdown-item');
			//renderOption is provided by calling function (up to caller what to render)
			option.innerHTML = renderOption(item);

			option.addEventListener('click', () => {
				//inputValue is provided by calling function (up to caller what to display)
				input.value = inputValue(item);
				//Close dropdown
				dropdown.classList.remove('is-active');
				//onOptionSelect is provided by calling function (up to caller what to do after option is selected)
				onOptionSelect(item);
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
};
