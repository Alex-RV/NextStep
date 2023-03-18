const sqlite3 = require('sqlite3').verbose();
let sql 

let db = new sqlite3.Database('./Users.db', sqlite3.OPEN_READWRITE, (err) =>{
    if(err) return console.log(err.message)
});

const createDB = () =>{
    sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, firstName, lastName, interests, goals, availibility)`
    db.run(sql)
}


const addData = (firstName:string, lastName:string, interests:string, goals:string, availibility:string) =>{
    sql =  `INSERT INTO users(firstName, lastName, interests, goals, availibility ) VALUES (?,?,?,?,?)`
    db.run(sql,[firstName, lastName, interests, goals, availibility], (err) => {
        if(err) return console.log(err.message)
    })
}

//query
const query = () =>{
    sql = `SELECT * FROM users`
    db.all(sql,[], (err, rows) =>{
        if (err) return console.error(err.message)
        rows.forEach(rows => {
            console.log(rows)
        })
    })
}

//update
const updateData = (table, change, id) =>{
    sql = `UPDATE users SET ${table} = ? WHERE id = ?`
    db.run(sql,[change, id ],(err) => {
        if(err) return console.log(err.message)
    })
}

const deleteData = (table, id) =>{
    sql = `DELETE users SET ${table} = ? WHERE id = ?`
    db.run(sql,[id],(err) => {
        if(err) return console.log(err.message)
    })
}

export default {createDB, addData, query, updateData, deleteData}