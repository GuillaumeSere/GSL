"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var auth_config_1 = require("../config/auth.config");
var role_model_1 = require("../models/role.model");
var user_model_1 = require("../models/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var signup = function (req, res) {
    var user = new user_model_1.User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (req.body.roles) {
            role_model_1.Role.find({
                name: { $in: req.body.roles }
            }, function (err, roles) {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = roles.map(function (role) { return role._id; });
                user.save(function (err) {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
        else {
            role_model_1.Role.findOne({ name: "user" }, function (err, role) {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                user.roles = [role._id];
                user.save(function (err) {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.send({ message: "User was registered successfully!" });
                });
            });
        }
    });
};
var signin = function (req, res) {
    user_model_1.User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = jwt.sign({ id: user.id }, auth_config_1.config.secret, {
            expiresIn: 86400000 // 24 hours
        });
        var authorities = [];
        for (var i = 0; i < user.roles.length; i++) {
            // @ts-ignore
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });
};
exports.controller = {
    signin: signin,
    signup: signup
};
