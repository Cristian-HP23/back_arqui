const  mysqlClient = require("mysql");

const conexion = mysqlClient.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'practica1',
    port: 3306
})

conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA')
    }
})

async function getday(dia){
    let query = `select * from datos where convert(fecha,date) = '${dia}' ;`;
    conexion.query(query,function(error,results,fields){
        if(error)
            throw error;

        results.forEach(result => {
            console.log(result);
        });
    })
}

async function getday2(dia) {
    return new Promise((resolve, reject) => {
        let query = `select * from datos where convert(fecha,date) = '${dia}' ;`;
        conexion.query(query,function(error,results,fields){
            return error ? reject(error) : resolve(results);
        });
    })
  }

async function insert(data){
    var arraydatos = data.split(',');
    let query = `insert into datos(Temp_Int,Temp_Ext,Humedad,Luz,Co2) values(${arraydatos[0]},${arraydatos[1]},${arraydatos[2]},${arraydatos[3]},${arraydatos[4].replace(';','')})`;
    conexion.query(query,function(error,results,fields){
        if(error)
            throw error;
        console.log('insert 1');
    })
}
module.exports={
    getday,
    insert
}
