var cy = cytoscape({
    container: document.getElementById('cy'),

    style: [
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(name)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle'
            }
        }
    ],

    layout: {
        name: 'cose'
    }
});

