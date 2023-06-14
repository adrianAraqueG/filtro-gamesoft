let LS = window.localStorage;

/** Cargar registros*/
let juegos = LS.getItem('juegos') ? JSON.parse(LS.getItem('juegos')) : [];
imprimirTabla(juegos);


/**
 * MAIN
 */
const form = document.querySelector('#form');
form.addEventListener('submit', e=>{
    e.preventDefault();

    anadirJuego();
});

const btnCloseModal = document.querySelector('#cerrar-modal');
btnCloseModal.addEventListener('click', ()=>{
    form.reset();
});


/**
 * FUNCTIONS
 */
function anadirJuego() {
    const nombre = document.querySelector('#nombre').value;
    const categoria = document.querySelector('#categoria').value;
    const valorLicencia = document.querySelector('#valor-licencia').value;
    const puntos = document.querySelector('#puntos').value;

    const nuevoJuego = {
        id: Date.now(),
        nombre,
        categoria,
        valorLicencia,
        puntos
    }

    juegos.push(nuevoJuego);

    alert('Juego agregado con éxito!');
    btnCloseModal.click();

    LS.setItem('juegos', JSON.stringify(juegos)); //Actualizar LS
    imprimirTabla(juegos);
}

function eliminarJuego(id){
    juegos = juegos.filter(juego => juego.id !== id);
    LS.setItem('juegos', JSON.stringify(juegos)); //Actualizar LS
    imprimirTabla(juegos);
}

function imprimirTabla(datos){
    const table = document.querySelector('#contenido-tabla');
    table.innerHTML = '';

    datos.forEach(juego =>{
        table.innerHTML += `
        <tr>
            <td>${juego.id}</td>
            <td>${juego.nombre}</td>
            <td>${juego.categoria}</td>
            <td>${juego.valorLicencia} USD</td>
            <td>${juego.puntos}</td>
            <td>
                <div class="d-flex align-items-center">
                    <button class="btn btn-danger" onclick="eliminarJuego(${juego.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
        `
    });
}