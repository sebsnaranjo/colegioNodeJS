const express = require("express");
const userSchema = require("../models/estudiantes");

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Estudiantes:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del estudiante
 *              edad:
 *                  type: integer
 *                  description: Edad del estudiante
 *              correo:
 *                  type: string
 *                  description: Correo del estudiante
 *          required:
 *              - nombre
 *              - edad
 *              - correo
 *          example:
 *              nombre: Alan Kay
 *              edad: 24
 *              correo: alan@email.com    
 */

/**
 * @swagger
 * /api/estudiantes:
 *  post:
 *    summary: Crear un nuevo estudiante
 *    tags: [Estudiantes]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Estudiantes'
 *    responses:
 *      200:
 *        description: nuevo estudiante creado
 */
router.post("/estudiantes", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

/**
 * @swagger
 * /api/estudiantes:
 *  get:
 *    summary: Obtener todos los estudiantes
 *    tags: [Estudiantes]
 *    responses:
 *      200:
 *        description: Obtiene todos los usuarios
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Estudiantes'
 */
router.get("/estudiantes", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

/**
 * @swagger
 * /api/estudiantes/{id}:
 *  get:
 *    summary: Obtener estudiante por ID
 *    tags: [Estudiantes]
 *    parameters: 
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID del estudiante
 *    responses:
 *      200:
 *        description: Obtiene el usuario usuarios
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Estudiantes'
 *      400:
 *        description: Estudiante no encontrado
 */
router.get("/estudiantes/:id", (req, res) => {
    const {id} = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

/**
 * @swagger
 * /api/estudiantes/{id}:
 *  put:
 *    summary: Editar estudiante por ID
 *    tags: [Estudiantes]
 *    requestBody: 
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Estudiantes'
 *    parameters: 
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID del estudiante
 *    responses:
 *      200:
 *        description: Estudiante editado
 *      400:
 *        description: Estudiante no encontrado
 */
router.put("/estudiantes/:id", (req, res) => {
    const {id} = req.params;
    const { nombre, edad, correo } = req.body;
    userSchema
        .updateOne({_id:id}, {$set: {nombre, edad, correo}})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

/**
 * @swagger
 * /api/estudiantes/{id}:
 *  delete:
 *    summary: Eliminar estudiante
 *    tags: [Estudiantes]
 *    parameters: 
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID del estudiante
 *    responses:
 *      200:
 *        description: Elimina el usuario usuario
 *      400:
 *        description: Estudiante no encontrado
 */
router.delete("/estudiantes/:id", (req, res) => {
    const {id} = req.params;
    userSchema
        .deleteOne({_id:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error}));
});

module.exports = router;