// ==========================================
// STADI - MODULO 3
// TABLAS Y GRAFICAS ESTADISTICAS
// UNIVERSIDAD MARIANO GALVEZ DE GUATEMALA
// ==========================================


// ==========================================
// LEER Y VALIDAR DATOS
// ==========================================

function leerDatosGrafica(id) {

    const texto = document.getElementById(id).value.trim();

    if (!texto) {
        throw new Error("Debes ingresar los datos.");
    }

    const partes = texto.split(/[,;\s]+/).filter(Boolean);

    if (partes.length > 2000) {
        throw new Error("Ingresa un máximo de 2000 datos.");
    }

    const patron = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

    return partes.map(valor => {

        if (!patron.test(valor) ||
            !Number.isFinite(Number(valor))) {

            throw new Error(
                "Ingresa solamente números separados por comas."
            );
        }

        return Number(valor);

    });

}


// ==========================================
// FORMATO DE NUMEROS
// ==========================================

function numeroGrafica(numero) {

    return Number(numero.toFixed(4)).toString();

}


// ==========================================
// MOSTRAR MENSAJES DE ERROR
// ==========================================

function errorGrafica(idResultado, idContenido, mensaje) {

    document.getElementById(idResultado).hidden = false;

    document.getElementById(idContenido).innerHTML =
        '<p class="mensaje-error">⚠️ ' + mensaje + '</p>';

}


// ==========================================
// GENERAR TABLA E HISTOGRAMA
// ==========================================

