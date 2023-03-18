const sqlite3 = require('sqlite3').verbose();

let sql 

let db = new sqlite3.Database('./Users.db', sqlite3.OPEN_READWRITE, (err) =>{
    if(err) return console.log(err.message)
});

const createDB = () =>{
    sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, firstName, lastName, interests, goals, availibility)`
    db.run(sql)
}


const addData = () =>{
    sql =  `INSERT INTO users(firstName, lastName, interests, goals, availibility) VALUES (?,?,?,?,?)`
    db.run(sql,["rick", 'rickson', 'ricking', 'being a rick', 'a rick'], (err) => {
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
const updateData = () =>{
    sql = `UPDATE users SET firstName = ? WHERE id = ?`
    db.run(sql,["David", 1 ],(err) => {
        if(err) return console.log(err.message)
    })
}

const deleteData = () =>{
    sql = `DELETE users SET firstName = ? WHERE id = ?`
    db.run(sql,[1],(err) => {
        if(err) return console.log(err.message)
    })
}

export default {createDB, addData, query, updateData, deleteData}