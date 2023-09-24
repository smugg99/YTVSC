let enabled = false;
let speed = 1.0;

// Function to send updated settings to content scripts
function updateContentScripts(_speed, _enabled) {
	console.log("Updating content scripts!");
  	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		tabs.forEach((tab) => {
			console.log("Sending updateSettings message!");
			// chrome.tabs.sendMessage(tab.id, { action: "updateSettings", enabled: _enabled, speed: _speed });
			
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ["src/content.js"]
			});
		});
	});
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "toggleExtension") {
    	enabled = message.enabled;
    	updateContentScripts();
  	} else if (message.action === "updateSpeed") {
    	speed = message.speed;
    	updateContentScripts();
  	}
});