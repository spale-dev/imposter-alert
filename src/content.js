const wordsToFind = ['sus', 'among', 'suspicious', 'imposter']; // Add your valid words here

window.onload = function () {
    highlightReference(document.body);
};

function highlightReference(element) {
    console.log(findTextNodes(element));

    // TODO: Add icon to found text nodes
    // // innerText for old IE versions.
    // var textContent = 'textContent' in element ? 'textContent' : 'innerText';
    // for (var i = text_nodes.length - 1; i >= 0; i--) {
    //     var dummy = document.createDocumentFragment()
    //         , node = text_nodes[i]
    //         , text = node[textContent], tmp;
    //     for (var j = 0; j < text.length; j++) {
    //         tmp = span.cloneNode(true); // Create clone from base
    //         tmp[textContent] = text[j]; // Set character
    //         dummy.appendChild(tmp);     // append span.
    //     }
    //     node.parentNode.replaceChild(dummy, node); // Replace text node
    // }
}

function findTextNodes(element) {
    let text_nodes = [];

    (function recursiveWalk(node) {
        if (node) {
            node = node.firstChild;
            while (node != null) {
                if (node.nodeType == 3) {           // Node.TEXT_NODE (3)
                    // BUG: Nothing pushes to text_nodes array
                    if (isValidNode(node)) {
                        text_nodes.push(node);
                    }
                } else if (node.nodeType == 1) {    // Node.ELEMENT_NODE (1)
                    recursiveWalk(node);
                }
                node = node.nextSibling;
            }
        }
    })(element);

    return text_nodes;
}

//  TODO: Exclude script elements from being valid
function isValidNode(node) {
    for (let word of wordsToFind) {
        if (node.textContent.toLowerCase().includes(word.toLowerCase())) {
            return true;
        }
    }
    return false;
}