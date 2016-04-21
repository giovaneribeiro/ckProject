/* Atributos do circulo */
var raio = 50;

/* Informacoes */
var nodeInfo = $('#nodeInfo');
var info = "Selecione um dos nós para ver suas informações.";
nodeInfo.append(info);

/* Grupo de nos */
var nodes = [];
var nodeGroup = $('#nodeGroup');

/* HEAD */
var head = createNode("HEAD");
nodeGroup.append(head);

/* Visualizar informacoes */
function showNodeInfo(circle, event) {
    nodeInfo.empty();

    var textContent = circle.textContent.substr(0, circle.textContent.length-1);
    var position = searchNode(textContent);

    nodeInfo.append('Valor: ' + textContent);
    nodeInfo.append('<br>Posição: ' + (position==-1?'-':position));

    if(position+1 == nodes.length) {
        nodeInfo.append('<br>Aponta para: null');
    }
    else {
        nodeInfo.append('<br>Aponta para: ' + nodes[position+1].value);
    }
}

/* Esconder informacoes */
function hideNodeInfo() {
    nodeInfo.empty();
    nodeInfo.append(info);
}

/* Criar SVG */
function createNode(value) {

    return '<svg width="'+ raio*2 +'" height="'+ raio*2 +'" class="circle" onmouseover="showNodeInfo(this, event)" onmouseout="hideNodeInfo()">' +

        '<circle cx="'+ raio +'" cy="'+ raio +'" r="'+ raio +'"></circle>' +
        '<circle cx="15" cy="15" r="15" class="remove" onclick="removeNode(this)"></circle>' +

        '<text x="'+ raio +'" y="'+ raio +'">' +
            '<tspan>' + value + '</tspan>' +
        '</text>' +

        '<text x="15" y="15" onclick="removeNode(this)">x</text>' +

        '</svg> ';
}

/* Adicionar */
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

    $('#log').append(log('Adicionar', nodeName, nodes.length-1));
}

/* Remover */
function removeNode(node) {

    var svg = node.parentNode;

    var textContent = svg.textContent.substr(0, svg.textContent.length-1);

    if(textContent == 'HEAD') {
        nodeGroup.empty();
        nodeGroup.append(head);

        $('#log').append(log('Zerar', '-', '-'));

        return ;
    }

    svg.parentNode.removeChild(svg);

    var position = searchNode(textContent);
    nodes.splice(position, 1);

    hideNodeInfo();

    $('#log').append(log('Remover', textContent, position));
}

/* Procurar */
function searchNode(value) {

    if(value == 'HEAD') return -1;

    for(var i=0; i<nodes.length; i++) {
        if(nodes[i].value == value)
            return i;
    }
}

/* Criar linha do Log */
function log(action, value, position) {

    return '<tr>' +
        '<td>'+ action +'</td>' +
        '<td>'+ value +'</td>' +
        '<td>'+ position +'</td>' +
        '</tr>';
}