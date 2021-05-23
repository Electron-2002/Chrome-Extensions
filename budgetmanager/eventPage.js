const contextMenuItem = {
	id: 'spendMoney',
	title: 'Spend Money',
	contexts: ['selection']
};

chrome.contextMenus.create(contextMenuItem);

const isInt = (value) => {
	return (
		!isNaN(value) &&
		parseInt(Number(value)) == value &&
		!isNaN(parseInt(value, 10))
	);
};

chrome.contextMenus.onClicked.addListener((clickData) => {
	if (clickData.menuItemId == 'spendMoney' && clickData.selectionText) {
		if (isInt(clickData.selectionText)) {
			chrome.storage.sync.get(['total', 'limit'], (budget) => {
				let newTotal = parseInt(budget.total) || 0;

				newTotal += parseInt(clickData.selectionText);

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
			});
		}
	}
});

chrome.storage.onChanged.addListener((changes, storageName) => {
	chrome.browserAction.setBadgeText({
		text: changes.total.newValue.toString()
	});
});
