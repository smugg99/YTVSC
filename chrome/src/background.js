let enabled = false;
let speed = 1.0;

function updateContentScripts(_speed, _enabled) {
	console.log('Updating content scripts!');
  	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		tabs.forEach((tab) => {
			if (tab.url.includes('youtube.com') || tab.url.includes('youtu.be')) {
				console.log('Sending updateSettings message!');
				chrome.tabs.sendMessage(tab.id, { action: 'updateSettings', speed: _speed, enabled: _enabled });
			}
		});
	});
}

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