var pool = require('./bd');
var md5 = require('md5');

async function getUserByUserNameAndPassword(user,password){

    try{
        var query = "select * from usuarios where usuario = ? and password = ? limit 1";
        var rows = await pool.query(query,[user, md5(password)]);
        return rows[0];
    } catch(error){
        throw error;
    }
}

module.exports = { getUserByUserNameAndPassword }

// try - catch > estructura de control para el manejo de errores
// (?) es el dato que se va a chequear