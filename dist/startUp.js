"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const db_1 = require("./infra/db");
const uploads_1 = require("./infra/uploads");
const newsRouter_1 = require("./router/newsRouter");
class StartUp {
    constructor() {
        this.app = express();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        };
        this.app.use(cors(options));
    }
    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use('/exports', express.static(process.cwd() + '/exports'));
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });
        this.app.route("/uploads").post(uploads_1.default.single('file'), (req, res) => {
            try {
                res.send("Arquivo enviado com sucesso!");
            }
            catch (error) {
                console.log(error);
            }
        });
        //this.app.use(Auth.validate);
        this.app.use("/", newsRouter_1.default);
    }
}
exports.default = new StartUp();
