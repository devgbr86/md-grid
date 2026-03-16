# tesseract

O tesseract é um visualizador interativo de politopos 4D renderizado diretamente no navegador. O projeto projeta e anima um hipercubo quadridimensional em uma tela tridimensional, permitindo visualizar as rotações características de um objeto que existe em quatro dimensões espaciais.

Todo o processamento acontece no lado do cliente. Nenhum dado é enviado a servidores.

Acesso: https://devgbr86.github.io/tesseract/

---

## O que é um tesseract

Um tesseract, também chamado de hipercubo 4D, é a extensão lógica do cubo para a quarta dimensão espacial. Assim como um cubo é formado por seis faces quadradas, um tesseract é formado por oito células cúbicas. Ele possui 16 vertices, 32 arestas, 24 faces quadradas e 8 faces cúbicas.

Como seres tridimensionais, não é possível perceber a quarta dimensão diretamente. O que o visualizador faz é realizar uma projeção do objeto 4D para o espaço 3D, de forma semelhante ao que acontece quando uma sombra tridimensional de um cubo é projetada em uma superfície plana bidimensional. O resultado é uma representação aproximada que permite observar a estrutura e o comportamento rotacional do objeto.

---

## O que o projeto faz

O visualizador renderiza o tesseract em tempo real e aplica rotações simultâneas nos seis planos de rotação disponíveis em quatro dimensões. Em três dimensões, um objeto só pode girar em três planos (XY, XZ, YZ). Em quatro dimensões, existem seis planos de rotação possíveis: XY, XZ, XW, YZ, YW e ZW, onde W representa o eixo da quarta dimensão.

A interface exibe o nome do politopo, o número de vertices e arestas, e os planos de rotação ativos. O objeto gira continuamente, revelando a estrutura interna do hipercubo através da projeção.

---

## Como funciona

O pipeline de renderização segue quatro etapas:

**1. Definição da geometria 4D**
Os 16 vertices do tesseract são definidos como coordenadas em quatro dimensoes (x, y, z, w), onde cada componente assume o valor -1 ou +1. As 32 arestas são definidas como pares de vertices que diferem em exatamente uma coordenada, o que corresponde a uma aresta do hipercubo.

**2. Rotação em 4D**
A cada quadro de animação, matrizes de rotação 4D são aplicadas às coordenadas dos vertices. Cada matriz de rotação 4D atua sobre um plano especifico (por exemplo, a rotação no plano XW afeta os eixos X e W enquanto mantém Y e Z inalterados). As rotações XY, XW, YZ e ZW são aplicadas simultaneamente, produzindo o movimento complexo característico do tesseract em rotação.

**3. Projeção de 4D para 3D**
Após a rotação, cada vertice 4D é projetado para o espaço 3D por meio de uma projeção em perspectiva. A coordenada W do vertice determina o fator de escala da projeção: vertices com W maior parecem mais próximos e vertices com W menor parecem mais distantes, criando o efeito de profundidade na quarta dimensão.

**4. Renderização com Three.js**
As coordenadas 3D resultantes são passadas para o Three.js, que as renderiza em uma cena com câmera em perspectiva. As arestas são desenhadas como segmentos de linha conectando os vertices projetados. O Three.js também gerencia o loop de animação, o redimensionamento do canvas e a renderização WebGL.

---

## Tecnologias utilizadas

O projeto é construído com HTML, CSS e JavaScript, usando Three.js como biblioteca de renderização.

- **Three.js** gerencia a cena 3D, a câmera, o renderer WebGL e o loop de animação. É responsável por toda a parte de renderização visual.
- **WebGL** é a API do navegador que permite renderização acelerada por hardware via Three.js, possibilitando animações fluidas em tempo real.
- **Matemática de rotação 4D** é implementada diretamente em JavaScript, sem bibliotecas auxiliares. As matrizes de rotação para cada plano são calculadas e aplicadas manualmente a cada quadro.
- **Projeção em perspectiva 4D para 3D** é calculada via divisão pela coordenada W, analogamente à projeção perspectiva convencional de 3D para 2D.

---

## Estrutura do projeto

```
tesseract/
├── index.html        — marcação e estrutura da aplicação
├── main.css          — estilos visuais da interface
├── main.js           — toda a lógica: geometria 4D, rotações, projeção e renderização
├── assets/icons/     — ícones utilizados na interface
├── robots.txt        — regras de rastreamento para mecanismos de busca
└── sitemap.xml       — mapa do site para indexação
```

Todo o código relevante está concentrado em `main.js`, que implementa desde a definição da geometria do hipercubo até o loop de animação com Three.js.

---

## Conceitos matematicos envolvidos

**Rotação em N dimensoes**
Em N dimensoes, rotações ocorrem em planos bidimensionais, não em torno de eixos. Em 3D, girar em torno do eixo Z equivale a girar no plano XY. Em 4D, há seis planos de rotação independentes: XY, XZ, XW, YZ, YW e ZW. Uma rotação no plano XW, por exemplo, é descrita pela matriz:

```
x' =  x * cos(θ) + w * sin(θ)
w' = -x * sin(θ) + w * cos(θ)
y' = y
z' = z
```

**Projeção perspectiva 4D para 3D**
A projeção de um ponto (x, y, z, w) para o espaço 3D é feita dividindo as coordenadas x, y, z por um fator derivado de W:

```
fator = distancia / (distancia - w)
x3D = x * fator
y3D = y * fator
z3D = z * fator
```

Esse calculo é equivalente ao que a câmera faz ao projetar o espaço 3D em uma tela 2D, mas aplicado uma dimensão acima.

---

## Contexto

O tesseract é um projeto de visualização matematica desenvolvido por Guilherme Ribeiro (devgbr86). Ele está arquivado e documentado dentro do md-grid, repositório pessoal que centraliza projetos e referências técnicas.

O projeto demonstra como conceitos de algebra linear e geometria de dimensões superiores podem ser implementados e visualizados no navegador usando JavaScript e Three.js, tornando um objeto matematico abstrato algo observavel e interativo.

Fonte: https://github.com/devgbr86/tesseract