# Newton-Raphson Visual: encontre raízes com gráficos interativos

Uma calculadora web que aplica o método de Newton-Raphson com visualizações em tempo real. Digite a função, escolha um chute inicial e veja, passo a passo, como a aproximação converge — com gráficos Plotly, tabela de iterações e exemplos rápidos para começar.

## ✨ Funcionalidades
- **Entrada livre de funções**: use notação com `x`, potências (`**`), trigonometria, exponenciais e logaritmos.
- **Iterações detalhadas**: tabela exibe `xₙ`, `f(xₙ)`, `f'(xₙ)` e erro de cada passo.
- **Dois gráficos sincronizados**: curva da função com marcação da raiz estimada e gráfico de convergência em escala logarítmica.
- **Exemplos rápidos**: botões preenchem função e chute inicial para testar em um clique.
- **Feedback imediato**: validação básica e mensagens de erro quando a derivada se aproxima de zero.

## 🛠️ Tech stack e arquitetura
| Camada | Tecnologia | Propósito |
| :-- | :-- | :-- |
| **UI** | HTML5 + Bootstrap 5 | Estrutura responsiva e componentes básicos |
| **Estilo** | CSS custom com gradientes | Visual futurista e cartões de resultado |
| **Gráficos** | Plotly.js | Renderização do gráfico da função e do erro |
| **Lógica** | JavaScript vanilla | Implementação do Newton-Raphson e parsing da função |

Arquitetura simples em página única (SPA mínima): HTML organiza layout, CSS cria tema vítreo, JS calcula, preenche tabela e chama Plotly para os gráficos.

## 🚀 Uso rápido
- Versão online: https://nelsolaa.github.io/Calculo-de-Integral/
- Local: abra `index.html` no navegador (ou sirva com qualquer static server).

## ▶️ Passo a passo
1) Informe a função em `x` (ex.: `x**3 - 2`).
2) Defina chute inicial, tolerância e máximo de iterações.
3) Clique em **Calcular** para ver raiz aproximada, tabela e gráficos.
4) Use os botões de exemplos se quiser testar sem digitar.

## 📌 Detalhes do método
- Derivada numérica por diferença progressiva com passo `h = 1e-5`.
- Critério de parada: erro absoluto entre iterações `|xₙ - xₙ₋₁| <= tolerância` ou limite de iterações.
- Proteção básica contra derivada próxima de zero para evitar divisão instável.

## 📂 Estrutura do projeto
- `index.html` — layout, formulários e contêineres dos gráficos.
- `style.css` — tema em gradiente, cartões de resultados e responsividade.
- `script.js` — parsing da função, Newton-Raphson, tabela de iterações e chamadas ao Plotly.

## 🔧 Desenvolvimento local (opcional)
```bash
git clone https://github.com/Nelsolaa/Calculo-de-Integral.git
cd Calculo-de-Integral
# Abra index.html no navegador ou sirva com: python -m http.server 8000
```

---
Feito por Nelson Prado.