var pool = require('./db');

// Funcion para cargar novedades de BD
async function getNovedades(user, password) {
        var query = 'select * from novedades order by id desc';
        var rows = await pool.query(query);
        return rows;
    }

// Funcion para eliminar una novedad
async function deleteNovedadById(id){
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query,[id]);
    return rows;
} 

//Funcion para Agregar Novedad
async function insertNovedad(obj){
    try{
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj])
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}

//MODIFICAR Función
async function getNovedadById(id){
    var query = "select * from novedades where id=?";
    var rows = await pool.query(query,[id]);
    return rows[0];
}

//Modificación de datos
async function modificarNovedadById(obj, id){
    try{
        var query = "update novedades set ? where id=?";
        var rows = await pool.query(query, [obj,id]);
        return rows;
    } catch(error){
        console.log(error);
        throw error;
    }
}
module.exports={getNovedades, deleteNovedadById, insertNovedad, getNovedadById, modificarNovedadById}