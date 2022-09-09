"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_config_1 = require("../config/auth.config");
var models_1 = require("../models");
var User = models_1.db.user;
var Role = models_1.db.role;
var verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.config.secret, function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};
var isAdmin = function (req, res, next) {
    User.findById(req.userId).exec(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find({
            _id: { $in: user === null || user === void 0 ? void 0 : user.roles }
        }, function (err, roles) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!" });
            return;
        });
    });
};
var isModerator = function (req, res, next) {
    User.findById(req.userId).exec(function (err, user) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Role.find({
            _id: { $in: user === null || user === void 0 ? void 0 : user.roles }
        }, function (err, roles) {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            for (var i = 0; i < roles.length; i++) {
                if (roles[i].name === "moderator") {
                    next();
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role!" });
            return;
        });
    });
};
exports.authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator
};
