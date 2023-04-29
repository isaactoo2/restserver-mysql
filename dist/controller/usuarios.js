"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = async (req, res) => {
    const usuarios = await usuario_1.default.findAll({
        where: {
            estado: true
        }
    });
    res.json({ usuarios });
};
exports.getUsuarios = getUsuarios;
const getUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await usuario_1.default.findByPk(id);
    if (!usuario) {
        res.status(404).json({
            msg: `No existe el usuario con el id ${id}`
        });
    }
    else {
        res.json({ usuario });
    }
};
exports.getUsuario = getUsuario;
const postUsuario = async (req, res) => {
    const { body } = req;
    try {
        const existeEmail = await usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: "Ya existe un usuario con el email " + body.email
            });
        }
        const usuario = usuario_1.default.build(body);
        await usuario.save();
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};
exports.postUsuario = postUsuario;
const putUsuario = async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
        const usuario = await usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "No existe un usuario con el id " + id
            });
        }
        await usuario.update(body);
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};
exports.putUsuario = putUsuario;
const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: "No existe un usuario con el id " + id
            });
        }
        // await usuario.destroy()
        await usuario.update({ estado: false });
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map