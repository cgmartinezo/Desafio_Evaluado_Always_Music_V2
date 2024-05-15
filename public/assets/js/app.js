const todosLosEstudiantes = document.querySelector('#todosLosEstudiantes')
const formularioAgregarEstudiante = document.querySelector('#formularioAgregarEstudiante')
const formularioEditarEstudiante = document.querySelector('#formularioEditarEstudiante')

const exampleModal = document.querySelector('#exampleModal')
const myModal = new bootstrap.Modal(exampleModal)

const URL_DOMAIN = "http://localhost:3000"

formularioAgregarEstudiante.addEventListener('submit', async (event) => {
    event.preventDefault()

    // const nombre = event.target.nombre.value
    // const rut = event.target.rut.value
    // const curso = event.target.curso.value
    // const nivel = event.target.nivel.value

    const nombreInput = event.target.nombre;
    const rutInput = event.target.rut;
    const cursoInput = event.target.curso;
    const nivelInput = event.target.nivel;

    const nombre = nombreInput.value;
    const rut = rutInput.value;
    const curso = cursoInput.value;
    const nivel = nivelInput.value;



    // tarea validar los inputs
    if (!nombre.trim() || !rut.trim || !curso.trim() || !nivel.trim()) {
        return alert('campos obligatorios')
    }

    try {
        await axios.post(URL_DOMAIN + '/estudiantes', {
            nombre, rut, curso, nivel
        })

        // Limpiar los campos del formulario
        nombreInput.value = '';
        rutInput.value = '';
        cursoInput.value = '';
        nivelInput.value = '';

        todosLosEstudiantes.innerHTML = ''
        obtenerEstudiantes()

    } catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)
    }
})

const obtenerEstudiantes = async () => {
    try {
        const { data: Estudiantes } = await axios.get(URL_DOMAIN + '/estudiantes')
        todosLosEstudiantes.innerHTML = ''
        Estudiantes.forEach(estudiante => {
            todosLosEstudiantes.innerHTML += /*html*/`
            <li class="list-group-item">
                <div class="mb-2">
                    Nombre: ${estudiante.nombre} 
                    - Rut: ${estudiante.rut} 
                    - Curso: ${estudiante.curso} 
                    - Nivel: ${estudiante.nivel}
                </div>
                <div>
                    <button 
                        onclick="eliminarEstudiante('${estudiante.rut}')" 
                        class="btn btn-danger btn-sm">Eliminar</button>
                    <button 
                        onclick="editarEstudiante('${estudiante.rut}')" 
                        class="btn btn-warning btn-sm">Editar</button>
                </div>
            </li>
            `
        })
    } catch (error) {
        console.log(error)
        alert(error?.response?.data?.msg)
    }
}

obtenerEstudiantes()

const eliminarEstudiante = async (rut) => {
    console.log('me estás eliminando...', rut)
    try {
        if (confirm('Estás seguro que quieres eliminar Estudiante?')) {
            await axios.delete(URL_DOMAIN + '/estudiantes/' + rut)
            obtenerEstudiantes()
        }
    } catch (error) {
        alert(error?.response?.data?.msg)
    }
}

const editarEstudiante = async (rut) => {
    console.log('me estás EDITANDO...', rut)
    try {
        const { data: estudiante } = await axios.get(URL_DOMAIN + '/estudiantes/' + rut)

        // agregar los input según los elementos del libro
        formularioEditarEstudiante.nombre.value = estudiante.nombre
        // formularioEditarEstudiante.rut.value = estudiante.rut
        formularioEditarEstudiante.curso.value = estudiante.curso
        formularioEditarEstudiante.nivel.value = estudiante.nivel
        formularioEditarEstudiante.rutEstudiante.value = estudiante.rut

        myModal.show()

    } catch (error) {
        alert(error?.response?.data?.msg)
    }
}

formularioEditarEstudiante.addEventListener('submit', async (event) => {
    try {
        event.preventDefault()

        const nombre = event.target.nombre.value
        // const rut = event.target.rut.value
        const curso = event.target.curso.value
        const nivel = event.target.nivel.value
        const rutEstudiante = event.target.rutEstudiante.value


        await axios.put(URL_DOMAIN + '/estudiantes/' + rutEstudiante, {
            nombre, curso, nivel
        })
        obtenerEstudiantes()
        myModal.hide()
    } catch (error) {
        alert(error?.response?.data?.msg)
    }
})


