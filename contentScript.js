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
                data: { value: e.data.data }
              });
            break;
    }
});

