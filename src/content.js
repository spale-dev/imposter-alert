const wordsToFind = ['sus', 'suspicious', 'imposter']; // Add your valid words here

window.onload = function () {
    // TODO: Make highlight work on newly loaded nodes
    highlightReference(document.body);
};

function highlightReference(element) {
    let refs = findTextNodes(element);

    // TODO: Refactor code
    refs.forEach((obj) => {
        let node = obj.node;
        let foundWord = obj.foundWord;

        const words = node.textContent.split(' ');
        const index = words.findIndex((word) => word.toLowerCase().includes(foundWord.toLowerCase()));

        if (index !== -1) {

            const img = document.createElement('img');
            img.src = chrome.runtime.getURL('../assets/icon.png');
            img.style.display = 'inline-block';
            img.style.verticalAlign = 'middle';
            img.style.margin = '0 1px 0 2px';
            img.style.width = '20px';

            // Create text nodes for the text before and after the found word
            const beforeText = words.slice(0, index).join(' ');
            const beforeTextNode = document.createTextNode(beforeText);

            const afterText = words.slice(index + 1).join(' ');
            const afterTextNode = document.createTextNode(afterText);

            // Create a new span element
            const spanElement = document.createElement('span');
            spanElement.style.color = 'red'; // Apply red color

            // Create a new text node with the word
            const wordTextNode = document.createTextNode(words[index] + ' ');
            spanElement.appendChild(wordTextNode);

            // Replace the original text node with the new nodes
            node.textContent = '';
            node.parentNode.insertBefore(beforeTextNode, node);
            node.parentNode.insertBefore(img, node);
            node.parentNode.insertBefore(spanElement, node);
            node.parentNode.insertBefore(afterTextNode, node);
        }
    });
}

function findTextNodes(element) {
    let text_nodes = [];

    (function recursiveWalk(node) {
        if (node) {
            node = node.firstChild;
            while (node != null) {
                if (node.nodeType == 3) {           // Node.TEXT_NODE (3)
                    let validObject = isValidNode(node);
                    if (validObject.found) {
                        text_nodes.push(validObject);
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
            return { node: node, foundWord: word, found: true };
        }
    }
    return { found: false };
}