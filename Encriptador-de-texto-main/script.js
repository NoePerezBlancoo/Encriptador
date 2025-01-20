/* ===== Loader ===== */
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
});

function focus() {
    let input = document.getElementById("input-texto");
    input.focus();
}

function value() {
    let input = document.getElementById("input-texto");
    input.value = "";
}

// Función para cifrado César
function cifradoCesar(texto, desplazamiento) {
    return texto.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            let charCode = char.charCodeAt(0);
            return String.fromCharCode(((charCode - 97 + desplazamiento) % 26) + 97);
        } else if (char === 'ñ') {
            return desplazamiento % 2 === 0 ? 'ó' : 'á';
        }
        return char;
    }).join('');
}

function encriptar() {
    let texto = document.getElementById("input-texto").value;

    // Verificar solo letras minúsculas, espacios y ñ
    if (/[^a-zñ ]/.test(texto)) {
        Swal.fire({
            icon: 'error',
            iconColor: '#b9ab9c',
            background: '#E3E0DE',
            title: 'Oops...',
            confirmButtonColor: '#b9ab9c',
            text: 'Solo se permiten letras minúsculas, "ñ" y sin acentos',
        });
        return;
    }

    if (texto.length === 0) {
        Swal.fire({
            icon: 'error',
            iconColor: '#b9ab9c',
            background: '#E3E0DE',
            title: 'Oops...',
            confirmButtonColor: '#b9ab9c',
            text: 'El campo de texto está vacío, escriba el texto que desea encriptar',
        });
        return;
    }

    // Reemplazos personalizados
    let txt_cifrado = texto.replace(/e/gm, "enter");
    txt_cifrado = txt_cifrado.replace(/o/gm, "ober");
    txt_cifrado = txt_cifrado.replace(/i/gm, "imes");
    txt_cifrado = txt_cifrado.replace(/a/gm, "ai");
    txt_cifrado = txt_cifrado.replace(/u/gm, "ufat");

    // Aplicar cifrado César con un desplazamiento fijo (ejemplo: 3)
    txt_cifrado = cifradoCesar(txt_cifrado, 3);

    document.getElementById("texto1-contder").style.display = "none";
    document.getElementById("texto2-contder").style.display = "none";
    document.getElementById("output-texto").style.display = "inline-block";
    document.getElementById("output-texto").innerHTML = txt_cifrado;

    value();
}

function desencriptar() {
    let texto = document.getElementById("input-texto").value;

    if (texto.length === 0) {
        Swal.fire({
            icon: 'error',
            iconColor: '#b9ab9c',
            background: '#E3E0DE',
            title: 'Oops...',
            confirmButtonColor: '#b9ab9c',
            text: 'El campo de texto está vacío, escriba el texto que desea desencriptar',
        });
        return;
    }

    // Invertir cifrado César con el mismo desplazamiento usado para encriptar
    let txt_cifrado = cifradoCesar(texto, -3);

    // Revertir reemplazos personalizados
    txt_cifrado = txt_cifrado.replace(/enter/gm, "e");
    txt_cifrado = txt_cifrado.replace(/ober/gm, "o");
    txt_cifrado = txt_cifrado.replace(/imes/gm, "i");
    txt_cifrado = txt_cifrado.replace(/ai/gm, "a");
    txt_cifrado = txt_cifrado.replace(/ufat/gm, "u");

    document.getElementById("texto1-contder").style.display = "none";
    document.getElementById("texto2-contder").style.display = "none";
    document.getElementById("output-texto").style.display = "inline-block";
    document.getElementById("output-texto").innerHTML = txt_cifrado;

    value();
}

function copiar() {
    let contenido = document.querySelector("#output-texto");
    navigator.clipboard.writeText(contenido.textContent)
        .then(() => {
            Swal.fire({
                icon: 'success',
                iconColor: '#b9ab9c',
                background: '#E3E0DE',
                title: '¡Bien!',
                confirmButtonColor: '#b9ab9c',
                text: 'Texto copiado correctamente',
            });
        })
        .catch(err => {
            Swal.fire({
                icon: 'error',
                iconColor: '#b9ab9c',
                background: '#E3E0DE',
                title: 'Oops...',
                confirmButtonColor: '#b9ab9c',
                text: 'No se pudo copiar el texto',
            });
        });
}

focus();
value();
