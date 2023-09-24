let enabled = false;
let speed = 1.0;

function isTabValid(tab) {
	if (tab !== undefined && tab.url) {
		return tab.url.includes('youtube.com') || tab.url.includes('youtu.be');
	}
}

function updateTabContentScript(tab, newSpeed, newEnabled) {
	console.log('Sending updateSettings message with speed: ' + newSpeed + ' enabled: ' + newEnabled + ' tab id: ' + tab.id);
	
	try {
		chrome.tabs.sendMessage(tab.id, {
			action: 'updateSettings',
			speed: newSpeed,
			enabled: newEnabled
		});
	} catch (error) {
		console.error(error);
	}
}

function updateContentScripts(newSpeed, newEnabled) {
	console.log('Updating content scripts!');
  	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		tabs.forEach((tab) => {
			if (!isTabValid(tab)) { return; }
			updateTabContentScript(tab, newSpeed, newEnabled);
		});
	});
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
	chrome.tabs.get(activeInfo.tabId, function (tab) {
		// chrome.tabs.onUpdated.addListener(function onTabUpdated(tabId, changeInfo) {
      	// 	if (tabId === activeInfo.tabId && changeInfo.status === 'complete') {
		// 			if (!isTabValid(tab)) { return; }
					
		// 		updateTabContentScript(tab, speed, enabled);
					
		// 		// Remove the event listener to prevent it from firing repeatedly
		// 		chrome.tabs.onUpdated.removeListener(onTabUpdated);
		// 	}
		// });

		if (!isTabValid(tab)) { return; }
		updateTabContentScript(tab, speed, enabled);
	});
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log(message.speed);
	if (message.action === 'toggleExtension') {
    	enabled = message.enabled;
    	updateContentScripts(speed, enabled);
  	} else if (message.action === 'updateSpeed') {
		speed = Number(message.speed);
    	updateContentScripts(speed, enabled);
  	}
});