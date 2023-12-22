
var options = {
    edges: {
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 0.6,
                type: 'arrow'
            }
        },
        font: {
            face: 'Helvetica',
            color: 'white',
            strokeWidth: 0,
            size: 11
        }
    },
    nodes: {
        color: '#2070cb',
        size: 24,
        fixed: false,
        font: {
            face: 'Helvetica',
            color: 'white',
            size: 12
        },
        scaling: {
            label: false
        },
        shadow: true,
        shape: 'dot'
    },
    physics: {
        enabled: true
    }
}

var resultsMap = {}

var optionsMap = {
    "studio.apollographql.com": {
        "body-background-color": "#1b2240",
        "node-color": "#2070cb",
        "text-color": "#FAFAFA",
        options: JSON.parse(JSON.stringify(options))
    },
    "cloud.dgraph.io": {
        "body-background-color": "#ffffff",
        "node-color": "#2070cb",
        "text-color": "black",
        options: JSON.parse(JSON.stringify(options))
    },
    "dark-mode": {
        "body-background-color": "#121212",
        "node-color": "#2070cb",
        "text-color": "#FAFAFA",
        options: JSON.parse(JSON.stringify(options))
    },
    "light-mode": {
        "body-background-color": "#FAFAFA",
        "node-color": "#2070cb",
        "text-color": "black",
        options: JSON.parse(JSON.stringify(options))
    }
}

var network = null

document.addEventListener('DOMContentLoaded', function() {
    for (var key in optionsMap) {
        let value = optionsMap[key]
        value.options.nodes.color = value["node-color"]
        value.options.nodes.font.color = value["text-color"]
        value.options.edges.font.color = value["text-color"]
    }

    var container = document.getElementById('vis');
    if (container) {
        network = new vis.Network(container, {}, options);

        network.on('click', function (properties) {
            var ids = properties.nodes;
            let activeGraph = network["activeGraph"]
            if (!activeGraph) {
                return
            }
            let clickedNodes = activeGraph.nodes.get(ids);
            let popup = document.getElementById('popup')
            if (clickedNodes.length != 1) {
                popup.style.display = 'none';
                return
            }
            let popupContent = document.getElementById('popup-text')
            let clickedNode = clickedNodes[0]
            var text = ""
            for (const key in clickedNode) {
                if (clickedNode.hasOwnProperty(key)) {
                    const element = clickedNode[key];
                    text += `<span><b>${key}:</b> ${element}</span><br>`
                }
            }
            popupContent.innerHTML = text;
            var popupBox = document.querySelector('.popup-content');
            popupBox.style.top =  properties.pointer.DOM.y + 'px';
            popupBox.style.left = (properties.pointer.DOM.x+30) + 'px';
            popup.style.display = 'block';
        });

        window.onclick = function(event) {
            if (event.target == document.getElementById('popup')) {
                document.getElementById('popup').style.display = 'none';
            }
        };        

    }
});
  
