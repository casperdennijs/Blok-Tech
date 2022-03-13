const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const inputs = event.target.querySelectorAll("input");
	const errorLabel = event.target.querySelector("label#error");
	if (!inputs[0].value || !inputs[1].value) {
        errorLabel.classList.add("error");
		errorLabel.innerHTML = "<span>Error:</span> Niet alle invoer velden zijn ingevuld!";
		inputs.forEach(element => {
			element.classList.add("foute-input");
		});
	} else {
		event.target.submit();
	}
});