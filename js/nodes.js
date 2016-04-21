/* Informações dos círculos */
var raio = 50;

var nodeInfo = $('#nodeInfo');
nodeInfo.append("Selecione um nó");

var nodes = [];
var nodeGroup = $('#nodeGroup');

var head = createNode("HEAD");
nodeGroup.append(head);

function showNodeInfo(circle, event) {
    nodeInfo.empty();
    nodeInfo.append('Valor: ' + circle.textContent);
    nodeInfo.append('<br>Posição: ' + searchNode(circle.textContent));
}

function createNode(value) {

    return '<svg width="'+ raio*2 +'" height="'+ raio*2 +'" class="circle" onmouseover="showNodeInfo(this, event)">' +
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

    if(value == 'HEAD') return '-';

    for(var i=0; i<nodes.length; i++) {
        if(nodes[i].value == value)
            return i;
    }
}