function generarHistograma() {

    let datos;

    try {

        datos = leerDatosGrafica("datosHistograma");

    } catch (error) {

        errorGrafica(
            "resultadoHistograma",
            "tablaFrecuencias",
            error.message
        );

        return;

    }

    // CANTIDAD DE DATOS

    const n = datos.length;

    // VALOR MINIMO Y MAXIMO

    const minimo = Math.min(...datos);

    const maximo = Math.max(...datos);

    // RANGO

    const rango = maximo - minimo;

    if (!Number.isFinite(rango)) {

        errorGrafica(
            "resultadoHistograma",
            "tablaFrecuencias",
            "Los valores son demasiado grandes."
        );

        return;

    }

    // NUMERO DE CLASES
    // REGLA DE STURGES

    const clases = rango === 0
        ? 1
        : Math.min(12, Math.ceil(1 + Math.log2(n)));

    // AMPLITUD DE CLASE

    const amplitud = clases === 1
        ? 0
        : rango / clases;

    // FRECUENCIAS

    const frecuencias = Array(clases).fill(0);

    for (const valor of datos) {

        const indice = clases === 1
            ? 0
            : Math.min(
                clases - 1,
                Math.floor((valor - minimo) / amplitud)
            );

        frecuencias[indice]++;

    }

    // ======================================
    // CREAR TABLA DE FRECUENCIAS
    // ======================================

    let acumulada = 0;

    let filas = "";

    for (let i = 0; i < clases; i++) {

        acumulada += frecuencias[i];

        const inferior = minimo + i * amplitud;

        const superior = i === clases - 1
            ? maximo
            : minimo + (i + 1) * amplitud;

        const intervalo = clases === 1
            ? numeroGrafica(minimo)
            : "[" + numeroGrafica(inferior) + ", " +
              numeroGrafica(superior) +
              (i === clases - 1 ? "]" : ")");

        const porcentaje =
            (frecuencias[i] / n * 100).toFixed(2);

        filas += `
            <tr>
                <td>${intervalo}</td>
                <td>${frecuencias[i]}</td>
                <td>${acumulada}</td>
                <td>${porcentaje}%</td>
            </tr>
        `;

    }

    // ======================================
    // MOSTRAR TABLA
    // ======================================

    document.getElementById(
        "resultadoHistograma"
    ).hidden = false;

    document.getElementById(
        "tablaFrecuencias"
    ).innerHTML = `

        <h4>📊 Tabla de frecuencias</h4>

        <p>
            <strong>Cantidad de datos:</strong> ${n}
        </p>

        <p>
            <strong>Rango:</strong>
            ${numeroGrafica(rango)}
        </p>

        <p>
            <strong>Número de clases:</strong> ${clases}
        </p>

        <p>
            Los intervalos incluyen el límite inferior.
            El último intervalo también incluye el máximo.
        </p>

        <div class="tabla-scroll">

            <table class="tabla-frecuencias">

                <thead>
                    <tr>
                        <th>Intervalo</th>
                        <th>Frecuencia</th>
                        <th>Acumulada</th>
                        <th>Relativa (%)</th>
                    </tr>
                </thead>

                <tbody>
                    ${filas}
                </tbody>

                <tfoot>
                    <tr>
                        <th>Total</th>
                        <th>${n}</th>
                        <th>${n}</th>
                        <th>100%</th>
                    </tr>
                </tfoot>

            </table>

        </div>

        <h4>📈 Histograma</h4>

        <p>
            La altura de cada barra representa
            la frecuencia de su intervalo.
        </p>

    `;

    // ======================================
    // DIBUJAR HISTOGRAMA
    // ======================================

    const canvas = document.getElementById(
        "graficoHistograma"
    );

    const ctx = canvas.getContext("2d");

    const ancho = canvas.width;

    const base = 350;

    const izquierda = 70;

    const altura = 260;

    const espacio =
        (ancho - izquierda - 35) / clases;

    const maxFrecuencia =
        Math.max(1, ...frecuencias);

    ctx.clearRect(
        0, 0, canvas.width, canvas.height
    );

    ctx.font = "14px Arial";

    ctx.strokeStyle = "#dce5f0";

    ctx.fillStyle = "#24364b";

    // LINEAS HORIZONTALES

    for (let i = 0; i <= 4; i++) {

        const y = base - (i / 4) * altura;

        ctx.beginPath();

        ctx.moveTo(izquierda, y);

        ctx.lineTo(ancho - 25, y);

        ctx.stroke();

        ctx.fillText(
            numeroGrafica(maxFrecuencia * i / 4),
            20,
            y + 5
        );

    }

    // BARRAS DEL HISTOGRAMA

    for (let i = 0; i < clases; i++) {

        const altoBarra =
            frecuencias[i] / maxFrecuencia * altura;

        const x = izquierda + i * espacio;

        ctx.fillStyle = "#2864a0";

        ctx.fillRect(
            x + 1,
            base - altoBarra,
            espacio - 2,
            altoBarra
        );

        ctx.strokeStyle = "#17365d";

        ctx.strokeRect(
            x + 1,
            base - altoBarra,
            espacio - 2,
            altoBarra
        );

        ctx.fillStyle = "#24364b";

        ctx.textAlign = "center";

        // FRECUENCIA DE LA BARRA

        ctx.fillText(
            frecuencias[i].toString(),
            x + espacio / 2,
            base - altoBarra - 8
        );

        // NOMBRE DE LA CLASE

        ctx.fillText(
            "Clase " + (i + 1),
            x + espacio / 2,
            base + 22
        );

    }

    ctx.textAlign = "left";

    ctx.fillText(
        "Frecuencia",
        15,
        25
    );

    ctx.textAlign = "center";

    ctx.fillText(
        "Intervalos (ver tabla)",
        ancho / 2,
        405
    );

    ctx.textAlign = "left";

}


// ==========================================
// GENERAR DIAGRAMA DE DISPERSION
// ==========================================

