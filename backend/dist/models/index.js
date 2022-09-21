"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var user_model_1 = require("./user.model");
var role_model_1 = require("./role.model");
var pin_model_1 = require("./pin.model");
mongoose_1.default.Promise = global.Promise;
exports.db = {
    mongoose: mongoose_1.default,
    user: user_model_1.User,
    role: role_model_1.Role,
    pin: pin_model_1.Pin,
    ROLES: ["user", "admin", "moderator"]
};
