const express = require('express');
const app = express();
const cors = require('cors')
var mysql = require('mysql');

app.listen(9999, () => {
    console.log('Server started!');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.route('/api/cats').post((req, res) => {
    res.send(201, req.body);
});

app.route('/api/cats/:name').put((req, res) => {
    res.send(200, req.body);
});

app.route('/api/cats/:name').delete((req, res) => {
    res.sendStatus(204);
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "angular_demo"
});

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "angular_demo"
});

// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM users", function(err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

app.route('/api/cats').get((req, res) => {
    pool.getConnection(function(err, connection) {
        con.query("SELECT * FROM users", function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
});

app.route('/api/cat/:id').get((req, res) => {
    console.log(req.params.id);
    pool.getConnection(function(err, connection) {
        con.query("SELECT * FROM users", function(err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
});