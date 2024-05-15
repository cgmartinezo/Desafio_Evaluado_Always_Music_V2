
import { pool } from "../database/connection.js";

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM ESTUDIANTES;',
        // rowMode: "array"
    }
    const { rows } = await pool.query(query)
    return rows
}

const findOneById = async (rut) => {
    const query = {
        // name: 'findOneById',
        text: `
            SELECT * FROM ESTUDIANTES WHERE RUT = $1
        `,
        values: [rut]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const create = async ({ rut, nombre, curso, nivel }) => {

    const query = {
        text: `
            INSERT INTO ESTUDIANTES (RUT, NOMBRE, CURSO, NIVEL)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `,
        values: [rut, nombre, curso, nivel]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const remove = async (rut) => {
    const query = {
        text: `
            DELETE FROM ESTUDIANTES WHERE RUT = $1
            RETURNING *
        `,
        values: [rut]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

const update = async ({ rut, nombre, curso, nivel }) => {

    const query = {
        text: `
            UPDATE ESTUDIANTES
            SET NOMBRE = $1,
            CURSO = $2,
            NIVEL = $3
            WHERE RUT = $4
            RETURNING *
        `,
        values: [nombre, curso, nivel, rut]
    }

    const { rows } = await pool.query(query)
    return rows[0]
}

export const Estudiante = {
    findAll,
    create,
    findOneById,
    remove,
    update
}