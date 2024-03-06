document.addEventListener('DOMContentLoaded', function() {

    // override fetch
    const { fetch: origFetch } = window;
    window.fetch = async (...args) => {
        const response = await origFetch(...args);
        // check if the response is a graphql response
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return response;
        }
        const jsonData = await response.clone().json();
        if (jsonData == null) {
            return response;
        }
        if (!jsonData.hasOwnProperty("data")) {
            return response;
        }
        url = args[0]
        if (typeof url === 'object') {
            url = url.url
        }
        window.postMessage({ type: 'graphql', data: jsonData, url: window.location.href}, '*');
        return response;
    };
    
    // override XHR
    var originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        this.addEventListener('load', function() {
            if (this.responseType === '' || this.responseType === 'text') {
                try {
                    jsonData = JSON.parse(this.responseText);
                    if (jsonData == null) {
                        return;
                    }
                    if (jsonData.hasOwnProperty("data")) {
                        window.postMessage({ type: 'graphql', data: jsonData, url: window.location.href }, '*');
                    }
                } catch (e) {
                    return;
                }
            }
        });
        originalXHROpen.apply(this, arguments);
    };
});