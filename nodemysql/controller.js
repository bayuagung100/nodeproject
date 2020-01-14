'use strict';

var response = require('./res');
var koneksi = require('./config');

var request = require('request');
var session = require('express-session');



var formidable = require('formidable');
var mv = require('mv');

exports.login = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();
    // manangani upload file
    form.parse(req, function (err, fields, files) {

        var username = fields.username;
        var password = fields.password;
        if (username && password) {
            koneksi.query('SELECT * FROM user WHERE username =? AND password =?', [username, password], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else if (rows.length > 0) {
                    req.session.login = true;
                    req.session.username = username;
                    req.session.password = password;
                    response.auth(req.session, rows, res);
                } else {
                    response.ok("Incorrect Username and/or Password!", res);
                }
            });
            
        }

    });
};


exports.index = function (req, res) {
    response.ok("Selamat datang di restfull api dengan node js dan mysql", res);
};

exports.user = function (req, res) {
    koneksi.query("SELECT * FROM user", function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res);
            console.log(rows);
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
            // console.log(req.params);
        }

    });
};

//menggunakan x-www-form-urlencoded
// exports.createuser = function (req, res) {
//     var username = req.body.username;
//     var password = req.body.password;

//     koneksi.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, password], function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok(rows, res);
//             console.log(res);
//         }
//     });
// };

//menggunakan form-data
exports.createuser = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();

    // manangani upload file
    form.parse(req, function (err, fields, files) {
        var oldpath = files.gambar.path;
        var newpath = __dirname + "/image/" + files.gambar.name;
        var gambar = files.gambar.name;

        var username = fields.username;
        var password = fields.password;

        // pindahakan file yang telah di-upload
        mv(oldpath, newpath, function (err) {
            if (err) { console.log(err); }
            // console.log('file uploaded successfully ' + username);
            // console.log('file uploaded successfully ' + password);
            // return res.end("file uploaded successfully");
            koneksi.query("INSERT INTO user (username, password, gambar) VALUES (?, ?, ?)", [username, password, gambar], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(rows, res);
                    // console.log(res);
                }
            });
        });
    });
};

//menggunakan x-www-form-urlencoded
// exports.updateuser = function (req, res) {
//     var id = req.body.id;
//     var username = req.body.username;
//     var password = req.body.password;

//     koneksi.query("UPDATE user SET username=?, password=? WHERE id=?", [username, password, id], function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok("Berhasil merubah user", res);
//         }
//     });
// };

//menggunakan x-www-form-urlencoded
exports.updateuser = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();

    // manangani upload file
    form.parse(req, function (err, fields, files) {
        var oldpath = files.gambar.path;
        var newpath = __dirname + "/image/" + files.gambar.name;
        var gambar = files.gambar.name;

        var id = fields.id;
        var username = fields.username;
        var password = fields.password;

        // pindahakan file yang telah di-upload
        mv(oldpath, newpath, function (err) {
            if (err) { console.log(err); }
            // console.log('file uploaded successfully ' + id);
            // console.log('file uploaded successfully ' + username);
            // console.log('file uploaded successfully ' + password);
            // console.log('file uploaded successfully ' + gambar);
            // return res.end("file uploaded successfully");
            koneksi.query("UPDATE user SET username=?, password=?, gambar=? WHERE id=?", [username, password, gambar, id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok("Berhasil merubah user " + id, res);
                    // console.log(res);
                }
            });
        });
    });
};

//menggunakan x-www-form-urlencoded
// exports.deleteuser = function (req, res) {
//     var id = req.body.id;

//     koneksi.query("DELETE FROM user WHERE id=?", [id], function (error, rows, fields) {
//         if (error) {
//             console.log(error);
//         } else {
//             response.ok("Berhasil menghapus user", res);
//             console.log(res);
//         }
//     });
// };

//menggunakan form-data
exports.deleteuser = function (req, res) {
    // membuat objek form dari formidable
    var form = new formidable.IncomingForm();

    // manangani upload file
    form.parse(req, function (err, fields, files) {
        var id = fields.id;

        koneksi.query("DELETE FROM user WHERE id=?", [id], function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menghapus user", res);
                console.log(res);
            }
        });
    });
};