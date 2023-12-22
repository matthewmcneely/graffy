async function isTabInWindow(targetWindowId) {
  try {
    // Get the current tab's window ID
    const currentWindow = await chrome.windows.getCurrent();
    const currentWindowId = currentWindow.id;
    console.log("current window", currentWindowId, "target window", targetWindowId)
    // Check if the current window ID matches the target window ID
    return currentWindowId === targetWindowId;
  } catch (error) {
    console.error("Error checking window ID:", error);
    return false; // Assume not in the target window if an error occurs
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  let name = msg.name;
  let url = msg.url;
  console.log("content script received message", msg);
  if (name == "graphql-result") {
    nodes = {}
    edges = []
    extractDict(nodes, edges, msg.data.value);
    if (edges.length > 0) {
      result = convertToVisualizationFormat(nodes, edges);
      activeGraph = {
        nodes: new vis.DataSet(result.nodes),
        edges: new vis.DataSet(result.edges)
      }
      network.setData(activeGraph)
      network["activeGraph"] = activeGraph
      let url = ""
      if (msg.url) {
        url = msg.url
      }
      if (!optionsMap[url]) {
        optionsMap[url] = {}
      }
      optionsMap[url]["activeGraph"] = activeGraph
      document.getElementById('newTab')["activeData"] = msg.data.value
    }
  }
  if (name == "tab-change") {
    console.log(`tab change, url ${url}, windowId ${msg.windowId}`);
    if (!isTabInWindow(msg.windowId)) {
      return;
    }
    let hostname = new URL(url).hostname
    let value = optionsMap[hostname]
    if (!value) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        hostname = "dark-mode"
      } else {
        hostname = "light-mode"
      }
      value = optionsMap[hostname]
    }
    network.setOptions(optionsMap[hostname].options);
    document.getElementById('vis').style.backgroundColor = value["body-background-color"];
    network.setData({})
    document.getElementById('newTab')["activeData"] = null
    if (optionsMap[url] && optionsMap[url]["activeGraph"]) {
      network.setData(optionsMap[url]["activeGraph"]);
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  console.log("sidepanel.js DOMContentLoaded");
  document.getElementById('newTab').addEventListener('click', function () {
    let activeData = document.getElementById('newTab')["activeData"]
    if (!activeData) {
      return
    }
    // encode the data to base64
    let encodedData = btoa(JSON.stringify(activeData));
    chrome.windows.create({ url: "file:///Users/matthew/code/graffy/rawvisjs.html"+`?data=${encodedData}` });
  });

});
