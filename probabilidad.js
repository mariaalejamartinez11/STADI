// STADI - MODULO 4
// PROBABILIDAD

// LEER Y VALIDAR NUMEROS

function entradaProb(id) {

    const texto = document.getElementById(id).value.trim();

    if (texto === "") {
        throw new Error("Completa todos los campos necesarios.");
    }

    const numero = Number(texto);

    if (!Number.isFinite(numero)) {
        throw new Error("Ingresa valores numéricos válidos.");
    }

    return numero;
}


// MOSTRAR ERRORES

function escribirErrorProb(id, mensaje) {

    const salida = document.getElementById(id);

    salida.hidden = false;
    salida.innerHTML = "";

    const aviso = document.createElement("p");

    aviso.className = "mensaje-error";
    aviso.textContent = "⚠️ " + mensaje;

    salida.appendChild(aviso);
}


// FORMATO DE NUMEROS

function numeroProb(numero) {

    return Number(numero.toFixed(4)).toString();

}


function porcentajeProb(probabilidad) {

    return (probabilidad * 100).toFixed(4) + "%";

}


// ==========================================
// 1. PROBABILIDAD BASICA
// ==========================================

function mostrarProbBasica() {

    const salida =
        document.getElementById("resultadoProbBasica");

    try {

        const favorables = entradaProb("casosFavorables");
        const posibles = entradaProb("casosPosibles");

        if (!Number.isSafeInteger(favorables) ||
            !Number.isSafeInteger(posibles)) {

            throw new Error(
                "Los casos deben ser números enteros."
            );

        }

        if (posibles <= 0 ||
            favorables < 0 ||
            favorables > posibles) {

            throw new Error(
                "El total debe ser mayor que cero y los favorables deben estar entre 0 y el total."
            );

        }

        const p = favorables / posibles;

        salida.hidden = false;

        salida.innerHTML = `

            <h4> Probabilidad básica</h4>

            <p><strong>Fórmula:</strong></p>

            <div class="formula">
                P(A) = ${fraccionEstadi("Casos favorables", "Casos posibles")}
            </div>

            <p><strong>Sustitución:</strong></p>

            <div class="formula">
                P(A) = ${fraccionEstadi(favorables, posibles)}
            </div>

            <div class="respuesta-final">
                P(A) = ${p.toFixed(6)}
                = ${porcentajeProb(p)}
            </div>

            <p>
                <strong>Interpretación:</strong>
                Si los ${posibles} resultados
                son igualmente probables,
                la probabilidad del evento es
                ${porcentajeProb(p)}.
            </p>

        `;

    } catch (error) {

        escribirErrorProb(
            "resultadoProbBasica",
            error.message
        );

    }

}


// ==========================================
// 2. DISTRIBUCION NORMAL
// ==========================================

// APROXIMACION DE LA DISTRIBUCION NORMAL
// ERROR ABSOLUTO APROXIMADO MENOR A 0.0000001

function acumuladaNormal(z) {

    if (z === 0) return 0.5;

    const a = Math.abs(z);

    const t = 1 / (1 + 0.2316419 * a);

    const polinomio =
        t * (0.319381530 + t * (-0.356563782
        + t * (1.781477937
        + t * (-1.821255978
        + t * 1.330274429))));

    const positiva =
        1 - Math.exp(-a * a / 2) /
        Math.sqrt(2 * Math.PI) * polinomio;

    return Math.min(
        1,
        Math.max(
            0,
            z > 0 ? positiva : 1 - positiva
        )
    );

}


// MOSTRAR CAMPO PARA SEGUNDO LIMITE

function actualizarCamposNormal() {

    const entre =
        document.getElementById("tipoProbNormal").value
        === "entre";

    document.getElementById(
        "campoNormalSegundo"
    ).hidden = !entre;

}


// CALCULAR DISTRIBUCION NORMAL

