function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    else cadastrarProduto(nome, codigo, parseInt(qtidade));
}
function cadastrarProduto(produto, codig, qtidade) {
    let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}
function atualizarTotalEstoque(idCampo) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
}
function carregarTotalEstoque(idCampo) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}
function listarEstoque() {
    let estoqueSection = document.getElementById("estoque");
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        let html = "<h2>Estoque:</h2>";
        if (produtos == null)
            html += "<p>Ainda não há nenhum item no estoque</p>";
        else {
            produtos = JSON.parse(produtos);
            html += "<table>";
            html += "<tr><th>Nome do Produto</th><th>Código do Produto</th><th>Quantidade no Estoque</th></tr>";
            produtos.forEach(produto => {
                html += "<tr>";
                html += "<td>" + produto.nome + "</td>";
                html += "<td>" + produto.codigo + "</td>";
                html += "<td>" + produto.quantidade + "</td>";
                html += "</tr>";
            });
            html += "</table>";
        }
        estoqueSection.innerHTML = html;
    } else {
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");
    }
}