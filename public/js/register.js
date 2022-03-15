// Progressive enchancement
// Wanneer je niet alle invoervelden hebt ingevuld en submit worden alle invoer velden rood en krijg je een error bericht
// Wanneer de wachtwoorden niet met elkaar overeen komen zullen deze inputs rood worden en kan je ook een error bericht
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputs = event.target.querySelectorAll("input");
	const errorLabel = event.target.querySelector("label#error");
	if (!inputs[0].value || !inputs[1].value || !inputs[2].value || !inputs[3].value) {
		errorLabel.classList.add("errorLabel");
		errorLabel.innerHTML = "<span>Error:</span> Niet alle invoer velden zijn ingevuld!";
		inputs.forEach(element => {
			element.classList.add("foute-input");
		});
	} else {
		if (inputs[2].value === inputs[3].value) {
			event.target.submit();
		} else {
			errorLabel.classList.add("errorLabel");
			errorLabel.innerHTML = "<span>Error:</span> Wachtwoorden komen niet overeen met elkaar!";
			inputs[0].classList.remove("foute-input");
			inputs[1].classList.remove("foute-input");
			inputs[2].classList.add("foute-input");
			inputs[3].classList.add("foute-input");
		}
	}
});

