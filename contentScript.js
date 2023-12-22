console.log('content script start');

// inject injected script
var s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
 
// receive message from injected script
window.addEventListener('message', function (e) {
    switch (e.data.type) {
        case 'graphql':
            console.log('content script received graphql:', e.data.data);
            chrome.runtime.sendMessage({
                name: 'graphql-result',
                data: { value: e.data.data },
                url: e.data.url
              });
            break;
    }
});

/*
function sendTabChange() {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    console.log("SENDING tab change from contentScript.js")
    chrome.runtime.sendMessage({ name: 'tab-change', color: bgColor, url: window.location.href });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", sendTabChange);
} else {
    sendTabChange();
}
*/
