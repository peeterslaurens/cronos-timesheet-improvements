// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

var counter = 0;
chrome.browserAction.onClicked.addListener(function (tab) {
    counter++;
    if (counter == 5) {
        alert("Hey !!! You have clicked five times");
    }
});

console.log(chrome.extension.onRequest.addListener);
console.log(chrome.extension.onMessage.addListener);
chrome.extension.onRequest.addListener(function(request) {
  console.log(request);

	if (request.command !== 'sendToConsole')
		return;

	chrome.tabs.executeScript(request.tabId, {
		code: "'" + request.args + "';",
	});
});