"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pin_controller_1 = require("../controllers/pin.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    //create a pin
    app.post("/api/test/pin", pin_controller_1.controller.addPin);
    //get all pins
    app.get("/api/test/pin", pin_controller_1.controller.getPin);
};
