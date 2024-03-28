/* Modos que tem que instalar (prompt-sync, sqlite3, window)*/
const script = require('./script.js');
//instancia chamar prompt no node.js
const promptEntrada = require('prompt-sync')({sigint:true});
const promptOpcao = require('prompt')
//execução de comandos no terminal
const {exec}=require('child_process');
const { DOUBLE, INTEGER, STRING } = require('sequelize');
//script.CriarTabelas();
script.CriarTabelas();
let continuar ='N';

//let pDescricao=promptEntrada('Desccrição: ');
//let pQtd = promptEntrada('Quantidade: ');
//let pVlUnit =parseFloat(promptEntrada('Valor Unitário: ').replace(',','.'));
//script.inserirTipo(pDescricao);
//script.CadastroCliente(pCPF,pNomeCL);
//script.FecharTabelas();
function limparTerminal(){
    const cmdLimpar = process.platform=='win32' ? 'cls' : 'clear';
    exec(cmdLimpar,(err,stdout,stderr)=>{
        if(err){
            console.error(`Erro ao limpar o terminal: ${err}`);
            return;
        }
        exibirMenu();
    });
}


function exibirMenu(){
    console.log('----------------------------------------------');
    console.log('\n Bem-vindo ao restaurante LA CARTE!!');
    console.log('Seleciona umas das opções abaixo:');
    console.log('1. Cadastrar Cliente');
    console.log('2. Cadastrar mesas');
    console.log('3. Cadastrar produtos');
    console.log('4. Cadatrar tipo de crédito');
    console.log('5. Cadastrar uma venda');
    console.log('6. Sair');
    promptOpcao.get(['opcao'],function(err,result){
        if(err){return onErr(err);}
        switch(result.opcao){
            case '1':
                continuar ='N';
                let pCPF=String;
                let pNomeCL=String;
                while (continuar==='N' || continuar==='n'){
                    pCPF = promptEntrada('Digita o CPF: ');
                    pNomeCL = promptEntrada('Digita o nome: ');
                    continuar = promptEntrada('CPF do Cliente '+ pCPF + ' nome do cliente '+pNomeCL+' está correto?(Y/N)');
                };
                script.inserirCliente(pCPF,pNomeCL);
                exibirMenu();
                break;

            case '2':
                let pNomeMesa = String;
                continuar='N';
                while (continuar==='N' || continuar==='n'){
                    pNomeMesa = promptEntrada('Digita o nome da mesa:(Ex.:Mesa01) ');
                    continuar = promptEntrada('Nome da mesa foi '+ pNomeMesa + ' está correto?(Y/N)');
                };
                script.inserirMesa(pNomeMesa);
                exibirMenu();
                break;

            case '3':
                let pDescProd=STRING, pQtdProd=INTEGER, pVL_Prod=DOUBLE;
                continuar='N'
                while(continuar==='N' || continuar==='n'){
                    pDescProd=promptEntrada('Digita nome do produto: ');
                    pQtdProd=promptEntrada('Digita a quantidade para o estoque: ');
                    pVL_Prod=promptEntrada('Digita o valor unitário: ');
                    continuar=promptEntrada('Foi cadastrado produto '+pDescProd+' com quantidade '+pQtdProd+' com valor unitário R$'+pVL_Prod+' está correto?(Y/N)');
                };
                script.inserirProduto(pDescProd,pQtdProd,pVL_Prod);
                exibirMenu();
                break;

            case '4':
                let pDescTipo = String;
                continuar='N';
                while (continuar==='N' || continuar==='n'){
                    pDescTipo = promptEntrada('Digita a forma de pagamento: ');
                    continuar = promptEntrada('Forma de pagamento '+ pDescTipo + ' está correto?(Y/N)');
                };
                script.inserirTipo(pDescTipo);                
                exibirMenu();
                break;

            case '5':
                console.log('vc escolheu 5');
                exibirMenu();
                break;
                
            case '6':
                console.log('vc escolheu 6');
                break;
                default:
                    console.log('Opção inválida, escolhe novamente.');
                    exibirMenu();
        }
    });
}
exibirMenu();
function onErr(err){
    console.error(err);
    return 1;
}