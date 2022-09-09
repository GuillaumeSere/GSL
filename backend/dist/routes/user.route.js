"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authJwt_1 = require("../middleware/authJwt");
var user_controller_1 = require("../controllers/user.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });
    app.get("/api/test/all", user_controller_1.controller.allAccess);
    app.get("/api/test/user", [authJwt_1.authJwt.verifyToken], user_controller_1.controller.userBoard);
    app.get("/api/test/mod", [authJwt_1.authJwt.verifyToken, authJwt_1.authJwt.isModerator], user_controller_1.controller.moderatorBoard);
    app.get("/api/test/admin", [authJwt_1.authJwt.verifyToken, authJwt_1.authJwt.isAdmin], user_controller_1.controller.adminBoard);
};
