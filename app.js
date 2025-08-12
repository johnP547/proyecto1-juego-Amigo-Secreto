const listaAmigos = [];
let sorteoRealizado = false;

const inputAmigo = document.getElementById("amigo");
const listaElement = document.getElementById("listaAmigos");
const resultadoElement = document.getElementById("resultado");

function actualizarLista() {
    listaElement.innerHTML = "";
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        listaElement.appendChild(li);
    });
}

function agregarAmigo() {
    const nombre = inputAmigo.value.trim();
    if (nombre === "") {
        alert("Por favor, escribe un nombre.");
        return;
    }
    if (listaAmigos.includes(nombre)) {
        alert("El nombre ya está en la lista.");
        inputAmigo.value = "";
        return;
    }
    listaAmigos.push(nombre);
    inputAmigo.value = "";
    actualizarLista();
    resultadoElement.textContent = "";
    sorteoRealizado = false;
}

function limpiarLista() {
    if (confirm("¿Estás seguro que quieres reiniciar y borrar toda la lista?")) {
        listaAmigos.length = 0;
        actualizarLista();
        resultadoElement.textContent = "";
        inputAmigo.value = "";
        sorteoRealizado = false;
    }
}

function borrarLetra() {
    if (inputAmigo.value.length > 0) {
        inputAmigo.value = inputAmigo.value.slice(0, -1);
    }
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Necesitas al menos 2 amigos para hacer el sorteo.");
        return;
    }
    if (sorteoRealizado) {
        alert("El sorteo ya se realizó. Reinicia para hacer uno nuevo.");
        return;
    }

    const nombreQueSortea = prompt("Ingresa tu nombre para saber a quién te tocó:");
    if (!nombreQueSortea || !listaAmigos.includes(nombreQueSortea.trim())) {
        alert("El nombre no está en la lista.");
        return;
    }

    // Crear copia para el sorteo
    const listaParaSorteo = [...listaAmigos];

    // Sacar el nombre del que sortea para que no se sortee a sí mismo
    const indexSorteador = listaParaSorteo.indexOf(nombreQueSortea.trim());
    listaParaSorteo.splice(indexSorteador, 1);

    // Mapear resultado evitando que alguien se saque a sí mismo
    // Simplificado: solo sortear una vez y mostrar resultado para quien preguntó
    // (Para un sorteo real se necesita lógica más compleja, pero aquí basta)
    const amigoAsignado = listaParaSorteo[Math.floor(Math.random() * listaParaSorteo.length)];

    alert(`¡${nombreQueSortea.trim()}, tu amigo secreto es: ${amigoAsignado}!`);
    resultadoElement.textContent = `Sorteo realizado.`;
    sorteoRealizado = true;
}

