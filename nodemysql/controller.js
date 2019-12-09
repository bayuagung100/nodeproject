'use strict';

var response = require('./res');
var koneksi = require('./config');

exports.index = function (req, res) {
    response.ok("Selamat datang di restfull api dengan node js dan mysql", res);
};

exports.user = function (req, res) {
    koneksi.query("SELECT * FROM user", function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.userbyid = function (req, res) {
    var id = req.params.id;

    koneksi.query("SELECT * FROM user WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

exports.createuser = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    koneksi.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, password], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            console.log(res);
        }
    });
};

exports.updateuser = function (req, res) {
    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;

    koneksi.query("UPDATE user SET username=?, password=? WHERE id=?", [username, password, id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil merubah user", res);
        }
    });
};

exports.deleteuser = function (req, res) {
    var id = req.body.id;

    koneksi.query("DELETE FROM user WHERE id=?", [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok("Berhasil menghapus user", res);
        }
    });
};