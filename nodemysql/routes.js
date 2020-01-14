'use strict';

module.exports = function (app) {
    var url = require('./controller');

    //url homenya
    app.route('/').get(url.index);

    //url read user
    app.route('/user').get(url.user);

    //url read user by id
    app.route('/user/:id').get(url.userbyid);

    //url create user
    app.route('/user').post(url.createuser);

    //url update user
    app.route('/user').put(url.updateuser);

    //url delete user
    app.route('/user').delete(url.deleteuser);

    //url request
    app.route('/auth').post(url.login);

};