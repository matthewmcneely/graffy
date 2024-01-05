async function isTabInWindow(targetWindowId) {
  try {
    // Get the current tab's window ID
    const currentWindow = await chrome.windows.getCurrent();
    const currentWindowId = currentWindow.id;
    //console.log("current window", currentWindowId, "target window", targetWindowId)
    // Check if the current window ID matches the target window ID
    return currentWindowId === targetWindowId;
  } catch (error) {
    //console.error("Error checking window ID:", error);
    return false; // Assume not in the target window if an error occurs
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  let name = msg.name;
  let url = msg.url;
  //console.log("content script received message", msg);
  if (name == "graphql-result") {
    nodes = {}
    edges = []
    extractDict(nodes, edges, msg.data.value);
    if (edges.length > 0) {
      document.getElementById('loader').style.display = 'flex';
      result = convertToVisualizationFormat(nodes, edges);
      activeGraph = {
        nodes: new vis.DataSet(result.nodes),
        edges: new vis.DataSet(result.edges)
      }
      if (activeGraph.nodes.length > 300) {
        network.physics.options.barnesHut.gravitationalConstant = -20000
        network.physics.options.barnesHut.springConstant = 0.02
        network.physics.options.barnesHut.springLength = 80
      } else {
        network.physics.options.barnesHut.gravitationalConstant = -800
        network.physics.options.barnesHut.springConstant = 0.04
        network.physics.options.barnesHut.springLength = 95
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
    if (!isTabInWindow(msg.windowId)) {
      return;
    }
    let hostname = ""
    try {
      hostname = new URL(url).hostname
    } catch (e) {
      return
    }
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
    network.setData({nodes: [], edges: []})
    network.redraw()
    document.getElementById('newTab')["activeData"] = null
    if (optionsMap[url] && optionsMap[url]["activeGraph"]) {
      document.getElementById('loader').style.display = 'flex';
      network.setData(optionsMap[url]["activeGraph"]);
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
  if (!document.getElementById('newTab')) {
    return
  }
  document.getElementById('newTab').addEventListener('click', function () {
    let activeData = document.getElementById('newTab')["activeData"]
    if (!activeData) {
      return
    }
    // encode the data to base64
    //let encodedData = btoa(JSON.stringify(activeData));
    compressAndEncodeBase64(activeData).then((encodedData) => {
      let url = "https://graffy.matthewmcneely.net/"
      let data = base64ToUrlSafe(encodedData)
      chrome.windows.create({ url: url + `?data=${data}` });
    });
  });

});
