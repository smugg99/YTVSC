document.addEventListener('DOMContentLoaded', function () {
	function updateSpeedUI(newSpeed) {
		newSpeed = parseFloat(newSpeed);

		speedSlider.value = newSpeed;
		speedValue.textContent = newSpeed.toFixed(2) + 'x';
	}

	function updateEnabledUI(newEnabled) {
		toggleExtension.checked = newEnabled;
		toggleExtensionLabel.textContent = newEnabled ? 'Enabled' : 'Disabled';
	}

	function sendSpeed(newSpeed) {
		chrome.storage.sync.set({
			speed: speed
		});

		chrome.runtime.sendMessage({
			action: 'updateSpeed',
			speed: newSpeed
		});
	}

	function sendEnabled(newEnabled) {
		chrome.storage.sync.set({
			enabled: enabled
		});

		chrome.runtime.sendMessage({
			action: 'toggleExtension',
			enabled: newEnabled
		});
	}

	const speedSlider = document.getElementById('speedSlider');
	const speedValue = document.getElementById('speedValue');
	const toggleExtension = document.getElementById('toggleExtension');
	const toggleExtensionLabel = document.querySelector('label[for=\'toggleExtension\']');

	let speed = 1.0;
	let enabled = false;

	chrome.storage.sync.get(['speed', 'enabled'], function (result) {
		const savedSpeed = result.speed || 1.0;
		const savedEnabled = result.enabled || false;

		speed = parseFloat(savedSpeed);
		enabled = savedEnabled;

		updateSpeedUI(speed);
		updateEnabledUI(enabled);

		sendSpeed(speed);
		sendEnabled(enabled);

		console.log('Loaded speed: ' + speed + ' is enabled: ' + enabled);
	});
	
	// Only for updating the UI
	speedSlider.addEventListener('input', function () {
		const newSpeed = parseFloat(speedSlider.value).toFixed(2);

		updateSpeedUI(newSpeed);
	
		console.log('Speed slider changed to: ' + speed);
  	});

  	speedSlider.addEventListener('mouseup', function () {
		const newSpeed = parseFloat(speedSlider.value).toFixed(2);
		speed = parseFloat(newSpeed)	

		updateSpeedUI(speed);
		sendSpeed(speed);
			
		console.log('Speed slider left at: ' + speed);
  	});

  	toggleExtension.addEventListener('change', function () {
		enabled = toggleExtension.checked;
			
		updateEnabledUI(enabled);
		sendEnabled(enabled);

		console.log('Enabled tick box changed to: ' + enabled);
  	});
});
