"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var models_1 = require("./models");
var router = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:3000"
};
router.use((0, cors_1.default)(corsOptions));
// parse requests of content-type - application/json
router.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
router.use(express_1.default.urlencoded({ extended: true }));
var Role = models_1.db.role;
models_1.db.mongoose
    .connect("mongodb+srv://guillaume:dUFRnbVH6zork4p0@cluster0.zuyedcf.mongodb.net/?retryWrites=true&w=majority", {})
    .then(function () {
    console.log("Successfully connect to MongoDB.");
    initial();
})
    .catch(function (err) {
    console.error("Connection error", err);
    process.exit();
});
// simple route
router.get("/", function (req, res) {
    res.json({ message: "Welcome to Guillaume application." });
});
// routes
require("./routes/auth.route")(router);
require("./routes/user.route")(router);
// set port, listen for requests
var PORT = process.env.PORT || 8080;
router.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT, "."));
});
function initial() {
    Role.estimatedDocumentCount(function (err, count) {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(function (err) {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(function (err) {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(function (err) {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}
