chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

/*
chrome.tabs.onActivated.addListener(activeInfo => {
    console.log("On activated (service-worker.js)", activeInfo)
    console.log("Current window:", chrome.windows.getCurrent())
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        files: ['contentScript.js']
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'tab-change') {
        console.log("SENDING tab change from service-worker.js")
        chrome.runtime.sendMessage({ name: 'tab-change', data: request.color, url: request.url });
    }
});
*/

chrome.tabs.onActivated.addListener(async activeInfo => {
    console.log("On activated (service-worker.js)", activeInfo)
    /*
    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        files: ['contentScript.js']
    })
    */
   let url = ""
    chrome.tabs.get(activeInfo.tabId, (tab) => {
         url = tab.url
         chrome.runtime.sendMessage({ name: 'tab-change', url: url, windowId: activeInfo.windowId});
    })  
});
