/* Modos que tem que instalar (prompt-sync, sqlite3, window)*/

const script = require('./script.js');
//instancia chamar prompt no node.js
const promptEntrada = require('prompt-sync')({sigint:true});
//script.CriarTabelas();

script.CriarTabelas();

let pDescricao=promptEntrada('Desccrição: ');
let pQtd = promptEntrada('Quantidade: ');
let pVlUnit =parseFloat(promptEntrada('Valor Unitário: ').replace(',','.'));
script.inserirProduto(pDescricao,pQtd,pVlUnit);
//script.CadastroCliente(pCPF,pNomeCL);
//script.FecharTabelas();

