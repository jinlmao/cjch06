"use strict";
const express = require('express');
const app = express();

const USERS = [
    { id: '01', userName: 'admin', password: '123123' },
];

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});


app.get('/hello', function (req, resp) {
    resp.send('你好');
    resp.end();
});

app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});
app.get('/users/:id', function (req, resp) {
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS) {
        if (user.id === id) {
            resp.send(user);
            break;
        }
    }
    resp.end();
});

app.post('/user', function (req, resp) {
    USERS.push(req.body);
    resp.send({ succ: true });
    resp.end();
});

app.put('/user', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到你的账户' });
    }
    resp.end();
});

app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.slice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到你的账户' });
    }
    resp.end();
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/login', function (req, resp) {
    console.log(req.body);
    for (let user of USERS) {
        if (user.userName === req.body.userName && user.password === req.body.password) {
            resp.send({ succ: true });
        }
    }
    resp.send({ succ: false });
});
app.listen(8080, function () {
    console.log('服务器在8080端口启动');
});