function mostrarProbNormal() {

    const salida =
        document.getElementById("resultadoProbNormal");

    try {

        const mu = entradaProb("mediaNormal");
        const sigma = entradaProb("desviacionNormal");
        const x = entradaProb("valorNormal");

        const tipo =
            document.getElementById("tipoProbNormal").value;

        if (sigma <= 0) {

            throw new Error(
                "La desviación estándar debe ser mayor que cero."
            );

        }

        const z = (x - mu) / sigma;

        if (!Number.isFinite(z)) {

            throw new Error(
                "Los valores son demasiado grandes."
            );

        }

        let desarrollo = `

            <p>
                <strong>Fórmula de estandarización:</strong>
            </p>

            <div class="formula">
    z = ${fraccionEstadi("X - μ", "σ")}
        </div>

        <p><strong>1. Sustitución de valores:</strong></p>

<div class="formula">
    z = ${fraccionEstadi(
        numeroProb(x) + " - " + numeroProb(mu),
        numeroProb(sigma)
        )}
        </div>

<p><strong>2. Desarrollo de la operación:</strong></p>

<div class="formula">
    z = ${fraccionEstadi(
        numeroProb(x - mu),
        numeroProb(sigma)
    )}
</div>

<p><strong>3. Resultado de estandarización:</strong></p>

<div class="formula">
    z = ${numeroProb(z)}
</div>

        `;

        let p;
        let evento;

        // PROBABILIDAD MENOR

        if (tipo === "menor") {

            p = acumuladaNormal(z);

            evento = "P(X ≤ " + numeroProb(x) + ")";

            desarrollo += `
    <p><strong>4. Fórmula de probabilidad:</strong></p>

    <div class="formula">
        P(X ≤ x) = Φ(z)
    </div>

    <p><strong>5. Sustitución de valores:</strong></p>

    <div class="formula">
        P(X ≤ ${numeroProb(x)}) = Φ(${numeroProb(z)})
    </div>
`;

        }

        // PROBABILIDAD MAYOR

        else if (tipo === "mayor") {

            p = 1 - acumuladaNormal(z);

            evento = "P(X ≥ " + numeroProb(x) + ")";

            desarrollo += `
    <p><strong>4. Fórmula de probabilidad mayor:</strong></p>

    <div class="formula">
        P(X ≥ x) = 1 − Φ(z)
    </div>

    <p><strong>5. Sustitución de valores:</strong></p>

    <div class="formula">
        P(X ≥ ${numeroProb(x)}) = 1 − Φ(${numeroProb(z)})
    </div>

    <p><strong>6. Desarrollo de la operación:</strong></p>

    <div class="formula">
        P(X ≥ ${numeroProb(x)}) =
        1 − ${acumuladaNormal(z).toFixed(6)}
    </div>
`;

        }

        // PROBABILIDAD ENTRE DOS VALORES

        else if (tipo === "entre") {

            const y = entradaProb("valorNormalSegundo");

            if (y < x) {

                throw new Error(
                    "El límite superior debe ser mayor o igual al inferior."
                );

            }

            const zy = (y - mu) / sigma;

            if (!Number.isFinite(zy)) {

                throw new Error(
                    "Los valores son demasiado grandes."
                );

            }

            p = acumuladaNormal(zy) - acumuladaNormal(z);

            evento = "P(" + numeroProb(x) +
         " ≤ X ≤ " + numeroProb(y) + ")";
            desarrollo += `
    <p><strong>4. Estandarización del límite superior:</strong></p>

    <div class="formula">
        z₂ =
        <span style="display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle;">
            <span style="border-bottom:2px solid currentColor; padding:0 8px;">
                ${numeroProb(y)} − ${numeroProb(mu)}
            </span>
            <span style="padding-top:3px;">
                ${numeroProb(sigma)}
            </span>
        </span>
        = ${numeroProb(zy)}
    </div>

    <p><strong>5. Fórmula de probabilidad entre dos valores:</strong></p>

    <div class="formula">
        P(a ≤ X ≤ b) = Φ(z₂) − Φ(z₁)
    </div>

    <p><strong>6. Sustitución de valores:</strong></p>

    <div class="formula">
        P(${numeroProb(x)} ≤ X ≤ ${numeroProb(y)})
        = Φ(${numeroProb(zy)}) − Φ(${numeroProb(z)})
    </div>

    <p><strong>7. Valores de probabilidad acumulada:</strong></p>

    <div class="formula">
        Φ(${numeroProb(zy)}) =
        ${acumuladaNormal(zy).toFixed(6)}

        <br><br>

        Φ(${numeroProb(z)}) =
        ${acumuladaNormal(z).toFixed(6)}
    </div>

    <p><strong>8. Desarrollo de la operación:</strong></p>

    <div class="formula">
        P(${numeroProb(x)} ≤ X ≤ ${numeroProb(y)})
        =
        ${acumuladaNormal(zy).toFixed(6)}
        −
        ${acumuladaNormal(z).toFixed(6)}
    </div>
`;

        }

        else {

            throw new Error(
                "Selecciona un tipo de probabilidad válido."
            );

        }

        p = Math.min(1, Math.max(0, p));

        salida.hidden = false;

        salida.innerHTML = `

            <h4> Distribución normal</h4>

            <p>
                <strong>Media:</strong>
                ${numeroProb(mu)}
            </p>

            <p>
                <strong>Desviación estándar:</strong>
                ${numeroProb(sigma)}
            </p>

            ${desarrollo}

            <div class="respuesta-final">
                ${evento} ≈ ${p.toFixed(6)}
                (${porcentajeProb(p)})
            </div>

            <p>
                <strong>Interpretación:</strong>
                El área correspondiente bajo
                la curva normal equivale
                aproximadamente al
                ${porcentajeProb(p)}.
            </p>

            <p>
                <em>
                    Resultado aproximado calculado
                    con la distribución normal.
                </em>
            </p>

        `;

    } catch (error) {

        escribirErrorProb(
            "resultadoProbNormal",
            error.message
        );

    }

}


