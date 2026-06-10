const connection = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    registrarBitacora
} = require("./bitacoraController");

const registrarUsuario = async (req, res) => {

    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;

    try {

        const passwordHash =
            await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuarios
            (nombre, correo, password, rol)
            VALUES (?, ?, ?, ?)
        `;

        connection.query(
            sql,
            [
                nombre,
                correo,
                passwordHash,
                rol
            ],
            (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                registrarBitacora(
                    "Sistema",
                    "admin",
                    `Creó usuario ${nombre}`,
                    "Usuarios"
                );

                res.json({
                    mensaje: "Usuario registrado"
                });

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};

const login = (req, res) => {

    const {
        correo,
        password
    } = req.body;

    const sql = `
        SELECT *
        FROM usuarios
        WHERE correo = ?
    `;

    connection.query(
        sql,
        [correo],
        async (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {
                return res.status(401).json({
                    mensaje: "Usuario no encontrado"
                });
            }

            const usuario = results[0];

            const passwordValida =
                await bcrypt.compare(
                    password,
                    usuario.password
                );

            if (!passwordValida) {
                return res.status(401).json({
                    mensaje: "Contraseña incorrecta"
                });
            }

            const token = jwt.sign(
                {
                    id_usuario:
                        usuario.id_usuario,
                    nombre:
                        usuario.nombre,
                    rol:
                        usuario.rol
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "8h"
                }
            );

            registrarBitacora(
                usuario.nombre,
                usuario.rol,
                "Inició sesión",
                "Autenticación"
            );

            res.json({
                token,
                usuario: {
                    id_usuario:
                        usuario.id_usuario,
                    nombre:
                        usuario.nombre,
                    correo:
                        usuario.correo,
                    rol:
                        usuario.rol
                }
            });

        }
    );
};

const obtenerUsuarios = (req, res) => {

    const sql = `
        SELECT
            id_usuario,
            nombre,
            correo,
            rol
        FROM usuarios
        ORDER BY id_usuario DESC
    `;

    connection.query(
        sql,
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

};

const actualizarUsuario = async (req, res) => {

    const { id } = req.params;

    const {
        nombre,
        correo,
        password,
        rol
    } = req.body;

    try {

        if (password && password.trim() !== "") {

            const passwordHash =
                await bcrypt.hash(password, 10);

            const sql = `
                UPDATE usuarios
                SET
                    nombre = ?,
                    correo = ?,
                    password = ?,
                    rol = ?
                WHERE id_usuario = ?
            `;

            connection.query(
                sql,
                [
                    nombre,
                    correo,
                    passwordHash,
                    rol,
                    id
                ],
                (err) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    registrarBitacora(
                        "Sistema",
                        "admin",
                        `Actualizó usuario ${nombre}`,
                        "Usuarios"
                    );

                    res.json({
                        mensaje: "Usuario actualizado"
                    });

                }
            );

        } else {

            const sql = `
                UPDATE usuarios
                SET
                    nombre = ?,
                    correo = ?,
                    rol = ?
                WHERE id_usuario = ?
            `;

            connection.query(
                sql,
                [
                    nombre,
                    correo,
                    rol,
                    id
                ],
                (err) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    registrarBitacora(
                        "Sistema",
                        "admin",
                        `Actualizó usuario ${nombre}`,
                        "Usuarios"
                    );

                    res.json({
                        mensaje: "Usuario actualizado"
                    });

                }
            );

        }

    } catch (error) {

        res.status(500).json(error);

    }

};

const eliminarUsuario = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM usuarios
        WHERE id_usuario = ?
    `;

    connection.query(
        sql,
        [id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            registrarBitacora(
                "Sistema",
                "admin",
                `Eliminó usuario ${id}`,
                "Usuarios"
            );

            res.json({
                mensaje: "Usuario eliminado"
            });

        }
    );

};

module.exports = {
    registrarUsuario,
    login,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
};