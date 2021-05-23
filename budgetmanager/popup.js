window.onload = function () {
	const spendBtn = document.getElementById('spendAmount');
	const amountInput = document.getElementById('amount');
	const totalAmt = document.getElementById('total');
	const limitValue = document.getElementById('limit');

	chrome.storage.sync.get(['total', 'limit'], (budget) => {
		totalAmt.innerText = parseInt(budget.total) || 0;
		limitValue.innerText = budget.limit;
	});

	spendBtn.addEventListener('click', () => {
		chrome.storage.sync.get(['total', 'limit'], (budget) => {
			let newTotal = 0;

			newTotal = parseInt(budget.total) || 0;

			const amount = parseInt(amountInput.value);

			newTotal += amount || 0;

			chrome.storage.sync.set({ total: newTotal }, () => {
				if (newTotal >= budget.limit) {
					const notifOptions = {
						type: 'basic',
						iconUrl: 'icon48.png',
						title: 'Limit Reached!',
						message:
							'Uh oh! Looks like you have reached your limit!'
					};

					chrome.notifications.create('limitNotif', notifOptions);
					chrome.notifications.clear('limitNotif');
				}
			});

			totalAmt.innerText = newTotal;
			amountInput.value = '';
		});
	});
};
