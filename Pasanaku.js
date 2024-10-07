document.getElementById('formularioPasanaku').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const numeroParticipantes = parseInt(document.getElementById('participantes').value);
    const nombresParticipantes = document.getElementById('nombres').value.split(',').map(nombre => nombre.trim());
    const montoPorRonda = parseFloat(document.getElementById('monto').value);
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const diasEntreReuniones = parseInt(document.getElementById('diasEntreReuniones').value);
    const totalRondas = numeroParticipantes;
    let divResultados = document.getElementById('resultados');
    divResultados.innerHTML = '';  // Limpiar resultados previos

    if (nombresParticipantes.length !== numeroParticipantes || isNaN(numeroParticipantes) || isNaN(montoPorRonda) || numeroParticipantes <= 1 || montoPorRonda <= 0 || isNaN(diasEntreReuniones)) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    // Barajar los participantes de forma aleatoria
    const nombresAleatorios = barajarArray(nombresParticipantes);

    let contribucionesTotales = 0;
    let fechaActual = fechaInicio;

    for (let ronda = 1; ronda <= totalRondas; ronda++) {
        contribucionesTotales = numeroParticipantes * montoPorRonda;
        const participanteActual = nombresAleatorios[ronda - 1];

        let resultadoRonda = document.createElement('div');
        resultadoRonda.classList.add('resultado-ronda');
        resultadoRonda.innerHTML = `Ronda ${ronda}: El participante ${participanteActual} recibe ${contribucionesTotales} bolivianos el ${fechaActual.toLocaleDateString()}`;
        divResultados.appendChild(resultadoRonda);

        // Incrementar la fecha para la siguiente reunión
        fechaActual.setDate(fechaActual.getDate() + diasEntreReuniones);
    }

    // Mensaje final
    let mensajeFinal = document.createElement('div');
    mensajeFinal.classList.add('resultado-ronda');
    mensajeFinal.innerHTML = 'El Pasanaku ha terminado.';
    divResultados.appendChild(mensajeFinal);
});

// Función para barajar un array
function barajarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
    return array;
}