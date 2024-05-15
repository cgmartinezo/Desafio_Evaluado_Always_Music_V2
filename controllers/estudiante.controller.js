import { nanoid } from "nanoid"
import { Estudiante } from "../models/estudiante.model.js"
import { handleError } from "../database/errors.js"

export const getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll()
        return res.json(estudiantes)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const getEstudiante = async (req, res) => {
    // console.log(req.params)
    try {
        const { rut } = req.params
        // validar que tenga formato nanoid???
        const estudiante = await Estudiante.findOneById(rut)
        // if (!libro) {
        //     return res.status(404).json({ ok: false, msg: '404' })
        // }
        return res.json(estudiante)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const createEstudiante = async (req, res) => {
    console.log(req.body)
    try {
        const { rut, nombre, curso, nivel } = req.body

        if (!rut || !nombre || !curso || !nivel) {
            return res.status(400).json({ ok: false, msg: "campos obligatorios" })
        }

        const newEstudiante = {
            nombre,
            rut,
            curso,
            nivel
            // id: nanoid()
        }

        const estudiante = await Estudiante.create(newEstudiante)
        return res.json(estudiante)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const removeEstudiante = async (req, res) => {
    console.log(req.params)
    try {
        const { rut } = req.params
        const estudiante = await Estudiante.remove(rut)
        return res.json(estudiante)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}

export const updateEstudiante = async (req, res) => {
    console.log(req.params)
    console.log(req.body)
    try {
        const { rut } = req.params
        const { nombre, curso, nivel } = req.body
        const estudiante = await Estudiante.update({
            rut,
            nombre,
            curso,
            nivel
        })
        return res.json(estudiante)
    } catch (error) {
        console.log(error)
        const { code, msg } = handleError(error)
        return res.status(code).json({ ok: false, msg })
    }
}