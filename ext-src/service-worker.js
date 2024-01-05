chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.tabs.onActivated.addListener(async activeInfo => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        let url = tab.url;
        if (url === "") {
            url = tab.pendingUrl;
        }
        chrome.runtime.sendMessage({ name: 'tab-change', url: url, windowId: activeInfo.windowId });
    })
});
