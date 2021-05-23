window.onload = function () {
	const nameInput = document.getElementById('name');
	const displayName = document.getElementById('greet');

	nameInput.focus();

	nameInput.addEventListener('keyup', function () {
		const nameValue = nameInput.value;

		displayName.innerText = 'Hello ' + nameValue + '!';
	});
};
