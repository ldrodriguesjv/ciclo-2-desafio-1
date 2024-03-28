/* Modos que tem que instalar (prompt-sync, sqlite3, window)*/
const script = require('./script.js');
//instancia chamar prompt no node.js
const promptEntrada = require('prompt-sync')({sigint:true});
const promptOpcao = require('prompt')
//execução de comandos no terminal
const {exec}=require('child_process');
//script.CriarTabelas();
script.CriarTabelas();


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
    console.log('1. Cadastro de Cliente');
    console.log('2. Cadastro de mesas');
    console.log('3. Cadastro de produtos');
    console.log('4. Cadatro de tipo de crédito');
    console.log('5. Cadastro da venda');
    console.log('6. Sair');
    promptOpcao.get(['opcao'],function(err,result){
        if(err){return onErr(err);}
        switch(result.opcao){
            case '1':
                let continuar ='N';
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
                console.log('vc escolheu 2');
                exibirMenu();
                break;
            case '3':
                console.log('vc escolheu 3');
                exibirMenu();
                break;
            case '4':
                console.log('vc escolheu 4');
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