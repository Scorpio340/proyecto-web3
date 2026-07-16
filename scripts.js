/* ============================================
   ACADEMIA WEB - scripts.js
   CLASE 12: Estructuras de control, arreglos, prompt/confirm/alert
   CLASE 13: Manipulacion del DOM con document
   CLASE 14: Menu responsivo y ventanas flotantes
   PDF: Generacion de comprobante de registro con jsPDF
   MULTI-CURSO: Seleccion de varios cursos, descuento por combo
   HISTORIAL: Registros guardados en localStorage (sin base de datos)
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
            menuNav.classList.toggle('abierto');
            if (menuNav.classList.contains('abierto')) {
                btnMenu.innerHTML = 'X Cerrar menu';
            } else {
                btnMenu.innerHTML = '&#9776; Menu';
            }
        });
    }


    /* ------------------------------------------
       CLASE 14: VENTANA FLOTANTE (MODAL)
       ------------------------------------------ */
    const modal = document.getElementById('modalBienvenida');
    const btnCerrarModal = document.getElementById('btnCerrarModal');

    if (modal) {
        setTimeout(function () {
            modal.classList.add('visible');
        }, 1200);

        if (btnCerrarModal) {
            btnCerrarModal.addEventListener('click', function () {
                modal.classList.remove('visible');
            });
        }

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
        const contador = document.createElement('small');
        contador.id = 'contadorNombre';
        contador.textContent = '0 / 50 caracteres';
        campoNombre.parentNode.appendChild(contador);

        campoNombre.addEventListener('input', function () {
            const largo = campoNombre.value.length;
            contador.textContent = largo + ' / 50 caracteres';
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

        // CLASE 12: ARREGLO con campos que se validan al perder foco
        const camposValidar = ['nombre', 'dni', 'correoElectronico', 'telefono', 'user', 'clave', 'confirmarclave'];

        // CLASE 13: Funcion para mostrar error
        function mostrarError(idCampo, mensaje) {
            const div = document.getElementById(idCampo).parentNode;
            div.classList.remove('campo-ok');
            div.classList.add('campo-error');

            let msgEl = div.querySelector('.error-campo');
            if (!msgEl) {
                msgEl = document.createElement('span');
                msgEl.className = 'error-campo';
                div.appendChild(msgEl);
            }
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

        camposValidar.forEach(function (idCampo) {
            const el = document.getElementById(idCampo);
            if (el) {
                el.addEventListener('blur', function () {
                    validarCampo(idCampo);
                });
            }
        });


        /* --------------------------------------
           MULTI-CURSO: Manejo de checkboxes de cursos
           -------------------------------------- */
        const checksCursos = Array.from(document.querySelectorAll('input[name="cursos"]'));
        const checkCompleto = document.getElementById('curso-completo');
        const avisoCompleto = document.getElementById('avisoCompleto');

        // CLASE 12: Funcion que calcula subtotal, descuento y total con if/else
        function calcularResumen() {
            const seleccionados = checksCursos.filter(function (c) { return c.checked; });

            const listaResumen = document.getElementById('listaResumen');
            const resumenSubtotal = document.getElementById('resumenSubtotal');
            const filaDescuento = document.getElementById('filaDescuento');
            const resumenDescuento = document.getElementById('resumenDescuento');
            const etiquetaDescuento = document.getElementById('etiquetaDescuento');
            const resumenTotal = document.getElementById('resumenTotal');

            // CLASE 13: Limpiar la lista antes de reconstruirla
            listaResumen.innerHTML = '';

            if (seleccionados.length === 0) {
                const li = document.createElement('li');
                li.className = 'resumen-vacio';
                li.textContent = 'Aun no has elegido ningun curso.';
                listaResumen.appendChild(li);
            } else {
                seleccionados.forEach(function (chk) {
                    const li = document.createElement('li');
                    const precio = Number(chk.dataset.precio);
                    li.innerHTML = '<span>' + chk.dataset.nombre + '</span><span>S/ ' + precio.toFixed(2) + '</span>';
                    listaResumen.appendChild(li);
                });
            }

            // CLASE 12: Sumar precios con reduce (arreglo -> numero)
            const subtotal = seleccionados.reduce(function (acum, chk) {
                return acum + Number(chk.dataset.precio);
            }, 0);

            // CLASE 12: if/else if/else para el porcentaje de descuento por combo
            let porcentajeDescuento = 0;
            if (seleccionados.length >= 3) {
                porcentajeDescuento = 0.20;
            } else if (seleccionados.length === 2) {
                porcentajeDescuento = 0.10;
            } else {
                porcentajeDescuento = 0;
            }

            const descuento = subtotal * porcentajeDescuento;
            const total = subtotal - descuento;

            resumenSubtotal.textContent = 'S/ ' + subtotal.toFixed(2);

            if (descuento > 0) {
                filaDescuento.style.display = 'flex';
                etiquetaDescuento.textContent = 'Descuento por combo (' + (porcentajeDescuento * 100) + '%):';
                resumenDescuento.textContent = '- S/ ' + descuento.toFixed(2);
            } else {
                filaDescuento.style.display = 'none';
            }

            resumenTotal.textContent = 'S/ ' + total.toFixed(2);

            return { seleccionados: seleccionados, subtotal: subtotal, descuento: descuento, total: total, porcentajeDescuento: porcentajeDescuento };
        }

        // CLASE 14 (estilo): Si eligen "Proyecto Web Completo", se bloquean los demas cursos
        if (checkCompleto) {
            checkCompleto.addEventListener('change', function () {
                checksCursos.forEach(function (chk) {
                    if (chk !== checkCompleto) {
                        if (checkCompleto.checked) {
                            chk.checked = false;
                            chk.disabled = true;
                        } else {
                            chk.disabled = false;
                        }
                    }
                });

                if (checkCompleto.checked) {
                    avisoCompleto.textContent = 'El Proyecto Web Completo ya incluye todos los cursos, no necesitas elegir otros.';
                } else {
                    avisoCompleto.textContent = '';
                }

                calcularResumen();
            });
        }

        checksCursos.forEach(function (chk) {
            chk.addEventListener('change', function () {
                if (chk !== checkCompleto) {
                    calcularResumen();
                }
            });
        });

        // Calcular resumen inicial (vacio) al cargar la pagina
        calcularResumen();


        /* --------------------------------------
           TERMINOS Y CONDICIONES - mini ventana con alert()
           -------------------------------------- */
        const linkTerminos = document.getElementById('linkTerminos');
        if (linkTerminos) {
            linkTerminos.addEventListener('click', function (e) {
                e.preventDefault();
                alert(
                    'TERMINOS Y CONDICIONES - ACADEMIA WEB\n\n' +
                    '1. El registro es una pre-inscripcion, no un pago confirmado.\n' +
                    '2. Los cupos se reservan al validar el voucher de pago.\n' +
                    '3. Los descuentos por combo aplican solo a cursos elegidos en el mismo registro.\n' +
                    '4. Tus datos se usan unicamente para contactarte sobre tu inscripcion.'
                );
            });
        }


        /* --------------------------------------
           PDF: Genera el comprobante de registro con jsPDF
           -------------------------------------- */
        function generarComprobantePDF(datos) {
            if (typeof window.jspdf === 'undefined') {
                alert('No se pudo generar el PDF (verifica tu conexion a internet). Tu registro igual quedo guardado en el historial.');
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const azulPrimario   = [26, 115, 232];
            const azulSecundario = [13, 71, 161];
            const naranjaAcento  = [255, 111, 0];
            const verdeOk        = [46, 125, 50];

            /* ---- Encabezado ---- */
            doc.setFillColor(...azulPrimario);
            doc.rect(0, 0, 210, 32, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            doc.text('ACADEMIA WEB HUANCAYO', 105, 15, { align: 'center' });

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            doc.text('Comprobante de Registro / Inscripcion', 105, 24, { align: 'center' });

            /* ---- Codigo y fecha ---- */
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            doc.text('Codigo de registro: ' + datos.codigo, 14, 42);
            doc.text('Fecha de emision: ' + datos.fechaEmision, 196, 42, { align: 'right' });

            doc.setDrawColor(...azulSecundario);
            doc.setLineWidth(0.5);
            doc.line(14, 46, 196, 46);

            /* ---- Datos del estudiante ---- */
            let y = 56;
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...azulSecundario);
            doc.text('Datos del estudiante', 14, y);

            y += 8;
            doc.setFontSize(11);
            doc.setTextColor(30, 30, 30);

            function filaDato(etiqueta, valor) {
                doc.setFont('helvetica', 'bold');
                doc.text(etiqueta + ':', 14, y);
                doc.setFont('helvetica', 'normal');
                doc.text(String(valor || 'No indicado'), 75, y);
                y += 8;
            }

            filaDato('Nombre completo', datos.nombre);
            filaDato('DNI', datos.dni);
            filaDato('Fecha de nacimiento', datos.fechaNacimiento);
            filaDato('Correo electronico', datos.correo);
            filaDato('Telefono', datos.telefono);
            filaDato('Usuario', datos.usuario);
            filaDato('Como nos conocio', datos.referencia);

            y += 2;
            doc.setDrawColor(210, 210, 210);
            doc.line(14, y, 196, y);
            y += 10;

            /* ---- Cursos elegidos ---- */
            doc.setFontSize(13);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...azulSecundario);
            doc.text('Cursos elegidos', 14, y);
            y += 9;

            doc.setFontSize(10.5);
            datos.cursos.forEach(function (c) {
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(30, 30, 30);
                doc.text('- ' + c.nombre, 16, y);
                doc.text('S/ ' + c.precio.toFixed(2), 196, y, { align: 'right' });
                y += 7;
            });

            y += 3;
            doc.setDrawColor(210, 210, 210);
            doc.line(14, y, 196, y);
            y += 8;

            doc.setFont('helvetica', 'normal');
            doc.setTextColor(30, 30, 30);
            doc.setFontSize(11);
            doc.text('Subtotal:', 140, y);
            doc.text('S/ ' + datos.subtotal.toFixed(2), 196, y, { align: 'right' });
            y += 7;

            if (datos.descuento > 0) {
                doc.setTextColor(...verdeOk);
                doc.text('Descuento combo (' + (datos.porcentajeDescuento * 100) + '%):', 140, y);
                doc.text('- S/ ' + datos.descuento.toFixed(2), 196, y, { align: 'right' });
                y += 7;
            }

            y += 4;

            /* ---- Modalidad, experiencia, presupuesto ---- */
            doc.setTextColor(30, 30, 30);
            filaDato('Modalidad', datos.modalidad);
            filaDato('Experiencia previa', datos.experiencia);
            filaDato('Presupuesto mensual', 'S/ ' + datos.presupuesto);

            if (datos.comentarios) {
                doc.setFont('helvetica', 'bold');
                doc.text('Comentarios:', 14, y);
                y += 6;
                doc.setFont('helvetica', 'normal');
                const comentariosDivididos = doc.splitTextToSize(datos.comentarios, 182);
                doc.text(comentariosDivididos, 14, y);
                y += comentariosDivididos.length * 6;
            }

            y += 6;

            /* ---- Recuadro de TOTAL ---- */
            doc.setFillColor(...naranjaAcento);
            doc.roundedRect(14, y, 182, 18, 3, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            doc.text('TOTAL A PAGAR: S/ ' + datos.total.toFixed(2), 105, y + 11.5, { align: 'center' });

            /* ---- Pie de pagina ---- */
            doc.setTextColor(90, 90, 90);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.text('Academia Web Huancayo | Jr. Los Angeles 456, Huancayo | (064) 111222 - (064) 333444', 105, 280, { align: 'center' });
            doc.text('Este comprobante confirma la recepcion de tu registro. Nos pondremos en contacto contigo pronto.', 105, 285, { align: 'center' });

            const nombreArchivo = 'Comprobante_' + (datos.nombre || 'Registro').replace(/\s+/g, '_') + '.pdf';
            doc.save(nombreArchivo);
        }


        /* --------------------------------------
           HISTORIAL: Guardar y mostrar registros con localStorage
           -------------------------------------- */
        const CLAVE_HISTORIAL = 'academiaweb_registros';

        function leerHistorial() {
            try {
                const datos = localStorage.getItem(CLAVE_HISTORIAL);
                return datos ? JSON.parse(datos) : [];
            } catch (error) {
                return [];
            }
        }

        function guardarEnHistorial(registro) {
            const historial = leerHistorial();
            historial.unshift(registro); // CLASE 13: lo mas nuevo primero
            localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
        }

        function eliminarDelHistorial(codigo) {
            let historial = leerHistorial();
            historial = historial.filter(function (r) { return r.codigo !== codigo; });
            localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
            renderizarHistorial();
        }

        function renderizarHistorial() {
            const contenedor = document.getElementById('listaHistorial');
            if (!contenedor) return;

            const historial = leerHistorial();
            contenedor.innerHTML = '';

            if (historial.length === 0) {
                const p = document.createElement('p');
                p.className = 'historial-vacio';
                p.textContent = 'No tienes registros guardados aun en este navegador.';
                contenedor.appendChild(p);
                return;
            }

            historial.forEach(function (registro) {
                const item = document.createElement('div');
                item.className = 'historial-item';

                const nombresCursos = registro.cursos.map(function (c) { return c.nombre; }).join(', ');

                const info = document.createElement('div');
                info.className = 'historial-info';
                info.innerHTML =
                    '<strong>' + registro.nombre + '</strong>' +
                    '<small>' + nombresCursos + '</small>' +
                    '<small>Total: S/ ' + registro.total.toFixed(2) + ' &middot; ' + registro.fechaEmision + ' &middot; Codigo: ' + registro.codigo + '</small>';

                const acciones = document.createElement('div');
                acciones.className = 'historial-acciones';

                const btnDescargar = document.createElement('button');
                btnDescargar.type = 'button';
                btnDescargar.className = 'btn-descargar-mini';
                btnDescargar.innerHTML = '<i class="fas fa-file-pdf"></i> PDF';
                btnDescargar.addEventListener('click', function () {
                    generarComprobantePDF(registro);
                });

                const btnEliminar = document.createElement('button');
                btnEliminar.type = 'button';
                btnEliminar.className = 'btn-eliminar-mini';
                btnEliminar.innerHTML = '<i class="fas fa-times"></i>';
                btnEliminar.addEventListener('click', function () {
                    if (confirm('Eliminar el registro de ' + registro.nombre + ' de tu historial?')) {
                        eliminarDelHistorial(registro.codigo);
                    }
                });

                acciones.appendChild(btnDescargar);
                acciones.appendChild(btnEliminar);

                item.appendChild(info);
                item.appendChild(acciones);
                contenedor.appendChild(item);
            });
        }

        const btnLimpiarHistorial = document.getElementById('btnLimpiarHistorial');
        if (btnLimpiarHistorial) {
            btnLimpiarHistorial.addEventListener('click', function () {
                if (confirm('Esto borrara todos los registros guardados en este navegador. Deseas continuar?')) {
                    localStorage.removeItem(CLAVE_HISTORIAL);
                    renderizarHistorial();
                }
            });
        }

        // Mostrar el historial guardado apenas carga la pagina
        renderizarHistorial();


        /* --- Envio del formulario --- */
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // CLASE 12: Arreglo con campos obligatorios de texto
            const requeridos = ['nombre', 'user', 'clave', 'confirmarclave'];
            let todosOk = true;

            for (const campo of requeridos) {
                if (!validarCampo(campo)) {
                    todosOk = false;
                }
            }

            // MULTI-CURSO: Validar que se haya elegido al menos un curso
            const resumen = calcularResumen();
            if (resumen.seleccionados.length === 0) {
                alert('Selecciona al menos un curso antes de continuar.');
                todosOk = false;
            }

            // Validar terminos y condiciones
            const terminos = document.getElementById('terminos');
            if (terminos && !terminos.checked) {
                alert('Debes aceptar los terminos y condiciones para registrarte.');
                todosOk = false;
            }

            if (!todosOk) {
                alert('Hay errores en el formulario. Corrigelos antes de continuar.');
                return;
            }

            // Leer datos del formulario para el confirm
            const nombre     = document.getElementById('nombre').value.trim();
            const modalidad  = document.querySelector('input[name="modalidad"]:checked').value;
            const correo     = document.getElementById('correoElectronico').value.trim();
            const nombresCursos = resumen.seleccionados.map(function (c) { return c.dataset.nombre; }).join(', ');

            // CLASE 12: confirm() - cuadro de confirmacion
            const confirmar = confirm(
                'Confirmas tu registro con los siguientes datos?\n\n' +
                'Nombre    : ' + nombre    + '\n' +
                'Correo    : ' + (correo || '(no ingresado)') + '\n' +
                'Cursos    : ' + nombresCursos + '\n' +
                'Modalidad : ' + modalidad + '\n' +
                'Total     : S/ ' + resumen.total.toFixed(2)
            );

            if (confirmar) {
                // CLASE 13: Crear mensaje de exito en el DOM
                const main = document.querySelector('main');

                const anterior = document.getElementById('msgExito');
                if (anterior) anterior.remove();

                const msgExito = document.createElement('div');
                msgExito.id = 'msgExito';
                msgExito.innerHTML =
                    '<strong>Registro exitoso</strong><br>' +
                    'Bienvenido/a, <strong>' + nombre + '</strong>.<br>' +
                    'Te inscribiste en: <strong>' + nombresCursos + '</strong> (' + modalidad + ').<br>' +
                    'Total a pagar: <strong>S/ ' + resumen.total.toFixed(2) + '</strong>.<br>' +
                    'Pronto nos pondremos en contacto contigo.';

                main.insertBefore(msgExito, main.firstChild);

                // CLASE 12: Codigo de registro simple basado en la fecha/hora actual
                const codigoRegistro = 'AW-' + Date.now().toString().slice(-8);

                const datosRegistro = {
                    codigo: codigoRegistro,
                    fechaEmision: new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' }),
                    nombre: nombre,
                    dni: document.getElementById('dni').value.trim(),
                    fechaNacimiento: document.getElementById('fechaNacimiento').value,
                    correo: correo,
                    telefono: document.getElementById('telefono').value.trim(),
                    usuario: document.getElementById('user').value.trim(),
                    referencia: document.getElementById('referencia').value || 'No indicado',
                    cursos: resumen.seleccionados.map(function (c) {
                        return { nombre: c.dataset.nombre, precio: Number(c.dataset.precio) };
                    }),
                    subtotal: resumen.subtotal,
                    descuento: resumen.descuento,
                    porcentajeDescuento: resumen.porcentajeDescuento,
                    total: resumen.total,
                    modalidad: modalidad,
                    experiencia: document.getElementById('experiencia').checked ? 'Si' : 'No',
                    presupuesto: document.getElementById('presupuesto').value,
                    comentarios: document.getElementById('comentarios').value.trim()
                };

                // Generar el PDF y guardarlo en el historial (localStorage)
                generarComprobantePDF(datosRegistro);
                guardarEnHistorial(datosRegistro);
                renderizarHistorial();

                form.reset();
                checksCursos.forEach(function (chk) { chk.disabled = false; });
                avisoCompleto.textContent = '';
                calcularResumen();

                alert('Listo, ' + nombre + '! Tu registro fue completado con exito. Se descargo tu comprobante en PDF.');

            } else {
                // CLASE 12: prompt() para pedir dato al usuario
                const corregir = prompt(
                    'Que dato deseas corregir?\n' +
                    'Escribe el nombre del campo: nombre, dni, correoElectronico, telefono, user, clave\n' +
                    '(Deja vacio y presiona Aceptar para cancelar)'
                );

                if (corregir && corregir.trim() !== '') {
                    const campoBuscado = document.getElementById(corregir.trim());
                    if (campoBuscado) {
                        campoBuscado.focus();
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
    const nombre = prompt('Bienvenido a Academia Web!\nCual es tu nombre?');

    if (nombre === null || nombre.trim() === '') {
        alert('No ingresaste tu nombre. Te esperamos pronto en Academia Web!');
    } else {
        const mensajes = [
            'Hola, ' + nombre + '! Estas a un paso de aprender a programar.',
            'Que gusto tenerte aqui, ' + nombre + '! Explora nuestros cursos.',
            'Bienvenido/a, ' + nombre + '. El futuro digital te espera.',
            'Hola, ' + nombre + '! En Academia Web aprenderas HTML, CSS y JavaScript.'
        ];

        const indice = Math.floor(Math.random() * mensajes.length);
        alert(mensajes[indice]);

        const main = document.querySelector('main');
        if (main) {
            let saludo = document.getElementById('saludoVisitante');
            if (!saludo) {
                saludo = document.createElement('p');
                saludo.id = 'saludoVisitante';
                main.insertBefore(saludo, main.firstChild);
            }
            saludo.textContent = 'Hola, ' + nombre + '! Bienvenido/a a Academia Web Huancayo.';
        }
    }
}
