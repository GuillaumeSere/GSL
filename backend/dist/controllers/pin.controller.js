"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
var pin_model_1 = require("../models/pin.model");
var addPin = function (req, res) {
    var newPin = new pin_model_1.Pin({
        username: req.body.username,
        title: req.body.title,
        desc: req.body.desc,
        rating: req.body.rating,
        long: req.body.long,
        lat: req.body.lat,
    });
    newPin.save(function (err, pin) {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            if (pin) {
                res.status(200).send({
                    username: pin.username,
                    title: pin.title,
                    desc: pin.desc,
                    rating: pin.rating,
                    long: pin.long,
                    lat: pin.lat
                });
            }
            ;
        }
    });
};
var getPin = function (req, res) {
    var allPin = pin_model_1.Pin.find({
        username: req.body.username,
        title: req.body.title,
        desc: req.body.desc,
        rating: req.body.rating,
        long: req.body.long,
        lat: req.body.lat,
    });
    allPin.find(function (err, pin) {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            if (pin) {
                res.status(200).send();
            }
            ;
        }
    });
};
exports.controller = {
    addPin: addPin,
    getPin: getPin
};
