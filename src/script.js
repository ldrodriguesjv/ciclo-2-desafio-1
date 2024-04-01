//instância para chamar o prompt--------------------------------------------------
//const promptEntrada = require('prompt-sync')({sigint:true});

const fs=require('fs');
const { promisify } = require('util');

//Configurando Sequelize
const {Sequelize}= require('sequelize');
const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:'./BD/dbVendas.db',
  logging:false
});
//---------------------------------------------------------------------------------
Conexao();
//definindo as tabelas--------------------------------------
const {DataTypes} = require('sequelize');
const { error } = require('console');
//Tabela Cliente
 const Clientes=sequelize.define('tb_clientes',{
  //Definindo campos
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true,
      unique:true
    },
  
    nome_cliente:{
      type:DataTypes.STRING,
      allowNull:false
    }
  });

  //Tabela Mesa
const Mesas = sequelize.define('tb_mesas',{
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:true
    },
  
    nome_mesa:{
      type: DataTypes.STRING,
      allowNull:false
    }
  });

//Tabela produtos
const Produtos = sequelize.define('tb_produtos',{
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:true
    },
  
    descricao:{
      type:DataTypes.STRING,
      allowNull:false
    },
  
    qtd:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
  
    vl_unit:{
      type: DataTypes.DOUBLE,
      allowNull:false
    }
  });

//Tabela venda tb_vendas
const Vendas = sequelize.define('tb_vendas',{
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:false
    },

    id_prod:{
      type:DataTypes.INTEGER,
      allowNull:false
    },

    qtd_prod:{
      type:DataTypes.DOUBLE,
      allowNull:false
    },

    vl_venda_prod:{
      type:DataTypes.DOUBLE,
      allowNull:false
    }
  });

//Tabela Vendas Gerais total do cupom
 const Cupons = sequelize.define('tb_cupons',{
    id_cupons:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:false
    },

    id_cpf:{
      type:DataTypes.INTEGER,
      allowNull:false
    },

    id_venda:{
      type:DataTypes.INTEGER,
      allowNull:false
    },

    id_tipo:{
      type:DataTypes.INTEGER,
      allowNull:false
    },

    id_mesa:{
      type:DataTypes.INTEGER,
      allowNull:false
    },

    qtd_user:{
      type:DataTypes.INTEGER,
      allowNull:false
    },

    vl_user:{
      type:DataTypes.DOUBLE,
      allowNull:false
    },

    vl_total:{
      type:DataTypes.DOUBLE,
      allowNull:false
    },

    dt_venda:{
      type:DataTypes.STRING,
      allowNull:false
    },

    vl_gorjeta:{
      type:DataTypes.DOUBLE,
      allowNull:false
    }
  });

//Tabela tipo de pagamentos
 const Tipos = sequelize.define('tb_tipos',{
    id:{
      type:DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      unique:true
    },

    descricao:{
      type:DataTypes.STRING,
      allowNull:false
    }
  });
//-------------------------------------------------------
//inserir dados no bd------------------------------------
//inserindo dados do cliente-----------------------------
async function inserirCliente(vCPF,vNomeCL){
  try {
    const pCliente = await Clientes.create({
      CPF:vCPF,
      nome_cliente:vNomeCL
    });
  } catch (error) {
    console.error('Erro ao inserir cliente.',error);
  }
}
//inserindo dados do cliente-----------------------------
async function inserirMesa(vNomeMesa){
  const maxId=await Mesas.findAll({
    attributes:[[sequelize.fn('max',sequelize.col('id')),'lastID']], raw:true,});
    const nextid = maxId[0].lastID +1 ||1;
  try {
    const pMesa = await Mesas.create({
      id:nextid,
      nome_mesa:vNomeMesa
    });
  } catch (error) {
    console.error('Erro ao inserir nome da mesa.',error);
  }
}
//inserindo dados do produto
async function inserirProduto(vDescProd,vQtdProd,vVlProd){
  const maxId=await Produtos.findAll({
    attributes:[[sequelize.fn('max',sequelize.col('id')),'lastID']], raw:true,});
    const nextid = maxId[0].lastID +1 ||1;
  try {
    const pProduto = await Produtos.create({
      id:nextid,
      descricao:vDescProd,
      qtd:vQtdProd,
      vl_unit:vVlProd
    });
  } catch (error) {
    console.error('Erro ao inserir produto.',error);
  }
}
//inserindo tipo de pagamento
async function inserirTipo(vDescPag){
  const maxId=await Tipos.findAll({
    attributes:[[sequelize.fn('max',sequelize.col('id')),'lastID']], raw:true,});
    const nextid = maxId[0].lastID +1 ||1;
  try {
    const pTipo = await Tipos.create({
      id:nextid,
      descricao:vDescPag,
    });
  } catch (error) {
    console.error('Erro ao inserir tipos de pagamento.',error);
  }
}
//-----------------------------------------------------

//Função para criar o banco de dados
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } apenas se quiser forçar a recriação das tabelas
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados.', error);
  }
}
//-----------------------------------------------------------------------
//função verifica se o bd não existe, senão existe chama função criar BD
function CriarTabelas(){
  const filePath='./BD/dbVendas.db';
  if (!fs.existsSync(filePath)){
    syncDatabase();
  };
}
function Conexao(){
  
  try {
    sequelize.authenticate();
    //Clientes.init(sequelize);
  } catch (error) {
    console.error(error);
  }
}

//-----------------------------------------------------------------------

async function encontrarClientePorCPF(pCPF) {
  try {
    const cliente = await Clientes.findOne({
      attributes: ['nome_cliente'],
      where: {
        cpf: pCPF
      }
    });

    if (cliente) {
      return cliente.nome_cliente;
    } else {
      return null; // Retorna null se não encontrar nenhum cliente com o CPF fornecido
    }
  } catch (error) {
    console.error('Erro ao buscar cliente por CPF:', error);
    throw error; // Lança o erro para ser tratado em um nível superior, se necessário
  }
}
async function encontrarMesa(pMesa) {
  try {
    const mesa = await Mesas.findOne({
      attributes: ['id'],
      where: {
        nome_mesa: pMesa
      }
    });

    if (mesa) {
      return mesa.id;
    } else {
      return null; // Retorna null se não encontrar nenhum cliente com o CPF fornecido
    }
  } catch (error) {
    console.error('Erro ao buscar nome da mesa:', error);
    throw error; // Lança o erro para ser tratado em um nível superior, se necessário
  }
}

/*function consultar(vCPFCons) {
  const sqlite3= require('sqlite3').verbose();
  const db = new sqlite3.Database('./BD/dbVendas.db');
  db.each('SELECT CPF, NOME_CLIENTE FROM TB_CLIENTES where CPF=?',[vCPFCons],function(err, row) {
    if(row===1){
      return true
    }else{
      return false
    }
    //const resultado=row.nome_cliente;
  });
}*/
//exporta os modulos e funções 
module.exports = {
  Clientes,
  Mesas,
  Produtos,
  Cupons,
  Vendas,
  Tipos,
  syncDatabase,
  CriarTabelas,
  inserirCliente,
  inserirMesa,
  inserirProduto,
  inserirTipo,
  limitarCPF,
  encontrarClientePorCPF,
  Conexao,
  encontrarMesa
};

function limitarCPF(str, limite) {
  if (str.length > limite) {
      return str.slice(0, limite);
  }
  return str;
}