/* ============================================
   ACADEMIA WEB - scripts.js
   CLASE 12: Estructuras de control, arreglos, prompt/confirm/alert
   CLASE 13: Manipulacion del DOM con document
   CLASE 14: Menu responsivo y ventanas flotantes
   ============================================ */


/* ============================================
   ESTILOS JS - Se inyectan automaticamente
   (Para el modal, menu hamburguesa y errores)
   ============================================ */
(function inyectarEstilos() {
    const style = document.createElement('style');
    style.textContent = `
        /* --- Boton hamburguesa (Clase 14) --- */
        #btnMenu {
            display: none;
            background: #ff6f00;
            color: white;
            border: none;
            padding: 10px 18px;
            font-size: 1.1em;
            cursor: pointer;
            width: 100%;
            text-align: left;
            font-family: 'Poppins', sans-serif;
            letter-spacing: 0.5px;
        }
        #btnMenu:hover { background: #e65100; }

        @media (max-width: 600px) {
            #btnMenu { display: block; }
            #menuNav { display: none !important; flex-direction: column; }
            #menuNav.abierto { display: flex !important; }
        }

        /* --- Modal de bienvenida (Clase 14) --- */
        #modalBienvenida {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }
        #modalBienvenida.visible { display: flex; }

        .modal-caja {
            background: white;
            border-radius: 14px;
            padding: 40px 34px;
            max-width: 420px;
            width: 92%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(26,115,232,0.3);
            animation: fadeInUp 0.4s ease;
        }
        .modal-caja h2 {
            color: #0d47a1;
            font-family: 'Poppins', sans-serif;
            font-size: 1.4em;
            margin-bottom: 14px;
        }
        .modal-caja p {
            color: #444;
            margin-bottom: 24px;
            line-height: 1.7;
            font-size: 0.97em;
        }
        .modal-caja button {
            background: #1a73e8;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-size: 1em;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            transition: background 0.3s ease, transform 0.2s ease;
        }
        .modal-caja button:hover {
            background: #0d47a1;
            transform: translateY(-2px);
        }

        /* --- Validacion de formulario (Clase 12 + 13) --- */
        .error-campo {
            color: #c62828;
            font-size: 0.83em;
            margin-top: 5px;
            display: none;
            font-family: 'Lato', sans-serif;
        }
        .error-campo.visible { display: block; }

        .campo-error input,
        .campo-error select,
        .campo-error textarea {
            border-color: #c62828 !important;
            box-shadow: 0 0 0 3px rgba(198,40,40,0.15) !important;
        }
        .campo-ok input,
        .campo-ok select,
        .campo-ok textarea {
            border-color: #2e7d32 !important;
            box-shadow: 0 0 0 3px rgba(46,125,50,0.12) !important;
        }

        /* --- Contador de caracteres --- */
        #contadorNombre {
            font-size: 0.8em;
            color: #777;
            margin-top: 4px;
            display: block;
        }

        /* --- Mensaje de exito al registrarse --- */
        #msgExito {
            background: #e8f5e9;
            border: 2px solid #2e7d32;
            border-radius: 10px;
            padding: 20px 24px;
            margin-bottom: 22px;
            color: #1b5e20;
            font-family: 'Poppins', sans-serif;
            font-size: 1em;
            animation: fadeInUp 0.5s ease;
        }

        /* --- Saludo visitante en index --- */
        #saludoVisitante {
            background: #e3f2fd;
            padding: 12px 18px;
            border-radius: 8px;
            margin-bottom: 18px;
            font-weight: bold;
            color: #0d47a1;
            font-family: 'Poppins', sans-serif;
            border-left: 5px solid #1a73e8;
            animation: fadeInUp 0.5s ease;
        }

        /* --- Boton saludo visitante --- */
        #btnSaludo {
            background: #1a73e8;
            color: white;
            border: none;
            padding: 10px 22px;
            border-radius: 6px;
            font-size: 0.97em;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            margin-top: 16px;
            transition: background 0.3s ease, transform 0.2s ease;
            display: inline-block;
        }
        #btnSaludo:hover {
            background: #0d47a1;
            transform: translateY(-2px);
        }
    `;
    document.head.appendChild(style);
})();


