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
module.exports={getNovedades, deleteNovedadById}