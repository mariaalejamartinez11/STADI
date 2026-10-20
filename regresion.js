// ==========================================
// STADI - MODULO 5
// CORRELACION Y REGRESION LINEAL
// ==========================================


// ==========================================
// LEER Y VALIDAR DATOS
// ==========================================

function leerRelacion(id) {

    const texto =
        document.getElementById(id).value.trim();

    if (texto === "") {
        throw new Error("Debes ingresar ambas series de datos.");
    }

    const valores = texto.split(/[,;\s]+/);

    if (valores.length > 1000) {
        throw new Error("Ingresa como máximo 1000 datos.");
    }

    const patron =
        /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

    return valores.map(function(valor) {

        if (!patron.test(valor)) {
            throw new Error("Ingresa solamente números válidos.");
        }

        const numero = Number(valor);

        if (!Number.isFinite(numero)) {
            throw new Error("Hay números fuera del rango permitido.");
        }

        return numero;

    });

}


// ==========================================
// FORMATO NUMERICO
// ==========================================

function formatoRelacion(numero) {

    return Number(numero.toPrecision(8)).toString();

}


// ==========================================
// MOSTRAR ERRORES
// ==========================================

function errorRelacion(mensaje) {

    const salida =
        document.getElementById("salidaRelacion");

    salida.hidden = false;
    salida.innerHTML = "";

    const aviso = document.createElement("p");

    aviso.className = "mensaje-error";
    aviso.textContent = "⚠️ " + mensaje;

    salida.appendChild(aviso);

}


// ==========================================
// CALCULAR CORRELACION Y REGRESION
// ==========================================