/* ============================================
   Al cargar el DOM - Inicializar todo
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {

    /* ------------------------------------------
       CLASE 14: MENU HAMBURGUESA RESPONSIVO
       ------------------------------------------ */
    const btnMenu = document.getElementById('btnMenu');
    const menuNav = document.getElementById('menuNav');

    if (btnMenu && menuNav) {
        btnMenu.addEventListener('click', function () {
            // CLASE 13: classList.toggle manipula el DOM
            menuNav.classList.toggle('abierto');

            // CLASE 13: Cambia el texto del boton segun estado
            if (menuNav.classList.contains('abierto')) {
                btnMenu.innerHTML = 'X Cerrar menu';
            } else {
                btnMenu.innerHTML = '&#9776; Menu';
            }
        });
    }


    /* ------------------------------------------
       CLASE 14: VENTANA FLOTANTE (MODAL)
       Aparece 1.2 segundos despues de cargar
       ------------------------------------------ */
    const modal = document.getElementById('modalBienvenida');
    const btnCerrarModal = document.getElementById('btnCerrarModal');

    if (modal) {
        // CLASE 12: setTimeout con estructura de control
        setTimeout(function () {
            modal.classList.add('visible'); // CLASE 13: DOM
        }, 1200);

        // Cerrar al hacer clic en el boton
        if (btnCerrarModal) {
            btnCerrarModal.addEventListener('click', function () {
                modal.classList.remove('visible');
            });
        }

        // Cerrar al hacer clic fuera de la caja
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });
    }


    /* ------------------------------------------
       CLASE 13: CONTADOR DE CARACTERES - Nombre
       ------------------------------------------ */
    const campoNombre = document.getElementById('nombre');
    if (campoNombre) {
        // CLASE 13: Crear elemento con document.createElement
        const contador = document.createElement('small');
        contador.id = 'contadorNombre';
        contador.textContent = '0 / 50 caracteres';
        campoNombre.parentNode.appendChild(contador);

        campoNombre.addEventListener('input', function () {
            const largo = campoNombre.value.length; // CLASE 12: variable
            // CLASE 13: Modificar textContent del DOM
            contador.textContent = largo + ' / 50 caracteres';
            // CLASE 12: Estructura if/else
            if (largo > 40) {
                contador.style.color = '#c62828';
            } else {
                contador.style.color = '#777';
            }
        });
    }


    /* ------------------------------------------
       CLASE 12 + 13: BOTON SALUDO EN INDEX
       ------------------------------------------ */
    const btnSaludo = document.getElementById('btnSaludo');
    if (btnSaludo) {
        btnSaludo.addEventListener('click', saludarVisitante);
    }


    /* ------------------------------------------
       CLASE 12 + 13: VALIDACION DEL FORMULARIO
       ------------------------------------------ */
    const form = document.getElementById('formRegistro');

    if (form) {

        // CLASE 12: ARREGLO con cursos validos
        const cursosDisponibles = ['html', 'css', 'js-intro', 'js-control', 'js-dom', 'js-menu', 'completo'];

        // CLASE 12: ARREGLO con campos que se validan al perder foco
        const camposValidar = ['nombre', 'dni', 'correoElectronico', 'telefono', 'user', 'clave', 'confirmarclave'];

        // CLASE 13: Funcion para mostrar error
        function mostrarError(idCampo, mensaje) {
            const div = document.getElementById(idCampo).parentNode;
            div.classList.remove('campo-ok');
            div.classList.add('campo-error');

            let msgEl = div.querySelector('.error-campo');
            if (!msgEl) {
                // CLASE 13: Crear nodo de error dinamicamente
                msgEl = document.createElement('span');
                msgEl.className = 'error-campo';
                div.appendChild(msgEl);
            }
            // CLASE 13: Modificar contenido del DOM
            msgEl.textContent = mensaje;
            msgEl.classList.add('visible');
        }

        // CLASE 13: Funcion para marcar campo correcto
        function marcarOk(idCampo) {
            const div = document.getElementById(idCampo).parentNode;
            div.classList.remove('campo-error');
            div.classList.add('campo-ok');
            const msgEl = div.querySelector('.error-campo');
            if (msgEl) msgEl.classList.remove('visible');
        }

        // CLASE 12: Funcion de validacion con estructuras de control
        function validarCampo(idCampo) {
            const el = document.getElementById(idCampo);
            if (!el) return true;
            const valor = el.value.trim();

            // CLASE 12: if / else if / else
            if (idCampo === 'nombre') {
                if (valor.length < 5) {
                    mostrarError(idCampo, 'El nombre debe tener al menos 5 caracteres.');
                    return false;
                }
            } else if (idCampo === 'dni') {
                if (valor !== '' && !/^\d{8}$/.test(valor)) {
                    mostrarError(idCampo, 'El DNI debe tener exactamente 8 digitos numericos.');
                    return false;
                }
            } else if (idCampo === 'correoElectronico') {
                if (valor !== '' && !valor.includes('@')) {
                    mostrarError(idCampo, 'Ingresa un correo electronico valido.');
                    return false;
                }
            } else if (idCampo === 'telefono') {
                if (valor !== '' && !/^\d{9}$/.test(valor)) {
                    mostrarError(idCampo, 'El telefono debe tener 9 digitos numericos.');
                    return false;
                }
            } else if (idCampo === 'user') {
                if (valor.length < 4) {
                    mostrarError(idCampo, 'El usuario debe tener al menos 4 caracteres.');
                    return false;
                }
            } else if (idCampo === 'clave') {
                if (valor.length < 6) {
                    mostrarError(idCampo, 'La clave debe tener al menos 6 caracteres.');
                    return false;
                }
            } else if (idCampo === 'confirmarclave') {
                const clave = document.getElementById('clave').value;
                if (valor !== clave) {
                    mostrarError(idCampo, 'Las claves no coinciden.');
                    return false;
                }
            }

            marcarOk(idCampo);
            return true;
        }

        // CLASE 13: Registrar eventos blur en cada campo del arreglo
        // CLASE 12: Bucle forEach sobre el arreglo camposValidar
        camposValidar.forEach(function (idCampo) {
            const el = document.getElementById(idCampo);
            if (el) {
                el.addEventListener('blur', function () {
                    validarCampo(idCampo);
                });
            }
        });


        /* --- Envio del formulario --- */
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // CLASE 12: Arreglo con campos obligatorios
            const requeridos = ['nombre', 'user', 'clave', 'confirmarclave'];
            let todosOk = true;

            // CLASE 12: Bucle for...of para recorrer el arreglo
            for (const campo of requeridos) {
                if (!validarCampo(campo)) {
                    todosOk = false;
                }
            }

            // CLASE 12: Validar curso con el arreglo cursosDisponibles
            const cursoSeleccionado = document.getElementById('curso').value;
            if (!cursosDisponibles.includes(cursoSeleccionado)) {
                alert('Por favor selecciona un curso de la lista.');
                todosOk = false;
            }

            // CLASE 12: if con operador logico
            if (!todosOk) {
                alert('Hay errores en el formulario. Corrigelos antes de continuar.');
                return;
            }

            // Leer datos del formulario para el confirm
            const nombre    = document.getElementById('nombre').value.trim();
            const curso     = document.getElementById('curso').value;
            const modalidad = document.querySelector('input[name="modalidad"]:checked').value;
            const correo    = document.getElementById('correoElectronico').value.trim();

            // CLASE 12: confirm() - cuadro de confirmacion
            const confirmar = confirm(
                'Confirmas tu registro con los siguientes datos?\n\n' +
                'Nombre   : ' + nombre    + '\n' +
                'Correo   : ' + (correo || '(no ingresado)') + '\n' +
                'Curso    : ' + curso     + '\n' +
                'Modalidad: ' + modalidad
            );

            if (confirmar) {
                // CLASE 13: Crear mensaje de exito en el DOM
                const main = document.querySelector('main');

                const anterior = document.getElementById('msgExito');
                if (anterior) anterior.remove();

                const msgExito = document.createElement('div');
                msgExito.id = 'msgExito';
                // CLASE 13: innerHTML para insertar HTML en el DOM
                msgExito.innerHTML =
                    '<strong>Registro exitoso</strong><br>' +
                    'Bienvenido/a, <strong>' + nombre + '</strong>.<br>' +
                    'Te inscribiste en <strong>' + curso + '</strong> (' + modalidad + ').<br>' +
                    'Pronto nos pondremos en contacto contigo.';

                // CLASE 13: insertBefore - insertar nodo al inicio del main
                main.insertBefore(msgExito, main.firstChild);

                form.reset();

                // CLASE 12: alert() de confirmacion final
                alert('Listo, ' + nombre + '! Tu registro fue completado con exito.');

            } else {
                // CLASE 12: prompt() para pedir dato al usuario
                const corregir = prompt(
                    'Que dato deseas corregir?\n' +
                    'Escribe el nombre del campo: nombre, dni, correoElectronico, telefono, user, clave\n' +
                    '(Deja vacio y presiona Aceptar para cancelar)'
                );

                // CLASE 12: Operador && y if anidado
                if (corregir && corregir.trim() !== '') {
                    const campoBuscado = document.getElementById(corregir.trim());
                    if (campoBuscado) {
                        campoBuscado.focus(); // CLASE 13: DOM focus()
                        alert('Puedes editar el campo "' + corregir + '" ahora.');
                    } else {
                        alert('No se encontro el campo "' + corregir + '". Revisa manualmente.');
                    }
                }
            }
        });

    } // fin if(form)

}); // fin DOMContentLoaded


