window.addEventListener('load', () => {
	// Grab
	// const image = document.getElementById('image');
	const weatherDetail = document.getElementById('weather');
	const temperatureEl = document.getElementById('temperature');
	const messageEl = document.getElementById('message');

	const todaySummary = document.getElementById('today-summary');
	const max = document.getElementById('max');
	const min = document.getElementById('min');

	let lat;
	let long;

	//API
	// let lat = 37.8267;
	// let long = -122.4233;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const API = 'https://api.darksky.net/forecast/05a525f67e1b0e21cb64c25f0002e696/';
			const url = `${proxy}${API}${lat},${long}`;
			fetch(url)
				.then(function(res) {
					return res.json();
				})
				.then(function(data) {
					console.log(data);
					//Get data from the currently group from the api data
					const { temperature, summary, icon } = data.currently;
					const today = data.daily.data;

					//Currently
					let newTemp = Math.floor(temperature);
					temperatureEl.innerHTML = newTemp;
					weatherDetail.innerHTML = summary;
					message(temperature);

					//Today
					newMax = Math.floor(today[0].temperatureMax);
					max.innerHTML = newMax;
					newMin = Math.floor(today[0].temperatureMin);
					min.innerHTML = newMin;
					todaySummary.textContent = today[0].summary;

					console.log(today[0].temperatureMax);
				});
		});
	}

	function message(temperature) {
		const coldQuotes = [
			`Holy fuck it's cold, how are you even alive still?`,
			`Where are we, fucking Alaska?`,
			`God dammit I hate the cold..`,
			`Where the hell is the sun, he must of drank too much again last night...`
		];

		const warmQuotes = [
			`Finally some fucking warmth`,
			`Don't tell Winter but I've been cheating on her with the Sun...`,
			`Jesus I can feel the sweat dripping off of my balls..`
		];

		if (temperature < 50) {
			messageEl.textContent = coldQuotes[Math.floor(Math.random() * coldQuotes.length)];
		} else if (temperature > 50) {
			messageEl.textContent = warmQuotes[Math.floor(Math.random() * warmQuotes.length)];
		}
	}
});