function calcularRelacion() {

    let x;
    let y;

    try {

        x = leerRelacion("relacionX");
        y = leerRelacion("relacionY");

        if (x.length !== y.length) {

            throw new Error(
                "Las variables X e Y deben tener la misma cantidad de datos."
            );

        }

        if (x.length < 2) {

            throw new Error(
                "Se necesitan al menos dos pares de datos."
            );

        }

        // CANTIDAD DE DATOS

        const n = x.length;

        // SUMAS

        const sumaX = x.reduce((a, b) => a + b, 0);
        const sumaY = y.reduce((a, b) => a + b, 0);

        // MEDIAS

        const mediaX = sumaX / n;
        const mediaY = sumaY / n;

        // SUMAS DE CUADRADOS Y PRODUCTOS

        let Sxx = 0;
        let Syy = 0;
        let Sxy = 0;

        for (let i = 0; i < n; i++) {

            const dx = x[i] - mediaX;
            const dy = y[i] - mediaY;

            Sxx += dx * dx;
            Syy += dy * dy;
            Sxy += dx * dy;

        }

        // VALIDACION

        if (!Number.isFinite(Sxx) ||
            !Number.isFinite(Syy) ||
            !Number.isFinite(Sxy)) {

            throw new Error(
                "Los valores son demasiado grandes para realizar el cálculo."
            );

        }

        if (Sxx === 0) {

            throw new Error(
                "No puede calcularse la regresión porque todos los valores de X son iguales."
            );

        }

        // REGRESION LINEAL

        const b = Sxy / Sxx;

        const a = mediaY - b * mediaX;

        // CORRELACION DE PEARSON

        let r = null;
        let rCuadrado = null;

        if (Syy > 0) {

            r = Sxy / Math.sqrt(Sxx * Syy);

            r = Math.max(-1, Math.min(1, r));

            rCuadrado = r * r;

        }

        // VALIDAR RESULTADOS

        if (!Number.isFinite(a) ||
            !Number.isFinite(b) ||
            (r !== null && !Number.isFinite(r))) {

            throw new Error(
                "No fue posible completar los cálculos."
            );

        }

        // ==================================
        // INTERPRETACION
        // ==================================

        let interpretacion;

        if (r === null) {

            interpretacion =
                "La variable Y es constante. " +
                "La correlación de Pearson no está definida.";

        } else {

            let direccion;

            if (r > 0) {
                direccion = "positiva";
            } else if (r < 0) {
                direccion = "negativa";
            } else {
                direccion = "nula";
            }

            let intensidad;

            const absR = Math.abs(r);

            if (absR === 1) {
                intensidad = "perfecta";
            } else if (absR >= 0.8) {
                intensidad = "muy fuerte";
            } else if (absR >= 0.6) {
                intensidad = "fuerte";
            } else if (absR >= 0.4) {
                intensidad = "moderada";
            } else if (absR >= 0.2) {
                intensidad = "débil";
            } else {
                intensidad = "muy débil o nula";
            }

            interpretacion =
                "Los datos presentan una correlación " +
                direccion + " de intensidad " +
                intensidad + ".";

        }

        // ==================================
        // CONSTRUIR RESULTADOS
        // ==================================

        const partes = [];

        partes.push(
            "<h3>📉 RESULTADOS DE CORRELACIÓN Y REGRESIÓN</h3>"
        );

        partes.push(
            "<h4>1. DATOS INGRESADOS</h4>"
        );

        partes.push(
            "<p><strong>Variable X:</strong> " +
            x.map(formatoRelacion).join(", ") + "</p>"
        );

        partes.push(
            "<p><strong>Variable Y:</strong> " +
            y.map(formatoRelacion).join(", ") + "</p>"
        );

        partes.push(
            "<p><strong>Cantidad de pares:</strong> " +
            n + "</p>"
        );

        // MEDIAS

        partes.push(
            "<h4>2. MEDIA DE LAS VARIABLES</h4>"
        );

        partes.push(
            '<div class="formula">' +
            "Media X = " + formatoRelacion(sumaX) +
            " / " + n +
            " = " + formatoRelacion(mediaX) +
            "</div>"
        );

        partes.push(
            '<div class="formula">' +
            "Media Y = " + formatoRelacion(sumaY) +
            " / " + n +
            " = " + formatoRelacion(mediaY) +
            "</div>"
        );

        // SUMAS CENTRADAS

        partes.push(
            "<h4>3. CÁLCULOS INTERMEDIOS</h4>"
        );

        partes.push(
            "<p>Calculamos las diferencias respecto " +
            "a las medias y sus productos.</p>"
        );

        partes.push(
            '<div class="formula">' +
            "Sxx = Σ(xᵢ − x̄)² = " +
            formatoRelacion(Sxx) +
            "</div>"
        );

        partes.push(
            '<div class="formula">' +
            "Syy = Σ(yᵢ − ȳ)² = " +
            formatoRelacion(Syy) +
            "</div>"
        );

        partes.push(
            '<div class="formula">' +
            "Sxy = Σ(xᵢ − x̄)(yᵢ − ȳ) = " +
            formatoRelacion(Sxy) +
            "</div>"
        );

        // PEARSON

        partes.push(
            "<h4>4. CORRELACIÓN DE PEARSON</h4>"
        );

        partes.push(
            "<p><strong>Fórmula:</strong></p>"
        );

       partes.push(
    '<div class="formula">' +
    'r = <math xmlns="http://www.w3.org/1998/Math/MathML">' +
        '<mfrac>' +
            '<msub><mi>S</mi><mi>xy</mi></msub>' +
            '<msqrt>' +
                '<mrow>' +
                    '<msub><mi>S</mi><mi>xx</mi></msub>' +
                    '<mo>×</mo>' +
                    '<msub><mi>S</mi><mi>yy</mi></msub>' +
                '</mrow>' +
            '</msqrt>' +
        '</mfrac>' +
    '</math>' +
    '</div>'
);

        if (r !== null) {

            partes.push(
                "<p><strong>Sustitución:</strong></p>"
            );

            partes.push(
    '<div class="formula">' +
    'r = <math xmlns="http://www.w3.org/1998/Math/MathML">' +
        '<mfrac>' +
            '<mn>' + formatoRelacion(Sxy) + '</mn>' +
            '<msqrt>' +
                '<mrow>' +
                    '<mn>' + formatoRelacion(Sxx) + '</mn>' +
                    '<mo>×</mo>' +
                    '<mn>' + formatoRelacion(Syy) + '</mn>' +
                '</mrow>' +
            '</msqrt>' +
        '</mfrac>' +
    '</math>' +
    '</div>'
);

            partes.push(
                '<div class="respuesta-final">' +
                "Coeficiente de Pearson = " +
                formatoRelacion(r) +
                "</div>"
            );

        } else {

            partes.push(
                '<p class="mensaje-error">' +
                "La correlación no está definida " +
                "porque Y no presenta variación." +
                "</p>"
            );

        }

        // REGRESION

        partes.push(
            "<h4>5. REGRESIÓN LINEAL SIMPLE</h4>"
        );

        partes.push(
            "<p><strong>Fórmula:</strong></p>"
        );

        partes.push(
            '<div class="formula">' +
            "ŷ = a + bx" +
            "</div>"
        );

        partes.push(
            "<p><strong>Pendiente:</strong></p>"
        );

        partes.push(
    '<div class="formula">' +
    'b = <math xmlns="http://www.w3.org/1998/Math/MathML">' +
        '<mfrac>' +
            '<msub><mi>S</mi><mi>xy</mi></msub>' +
            '<msub><mi>S</mi><mi>xx</mi></msub>' +
        '</mfrac>' +
    '</math>' +
    '</div>'
);

        partes.push(
    '<div class="formula">' +
    'b = <math xmlns="http://www.w3.org/1998/Math/MathML">' +
        '<mfrac>' +
            '<mn>' + formatoRelacion(Sxy) + '</mn>' +
            '<mn>' + formatoRelacion(Sxx) + '</mn>' +
        '</mfrac>' +
    '</math> = ' + formatoRelacion(b) +
    '</div>'
);

        partes.push(
            "<p><strong>Intercepto:</strong></p>"
        );

        partes.push(
            '<div class="formula">' +
            "a = ȳ − b × x̄" +
            "</div>"
        );

        partes.push(
            '<div class="formula">' +
            "a = " + formatoRelacion(mediaY) +
            " − (" + formatoRelacion(b) +
            " × " + formatoRelacion(mediaX) + ")" +
            "</div>"
        );

        partes.push(
            '<div class="respuesta-final">' +
            "Ecuación: ŷ = " +
            formatoRelacion(a) +
            " + (" + formatoRelacion(b) + ")x" +
            "</div>"
        );

        // COEFICIENTE DE DETERMINACION

        partes.push(
            "<h4>6. COEFICIENTE DE DETERMINACIÓN</h4>"
        );

        if (rCuadrado !== null) {

            partes.push(
                '<div class="formula">' +
                "R² = r²" +
                "</div>"
            );

            partes.push(
                '<div class="respuesta-final">' +
                "R² = " + formatoRelacion(rCuadrado) +
                " (" + formatoRelacion(rCuadrado * 100) +
                "%)" +
                "</div>"
            );

        } else {

            partes.push(
                "<p>R² no está definido porque " +
                "Y no presenta variación.</p>"
            );

        }

        // PREDICCION OPCIONAL

        const textoPrediccion =
            document.getElementById("prediccionX").value.trim();

        if (textoPrediccion !== "") {

            const xp = Number(textoPrediccion);

            if (!Number.isFinite(xp)) {

                throw new Error(
                    "El valor de predicción no es válido."
                );

            }

            const yp = a + b * xp;

            if (!Number.isFinite(yp)) {

                throw new Error(
                    "No fue posible calcular la predicción."
                );

            }

            partes.push(
                "<h4>7. PREDICCIÓN</h4>"
            );

            partes.push(
                '<div class="formula">' +
                "ŷ = " + formatoRelacion(a) +
                " + (" + formatoRelacion(b) +
                " × " + formatoRelacion(xp) + ")" +
                "</div>"
            );

            partes.push(
                '<div class="respuesta-final">' +
                "Para X = " + formatoRelacion(xp) +
                ", Y estimada = " + formatoRelacion(yp) +
                "</div>"
            );

        }

        // INTERPRETACION

        partes.push(
            "<h4>📚 INTERPRETACIÓN</h4>"
        );

        partes.push(
            "<p>" + interpretacion + "</p>"
        );

        partes.push(
            "<p>La pendiente de la recta indica " +
            "el cambio estimado de Y cuando X " +
            "aumenta una unidad.</p>"
        );

        partes.push(
            "<p><em>La correlación no implica " +
            "causalidad. Las predicciones fuera " +
            "del rango observado deben " +
            "interpretarse con precaución.</em></p>"
        );

        // MOSTRAR RESULTADOS

        const salida =
            document.getElementById("salidaRelacion");

        salida.hidden = false;
        salida.innerHTML = partes.join("");

    } catch (error) {

        errorRelacion(error.message);

    }

}


// ==========================================
// LIMPIAR CAMPOS
// ==========================================

function limpiarRelacion() {

    document.getElementById("relacionX").value = "";
    document.getElementById("relacionY").value = "";
    document.getElementById("prediccionX").value = "";

    const salida =
        document.getElementById("salidaRelacion");

    salida.innerHTML = "";
    salida.hidden = true;

}
