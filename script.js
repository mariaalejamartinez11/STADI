// ==========================================
// STADI
// ASISTENTE VIRTUAL DE ESTADÍSTICA APLICADA
// UNIVERSIDAD MARIANO GÁLVEZ DE GUATEMALA
// ==========================================


// ==========================================
// ABRIR LOS MODULOS DE STADI
// ==========================================

function abrirModulo(nombre) {

    let resultado =
        document.getElementById("resultado");

    let titulo =
        document.getElementById("tituloModulo");

    let descripcion =
        document.getElementById("descripcionModulo");

    let descriptiva =
        document.getElementById("calculadoraDescriptiva");

    let experimental =
        document.getElementById("calculadoraExperimental");

    let graficas =
        document.getElementById("calculadoraGraficas");

    let probabilidad =
        document.getElementById("calculadoraProbabilidad");
    
    let relacion =
        document.getElementById("calculadoraRelacion");

    let practicas =
        document.getElementById("calculadoraPracticas");  


    resultado.hidden = false;

    titulo.innerText = nombre;

    // OCULTAR TODOS LOS MODULOS

    descriptiva.hidden = true;

    experimental.hidden = true;

    graficas.hidden = true;

    probabilidad.hidden = true;

    relacion.hidden = true;

    practicas.hidden = true;

    // MODULO 1

    if (nombre === "Estadística descriptiva") {

        descripcion.innerText =
            "Calcula e interpreta diferentes medidas estadísticas.";

        descriptiva.hidden = false;

    }

    // MODULO 2

    else if (nombre === "Datos experimentales") {

        descripcion.innerText =
            "Analiza mediciones físicas y realiza conversiones.";

        experimental.hidden = false;

    }

    // MODULO 3

    else if (nombre === "Tablas y gráficas") {

        descripcion.innerText =
            "Construye tablas de frecuencias, histogramas y diagramas de dispersión.";

        graficas.hidden = false;

    }

    // MODULO 4

    else if (nombre === "Probabilidad") {

        descripcion.innerText =
            "Resuelve ejercicios de probabilidad, distribución normal y combinatoria.";

        probabilidad.hidden = false;

    }

    // MODULO 5: CORRELACION Y REGRESION

else if (nombre === "Relación entre variables") {

    descripcion.innerText =
        "Calcula correlación de Pearson, regresión lineal y predicciones.";

    relacion.hidden = false;

}

// MODULO 6: PRACTICAS INTERACTIVAS

else if (nombre === "Prácticas interactivas") {

    descripcion.innerText =
        "Practica estadística con ejercicios y retroalimentación.";

    practicas.hidden = false;

}

    // MODULOS PENDIENTES

    else {

        descripcion.innerText =
            "Este módulo se incorporará próximamente.";

    }

    resultado.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// CERRAR MÓDULO
// ==========================================

function cerrarModulo() {

    document.getElementById("resultado").hidden = true;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ==========================================
// FORMATO DE NÚMEROS
// ==========================================

function formato(numero) {

    return Number(numero.toFixed(4)).toString();

}

// ==========================================
// PROTEGER EL TEXTO INGRESADO
// ==========================================

function textoSeguro(texto) {

    return texto
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");

}

// ==========================================
// CALCULADORA DE ESTADÍSTICA
// ==========================================

function calcularEstadistica() {

    let entrada = document.getElementById("datos").value.trim();

    let unidad = document.getElementById("unidad").value.trim();

    let salida = document.getElementById("salidaEstadistica");

    salida.hidden = false;

    // VERIFICAR SI HAY DATOS

    if (entrada === "") {

        salida.innerHTML =
            '<p class="mensaje-error"> Debes ingresar números para realizar los cálculos.</p>';

        return;

    }

    // SEPARAR LOS DATOS

    let valores = entrada.split(/[,;\s]+/);

    // VALIDAR LOS NÚMEROS

    let patronNumero = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

    let datos = [];

    for (let valor of valores) {

        if (!patronNumero.test(valor)) {

            salida.innerHTML =
                '<p class="mensaje-error"> Uno de los valores no es válido. Ingresa solamente números separados por comas.</p>';

            return;

        }

        let numero = Number(valor);

        if (!Number.isFinite(numero)) {

            salida.innerHTML =
                '<p class="mensaje-error"> Los números ingresados están fuera del rango permitido.</p>';

            return;

        }

        datos.push(numero);

    }

    // CANTIDAD DE DATOS

    let n = datos.length;

    // ORDENAR LOS DATOS

    let ordenados = [...datos].sort((a, b) => a - b);

    // ======================================
    // MEDIA ARITMÉTICA
    // ======================================

    let suma = datos.reduce((a, b) => a + b, 0);

    let media = suma / n;

    // ======================================
    // MEDIANA
    // ======================================

    let mediana;

    if (n % 2 === 0) {

        mediana =
            (ordenados[n / 2 - 1] + ordenados[n / 2]) / 2;

    } else {

        mediana = ordenados[Math.floor(n / 2)];

    }

    // ======================================
    // MODA
    // ======================================

    let frecuencias = new Map();

    for (let numero of datos) {

        frecuencias.set(
            numero,
            (frecuencias.get(numero) || 0) + 1
        );

    }

    let frecuenciaMaxima = Math.max(...frecuencias.values());

    let modas = [];

    if (frecuenciaMaxima > 1) {

        for (let [numero, frecuencia] of frecuencias) {

            if (frecuencia === frecuenciaMaxima) {

                modas.push(numero);

            }

        }

    }

    modas.sort((a, b) => a - b);

    // ======================================
    // RANGO
    // ======================================

    let minimo = ordenados[0];

    let maximo = ordenados[n - 1];

    let rango = maximo - minimo;

    // ======================================
    // VARIANZAS
    // ======================================

    let diferencias = datos.map(numero => {

        return Math.pow(numero - media, 2);

    });

    let sumaDiferencias = diferencias.reduce(
        (a, b) => a + b, 0
    );

    // VARIANZA POBLACIONAL

    let varianzaPoblacional = sumaDiferencias / n;

    // VARIANZA MUESTRAL

    let varianzaMuestral = null;

    if (n > 1) {

        varianzaMuestral = sumaDiferencias / (n - 1);

    }

    // ======================================
    // DESVIACIONES ESTÁNDAR
    // ======================================

    let desviacionPoblacional =
        Math.sqrt(varianzaPoblacional);

    let desviacionMuestral = null;

    if (n > 1) {

        desviacionMuestral =
            Math.sqrt(varianzaMuestral);

    }

    // ======================================
    // MOSTRAR RESULTADOS
    // ======================================

    let u = textoSeguro(unidad);

    let unidadTexto = u ? " " + u : "";

    let unidadCuadrada = u ? " " + u + "²" : "";

    let html = `

        <h3> RESULTADOS ESTADÍSTICOS</h3>

        <p><strong>Datos ingresados:</strong>
        ${datos.map(formato).join(", ")}</p>

        <p><strong>Cantidad de datos:</strong> ${n}</p>

        <p><strong>Datos ordenados:</strong>
        ${ordenados.map(formato).join(", ")}</p>


        <h4>1. MEDIA ARITMÉTICA</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">
            x̄ = ${fraccionEstadi("Σx", "n")}
        </div>

        <p><strong>Sustitución:</strong></p>

        <div class="formula">

            x̄ = ${fraccionEstadi(datos.map(formato).join(" + "), n)}

        </div>

        <div class="formula">

           x̄ = ${fraccionEstadi(formato(suma), n)}

        </div>

        <div class="respuesta-final">

            Media = ${formato(media)}${unidadTexto}

        </div>


        <h4>2. MEDIANA</h4>

        <p>
            Primero ordenamos los datos de menor a mayor:
        </p>

        <div class="formula">

            ${ordenados.map(formato).join(", ")}

        </div>

    `;

    // PROCEDIMIENTO DE MEDIANA

    if (n % 2 === 0) {

        html += `

            <p>
                Como tenemos ${n} datos,
                buscamos los dos valores centrales.
            </p>

            <div class="formula">

                Mediana =
                (${formato(ordenados[n / 2 - 1])} +
                ${formato(ordenados[n / 2])}) / 2

            </div>

        `;

    } else {

        html += `

            <p>
                Como tenemos ${n} datos,
                seleccionamos el valor central,
                ubicado en la posición ${(n + 1) / 2}.
            </p>

            <div class="formula">

                Mediana = ${formato(mediana)}

            </div>

        `;

    }

    html += `

        <div class="respuesta-final">

            Mediana = ${formato(mediana)}${unidadTexto}

        </div>


        <h4>3. MODA</h4>

        <p>
            La moda es el valor que aparece
            con mayor frecuencia.
        </p>

    `;

    // MOSTRAR FRECUENCIAS

let listaFrecuencias = [...frecuencias.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([valor, frecuencia]) =>
        formato(valor) + ": " + frecuencia + " vez/veces"
    )
    .join("<br>");

    html += `

        <div class="formula">

            ${listaFrecuencias}

        </div>

    `;

    if (modas.length === 0) {

        html += `

            <div class="respuesta-final">
                No existe moda porque ningún valor
                se repite más que los demás.
            </div>

        `;

    } else {

        html += `

            <div class="respuesta-final">

                Moda = ${modas.map(formato).join(", ")}
                ${unidadTexto}

            </div>

        `;

    }

    // RANGO

    html += `

        <h4>4. RANGO</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">

            Rango = Valor máximo - Valor mínimo

        </div>

        <p><strong>Sustitución:</strong></p>

        <div class="formula">

            Rango = ${formato(maximo)} - ${formato(minimo)}

        </div>

        <div class="respuesta-final">

            Rango = ${formato(rango)}${unidadTexto}

        </div>


        <h4>5. VARIANZA POBLACIONAL</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">

            σ² = ${fraccionEstadi("Σ(xᵢ - μ)²", "N")}

        </div>

        <p>
            Calculamos las diferencias al cuadrado
            respecto a la media:
        </p>

        <div class="formula">

           ${datos.map(numero => "(" + formato(numero) + " - " + formato(media) + ")²").join(" + ")}
        </div>

        <p><strong>Suma de diferencias al cuadrado:</strong></p>

        <div class="formula">

            Σ(xᵢ - μ)² = ${formato(sumaDiferencias)}

        </div>

        <p><strong>Sustitución:</strong></p>

        <div class="formula">

            σ² = ${fraccionEstadi(formato(sumaDiferencias), n)}

        </div>

        <div class="respuesta-final">

            Varianza poblacional =
            ${formato(varianzaPoblacional)}${unidadCuadrada}

        </div>


        <h4>6. VARIANZA MUESTRAL</h4>

    `;

    if (n > 1) {

        html += `

            <p><strong>Fórmula:</strong></p>

            <div class="formula">

                s² = ${fraccionEstadi("Σ(xᵢ - x̄)²", "(n - 1)")}

            </div>

            <p><strong>Sustitución:</strong></p>

            <div class="formula">

                s² = ${fraccionEstadi(formato(sumaDiferencias), "(" + n + " - 1)")}

            </div>

            <div class="respuesta-final">

                Varianza muestral =
                ${formato(varianzaMuestral)}${unidadCuadrada}

            </div>

        `;

    } else {

        html += `

            <p class="mensaje-error">
                Se necesitan al menos dos datos
                para calcular la varianza muestral.
            </p>

        `;

    }

    // DESVIACIÓN ESTÁNDAR

    html += `

        <h4>7. DESVIACIÓN ESTÁNDAR POBLACIONAL</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">

            σ = √σ²

        </div>

        <p><strong>Sustitución:</strong></p>

        <div class="formula">

            σ = √${formato(varianzaPoblacional)}

        </div>

        <div class="respuesta-final">

            Desviación estándar poblacional =
            ${formato(desviacionPoblacional)}${unidadTexto}

        </div>


        <h4>8. DESVIACIÓN ESTÁNDAR MUESTRAL</h4>

    `;

    if (n > 1) {

        html += `

            <p><strong>Fórmula:</strong></p>

            <div class="formula">

                s = √s²

            </div>

            <p><strong>Sustitución:</strong></p>

            <div class="formula">

                s = √${formato(varianzaMuestral)}

            </div>

            <div class="respuesta-final">

                Desviación estándar muestral =
                ${formato(desviacionMuestral)}${unidadTexto}

            </div>

        `;

    } else {

        html += `

            <p class="mensaje-error">
                Se necesitan al menos dos datos
                para calcular la desviación estándar muestral.
            </p>

        `;

    }

    // ======================================
    // INTERPRETACIÓN
    // ======================================

    html += `

        <h4> INTERPRETACIÓN DE RESULTADOS</h4>

        <p>
            Los ${n} datos analizados tienen una
            media aritmética de
            <strong>${formato(media)}${unidadTexto}</strong>.
        </p>

        <p>
            La mediana es
            <strong>${formato(mediana)}${unidadTexto}</strong>,
            lo que representa el valor central
            de los datos ordenados.
        </p>

    `;

    if (n > 1) {

        html += `

            <p>
                La desviación estándar muestral es
                <strong>${formato(desviacionMuestral)}${unidadTexto}</strong>.
                Esta medida describe la dispersión
                de los datos respecto a su promedio.
            </p>

        `;

    }

    html += `

        <p>
            <em>
                Nota: Los resultados se muestran
                con un máximo de cuatro decimales.
                Los cálculos internos utilizan
                mayor precisión.
            </em>
        </p>

    `;

    // MOSTRAR TODO

    salida.innerHTML = html;

}


// ==========================================
// LIMPIAR DATOS
// ==========================================

function limpiarDatos() {

    document.getElementById("datos").value = "";

    document.getElementById("unidad").value = "";

    document.getElementById("salidaEstadistica").innerHTML = "";

    document.getElementById("salidaEstadistica").hidden = true;

}

// ==========================================
// MÓDULO 2: DATOS EXPERIMENTALES
// ==========================================

function calcularExperimento() {

    let entrada = document.getElementById("mediciones").value.trim();

    let origen = document.getElementById("unidadOrigen").value;

    let destino = document.getElementById("unidadDestino").value;

    let salida = document.getElementById("salidaExperimental");

    salida.hidden = false;

    // VALIDAR ENTRADA

    if (entrada === "") {

        salida.innerHTML =
            '<p class="mensaje-error"> Debes ingresar las mediciones.</p>';

        return;
    }

    // UNIDADES Y FACTORES DE CONVERSIÓN

    const unidades = {

        A:  { tipo: "corriente", factor: 1 },
        mA: { tipo: "corriente", factor: 0.001 },

        V:  { tipo: "voltaje", factor: 1 },
        mV: { tipo: "voltaje", factor: 0.001 },

        m:  { tipo: "longitud", factor: 1 },
        cm: { tipo: "longitud", factor: 0.01 },
        mm: { tipo: "longitud", factor: 0.001 },

        kg: { tipo: "masa", factor: 1 },
        g:  { tipo: "masa", factor: 0.001 },

        s:  { tipo: "tiempo", factor: 1 },
        ms: { tipo: "tiempo", factor: 0.001 }

    };

    // COMPROBAR UNIDADES COMPATIBLES

    if (unidades[origen].tipo !== unidades[destino].tipo) {

        salida.innerHTML =
            '<p class="mensaje-error"> Las unidades seleccionadas no son compatibles. Por ejemplo, no puedes convertir amperios a metros.</p>';

        return;
    }

    // SEPARAR Y VALIDAR MEDICIONES

    let valores = entrada.split(/[,;\s]+/);

    let patron = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

    let datos = [];

    for (let valor of valores) {

        if (!patron.test(valor)) {

            salida.innerHTML =
                '<p class="mensaje-error"> Ingresa únicamente números válidos separados por comas.</p>';

            return;
        }

        let numero = Number(valor);

        if (!Number.isFinite(numero)) {

            salida.innerHTML =
                '<p class="mensaje-error"> Hay un número fuera del rango permitido.</p>';

            return;
        }

        datos.push(numero);
    }

    // VERIFICAR CANTIDAD DE MEDICIONES

    if (datos.length < 2) {

        salida.innerHTML =
            '<p class="mensaje-error"> Ingresa al menos dos mediciones para calcular la dispersión muestral.</p>';

        return;
    }

    // FACTOR DE CONVERSIÓN

    let factor =
        unidades[origen].factor / unidades[destino].factor;

    // CONVERTIR MEDICIONES

    let convertidos = datos.map(numero => numero * factor);

    // COMPROBAR RESULTADOS NUMÉRICOS

    if (convertidos.some(numero => !Number.isFinite(numero))) {

        salida.innerHTML =
            '<p class="mensaje-error"> Los valores son demasiado grandes para realizar el cálculo.</p>';

        return;
    }

    // CANTIDAD DE MEDICIONES

    let n = convertidos.length;

    // SUMA DE MEDICIONES

    let suma = convertidos.reduce((a, b) => a + b, 0);

    // MEDIA EXPERIMENTAL

    let media = suma / n;

    // DESVIACIONES RESPECTO A LA MEDIA

    let diferencias = convertidos.map(numero =>
        Math.pow(numero - media, 2)
    );

    let sumaCuadrados = diferencias.reduce(
        (a, b) => a + b, 0
    );

    // VARIANZA MUESTRAL

    let varianza = sumaCuadrados / (n - 1);

    // DESVIACIÓN ESTÁNDAR MUESTRAL

    let desviacion = Math.sqrt(varianza);

    // ERROR ESTÁNDAR DE LA MEDIA

    let errorEstandar = desviacion / Math.sqrt(n);

    // RANGO EXPERIMENTAL

    let maximo = Math.max(...convertidos);

    let minimo = Math.min(...convertidos);

    let rango = maximo - minimo;

    // VALIDAR CÁLCULOS

    let resultados = [
        suma, media, sumaCuadrados,
        varianza, desviacion,
        errorEstandar, rango
    ];

    if (resultados.some(numero => !Number.isFinite(numero))) {

        salida.innerHTML =
            '<p class="mensaje-error"> No fue posible completar los cálculos con esos valores.</p>';

        return;
    }

    // PREPARAR PROCEDIMIENTOS

    let listaOriginal = datos.map(formato).join(", ");

    let listaConvertida = convertidos.map(formato).join(", ");

    let sumaExplicada = convertidos.map(formato).join(" + ");

    let diferenciasExplicadas = convertidos.map(numero =>
        "(" + formato(numero) + " - " + formato(media) + ")²"
    ).join(" + ");

    // ======================================
    // MOSTRAR RESULTADOS
    // ======================================

    salida.innerHTML = `

        <h3>🔬 RESULTADOS EXPERIMENTALES</h3>

        <h4>1. MEDICIONES INGRESADAS</h4>

        <p>
            <strong>Datos originales:</strong>
            ${listaOriginal} ${origen}
        </p>

        <p>
            <strong>Cantidad de mediciones:</strong>
            ${n}
        </p>

        <h4>2. CONVERSIÓN DE UNIDADES</h4>

        <p><strong>Factor de conversión:</strong></p>

        <div class="formula">
            ${formato(factor)}
        </div>

        <p>
            Cada medición se multiplica por
            el factor de conversión.
        </p>

        <div class="formula">
            ${formato(datos[0])} × ${formato(factor)}
            = ${formato(convertidos[0])} ${destino}
        </div>

        <p><strong>Mediciones convertidas:</strong></p>

        <div class="formula">
            ${listaConvertida} ${destino}
        </div>

        <h4>3. MEDIA EXPERIMENTAL</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">
           x̄ = ${fraccionEstadi("Σxᵢ", "n")}
        </div>

        <p><strong>Sustitución:</strong></p>

        <div class="formula">
            x̄ = ${fraccionEstadi(sumaExplicada, n)}
        </div>

        <div class="formula">
            x̄ = ${fraccionEstadi(formato(suma), n)}
        </div>

        <div class="respuesta-final">
            Media experimental =
            ${formato(media)} ${destino}
        </div>

        <h4>4. DESVIACIÓN ESTÁNDAR MUESTRAL</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">
            s = ${raizFraccionEstadi("Σ(xᵢ - x̄)²", "n - 1")}
        </div>

        <p><strong>Sustitución:</strong></p>

        <div class="formula">
            ${diferenciasExplicadas}
        </div>

        <div class="formula">
            s = ${raizFraccionEstadi(formato(sumaCuadrados), "(" + n + " - 1)")}
        </div>

        <div class="respuesta-final">
            Desviación estándar muestral =
            ${formato(desviacion)} ${destino}
        </div>

        <h4>5. ERROR ESTÁNDAR DE LA MEDIA</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">
            EE = <math><mfrac><mi>s</mi><msqrt><mi>n</mi></msqrt></mfrac></math>
        </div>

        <p><strong>Sustitución:</strong></p>

        <div class="formula">
            EE = <math><mfrac><mn>${formato(desviacion)}</mn><msqrt><mn>${n}</mn></msqrt></mfrac></math>
        </div>

        <div class="respuesta-final">
            Error estándar =
            ${formato(errorEstandar)} ${destino}
        </div>

        <h4>6. RANGO EXPERIMENTAL</h4>

        <p><strong>Fórmula:</strong></p>

        <div class="formula">
            R = Valor máximo - Valor mínimo
        </div>

        <div class="formula">
            R = ${formato(maximo)} - ${formato(minimo)}
        </div>

        <div class="respuesta-final">
            Rango experimental =
            ${formato(rango)} ${destino}
        </div>

        <h4> INTERPRETACIÓN</h4>

        <p>
            Se analizaron ${n} mediciones experimentales.
        </p>

        <p>
            El valor promedio obtenido fue de
            <strong>${formato(media)} ${destino}</strong>.
        </p>

        <p>
            La desviación estándar muestral fue de
            <strong>${formato(desviacion)} ${destino}</strong>.
            Esta medida representa la dispersión
            de las mediciones alrededor de su promedio.
        </p>

        <p>
            El error estándar fue de
            <strong>${formato(errorEstandar)} ${destino}</strong>.
            Este valor indica la precisión estadística
            con la que se estima la media a partir
            de la muestra.
        </p>

        <p>
            <em>
                Nota: El error estándar no incluye
                posibles errores sistemáticos
                ni la incertidumbre del instrumento.
                Los resultados se muestran con
                un máximo de cuatro decimales.
            </em>
        </p>

    `;

}


// ==========================================
// LIMPIAR DATOS EXPERIMENTALES
// ==========================================

function limpiarExperimento() {

    document.getElementById("mediciones").value = "";

    document.getElementById("unidadOrigen").value = "A";

    document.getElementById("unidadDestino").value = "A";

    document.getElementById("salidaExperimental").innerHTML = "";

    document.getElementById("salidaExperimental").hidden = true;

}

// ==========================================
// STADI - FORMULAS EN FORMA DE FRACCION
// ==========================================

function fraccionEstadi(numerador, denominador) {

    return '<span class="fraccion-estadi">' +

        '<span class="fraccion-numerador">' +

        textoSeguro(String(numerador)) +

        '</span>' +

        '<span class="fraccion-denominador">' +

        textoSeguro(String(denominador)) +

        '</span>' +

        '</span>';

}

// ==========================================
// STADI - RAIZ CUADRADA CON FRACCION
// ==========================================

function raizFraccionEstadi(numerador, denominador) {

    return '<math xmlns="http://www.w3.org/1998/Math/MathML">' +

        '<msqrt>' +

            '<mfrac>' +

                '<mtext>' +
                textoSeguro(String(numerador)) +
                '</mtext>' +

                '<mtext>' +
                textoSeguro(String(denominador)) +
                '</mtext>' +

            '</mfrac>' +

        '</msqrt>' +

    '</math>';

}