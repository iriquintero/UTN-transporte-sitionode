var pool = require('./bd');

async function getNovedades(){
    var query = "select *  from novedades";
    var rows = await pool.query(query);
    return rows;
}

async function insertNovedades(obj){
    try{
        var query = "insert into novedades set ?";
        var rows = await pool.query(query,[obj]);
        return rows;
    }catch (error){
        console.log(error);
        throw error;
    }
}

async function deleteNovedadesByID(id){
    var query= "delete from novedades where id = ?";
    var rows = await pool.query(query,[id]);
    return rows;
}

async function getNovedadesById(id){
    var query = 'select * from novedades where id=?';
    var rows = await pool.query(query,[id]);
    return rows[0];
}

async function modificarNovedadById(obj,id){
    try{
        var query = 'update novedades set ? where id=?';
        var rows = await pool.query(query,[obj,id]);
        return rows;
    }catch(error){
        throw error;
    }
}
//funcion > Buscar 
//query>select > where > like y OR
//pasamos a novedades.js
//volvemos hbs agregar > error

module.exports = { getNovedades, insertNovedades, deleteNovedadesByID, getNovedadesById,modificarNovedadById};