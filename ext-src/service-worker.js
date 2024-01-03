chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener(async activeInfo => {
    //console.log("On activated (service-worker.js)", activeInfo)
    let url = ""
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        url = tab.url
        chrome.runtime.sendMessage({ name: 'tab-change', url: url, windowId: activeInfo.windowId });
    })
});
