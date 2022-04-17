"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageClientsAge = exports.createClient = exports.getAllClients = void 0;
const database_1 = require("../database");
function getAllClients(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, database_1.connect)();
            const clients = yield conn.query('SELECT * FROM clients');
            return res.json(clients[0]);
        }
        catch (error) {
            return res.status(500).json({ message: 'Hubo un error obtener los clientes' });
        }
    });
}
exports.getAllClients = getAllClients;
function createClient(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nombre, apellido, fecha_nacimiento } = req.body;
            const newClient = {
                nombre,
                apellido,
                fecha_nacimiento: new Date(fecha_nacimiento)
            };
            const conn = yield (0, database_1.connect)();
            const clients = yield conn.query('INSERT INTO clients SET ? ', [newClient]);
            const client = yield conn.query(`SELECT * FROM clients WHERE id = ${clients[0].insertId}`);
            return res.status(201).json(client[0]);
        }
        catch (error) {
            return res.status(500).json({ message: 'Hubo un error al crear el cliente' });
        }
    });
}
exports.createClient = createClient;
function getAverageClientsAge(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield (0, database_1.connect)();
            const averageAge = yield conn.query('SELECT CAST(AVG(TIMESTAMPDIFF(YEAR,fecha_nacimiento,CURDATE())) AS DECIMAL(8,1)) AS avg_edad FROM clients;');
            return res.json(averageAge[0]);
        }
        catch (error) {
            return res.status(500).json({ message: 'Hubo un error al obtener el promedio de edades' });
        }
    });
}
exports.getAverageClientsAge = getAverageClientsAge;
