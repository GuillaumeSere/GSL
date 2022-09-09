"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var verifySignUp_1 = require("../middleware/verifySignUp");
var auth_controller_1 = require("../controllers/auth.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.post("/api/auth/signup", [
        verifySignUp_1.verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp_1.verifySignUp.checkRolesExisted
    ], auth_controller_1.controller.signup);
    app.post("/api/auth/signin", auth_controller_1.controller.signin);
};
