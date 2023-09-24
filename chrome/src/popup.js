document.addEventListener("DOMContentLoaded", function () {
	const speedSlider = document.getElementById("speedSlider");
	const speedValue = document.getElementById("speedValue");
	const toggleExtension = document.getElementById("toggleExtension");

	let enabled = false;

	  // Load the settings from storage and update the UI
	chrome.storage.sync.get(["speed", "enabled"], function (result) {
		const savedSpeed = result.speed || 1.0;
		const savedEnabled = result.enabled || false;

		speedSlider.value = savedSpeed;
		speedValue.textContent = savedSpeed.toFixed(2) + "x";
		toggleExtension.checked = savedEnabled;

		// Apply the saved speed to the YouTube video (You'll need to communicate with a content script or background script here).
  	});
	
  	speedSlider.addEventListener("input", function () {
		const speed = parseFloat(speedSlider.value).toFixed(2);
		speedValue.textContent = speed + "x";
		// You can send a message to a background script to update the YouTube video speed here.
			
		chrome.storage.sync.set({ speed: parseFloat(speed) });
		chrome.runtime.sendMessage({ action: "updateSpeed", speed });
			
			console.log("Speed slider changed!");
  	});

  	toggleExtension.addEventListener("change", function () {
		// You can send a message to a background script to enable/disable the extension's logic here.
		enabled = toggleExtension.checked;
		chrome.storage.sync.set({ enabled });
		chrome.runtime.sendMessage({ action: "toggleExtension", enabled });
		
		console.log("Tick box changed!");
  	});
});
