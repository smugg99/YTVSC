function toArray(htmlCollection) {
	return new Array(htmlCollection.length).fill(0).map((ignore, index) => htmlCollection[index]);
}

chrome.storage.sync.get(["speed", "enabled"], function (result) {
	console.log("NIGGGA NIGGA");
	let videos = document.getElementsByTagName('video');
	
	toArray(videos).map((video) => {
		if (video) {
			video.playbackRate = result.speed;
			console.log(`Set speed to loaded default: ${result.speed}`);
		}
	});
});



// function adjustVideoSpeed(speed) {
// 	let videos = document.getElementsByTagName('video');
// 	console.log("Adjusting video speed!");

// 	toArray(videos).map((video) => {
// 		if (video) {
//     		video.playbackRate = speed;
// 			console.log(`Set speed to loaded default: ${speed}`);
//       	}
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {
// 	console.log("DOM Loaded!");
// 	chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
// 		console.log(message);
// 		if (message.action === "updateSettings") {
// 			console.log("Updating settings!");
// 			if (typeof message.enabled === "boolean" && typeof message.speed === "number") {
// 				if (message.enabled) {
// 					adjustVideoSpeed(message.speed);
// 				} else {
// 					adjustVideoSpeed(1.0);
// 				}
// 			}
// 		}
// 	});
// });