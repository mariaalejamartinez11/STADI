// ==========================================
// STADI - MODULO 6
// PRACTICAS INTERACTIVAS
// ==========================================

let ejercicioActual = null;


// NUMEROS ALEATORIOS

function azar(minimo, maximo) {

    return Math.floor(
        Math.random() * (maximo - minimo + 1)
    ) + minimo;

}


// FORMATO NUMERICO

function mostrarNumero(numero) {

    return String(Number(numero.toFixed(4)));

}


// FACTORIAL

function factorialPractica(n) {

    let total = 1;

    for (let i = 2; i <= n; i++) {
        total *= i;
    }

    return total;

}


// ==========================================
// GENERADORES DE EJERCICIOS
// ==========================================

const generadoresPractica = [

    // 1. MEDIA ARITMETICA

    function(fijo) {

        const d = fijo
            ? [2, 4, 6, 8]
            : Array.from(
                {length: 5},
                () => azar(1, 15)
            );

        const suma = d.reduce((a, b) => a + b, 0);

        const media = suma / d.length;

        return {

            tema: "Media aritmética",

            pregunta:
                "Calcula la media de: " +
                d.join(", ") + ".",

            respuesta: media,

            pista:
                "Suma todos los valores y divide " +
                "entre la cantidad de datos.",

            pasos:
    "Fórmula: x̄ = Σx / n\n" +
    "Σx = " + d.join(" + ") +
    " = " + suma + "\n" +
    "x̄ = " + suma + " / " +
    d.length + " = " +
    mostrarNumero(media),

pasosHTML: `

    <p><strong>1. Fórmula general:</strong></p>

    <div class="formula formula-permutaciones">
        x̄ = ${fraccionEstadi("Σxᵢ", "n")}
    </div>

    <p><strong>2. Sustitución de valores:</strong></p>

    <div class="formula formula-permutaciones">
        x̄ = ${fraccionEstadi(
            d.join(" + "),
            d.length
        )}
    </div>

    <p><strong>3. Suma de los datos:</strong></p>

    <div class="formula formula-permutaciones">
        x̄ = ${fraccionEstadi(
            mostrarNumero(suma),
            d.length
        )}
    </div>

    <p><strong>4. Resultado final:</strong></p>

    <div class="respuesta-final">
        Media aritmética = ${mostrarNumero(media)}
    </div>

`

        };

    },


    // 2. MEDIANA

    function(fijo) {

        const d = fijo
            ? [4, 7, 8, 10, 13]
            : Array.from(
                {length: 6},
                () => azar(1, 20)
            );

        const orden = [...d].sort((a, b) => a - b);

        const n = orden.length;

        const respuesta = n % 2
            ? orden[Math.floor(n / 2)]
            : (orden[n / 2 - 1] + orden[n / 2]) / 2;

        const procedimiento = n % 2
            ? "El dato central es " + respuesta
            : "Mediana = (" +
              orden[n / 2 - 1] + " + " +
              orden[n / 2] + ") / 2 = " +
              mostrarNumero(respuesta);

        return {

            tema: "Mediana",

            pregunta:
                "Encuentra la mediana de: " +
                d.join(", ") + ".",

            respuesta: respuesta,

            pista:
                "Ordena los datos. Si son pares, " +
                "promedia los dos valores centrales.",

           pasos:
    "Datos ordenados: " +
    orden.join(", ") + "\n" +
    procedimiento,

pasosHTML: `

    <p><strong>1. Datos ordenados:</strong></p>

    <div class="formula formula-permutaciones">
        ${orden.join(", ")}
    </div>

    <p><strong>2. Cantidad de datos:</strong></p>

    <div class="formula formula-permutaciones">
        n = ${n}
    </div>

    ${n % 2 === 0 ? `

        <p><strong>3. Fórmula general:</strong></p>

        <div class="formula formula-permutaciones">
            Me = ${fraccionEstadi(
                "x<sub>n/2</sub> + x<sub>n/2+1</sub>",
                "2"
            )}
        </div>

        <p><strong>4. Sustitución:</strong></p>

        <div class="formula formula-permutaciones">
            Me = ${fraccionEstadi(
                mostrarNumero(orden[n / 2 - 1]) +
                " + " +
                mostrarNumero(orden[n / 2]),
                "2"
            )}
        </div>

        <p><strong>5. Suma de valores:</strong></p>

        <div class="formula formula-permutaciones">
            Me = ${fraccionEstadi(
                mostrarNumero(
                    orden[n / 2 - 1] + orden[n / 2]
                ),
                "2"
            )}
        </div>

    ` : `

        <p><strong>3. Fórmula general:</strong></p>

        <div class="formula formula-permutaciones">
            Me = x<sub>(n+1)/2</sub>
        </div>

        <p><strong>4. Posición central:</strong></p>

        <div class="formula formula-permutaciones">
            Posición = ${fraccionEstadi(
                n + " + 1",
                "2"
            )}
            = ${(n + 1) / 2}
        </div>

        <p><strong>5. Valor central:</strong></p>

        <div class="formula formula-permutaciones">
            Me = ${mostrarNumero(
                orden[(n - 1) / 2]
            )}
        </div>

    `}

    <p><strong>6. Resultado final:</strong></p>

    <div class="respuesta-final">
        Mediana = ${mostrarNumero(respuesta)}
    </div>

`

        };

    },


    // 3. MODA

    function(fijo) {

        const m = fijo ? 3 : azar(3, 12);

        const d = [m - 1, m, m, m + 1, m];

        return {

            tema: "Moda",

            pregunta:
                "Calcula la moda de: " +
                d.join(", ") + ".",

            respuesta: m,

            pista:
                "Identifica el valor que se " +
                "repite más veces.",

            pasos:
                "El número " + m +
                " aparece 3 veces.\n" +
                "Los demás aparecen una vez.\n" +
                "Moda = " + m

        };

    },


    // 4. RANGO

    function(fijo) {

        const d = fijo
            ? [10, 12, 19, 23]
            : Array.from(
                {length: 4},
                () => azar(1, 35)
            );

        const maximo = Math.max(...d);

        const minimo = Math.min(...d);

        const rango = maximo - minimo;

        return {

            tema: "Rango",

            pregunta:
                "Calcula el rango de: " +
                d.join(", ") + ".",

            respuesta: rango,

            pista:
                "Resta el valor mínimo " +
                "al valor máximo.",

            pasos:
                "Fórmula: R = máximo - mínimo\n" +
                "R = " + maximo + " - " +
                minimo + " = " + rango

        };

    },


    // 5. VARIANZA POBLACIONAL

    function(fijo) {

        let d;

        if (fijo) {

            d = [2, 4, 6, 8];

        } else {

            const c = azar(5, 20);

            const k = azar(1, 4);

            d = [c - k, c - k, c + k, c + k];

        }

        const media =
            d.reduce((a, b) => a + b, 0) / d.length;

        const suma = d.reduce(
            (s, x) => s + Math.pow(x - media, 2),
            0
        );

        const varianza = suma / d.length;

        return {

            tema: "Varianza poblacional",

            pregunta:
                "Considerando la población completa, " +
                "calcula la varianza de: " +
                d.join(", ") + ".",

            respuesta: varianza,

            pista:
                "Calcula la media, suma las diferencias " +
                "al cuadrado y divide entre N.",

            pasos:
                "Fórmula: σ² = Σ(x - μ)² / N\n" +
                "Media = " + mostrarNumero(media) +
                "\nSuma de cuadrados = " +
                mostrarNumero(suma) +
                "\nσ² = " + mostrarNumero(suma) +
                " / " + d.length +
                " = " + mostrarNumero(varianza)

        };

    },


    // 6. DESVIACION ESTANDAR MUESTRAL

    function(fijo) {

        const c = fijo ? 2 : azar(5, 20);

        const k = fijo ? 1 : azar(1, 5);

        const d = [c - k, c, c + k];

        const suma = 2 * k * k;

        return {

            tema: "Desviación estándar muestral",

            pregunta:
                "Calcula la desviación estándar " +
                "MUESTRAL de: " +
                d.join(", ") + ".",

            respuesta: k,

            pista:
                "Utiliza n - 1 en el denominador " +
                "y calcula la raíz cuadrada.",

            pasos:
                "Media = " + c +
                "\nSuma de cuadrados = " + suma +
                "\ns² = " + suma +
                " / (3 - 1) = " + (k * k) +
                "\ns = √" + (k * k) +
                " = " + k

        };

    },


    // 7. CONVERSION DE UNIDADES

    function(fijo) {

        const a = fijo ? 2.5 : azar(1, 40) / 10;

        return {

            tema: "Conversión de unidades",

            pregunta:
                "Convierte " + a +
                " amperios (A) a miliamperios (mA).",

            respuesta: a * 1000,

            pista:
                "1 amperio equivale a " +
                "1000 miliamperios.",

            pasos:
                a + " A × 1000 mA/A = " +
                mostrarNumero(a * 1000) +
                " mA"

        };

    },


    // 8. PROBABILIDAD BASICA

    function(fijo) {

        const total = fijo ? 8 : azar(5, 16);

        const fav = fijo
            ? 3
            : azar(1, total - 1);

        const porcentaje = 100 * fav / total;

        return {

            tema: "Probabilidad básica",

            pregunta:
                "Hay " + fav +
                " casos favorables entre " +
                total +
                " resultados igualmente probables. " +
                "¿Cuál es la probabilidad en porcentaje?",

            respuesta: porcentaje,

            pista:
                "Divide los casos favorables " +
                "entre los posibles y multiplica por 100.",

            pasos:
                "P(A) = " + fav + " / " + total +
                " = " + mostrarNumero(fav / total) +
                "\nPorcentaje = (" + fav +
                " / " + total + ") × 100 = " +
                mostrarNumero(porcentaje) + "%"

        };

    },


    // 9. COMBINACIONES

    function(fijo) {

        const n = fijo ? 6 : azar(5, 9);

        const r = fijo ? 2 : azar(2, 4);

        const respuesta =
            factorialPractica(n) /
            (factorialPractica(r) *
             factorialPractica(n - r));

        return {

            tema: "Combinaciones",

            pregunta:
                "¿Cuántas formas hay de elegir " +
                r + " objetos entre " +
                n + " disponibles, si el orden NO importa?",

            respuesta: respuesta,

            pista:
                "Utiliza C(n,r) = n! / [r!(n-r)!].",

            pasos:
    "C(" + n + "," + r + ") = " +
    n + "! / [" + r + "!(" +
    n + "-" + r + ")!]\n" +
    "Resultado = " + respuesta,

pasosHTML: `

    <p><strong>1. Fórmula general:</strong></p>

    <div class="formula formula-permutaciones">
        C(n,r) = ${fraccionEstadi("n!", "r!(n-r)!")}
    </div>

    <p><strong>2. Sustitución:</strong></p>

    <div class="formula formula-permutaciones">
        C(${n},${r}) =
        ${fraccionEstadi(
            n + "!",
            r + "!(" + n + "-" + r + ")!"
        )}
    </div>

    <p><strong>3. Desarrollo de factoriales:</strong></p>

    <div class="formula formula-permutaciones">
        C(${n},${r}) =
        ${fraccionEstadi(
            factorialPractica(n),
            factorialPractica(r) + " × " +
            factorialPractica(n-r)
        )}
    </div>

    <p><strong>4. Simplificación:</strong></p>

    <div class="formula formula-permutaciones">
        C(${n},${r}) =
        ${fraccionEstadi(
            factorialPractica(n),
            factorialPractica(r) * factorialPractica(n-r)
        )}
    </div>

    <div class="respuesta-final">
        Resultado = ${respuesta}
    </div>

`
};

    },


    // 10. PERMUTACIONES

    function(fijo) {

        const n = fijo ? 5 : azar(5, 9);

        const r = fijo ? 3 : azar(2, 4);

        const respuesta =
            factorialPractica(n) /
            factorialPractica(n - r);

        return {

            tema: "Permutaciones",

            pregunta:
                "¿Cuántas formas hay de ordenar " +
                r + " objetos distintos tomados de " +
                n + " disponibles?",

            respuesta: respuesta,

            pista:
                "Utiliza P(n,r) = n! / (n-r)!.",

           pasos:
    "P(" + n + "," + r + ") = " +
    n + "! / (" + n +
    "-" + r + ")!\n" +
    "Resultado = " + respuesta,

pasosHTML: `
    <p><strong>Fórmula:</strong></p>

    <div class="formula">
        P(n,r) = ${fraccionEstadi("n!", "(n-r)!")}
    </div>

    <p><strong>Sustitución:</strong></p>

    <div class="formula formula-permutaciones">
        P(${n},${r}) =
        ${fraccionEstadi(n + "!", "(" + n + "-" + r + ")!")}
    </div>

    <div class="formula formula-permutaciones">
        P(${n},${r}) =
        ${fraccionEstadi(factorialPractica(n), factorialPractica(n-r))}
    </div>

    <p><strong>Resultado = ${respuesta}</strong></p>
`

};

    },
    // 11. PUNTUACION Z

    function(fijo) {

        const mu = fijo ? 100 : azar(20, 100);

        const sigma = fijo ? 15 : azar(2, 15);

        const z = fijo ? 1 : azar(-2, 2);

        const x = mu + sigma * z;

        return {

            tema: "Puntuación Z",

            pregunta:
                "En una distribución normal con media " +
                mu + " y desviación estándar " +
                sigma + ", encuentra Z para X = " +
                x + ".",

            respuesta: z,

            pista:
                "Utiliza z = (X - μ) / σ.",

            pasos:
    "Z = (" + x + " - " + mu + ") / " + sigma +
    "\nZ = " + z,

pasosHTML: `

    <p><strong>1. Fórmula general:</strong></p>

    <div class="formula formula-permutaciones">
        Z = ${fraccionEstadi("X − μ", "σ")}
    </div>

    <p><strong>2. Sustitución:</strong></p>

    <div class="formula formula-permutaciones">
        Z = ${fraccionEstadi(
            mostrarNumero(x) + " − " + mostrarNumero(mu),
            mostrarNumero(sigma)
        )}
    </div>

    <p><strong>3. Desarrollo de la operación:</strong></p>

    <div class="formula formula-permutaciones">
        Z = ${fraccionEstadi(
            mostrarNumero(x - mu),
            mostrarNumero(sigma)
        )}
    </div>

    <p><strong>4. Resultado final:</strong></p>

    <div class="respuesta-final">
        Z = ${mostrarNumero(z)}
    </div>

`

        };

    },


    // 12. REGRESION LINEAL

    function(fijo) {

        const a = fijo ? 1 : azar(-3, 5);

        const b = fijo ? 2 : azar(1, 5);

        const x = fijo ? 6 : azar(4, 9);

        const y1 = a + b;

        const y2 = a + 2 * b;

        const prediccion = a + b * x;

        return {

            tema: "Regresión: predicción",

            pregunta:
                "Los puntos (1," + y1 +
                ") y (2," + y2 +
                ") están sobre una recta de regresión exacta. " +
                "Predice Y para X = " + x + ".",

            respuesta: prediccion,

            pista:
                "Calcula la pendiente y después " +
                "utiliza la ecuación ŷ = a + bx.",

            pasos:
    "b = (" + y2 + " - " + y1 + ") / (2 - 1) = " + b +
    "\na = " + y1 + " - " + b + " × 1 = " + a +
    "\nŷ = " + a + " + " + b + " × " + x +
    " = " + prediccion,

pasosHTML: `

    <p><strong>1. Fórmula de la pendiente:</strong></p>

    <div class="formula formula-permutaciones">
        b = ${fraccionEstadi("y₂ − y₁", "x₂ − x₁")}
    </div>

    <p><strong>2. Sustitución de la pendiente:</strong></p>

    <div class="formula formula-permutaciones">
        b = ${fraccionEstadi(
            mostrarNumero(y2) + " − " + mostrarNumero(y1),
            "2 − 1"
        )}
    </div>

    <p><strong>3. Cálculo de la pendiente:</strong></p>

    <div class="formula formula-permutaciones">
        b = ${fraccionEstadi(
            mostrarNumero(y2 - y1),
            "1"
        )}
        = ${mostrarNumero(b)}
    </div>

    <p><strong>4. Fórmula del intercepto:</strong></p>

    <div class="formula formula-permutaciones">
        a = y₁ − b × x₁
    </div>

    <p><strong>5. Sustitución del intercepto:</strong></p>

    <div class="formula formula-permutaciones">
        a = ${mostrarNumero(y1)} −
        (${mostrarNumero(b)} × 1)
        = ${mostrarNumero(a)}
    </div>

    <p><strong>6. Ecuación de regresión:</strong></p>

    <div class="formula formula-permutaciones">
        ŷ = a + bx
    </div>

    <p><strong>7. Sustitución de valores:</strong></p>

    <div class="formula formula-permutaciones">
        ŷ = ${mostrarNumero(a)} +
        (${mostrarNumero(b)} × ${mostrarNumero(x)})
    </div>

    <p><strong>8. Resultado final:</strong></p>

    <div class="respuesta-final">
        ŷ = ${mostrarNumero(prediccion)}
    </div>

`

        };

    }

];


