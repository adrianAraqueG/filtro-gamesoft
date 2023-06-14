const LS = window.localStorage;
let factura = [false, false];

/**Cargar registros*/
let clientes = LS.getItem('clientes') ? JSON.parse(LS.getItem('clientes')) : [];
let juegos = LS.getItem('juegos') ? JSON.parse(LS.getItem('juegos')) : [];

imprimirTablaClientes(clientes);
imprimirTablaJuegos(juegos);

/**
 * FACTURACIÓN
 */
function setCliente(id){
    factura[0] = clientes.filter(cliente => cliente.id === id)[0];
    document.querySelector('#cerrar-modal-cliente').click();
    actualizarFactura();
}

function setJuego(id){
    factura[1] = juegos.filter(juego => juego.id === id)[0];
    document.querySelector('#cerrar-modal-juego').click();
    actualizarFactura();
}

function actualizarFactura(){
    const datosCliente = document.querySelector('#datos-cliente');
    const datosJuego = document.querySelector('#datos-juego');
    const datosFactura = document.querySelector('#datos-factura');
    const comprar = document.querySelector('#comprar');
    if(factura[0]){
        datosCliente.innerHTML = `
            <h5 class="card-title text-center">Datos de Cliente</h5>
            <p>Identificación: ${factura[0].identificacion}</p>
            <p>Nombre(s): ${factura[0].nombres}</p>
            <p>Apellidos: ${factura[0].apellidos}</p>
            <p>Teléfono: ${factura[0].telefono}</p>
            <p>E-Mail: ${factura[0].email}</p>
            <p>Nacionalidad: ${factura[0].nacionalidad}</p>
        `
    }
    if(factura[1]){
        datosJuego.innerHTML = `
            <h5 class="card-title text-center">Datos de Videojuego</h5>
            <p>ID: ${factura[1].id}</p>
            <p>Nombre: ${factura[1].nombre}</p>
            <p>Categoria: ${factura[1].categoria}</p>
            <p>Puntos: ${factura[1].puntos}</p>
        `;
    }

    if(factura[0] && factura [1]){
        datosFactura.innerHTML = `
            <p>Valor Inicial: ${factura[1].valorLicencia}</p>
            <p>+IVA: ${factura[1].valorLicencia * .16}</p>
            <p>+imp. esp:${factura[1].valorLicencia * .04}</p>

            <hr>

            <p class="fs-4">Total: ${factura[1].valorLicencia * 1.2}</p>
        `;

        comprar.addEventListener('click', () =>{
            clientes.forEach((cliente, idx) => {
                if(cliente.id === factura[0].id){
                    clientes[idx].puntos += parseInt(factura[1].puntos);
                    LS.setItem('clientes', JSON.stringify(clientes));

                    alert("!Compra Realizada!\n Ahora verás los puntos.");
                    window.location.href = "/puntos.html";
                }
            });
        });

        comprar.classList.remove('disabled');
    }
}


/**
 * BUSCADORES
 */
const inputBuscarCliente = document.querySelector('#buscar-cliente');
inputBuscarCliente.addEventListener('keyup', ()=>{
    buscarClientes();
});
function buscarClientes() {
    if (inputBuscarCliente.value === '') {
        imprimirTablaClientes(clientes);
    } else {
        const buscarPor = document.querySelector('#buscar-por-cliente').value;
        let busqueda = [];

        if(buscarPor === 'id'){
            busqueda = clientes.filter(cliente => {return cliente.identificacion.includes(inputBuscarCliente.value);});
            imprimirTablaClientes(busqueda);
        }else if(buscarPor === 'name'){
            busqueda = clientes.filter(cliente => {return cliente.nombres.toLowerCase().includes(inputBuscarCliente.value.toLowerCase());});
            imprimirTablaClientes(busqueda);
        } else if(buscarPor === 'surname'){
            busqueda = clientes.filter(cliente => {return cliente.apellidos.toLowerCase().includes(inputBuscarCliente.value.toLowerCase());});
            imprimirTablaClientes(busqueda);
        }
    }

}


const inputBuscarJuego = document.querySelector('#buscar-juego');
inputBuscarJuego.addEventListener('keyup', ()=>{
    buscarJuego();
});
function buscarJuego(){
    if (inputBuscarJuego.value === '') {
        imprimirTablaJuegos(juegos);
    } else {
        const buscarPor = document.querySelector('#buscar-por-juego').value;
        let busqueda = [];

        if(buscarPor === 'nombre'){
            busqueda = juegos.filter(juego => {return juego.nombre.toLowerCase().includes(inputBuscarJuego.value.toLowerCase());});
            imprimirTablaJuegos(busqueda);
        }else if(buscarPor === 'categoria'){
            busqueda = juegos.filter(juego => {return juego.categoria.toLowerCase().includes(inputBuscarJuego.value.toLowerCase());});
            imprimirTablaJuegos(busqueda);
        }
    }
}


/**
 * TABLAS
 */
function imprimirTablaClientes(datos){
    const table = document.querySelector('#contenido-tabla-clientes');
    table.innerHTML = '';

    datos.forEach(client =>{
        table.innerHTML += `
        <tr>
            <td>${client.identificacion}</td>
            <td>${client.nombres}</td>
            <td>${client.apellidos}</td>
            <td>
            <div class="d-flex align-items-center">
                <button class="btn btn-primary" onclick="setCliente(${client.id})">
                    <i class="bi bi-check2-circle"></i>
                </button>
            </div>
            </td>
        </tr>
        `
    });
}

function imprimirTablaJuegos(datos){
    const table = document.querySelector('#contenido-tabla-juegos');
    table.innerHTML = '';

    datos.forEach(juego =>{
        table.innerHTML += `
        <tr>
            <td>${juego.nombre}</td>
            <td>${juego.categoria}</td>
            <td>${juego.valorLicencia} USD</td>
            <td>
            <div class="d-flex align-items-center">
                <button class="btn btn-primary" onclick="setJuego(${juego.id})">
                    <i class="bi bi-check2-circle"></i>
                </button>
            </div>
            </td>
        </tr>
        `
    });
}

