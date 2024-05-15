import { Router } from "express";
import { createEstudiante, getAllEstudiantes, getEstudiante, removeEstudiante, updateEstudiante } from "../controllers/estudiante.controller.js";

const router = Router()

// URL /libros

router.get('/', getAllEstudiantes)
router.get('/:rut', getEstudiante)
router.post('/', createEstudiante)
router.delete('/:rut', removeEstudiante)
router.put('/:rut', updateEstudiante)

export default router