window.onload = function () {
	const colorPicker = document.getElementById('fontColor');
	const submitBtn = document.getElementById('btnChange');

	let color = colorPicker.value;

	colorPicker.addEventListener('change', colorHandler);
	colorPicker.addEventListener('paste', colorHandler);
	colorPicker.addEventListener('keyup', colorHandler);

	function colorHandler() {
		color = colorPicker.value;
	}

	submitBtn.addEventListener('click', () => {
		chrome.tabs.query(
			{
				active: true,
				currentWindow: true
			},
			(tabs) => {
				chrome.tabs.sendMessage(tabs[0].id, {
					todo: 'changeColor',
					clickedColor: color
				});
			}
		);
	});
};
