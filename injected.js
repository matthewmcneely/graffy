const { fetch: origFetch } = window;
window.fetch = async (...args) => {
    let inspect = false;
    if (args[0] == "http://localhost:8080/graphql") {
        console.log(args)
        console.log("fetching graphql");
        inspect = true;
    }
    const response = await origFetch(...args);
    if (!inspect) {
        return response;
    }
    //console.log('injected script fetch request:', args);
    response
        .clone()
        //.blob() // maybe json(), text(), blob()
        .json()
        .then(data => {
            window.postMessage({ type: 'graphql', data: data }, '*'); // send to content script
            //window.postMessage({ type: 'fetch', data: URL.createObjectURL(data) }, '*'); // if a big media file, can createObjectURL before send to content script
        })
        .catch(err => console.error(err));
    return response;
};