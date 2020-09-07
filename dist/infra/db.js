"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Database {
    constructor() {
        this.DB_URl = 'mongodb://localhost:27017/db_portal';
    }
    createConnection() {
        mongoose.connect(this.DB_URl);
    }
}
exports.default = Database;
