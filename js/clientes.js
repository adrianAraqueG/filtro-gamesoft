let editando = false;
let LS = window.localStorage;


/** Cargar registros*/
let clientes = LS.getItem('clientes') ? JSON.parse(LS.getItem('clientes')) : [];
imprimirTabla(clientes);


/**
 * MAIN
 */
const form = document.querySelector('#form');
form.addEventListener('submit', e=>{
    e.preventDefault();

    anadirCliente();
});

const btnCloseModal = document.querySelector('#cerrar-modal');
btnCloseModal.addEventListener('click', ()=>{
    if(editando != false){
        // Revierto los cambios en los titulos
        document.querySelector('#modal-title').textContent = 'Añadir Clientes'
        document.querySelector('#form-button').textContent = 'Añadir';

        editando = false;
    }

    form.reset();
});

const inputBuscar = document.querySelector('#buscar');
inputBuscar.addEventListener('keyup', ()=>{
    buscarClientes();
});


/**
 * FUNCTIONS
 */
function anadirCliente() {
    const identificacion = document.querySelector('#identificacion').value;
    const nombres = document.querySelector('#nombres').value;
    const apellidos = document.querySelector('#apellidos').value;
    const telefono = document.querySelector('#telefono').value;
    const email = document.querySelector('#email').value;
    const fechaNacimiento = document.querySelector('#fechaNacimiento').value
    const nacionalidad = document.querySelector('#nacionalidad').value

    const nuevoCliente = {
        id: Date.now(),
        identificacion,
        nombres,
        apellidos,
        telefono,
        email,
        fechaNacimiento,
        nacionalidad,
        puntos: 0
    }

    if (editando) {
        nuevoCliente.id = editando
        clientes = clientes.map(cliente => cliente.id === editando ? nuevoCliente : cliente)
    } else {
        clientes.push(nuevoCliente);
    }

    alert(editando === false ? '¡Usuario agregado con éxito!': '¡Cambios guardados con éxito!');
    btnCloseModal.click();

    editando =  false;

    LS.setItem('clientes', JSON.stringify(clientes)); //Actualizar LS
    imprimirTabla(clientes);
}

function eliminarCliente(id){
    clientes = clientes.filter(cliente => cliente.id !== id);
    LS.setItem('clientes', JSON.stringify(clientes)); //Actualizar LS
    imprimirTabla(clientes);
}

function cargarDatos(id){
    editando = id;

    document.querySelector('#modal-title').textContent = 'Editando Usuario'
    document.querySelector('#form-button').textContent = 'Guardar Cambios';

    clientes.forEach(cliente => {
        if (cliente.id === id) {
            identificacion.value = cliente.identificacion
            nombres.value = cliente.nombres;
            apellidos.value = cliente.apellidos;
            telefono.value = cliente.telefono;
            email.value = cliente.email;
            fechaNacimiento.value = cliente.fechaNacimiento;
            nacionalidad.value = cliente.nacionalidad;
        }
    });

    document.querySelector('#btn-open-modal').click();
}

function buscarClientes() {

    if (inputBuscar.value === '') {
        imprimirTabla(clientes);
    } else {
        const buscarPor = document.querySelector('#buscar-por').value;
        let busqueda = [];

        if(buscarPor === 'id'){
            busqueda = clientes.filter(cliente => {return cliente.identificacion.includes(inputBuscar.value);});
            imprimirTabla(busqueda);
        }else if(buscarPor === 'name'){
            busqueda = clientes.filter(cliente => {return cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase());});
            imprimirTabla(busqueda);
        } else if(buscarPor === 'surname'){
            busqueda = clientes.filter(cliente => {return cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase());});
            imprimirTabla(busqueda);
        }
    }

}

function imprimirTabla(datos){
    const table = document.querySelector('#contenido-tabla');
    table.innerHTML = '';

    datos.forEach(client =>{
        table.innerHTML += `
        <tr>
            <td>${client.identificacion}</td>
            <td>${client.nombres}</td>
            <td>${client.apellidos}</td>
            <td>${client.telefono}</td>
            <td>${client.email}</td>
            <td>${client.fechaNacimiento}</td>
            <td>${client.nacionalidad}</td>
            <td>
                <div class="d-flex align-items-center">
                    <button class="btn btn-primary me-1" onclick="cargarDatos(${client.id})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger" onclick="eliminarCliente(${client.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `
    });
}