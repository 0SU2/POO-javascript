const formulario = document.getElementById('formulario')
const cardEstudiantes = document.getElementById('cardEstudiantes')
const cardProfesor = document.getElementById('cardProfesores')
const templateEstudiante = document.getElementById('templateEstudiante').content
const templateProfesor = document.getElementById('templateProfesor').content
const alert = document.querySelector('.alert')

const estudiantes = []
const profesores = []

// Construccion de clases y objetos
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre
        this.edad = edad
        this.uid = `${Date.now()}`
    }

    static pintarPersona(personas, tipo) {
        if (tipo === 'Estudiante') {
            cardEstudiantes.textContent = ''
            const fragment = document.createDocumentFragment()
            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoEstudiante()) // estudiante va a heredar las propiedades de persona 
            });
            cardEstudiantes.appendChild(fragment)
        }
        if (tipo === 'Profesor') {
            cardProfesor.textContent = ''
            const fragment = document.createDocumentFragment()
            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoProfesor()) // profesor va a heredar las propiedades de persona 
            });

            cardProfesor.appendChild(fragment)
        }
    }
}

class Estudiante extends Persona { // la clase estudiante herada las propiedades de la clase persona
    #estado = false // el # es para declarar que un atributo privado
    #estudiante = 'Estudiante'
    set setEstado(setEstado) { // mutacion
      this.#estado = this.#estado  
    } 
    get getEstudiante() {
        return this.#estudiante
    }
    agregarNuevoEstudiante() {
        const clone = templateEstudiante.cloneNode(true)
        clone.querySelector('h5 .text-primary').textContent = this.nombre
        clone.querySelector('h6').textContent = this.getEstudiante
        clone.querySelector('.lead').textContent = this.edad
        if (this.#estado) {
            clone.querySelector('.badge').className = "badge bg-success"     
            clone.querySelector('.btn-success').disable = true
            clone.querySelector('.btn-danger').disable = false       
        } else {
            clone.querySelector('.badge').className = "badge bg-danger"     
            clone.querySelector('.btn-success').disable = false
            clone.querySelector('.btn-danger').disable = true
        }
        // configurar el texto para revisar si estas reprobado o aprobado
        clone.querySelector('.badge').textContent = this.#estado ? 'Aprobado' : 'Reprobado'
        clone.querySelector('.btn-success').dataset.uid = this.uid
        clone.querySelector('.btn-danger').dataset.uid = this.uid
        console.log(clone); 
        return clone
    }
}

class Profesor extends Persona {
    #profesor = 'Profesor'
    agregarNuevoProfesor() {
        const clone = templateProfesor.cloneNode(true)
        clone.querySelector('h5').textContent = this.nombre
        clone.querySelector('h6').textContent = this.#profesor
        clone.querySelector('.lead').textContent = this.edad
        return clone
    }
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault() // previene a que se realice un refresh a la pagina y va a estar borrando la informacion que se va a capturar
    alert.classList.add('d-none')
    const datos = new FormData(formulario) // crea un formulario con las caracteristicas que habiamos creado en el hmtl o pasarle toda la informacion a la varible datos
    const [nombre,edad,opcion] = [...datos.values()]
    if(!nombre.trim() || !edad.trim() || !opcion.trim()) { // si cualquiera de esos no existe
        alert.classList.remove('d-none')
        return
    }
    // ya que valido que todos los campos tienen valores
    if (opcion === 'Estudiante') {
        const estudiante = new Estudiante(nombre, edad)
        estudiantes.push(estudiante);
        Persona.pintarPersona(estudiantes, opcion)
    }
    if (opcion === 'Profesor') {
        const profesor = new Profesor(nombre, edad)
        profesores.push(profesor);
        Persona.pintarPersona(profesores, opcion)
    }
})

// evento para los botones