// ==========================================
// SELECCIONAR EJERCICIO
// ==========================================

function seleccionarEjercicio(ejercicio) {

    ejercicioActual = ejercicio;

    document.getElementById(
        "ejercicioActivo"
    ).hidden = false;

    document.getElementById(
        "temaPractica"
    ).textContent = ejercicio.tema;

    document.getElementById(
        "enunciadoPractica"
    ).textContent = ejercicio.pregunta;

    document.getElementById(
        "respuestaPractica"
    ).value = "";

    const retro =
        document.getElementById(
            "retroalimentacionPractica"
        );

    retro.hidden = true;
    retro.textContent = "";

}


// ==========================================
// CARGAR EJERCICIO DE EJEMPLO
// ==========================================

function cargarEjemploPractica(indice) {

    seleccionarEjercicio(
        generadoresPractica[indice](true)
    );

}


// ==========================================
// GENERAR PRACTICA NUEVA
// ==========================================

function generarPractica() {

    const indice = azar(
        0,
        generadoresPractica.length - 1
    );

    seleccionarEjercicio(
        generadoresPractica[indice](false)
    );

}


// ==========================================
// COMPROBAR RESPUESTA
// ==========================================

function comprobarPractica() {

    if (!ejercicioActual) return;

    const texto =
        document.getElementById(
            "respuestaPractica"
        ).value.trim();

    const retro =
        document.getElementById(
            "retroalimentacionPractica"
        );

    retro.hidden = false;

    const patron =
        /^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/;

    if (!patron.test(texto)) {

        retro.className = "mensaje-error";

        retro.textContent =
            "⚠️ Escribe un número válido, " +
            "sin unidades ni el símbolo %.";

        return;

    }

    const respuesta = Number(
        texto.replace(",", ".")
    );

    const diferencia = Math.abs(
        respuesta - ejercicioActual.respuesta
    );

    if (diferencia <= 0.00015) {

        retro.className = "respuesta-final";

        retro.textContent =
            "✅ ¡Respuesta correcta!\n\n" +
            ejercicioActual.pasos;

    } else {

        retro.className = "mensaje-error";

        retro.textContent =
            "❌ La respuesta todavía no es correcta.\n" +
            "Pista: " + ejercicioActual.pista +
            "\nPuedes intentarlo nuevamente o " +
            "presionar 'Ver procedimiento'.";

    }

}


