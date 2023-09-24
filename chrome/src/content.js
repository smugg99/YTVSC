function toArray(htmlCollection) {
	return new Array(htmlCollection.length).fill(0).map((ignore, index) => htmlCollection[index]);
}

function adjustVideoSpeed(speed) {
	// Just in case
	speed = parseFloat(speed);

	let videos = document.getElementsByTagName('video');
	console.log('Adjusting videos speed to: ' + speed);

	toArray(videos).map((video) => {
		if (video) {
			try {
				video.playbackRate = speed;
			} catch (error) {
				console.error(error);
			}
		}
    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.action === 'updateSettings') {
		// Shit has to be parsed here because js is retarded asf and converts everything to strings
		if (typeof message.enabled === 'boolean' && typeof parseFloat(message.speed) === 'number') {
			adjustVideoSpeed(message.enabled ? message.speed : 1.0);
		}
	}
});