function generarDispersion() {

    let x;

    let y;

    try {

        x = leerDatosGrafica("datosEjeX");

        y = leerDatosGrafica("datosEjeY");

        if (x.length !== y.length) {

            throw new Error(
                "Las listas X e Y deben tener la misma cantidad de datos."
            );

        }

    } catch (error) {

        errorGrafica(
            "resultadoDispersion",
            "informacionDispersion",
            error.message
        );

        return;

    }

    // VALORES MINIMOS Y MAXIMOS

    let xMin = Math.min(...x);

    let xMax = Math.max(...x);

    let yMin = Math.min(...y);

    let yMax = Math.max(...y);

    if (!Number.isFinite(xMax - xMin) ||
        !Number.isFinite(yMax - yMin)) {

        errorGrafica(
            "resultadoDispersion",
            "informacionDispersion",
            "Los valores son demasiado grandes."
        );

        return;

    }

    // EVITAR DIVISION ENTRE CERO

    if (xMin === xMax) {

        xMin -= 1;

        xMax += 1;

    }

    if (yMin === yMax) {

        yMin -= 1;

        yMax += 1;

    }

    // ======================================
    // PREPARAR EL GRAFICO
    // ======================================

    const canvas = document.getElementById(
        "graficoDispersion"
    );

    const ctx = canvas.getContext("2d");

    const izquierda = 80;

    const derecha = 35;

    const arriba = 40;

    const abajo = 345;

    const anchoUtil =
        canvas.width - izquierda - derecha;

    const altoUtil = abajo - arriba;

    // CONVERSION A POSICIONES

    const px = valor =>
        izquierda +
        (valor - xMin) / (xMax - xMin) * anchoUtil;

    const py = valor =>
        abajo -
        (valor - yMin) / (yMax - yMin) * altoUtil;

    // LIMPIAR GRAFICO

    ctx.clearRect(
        0, 0, canvas.width, canvas.height
    );

    ctx.font = "14px Arial";

    ctx.fillStyle = "#24364b";

    ctx.strokeStyle = "#dce5f0";

    // ======================================
    // DIBUJAR CUADRICULA
    // ======================================

    for (let i = 0; i <= 5; i++) {

        const xx =
            izquierda + i * anchoUtil / 5;

        const yy =
            abajo - i * altoUtil / 5;

        ctx.beginPath();

        ctx.moveTo(xx, arriba);

        ctx.lineTo(xx, abajo);

        ctx.moveTo(izquierda, yy);

        ctx.lineTo(canvas.width - derecha, yy);

        ctx.stroke();

        // VALORES DEL EJE X

        ctx.textAlign = "center";

        ctx.fillText(
            numeroGrafica(
                xMin + i * (xMax - xMin) / 5
            ),
            xx,
            abajo + 24
        );

        // VALORES DEL EJE Y

        ctx.textAlign = "right";

        ctx.fillText(
            numeroGrafica(
                yMin + i * (yMax - yMin) / 5
            ),
            izquierda - 9,
            yy + 5
        );

    }

    // ======================================
    // DIBUJAR EJES
    // ======================================

    ctx.strokeStyle = "#17365d";

    ctx.beginPath();

    ctx.moveTo(izquierda, arriba);

    ctx.lineTo(izquierda, abajo);

    ctx.lineTo(
        canvas.width - derecha,
        abajo
    );

    ctx.stroke();

    // ======================================
    // DIBUJAR PUNTOS
    // ======================================

    ctx.fillStyle = "#2864a0";

    for (let i = 0; i < x.length; i++) {

        ctx.beginPath();

        ctx.arc(
            px(x[i]),
            py(y[i]),
            6,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

    // TITULOS DE LOS EJES

    ctx.fillStyle = "#24364b";

    ctx.textAlign = "center";

    ctx.fillText(
        "Variable X",
        canvas.width / 2,
        405
    );

    ctx.textAlign = "left";

    ctx.fillText(
        "Variable Y",
        9,
        25
    );

    // ======================================
    // MOSTRAR INTERPRETACION
    // ======================================

    document.getElementById(
        "resultadoDispersion"
    ).hidden = false;

    document.getElementById(
        "informacionDispersion"
    ).innerHTML = `

        <h4>📈 Diagrama de dispersión</h4>

        <p>
            Se representaron
            <strong>${x.length} pares de datos</strong>
            correspondientes a las variables X e Y.
        </p>

        <p>
            Cada punto representa una pareja
            de valores ingresados por el estudiante.
        </p>

        <p>
            <strong>Interpretación:</strong>
            Observa si los puntos presentan una
            tendencia ascendente, descendente
            o si están dispersos sin un patrón claro.
        </p>

    `;

}
