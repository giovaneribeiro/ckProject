/* Informações dos círculos */
var raio = 50;

var nodeInfo = $('#nodeInfo');
var info = "Selecione um nós para ver suas informações.";
nodeInfo.append(info);

var nodes = [];
var nodeGroup = $('#nodeGroup');

var head = createNode("HEAD");
nodeGroup.append(head);

function showNodeInfo(circle, event) {
    nodeInfo.empty();

    var position = searchNode(circle.textContent);

    nodeInfo.append('Valor: ' + circle.textContent);
    nodeInfo.append('<br>Posição: ' + (position==-1?'-':position));

    if(position+1 == nodes.length) {
        nodeInfo.append('<br>Aponta para: null');
    }
    else {
        nodeInfo.append('<br>Aponta para: ' + nodes[position+1].value);
    }
}

function hideNodeInfo() {
    nodeInfo.empty();
    nodeInfo.append(info);
}

function createNode(value) {

    return '<svg width="'+ raio*2 +'" height="'+ raio*2 +'" class="circle" onmouseover="showNodeInfo(this, event)" onmouseout="hideNodeInfo()">' +
        '<circle cx="'+ raio +'" cy="'+ raio +'" r="'+ raio +'"></circle>' +
        '<text x="'+ raio +'" y="'+ raio +'">' +
        '<tspan>' + value + '</tspan>' +
        '</text>' +
        '</svg> ';
}

function addNode() {
    var nodeName = $('#nodeName').val();

    if(nodeName == "") {
        alert("Você precisa adicionar um valor ao nó.");
        return ;
    }
    else if(searchNode(nodeName) != null) {
        alert("Já existe um nó com este nome.");
        return ;
    }

    var node = createNode(nodeName);
    nodeGroup.append(node);

    nodes.push({"value": nodeName});

    $('#nodeName').val('');
}

function searchNode(value) {

    if(value == 'HEAD') return -1;

    for(var i=0; i<nodes.length; i++) {
        if(nodes[i].value == value)
            return i;
    }
}