// ==========================================
// MOSTRAR SOLUCION
// ==========================================

function mostrarSolucionPractica() {

    if (!ejercicioActual) return;

    const retro =
        document.getElementById(
            "retroalimentacionPractica"
        );

    retro.hidden = false;

    retro.className = "respuesta-final";

    if (ejercicioActual.pasosHTML) {

    retro.innerHTML = `
        <p><strong>Respuesta:
            ${mostrarNumero(ejercicioActual.respuesta)}
        </strong></p>

        <p><strong>Procedimiento:</strong></p>

        ${ejercicioActual.pasosHTML}
    `;

} else {

    retro.textContent =
        "Respuesta: " +
        mostrarNumero(ejercicioActual.respuesta) +
        "\n\nProcedimiento:\n" +
        ejercicioActual.pasos;

}

}

// ==========================================
// INICIALIZAR BANCO DE EJERCICIOS
// ==========================================

function iniciarPracticas() {

    const lista =
        document.getElementById("listaEjemplos");

    if (!lista) return;

    generadoresPractica.forEach(
        function(generador, indice) {

            const boton =
                document.createElement("button");

            boton.type = "button";

            boton.className = "boton-ejemplo";

            boton.textContent =
                (indice + 1) + ". " +
                generador(true).tema;

            boton.addEventListener(
                "click",
                function() {
                    cargarEjemploPractica(indice);
                }
            );

            lista.appendChild(boton);

        }
    );

    cargarEjemploPractica(0);

}


// INICIAR AL CARGAR LA PAGINA

document.addEventListener(
    "DOMContentLoaded",
    iniciarPracticas
);
