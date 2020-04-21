const mysql = require("mysql");
const pool = mysql.createPool({
    host: "localhost",
    database: "soainf20192m5",
    user: "root",
    password: ""
});

function getConnection() {
    return new Promise(function(resolve,reject) {
        pool.getConnection(function(err, conn) {
            if(err) {
                reject(err);
            }
            else {
                resolve(conn);
            }
        })
    });
}

function executeQuery(query) {
    return new Promise(function(resolve, reject) {
        conn.query(query, function(err, result) {
            if(err) { reject(err) }
            else {
                resolve(result);
            }
        });
    });
}

async function insert(name, pp) {

    const conn = await getConnection();
    const result = await executeQuery(conn, `insert into account values (null, '${name}', 'uploads/${pp}')`);
    const result2 = await executeQuery(conn, `select * from account where id=${result.insertId}`);
    return result2[0];
}

module.exports = {
    insert : insert
}