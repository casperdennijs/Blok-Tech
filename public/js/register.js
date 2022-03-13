const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputs = event.target.querySelectorAll("input");
	const errorLabel = event.target.querySelector("label#error");
	if (!inputs[0].value || !inputs[1].value || !inputs[2].value || !inputs[3].value) {
		errorLabel.innerHTML = "Error: Niet alle invoer velden zijn ingevuld!";
		inputs.forEach(element => {
			element.classList.add("foute-input");
		});
	} else {
		if (inputs[2].value === inputs[3].value) {
			event.target.submit();
		} else {
			errorLabel.innerHTML = "Error: Wachtwoorden komen niet overeen met elkaar!";
			inputs[0].classList.remove("foute-input");
			inputs[1].classList.remove("foute-input");
			inputs[2].classList.add("foute-input");
			inputs[3].classList.add("foute-input");
		}
	}
});

