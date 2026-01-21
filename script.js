// Biblioteca de funções matemáticas
const mathFunctions = {
    'sin': Math.sin,
    'cos': Math.cos,
    'tan': Math.tan,
    'sqrt': Math.sqrt,
    'exp': Math.exp,
    'log': Math.log,
    'log10': Math.log10,
    'abs': Math.abs,
    'PI': Math.PI,
    'E': Math.E
};

// Parsear e avaliar expressão
function evaluateFunction(expr, xValue) {
    try {
        // Converter notações comuns
        let sanitized = expr
            .replace(/\^/g, '**')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/exp\(/g, 'Math.exp(')
            .replace(/log\(/g, 'Math.log(')
            .replace(/log10\(/g, 'Math.log10(')
            .replace(/abs\(/g, 'Math.abs(');
        
        // Usar Function com x como parâmetro
        const func = new Function('x', 'const Math = window.Math; return (' + sanitized + ')');
        return func(xValue);
    } catch (e) {
        throw new Error('Erro ao processar função: ' + e.message);
    }
}

// Calcular derivada numérica
function derivative(func, x, h = 0.00001) {
    return (func(x + h) - func(x)) / h;
}

// Método Newton-Raphson
function newtonRaphson(funcaoStr, x0, tol, maxIter) {
    const funcao = (x) => evaluateFunction(funcaoStr, x);
    const iteracoes = [];
    
    let xn = x0;
    let i = 0;
    
    while (i < maxIter) {
        const fx = funcao(xn);
        const fpx = derivative(funcao, xn);
        
        if (Math.abs(fpx) < 1e-10) {
            throw new Error('Derivada próxima de zero - não é possível continuar');
        }
        
        const xnAnterior = xn;
        xn = xn - (fx / fpx);
        const erro = Math.abs(xn - xnAnterior);
        
        iteracoes.push({
            numero: i + 1,
            x: xnAnterior,
            fx: fx,
            fpx: fpx,
            erro: erro
        });
        
        i++;
        
        if (erro <= tol) {
            break;
        }
    }
    
    return {
        raiz: xn,
        iteracoes: iteracoes,
        numIteracoes: i
    };
}

// Gerar pontos para gráfico da função
function gerarPontosFuncao(funcaoStr, xMin, xMax, pontos = 200) {
    const xs = [];
    const ys = [];
    const step = (xMax - xMin) / pontos;
    
    for (let x = xMin; x <= xMax; x += step) {
        try {
            const y = evaluateFunction(funcaoStr, x);
            if (isFinite(y) && Math.abs(y) < 1e6) {
                xs.push(x);
                ys.push(y);
            }
        } catch (e) {
            // Pular ponto problemático
        }
    }
    
    return { xs, ys };
}

// Plotar função
function plotarFuncao(funcaoStr, raiz, xMin, xMax) {
    try {
        const { xs, ys } = gerarPontosFuncao(funcaoStr, xMin, xMax);
        
        const trace1 = {
            x: xs,
            y: ys,
            type: 'scatter',
            mode: 'lines',
            name: 'f(x)',
            line: {
                color: '#667eea',
                width: 3,
                shape: 'spline'
            }
        };
        
        const trace2 = {
            x: [raiz],
            y: [0],
            type: 'scatter',
            mode: 'markers',
            name: 'Raiz',
            marker: {
                size: 12,
                color: '#ff6b6b',
                symbol: 'star',
                line: {
                    color: '#fff',
                    width: 2
                }
            }
        };
        
        const trace3 = {
            x: [xMin, xMax],
            y: [0, 0],
            type: 'scatter',
            mode: 'lines',
            name: 'y=0',
            line: {
                color: 'rgba(255, 255, 255, 0.2)',
                width: 1,
                dash: 'dash'
            }
        };
        
        const layout = {
            title: {
                text: 'Gráfico da Função',
                font: { color: '#fff', size: 16 }
            },
            xaxis: {
                title: 'x',
                gridcolor: 'rgba(255, 255, 255, 0.1)',
                zerolinecolor: 'rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.7)'
            },
            yaxis: {
                title: 'f(x)',
                gridcolor: 'rgba(255, 255, 255, 0.1)',
                zerolinecolor: 'rgba(255, 255, 255, 0.2)',
                color: 'rgba(255, 255, 255, 0.7)'
            },
            plot_bgcolor: 'rgba(0, 0, 0, 0.2)',            
            paper_bgcolor: 'rgba(0, 0, 0, 0)',
            hovermode: 'closest',
            margin: { l: 50, r: 50, t: 50, b: 50 },
            font: { family: 'Segoe UI, Verdana, sans-serif', color: '#fff' },
            showlegend: true,
            legend: {
                bgcolor: 'rgba(0, 0, 0, 0.3)',
                bordercolor: 'rgba(255, 255, 255, 0.2)',
                borderwidth: 1
            }
        };
        
        Plotly.newPlot('graficoFuncao', [trace1, trace3, trace2], layout, { responsive: true });
    } catch (e) {
        console.error('Erro ao plotar função:', e);
        document.getElementById('graficoFuncao').innerHTML = '<p style="color: #ff6b6b; padding: 20px;">Erro ao gerar gráfico</p>';
    }
}

// Plotar convergência
function plotarConvergencia(iteracoes) {
    const iterNums = iteracoes.map(it => it.numero);
    const erros = iteracoes.map(it => Math.max(it.erro, 1e-10));
    
    const trace = {
        x: iterNums,
        y: erros,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Erro',
        line: {
            color: '#51cf66',
            width: 3,
            shape: 'linear'
        },
        marker: {
            size: 7,
            color: '#51cf66',
            symbol: 'circle',
            line: {
                color: '#fff',
                width: 1
            }
        }
    };
    
    const layout = {
        title: {
            text: 'Convergência (Escala Log)',
            font: { color: '#fff', size: 16 }
        },
        xaxis: {
            title: 'Iteração',
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.7)'
        },
        yaxis: {
            title: 'Erro (log)',
            type: 'log',
            gridcolor: 'rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.7)'
        },
        plot_bgcolor: 'rgba(0, 0, 0, 0.2)',
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        hovermode: 'closest',
        margin: { l: 50, r: 50, t: 50, b: 50 },
        font: { family: 'Segoe UI, Verdana, sans-serif', color: '#fff' },
        showlegend: false
    };
    
    Plotly.newPlot('graficoConvergencia', [trace], layout, { responsive: true });
}

// Preencher tabela
function preencherTabela(iteracoes) {
    const tbody = document.getElementById('tabelaIteracoes');
    tbody.innerHTML = '';
    
    iteracoes.forEach(it => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${it.numero}</td>
            <td>${it.x.toFixed(6)}</td>
            <td>${it.fx.toFixed(8)}</td>
            <td>${it.fpx.toFixed(6)}</td>
            <td>${it.erro.toExponential(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Event Listeners
document.getElementById('mainForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const funcaoStr = document.getElementById('funcao').value.trim();
    const x0 = parseFloat(document.getElementById('valordeX0').value);
    const tol = parseFloat(document.getElementById('valordeTol').value);
    const maxIter = parseInt(document.getElementById('valorDeInteracoes').value);
    
    if (!funcaoStr) {
        alert('Por favor, informe a função');
        return;
    }
    
    if (isNaN(x0)) {
        alert('Por favor, informe um valor válido para x0');
        return;
    }
    
    if (isNaN(tol) || tol <= 0) {
        alert('Por favor, informe uma tolerância válida');
        return;
    }
    
    if (isNaN(maxIter) || maxIter <= 0) {
        alert('Por favor, informe um número válido de iterações');
        return;
    }
    
    try {
        // Calcular
        const resultado = newtonRaphson(funcaoStr, x0, tol, maxIter);
        
        // Atualizar resultados
        document.getElementById('placeholder').style.display = 'none';
        document.getElementById('resultados').style.display = 'block';
        
        document.getElementById('raizValor').textContent = resultado.raiz.toFixed(8);
        document.getElementById('iteracoesValor').textContent = resultado.numIteracoes;
        
        const erroFinal = resultado.iteracoes[resultado.iteracoes.length - 1]?.erro || 0;
        document.getElementById('erroValor').textContent = erroFinal.toExponential(2);
        
        // Preencher tabela
        preencherTabela(resultado.iteracoes);
        
        // Plotar gráficos
        const xMin = Math.min(x0, resultado.raiz) - Math.abs(x0) * 0.5;
        const xMax = Math.max(x0, resultado.raiz) + Math.abs(x0) * 0.5;
        
        plotarFuncao(funcaoStr, resultado.raiz, xMin, xMax);
        plotarConvergencia(resultado.iteracoes);
        
    } catch (error) {
        alert('Erro: ' + error.message);
        document.getElementById('placeholder').style.display = 'flex';
        document.getElementById('resultados').style.display = 'none';
    }
});

// Exemplos rápidos
document.querySelectorAll('.example-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const funcao = this.dataset.func;
        const x0 = this.dataset.x0;
        
        document.getElementById('funcao').value = funcao;
        document.getElementById('valordeX0').value = x0;
        
        // Trigger submit
        document.getElementById('mainForm').dispatchEvent(new Event('submit'));
    });
});