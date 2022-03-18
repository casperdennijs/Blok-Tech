// API
// Ik laat gegevens in op een zelf gemaakte spreadsheet waarin een lijst met champions namen en bestandsnamen voor de image.
// Omdat ik geen recente zip kon vinden met alle plaatjes en het heel veel werk kost om ze 1 voor 1 te downloaden heb ik
// gebruik gemaakt van de League of Legends CDN waarin alle plaatjes online te vinden zijn en daar de image naar gelinkt.
async function getData() {
	let res = await fetch('https://opensheet.elk.sh/1oUVW-PiajfpPm5YMOxqbcJyJbJUXH9U9QopnYAOSXdU/champions')
	return await res.json();
}

function generateGrid(data) {
	let grid = document.querySelector('section.grid');
    console.log(data);
	data.forEach(item => {
		let container = document.createElement('section');
		
		let name = document.createElement('p');
		name.textContent = item['Name'];
		
		let image = document.createElement('img');
		image.src = "http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/" + item['Image'] + ".png";
		
		container.appendChild(name);
		container.appendChild(image);

		grid.appendChild(container);	
	})
}

getData()
	.then(data => {	
	generateGrid(data);
})