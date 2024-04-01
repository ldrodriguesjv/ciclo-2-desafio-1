const prompt = require('prompt-sync')({ sigint: true });
const promptOpcao = require('prompt');

let produtos = [];
let nome = String;
let preco = 0.0;
let total = 0;
let sair = 'n';
let continuar = 's';
let pgorjeta = 0;



console.log('-------------------------------------------------------');
console.log('------------Controle de Venda Restaurante--------------')

let opcaopg=prompt('Qual é a forma de pagamento?' );
var gorjet = prompt('Deseja incluir gorjeta?(S/N)');
let qtdpessoa = prompt('Quantas pessoas na mesa?');

while (sair.toLowerCase() === 'n') {
    // Captura o nome do produto
    nome = prompt('Digite o nome do produto: ');

    // Captura o preço do produto
    preco = parseFloat(prompt('Digite o preço do produto: '));

    // Adiciona o produto ao array
    produtos.push({ nome: nome, preco: preco });
    total = total + preco;

    continuar = prompt('Deseja continuar incluir mais produtos?');
    if (continuar.toLowerCase() === 'n') {
        break;
    }

}
console.log('-------------------------------------------------------');
// Mostra os produtos adicionados
console.log("Produtos adicionados:");
console.log("Nome do Produto | Preço do Produto");

produtos.forEach(function (produto) {
    console.log(produto.nome, "=====>", produto.preco);
});

console.log('-------------------------------------------------------');
console.log('Total dos produtos:R$' + total.toFixed(2));
console.log('-------------------------------------------------------');
console.log('-------------------------------------------------------');




if (opcaopg.toLowerCase() === 'pix' || opcaopg.toLowerCase() ==='dinheiro') {
    total = total * (1 - 0.1);
    console.log('Total de desconto: R$' + total.toFixed(2));
}

if (gorjet.toLowerCase() === 's') {

    pgorjeta = (total * (1 + 0.05)) - total;
    total = total * (1 + 0.05);
}

console.log('Total da Venda R$' + total.toFixed(2));
console.log('Gorjeta a pagar:R$' + pgorjeta.toFixed(2));
console.log('Total da Venda por pessoa na mesa R$' + (total / qtdpessoa).toFixed(2));

