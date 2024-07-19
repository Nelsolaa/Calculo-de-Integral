document.getElementById("button").addEventListener("click", function() {
    // Captura os valores dos campos de entrada
    let inputValueA = document.getElementById("valordeA").value;
    let inputValueB = document.getElementById("valordeB").value;
    let inputValueN = document.getElementById("valordeN").value;
    let inputValueFuncao = document.getElementById("funcao").value;

    // Declaração das variáveis fora dos blocos if
    let a, b, n, funcao;

    // Verifica se os valores não estão vazios e converte para número
    if (inputValueA !== "") {
        a = parseFloat(inputValueA);
    }
    if (inputValueB !== "") {
        b = parseFloat(inputValueB);
    }
    if (inputValueN !== "") {
        n = parseInt(inputValueN, 10);
    }
    if (inputValueFuncao !== "") {
        funcao = inputValueFuncao; // A função será uma string
    }

    // Calculo do passo h
    let h = (b - a) / n;

    // Função de integração
    function f(x) {
        return eval(funcao); // Avalia a string como código JavaScript
    }

    // Valores de x para somas inferiores
    let xI = [];
    for (let i = 0; i < n; i++) {
        xI.push(a + i * h);
    }

    // Valores de x para somas superiores
    let xS = [];
    for (let i = 1; i <= n; i++) {
        xS.push(a + i * h);
    }

    // Valores de x para pontos médios
    let xm = [];
    for (let i = 0; i < n; i++) {
        xm.push(a + (i + 0.5) * h);
    }

    // Aproximação Por Somas de Riemann Inferiores
    let INInferiores = h * xI.reduce((acc, xi) => acc + f(xi), 0);
    // Aproximação Por Somas de Riemann Superiores
    let INSuperiores = h * xS.reduce((acc, xi) => acc + f(xi), 0);
    // Aproximação Pela Regra dos Pontos Médios
    let INPontosMedios = h * xm.reduce((acc, xi) => acc + f(xi), 0);
    
    alert("Resultado Por Somas Inferiores: " + INInferiores +
        "\nResultado Por Somas Superiores: " + INSuperiores +
        "\nResultado Por Pontos Médios: " + INPontosMedios);
    
});
