const wordsToFind = ['sus', 'among', 'suspicious', 'imposter']; // Add your valid words here

window.onload = function () {
    highlightReference(document.body);
};

function highlightReference(element) {
    console.log(findTextNodes(element));
}

function findTextNodes(element) {
    var text_nodes = [];

    (function recursiveWalk(node) {
        if (node) {
            node = node.firstChild;
            while (node != null) {
                if (node.nodeType == 3) {           // Node.TEXT_NODE (3)
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
    wordsToFind.forEach(function (word) {
        if (node.textContent.toLowerCase().includes(word.toLowerCase())) {
            return true;
        }
    })
    return false;
}