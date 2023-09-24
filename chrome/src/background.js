let enabled = false;
let speed = 1.0;

// Function to send updated settings to content scripts
function updateContentScripts(_speed, _enabled) {
	console.log("Updating content scripts!");
  	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		tabs.forEach((tab) => {
			console.log("Sending updateSettings message!");
			console.log(_speed, _enabled);
			chrome.tabs.sendMessage(tab.id, { action: "updateSettings", speed: _speed, enabled: _enabled });

			// chrome.scripting.executeScript({
			// 	target: { tabId: tab.id },
			// 	files: ["src/content.js"]
			// });
		});
	});
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log(message.speed);
	if (message.action === "toggleExtension") {
    	enabled = message.enabled;
    	updateContentScripts(speed, enabled);
  	} else if (message.action === "updateSpeed") {
		speed = Number(message.speed);
    	updateContentScripts(speed, enabled);
  	}
});