/* ============================================
   CLASE 12 + 13: FUNCION GLOBAL saludarVisitante
   Disponible en todas las paginas (index.html)
   ============================================ */
function saludarVisitante() {
    // CLASE 12: prompt() - entrada de datos del usuario
    const nombre = prompt('Bienvenido a Academia Web!\nCual es tu nombre?');

    // CLASE 12: Estructura if / else
    if (nombre === null || nombre.trim() === '') {
        // CLASE 12: alert() - salida de datos
        alert('No ingresaste tu nombre. Te esperamos pronto en Academia Web!');
    } else {
        // CLASE 12: ARREGLO de mensajes de bienvenida
        const mensajes = [
            'Hola, ' + nombre + '! Estas a un paso de aprender a programar.',
            'Que gusto tenerte aqui, ' + nombre + '! Explora nuestros cursos.',
            'Bienvenido/a, ' + nombre + '. El futuro digital te espera.',
            'Hola, ' + nombre + '! En Academia Web aprenderas HTML, CSS y JavaScript.'
        ];

        // CLASE 12: Operador modulo para seleccionar del arreglo aleatoriamente
        const indice = Math.floor(Math.random() * mensajes.length);

        // CLASE 12: alert() con dato del arreglo
        alert(mensajes[indice]);

        // CLASE 13: Mostrar saludo en el DOM
        const main = document.querySelector('main');
        if (main) {
            // CLASE 13: Verificar si ya existe el saludo y reutilizarlo
            let saludo = document.getElementById('saludoVisitante');
            if (!saludo) {
                saludo = document.createElement('p');
                saludo.id = 'saludoVisitante';
                // CLASE 13: insertBefore al inicio del main
                main.insertBefore(saludo, main.firstChild);
            }
            // CLASE 13: Modificar textContent del elemento DOM
            saludo.textContent = 'Hola, ' + nombre + '! Bienvenido/a a Academia Web Huancayo.';
        }
    }
}
