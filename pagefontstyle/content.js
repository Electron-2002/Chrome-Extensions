chrome.runtime.sendMessage({ todo: 'showPageAction' });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.todo == 'changeColor') {
		const addColor = request.clickedColor;
		console.log(addColor);

		document.getElementById('examples').style.color = addColor;
	}
});
