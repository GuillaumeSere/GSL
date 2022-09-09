"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.User = mongoose_1.default.model("User", new mongoose_1.default.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
}));