let LS = window.localStorage;

/** Cargar registros*/
let clientes = LS.getItem('clientes') ? JSON.parse(LS.getItem('clientes')) : [];
imprimirTabla(clientes);


/**
 * MAIN
 */

const inputBuscar = document.querySelector('#buscar');
inputBuscar.addEventListener('keyup', ()=>{
    buscarClientes();
});


/**
 * FUNCTIONS
 */
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
            <td>${client.puntos}</td>
        </tr>
        `
    });
}