// ==========================================
// 3. COMBINACIONES Y PERMUTACIONES
// ==========================================

function mostrarProbConteo() {

    const salida =
        document.getElementById("resultadoProbConteo");

    try {

        const n = entradaProb("conteoN");
        const r = entradaProb("conteoR");

        const tipo =
            document.getElementById("tipoConteo").value;

        if (!Number.isInteger(n) ||
            !Number.isInteger(r) ||
            n < 0 ||
            r < 0 ||
            r > n ||
            n > 100) {

            throw new Error(
                "Ingresa enteros con 0 ≤ r ≤ n ≤ 100."
            );

        }

        if (tipo !== "combinacion" &&
            tipo !== "permutacion") {

            throw new Error(
                "Selecciona una operación válida."
            );

        }

        let resultado = 1n;

        // COMBINACIONES

        if (tipo === "combinacion") {

            const k = Math.min(r, n - r);

            for (let i = 1; i <= k; i++) {

                resultado =
                    resultado * BigInt(n - k + i)
                    / BigInt(i);

            }

        }

        // PERMUTACIONES

        else {

            for (let i = 0; i < r; i++) {

                resultado *= BigInt(n - i);

            }

        }

        const combinacion =
            tipo === "combinacion";

       const formula = combinacion
    ? "C(n,r) = " +
      fraccionEstadi(
          "n!",
          "r!(n-r)!"
      )
    : "P(n,r) = " +
      fraccionEstadi(
          "n!",
          "(n-r)!"
      );

const sustitucion = combinacion
    ? "C(" + n + "," + r + ") = " +
      fraccionEstadi(
          n + "!",
          r + "!(" + n + "-" + r + ")!"
      )
    : "P(" + n + "," + r + ") = " +
      fraccionEstadi(
          n + "!",
          "(" + n + "-" + r + ")!"
      );

      const factorialDetalle = (numero) => {
    let total = 1n;

    for (let i = 2; i <= numero; i++) {
        total *= BigInt(i);
    }

    return total;
};

const factorialN = factorialDetalle(n);
const factorialR = factorialDetalle(r);
const factorialRestante = factorialDetalle(n - r);

const denominador = combinacion
    ? factorialR * factorialRestante
    : factorialRestante;

const nombreOperacion = combinacion
    ? "C(" + n + "," + r + ") = "
    : "P(" + n + "," + r + ") = ";

const desarrollo = nombreOperacion +
    fraccionEstadi(
        factorialN.toString(),
        combinacion
            ? factorialR.toString() + " × " +
              factorialRestante.toString()
            : factorialRestante.toString()
    );

const simplificacion = nombreOperacion +
    fraccionEstadi(
        factorialN.toString(),
        denominador.toString()
    );

        salida.hidden = false;

        salida.innerHTML = `

            <h4>
                 ${combinacion
                    ? "Combinaciones"
                    : "Permutaciones"}
            </h4>

            <p>
                <strong>Datos:</strong>
                n = ${n}, r = ${r}
            </p>

            <p><strong>Fórmula:</strong></p>

            <div class="formula">
                ${formula}
            </div>

            <p><strong>Sustitución:</strong></p>

            <div class="formula">
                ${sustitucion}
            </div>

            <p><strong>Desarrollo de factoriales:</strong></p>

            <div class="formula">
                ${desarrollo}
            </div>

            <p><strong>Simplificación:</strong></p>

            <div class="formula">
                ${simplificacion}
            </div>

            <div class="respuesta-final">
                Resultado exacto:
                ${resultado.toString()}
            </div>

            <p>
                ${combinacion
                    ? "El orden no importa."
                    : "El orden sí importa."}
            </p>

        `;

    } catch (error) {

        escribirErrorProb(
            "resultadoProbConteo",
            error.message
        );

    }

}