//instância para chamar o prompt
const promptEntrada = require('prompt-sync')({sigint:true});
//instância para chamar o banco sqlite3
const sqlite3= require('sqlite3').verbose();

const fs=require('fs');
const { promisify } = require('util');
//criando o banco de dados
const db = new sqlite3.Database('./BD/dbVendas.db');

//verificando se exixte o banco de dados no local
const filePath='./BD/dbVendas.db';

//função criando tabela se o arquivo não existir
function CriarTabelas(){
    if (!fs.existsSync(filePath)){
        db.run('CREATE TABLE tb_mesas (id INTEGER, nome_mesa TEXT)');
        db.run('CREATE TABLE tb_cliente (CPF TEXT, nome_cliente TEXT)');
        db.run('CREATE TABLE tb_produtos (id INTEGER, descricao TEXT, qtd INTEGER,vl_unit INTEGER')
        db.run('CREATE TABLE tb_vendas (id_venda INTEGER,id_mesa INTEGER, id_CPF INTEGER,id_prod INTEGER, qtd_produto INTEGER, vl_venda INTEGER)');
        db.run('CREATE TABLE tb_vendas_totais (id_total,id_venda INTEGER, id_tipo INTEGER,qtd_pessoas, vl_pessoa INTEGER, vl_total_venda INTEGER, dt_venda TEXT,vl_gorjeta INTEGER)');
        db.run('CREATE TABLE tb_tipo_vendas (id_tipo INTEGER,descricao_vd TEXT)');

    };
};
function FecharTabelas(){
    db.close();
}
// função para inserir os dados na tabela clientes---------------------------------------------------
function CadastroCliente (vCPF_CL,vNome_CL){
    // Executa a inserção na tabela 'cliente'
    db.run("INSERT INTO tb_cliente (CPF, nome_cliente) VALUES (?, ?)",
        [vCPF_CL, vNome_CL],
        (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Cliente CPF " + vCPF_CL + ", nome " + vNome_CL + " cadastrado com sucesso");
        }
    );
    
  }
  module.exports = {
    CadastroCliente: CadastroCliente,
    FecharTabelas:FecharTabelas,
    CriarTabelas: CriarTabelas,
};

