window.onload = function () {
	const saveBtn = document.getElementById('saveLimit');
	const resetBtn = document.getElementById('resetTotal');
	const limitInput = document.getElementById('limit');

	chrome.storage.sync.get('limit', (budget) => {
		limitInput.value = budget.limit;
	});

	saveBtn.addEventListener('click', () => {
		const limit = limitInput.value;

		if (limit) {
			chrome.storage.sync.set({ limit }, () => {
				close();
			});
		}
	});

	resetBtn.addEventListener('click', () => {
		chrome.storage.sync.set({ total: 0 }, () => {
			const notifOptions = {
				type: 'basic',
				iconUrl: 'icon48.png',
				title: 'Total Reset!',
				message: 'You have reset your total to 0!'
			};

			chrome.notifications.create('resetNotif', notifOptions);
			chrome.notifications.clear('resetNotif');
		});
	});
};
