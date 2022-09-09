"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var allAccess = function (req, res) {
    res.status(200).send("Public Content.");
};
var userBoard = function (req, res) {
    res.status(200).send("User Content.");
};
var adminBoard = function (req, res) {
    res.status(200).send("Admin Content.");
};
var moderatorBoard = function (req, res) {
    res.status(200).send("Moderator Content.");
};
exports.controller = {
    allAccess: allAccess,
    userBoard: userBoard,
    adminBoard: adminBoard,
    moderatorBoard: moderatorBoard
};
