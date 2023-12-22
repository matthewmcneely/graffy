/**
 * Recursively extract nodes and edges from an object created from the result of a query.
 * 
 * Nodes (vertices) from the query must have an `uidAttr` field to be recognized as a node.
 * Optionally, if a `type` field is present (either as an array or a string),
 * the type will be applied to the node. Attributes of nodes encountered in more
 * than one place in the result object will be merged/overwritten.
 * 
 * Edges are automatically extracted. If a node has an id and a parent, a relationship is made. 
 * The relationship predicate name is assigned as the edge type.
 * 
 * @param {Object} nodes - The nodes to update.
 * @param {Array} edges - The edges to update.
 * @param {Object} data - The data to extract from.
 * @param {String} [uidAttr='id'] - The attribute to use as a unique identifier for nodes.
 * @param {Object} [parent=null] - The parent node.
 * @param {String} [name=null] - The name of the current data field.
 */
function extractDict(nodes, edges, data, uidAttr = 'id', parent = null, name = null) {
    function updateNode(nodes, key, value) {
        nodes[key] = nodes[key] || {};
        for (const k in value) {
            if (Object.hasOwnProperty.call(value, k) && !Array.isArray(value[k])) {
                nodes[key][k] = value[k];
            }
        }
    }

    if (typeof data === 'object' && data !== null) {
        // uidAttr (e.g., 'id') is a special attribute, we use it to identify unique nodes
        if (data.hasOwnProperty(uidAttr)) {
            updateNode(nodes, data[uidAttr], data);
            // if we have a parent and a current node with uidAttr, add an edge
            if (parent && parent.hasOwnProperty(uidAttr)) {
                edges.push({
                    src: parent[uidAttr],
                    dst: data[uidAttr],
                    type: name
                });
            }
        }
        // recurse into the object
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                // If the __typename field was not aliased, convert it to 'group'
                if (key == '__typename') {
                    updateNode(nodes, data[uidAttr], { group: value });
                    delete nodes[data[uidAttr]].__typename;
                }
                if (typeof value === 'object' && value !== null && !(value instanceof Array)) {
                    extractDict(nodes, edges, value, uidAttr, data, key);
                } else if (Array.isArray(value)) {
                    // In Dgraph DQL results, types are arrays... select the first element as the group
                    if (key === 'dgraph.type' && value.length > 0) {
                        updateNode(nodes, data[uidAttr], { group: value[0] });
                    }
                    // If the __typename field was not aliased, convert it to type
                    // Handle arrays, check if elements are objects (potential nodes)
                    value.forEach(element => {
                        if (element && typeof element === 'object' && element.hasOwnProperty(uidAttr)) {
                            extractDict(nodes, edges, element, uidAttr, data, key);
                        }
                    });
                }
            }
        }
    }
}

function convertToVisualizationFormat(nodes, edges) {
    let result = {nodes: [], edges: []};
    for (const key in nodes) {
        target = {}
        source = nodes[key];
        for (let key in source) {
            // Check if the property is part of the source object itself, not its prototype
            if (source.hasOwnProperty(key)) {
                // Check if the property is not an array and not an object
                if (!Array.isArray(source[key]) && typeof source[key] !== 'object') {
                    target[key] = source[key];
                }
            }
        }
        if (!target.hasOwnProperty("label")) {
            var suspects = ["name", "title", "id"];
            for (let i = 0; i < suspects.length; i++) {
                if (source.hasOwnProperty(suspects[i])) {
                    target["label"] = source[suspects[i]];
                    break;
                }
            }
        }
        result["nodes"].push(target);
    }
    for (const edge of edges) {
        result["edges"].push({ from: edge.src, to: edge.dst, label: edge.type });
    }
    return result;
}

//module.exports = { extractDict };