# Graffy

Graffy is a Chrome "side panel" extension that listens for GraphQL results on visited websites. When found, that data is transformed into a "network" graph using [vis.js](https://visjs.org). Originally designed as the missing graph visualization tool for Apollo Studio, Graffy can reveal interesting networks returned by all sorts of sites that use GraphQL.

![Alt text](imgs/extension.png?raw=true "Title")

### Requirements

In order for Graffy to render visualizations, several Graph-y (graffy) conditions must be satisfied:

1. The JSON result must have the `data` attribute (a GraphQL standard, but it's worth noting here that any "graph-y" JSON data that is found in JSON results with the key `data`, will be rendered into a visualization)
1. Nodes in the graph must have an identifier labelled `id`
1. Connected nodes (in arrays) must be immediate children of the parent node (i.e., Graffy won't connect edges that are in intermediate nodes below a parent)
1. At least two nodes have to be connected (one edge) in order for Graffy to render

Graffy will attempt to label nodes by examining their attributes. If `name` is found that is used, if not and attribute `title` exists, that will be used. If neither are found, the `id` attribute is used. If `name` and `title` exist, then the `title` attribute will be used as a tooltip displayed when hovering over graphs. 

Edges get the name of the predicate in which they are found. Use of GraphQL *alias*-ing is handy to get things working:

```GraphQL
query {
    queryEpisode {
        id
        __typename
        name: title
        title: description
        lines: {
            id
            __typename
            name: id
            title: dialogue
        }
    }
}
```

If the GraphQL constant `__typename` or `type` attribute is present, nodes will be classified (using color) accordingly.

### Pop-out Window

If the rendered network graph is too small, clicking the small button in the upper right hand corner (&#8599;) will open a new (presumably) larger browser window in which the GraphQL result as well as the network graph can be viewed. In this pop-out, you can adjust the graph physics and other options by click the gear icon.

The URL in which the pop-out network graph renders is self-contained and can be shared as a link with collaborators.

![Alt text](imgs/popout.png?raw=true "Title")

### Issues

Due to the nature of Chrome Side Panel extensions, network graphs rendered in a side panel in one open window at a particular URL will overwrite the rendered graph in another window opened at the same URL. Workaround: simply issue the query again.

Graphs with a large number of nodes can take several seconds to render and if highly-connected can take ages to stabilize. Workaround: open the pop-out and adjust the rendering configuration options.

### Privacy

Data that Graffy intercepts DOES NOT leave your machine. The exception to this is if you pop-out the graph to a new window. In this case, your JSON data is sent to a rendering server and is logged. Logs are not shared with third-parties. Logs are purged every 30 days.

Full details of the Privacy Policy are [here](privacy-policy.txt).

### Installation

Available at the Chrome Web Store via https://chromewebstore.google.com/detail/graffy/hpbbfdcfeinlpdhhjanfhkadiccofeif

### Contributing and Feedback

1. Clone (or download) this repo
2. In your Chrome browser, turn on "Developer Mode" after opening the Extensions window (Window->Extensions)
3. Select "Load Unpacked"
4. Choose the `ext-src` folder in the cloned/downloaded repo folder
5. Open your Chrome side panel by selecting the side panel icon: ![side panel icon](imgs/sidepanel-icon.png)
6. Select `graffy`

Feel free to submit pull requests and report bugs through [Issues](https://github.com/matthewmcneely/graffy/issues).
