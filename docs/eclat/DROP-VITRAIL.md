# ÉCLAT · Drop — VITRAIL

> Registro das decisões tomadas. Sem ficha técnica ainda — nada de produção nesta etapa.

**Correção de arquitetura (ver `NOMENCLATURA-E-ARQUITETURA.md`):** Vitrail não é mais coleção 002 — é **drop**: mesma peça de Lumière já existente, cor ou acabamento novo, sem molde novo e sem ocupar número de coleção. A coleção 002 chama-se **Nuance**, e sua primeira peça definida é **Eclipse**.

## O drop

*Vitrail* é vitral: uma única fonte de luz atravessando vidros coloridos, segurada por uma estrutura de linhas de chumbo. Lumière foi a luz; Vitrail é o que acontece quando ela encontra a cor.

**Escopo definido:**

- Mais opções de cor dos modelos fitness já desenvolvidos — famílias Canelado Grafite e Verde Exército e Licor

*(Os itens de molde novo que estavam listados aqui — os dois macaquinhos e a legging com cropped — migraram para o escopo da coleção Nuance. Ver `NOMENCLATURA-E-ARQUITETURA.md`.)*

---

## Conjunto ORVALHO — colorway poliamida bronze

Peça já existente da família Canelado Grafite (Lumière) — ver `fichas/referencia-familia-canelado-grafite.png`, prancha da estilista. Top com alças finas cruzadas em X na frente e escada nas costas, mais short de cintura alta com pala curva. Modelagem sem alteração.

**Pendência de classificação:** o escopo do drop fala em "cor nova" — aqui a mudança é de **tecido** (canelado ribbed → poliamida lisa), não só de cor, o que é uma categoria maior de mudança. Registrado aqui por ser a mesma família nomeada no escopo, mas cabe reconsiderar se troca de tecido também deveria contar como molde/coleção nova, mesma dúvida já registrada para o Macacão Cáustica.

| Elemento | Definição |
|---|---|
| Tecido | Poliamida lisa bronze/terracota — mesmo tecido e cor do Alvorada (Nuance, peça 002) |
| Costura, top frente | Estrutural tom sobre tom em relevo nos recortes princesa, sem contraste — Registro O Relevo. Elástico fino logo abaixo do busto fecha o top, tecido esticado (sem franzido) |
| Costura, top costas | Modelagem original em escada — duas alças retas sem cruzar, três travessas horizontais entre elas, sem recorte vazado |
| Costura, short frente | Costuras normais de construção (centro frente, laterais, cós) presentes mas **sem costura viva** — sem pesponto duplo ou relevo aparente |
| Costura, short costas | **Costura empina bumbum** — recorte em coração na pala, subindo e abraçando cada lado do glúteo, pesponto duplo bem marcado |
| Marca | Logotipo ÉCLAT no peito do top, tom sobre tom — posição igual à prancha original, cor adaptada ao tecido novo |

O short foge do Registro O Relevo do restante da peça — decisão explícita da usuária, não erro de geração. A costura empina bumbum nas costas do short é a resposta à pergunta "o que dá exclusividade à peça sem mudar a modelagem" — assinatura de construção, não de molde.

Proposta descartada: um recorte vazado pequeno nas costas do top, no espírito do Eclipse, com peça de metal gravada onde as alças se cruzam — a usuária preferiu manter a modelagem original e levar a assinatura para a costura do short em vez de alterar o corte.

### Material desenvolvido

- Render fotográfico frente do conjunto (top + short), modelo genérica — `fichas/orvalho-bronze-frente.png`
- Render fotográfico frente com o avatar Soul da própria usuária — top curto com elástico abaixo do busto (tecido esticado, sem franzido), short com costuras normais e sem costura viva, cabelo arrumado e maquiagem — `fichas/orvalho-bronze-frente-avatar.png`
- Render fotográfico costas com o mesmo avatar — modelagem original em escada, costura empina bumbum no short — `fichas/orvalho-bronze-costas-avatar.png`

### Nota técnica — geração com avatar próprio

O caminho `soul_2` (único que aceita o avatar treinado, `soul_id`) alterou a modelagem da peça em duas tentativas seguidas — as alças cruzadas em X viraram alças retas simples, e surgiu uma etiqueta inventada no short que não existe na peça. Resolvido usando `nano_banana_pro` (o caminho que preserva construção com fidelidade) com **duas imagens de referência simultâneas**: a primeira como molde exato da peça (não pode mudar nada da construção), a segunda como referência só de rosto/identidade (uma foto do avatar) — pedindo para trocar apenas o rosto, mantendo a peça. **Registrado como método padrão** sempre que for preciso combinar avatar próprio com fidelidade de peça — evita depender do `soul_id`, que não segura construção.

Rodadas de refinamento seguintes, todas com o mesmo método (peça aprovada como referência 1, foto de rosto como referência 2, pedido de alteração cirúrgica só no ponto indicado):

1. Nova foto de retrato do mesmo avatar via `soul_2` (enquadramento e expressão diferentes) para variar a referência de rosto; top reduzido a um bralette bem curto terminando na linha do busto.
2. Remoção da costura aparente do short (passou a ficar liso demais, sem nenhuma costura visível).
3. Elástico abaixo do busto adicionado ao top, com o pedido explícito de manter o tecido esticado — sem franzido/gathering, mesmo com o elástico; troca da foto de rosto por um retrato mais elegante do avatar (cabelo arrumado, maquiagem); reinclusão das costuras de construção do short (centro frente, laterais, cós) que tinham sumido por completo na rodada anterior — mantendo, porém, a ausência de costura viva/pesponto aparente pedida.
4. Toque final: o logotipo ÉCLAT desapareceu do peito numa das gerações — restaurado numa última passada cirúrgica sem alterar mais nada.

### Pendências

1. Resolver a classificação acima (drop vs. mudança de tecido que pede outra categoria).
2. Confirmar a cor bronze contra o cartão físico da Marazul (mesma pendência do Alvorada).

---

## Peça em revisão de arquitetura · MACACÃO CÁUSTICA

**Pendência:** esta peça tem molde próprio — não é cor nova de peça existente — então não se encaixa na definição de drop. Precisa ser reclassificada como peça da coleção **Nuance** (junto de Eclipse) ou confirmada como uma coleção à parte. Decisão do usuário, ainda em aberto. O desenvolvimento abaixo continua válido enquanto isso não é decidido.

*Cáustica* é o desenho que a luz forma ao atravessar uma superfície curva — o rastro no fundo de um copo d'água, a rede de luz no fundo de uma piscina. Uma linha que curva sobre um corpo.

### Construção

| Elemento | Definição |
|---|---|
| Silhueta | Macacão inteiro, sem mangas |
| Gola | Alta, arredondada, **sem fecho** |
| Cava | Alta, ombros e braços nus |
| Costas | Abertura oval grande, alças cruzadas nas escápulas |
| Cós | Faixa horizontal de 8 cm na cintura natural |
| Perna | Legging, colada, barra no tornozelo |
| Traçado | Costuras curvas da gola ao busto, do quadril à barra, contínuas |

### A decisão da gola

A nuca é o pior lugar possível numa peça de treino: é onde a barra apoia no agachamento, onde o colchonete pressiona no abdominal, e onde passa a alça de mochila ou colete. **Nenhum fecho ali.** A gola é faixa de malha fechada e a peça veste pela cabeça.

Ponto de controle: o decote precisa ter **circunferência mínima de 56 cm no estiramento**.

Se na prova de vestir a cabeça não passar confortável, a abertura vai para a **lateral esquerda** — zíper invisível nº 3, do meio da cava ao cós, cerca de 22 cm, com garagem no topo. Tecido mole, escondido pelo braço, não apoia em nada. **Nunca na nuca.**

---

## Os três colorways

| Nome | Significado | Tecido | Acabamento | Registro |
|---|---|---|---|---|
| **ALVA** | A primeira luz do dia | Off white | Costura aparente em caramelo | Costura Invertida |
| **PENUMBRA** | A sombra que ainda tem luz dentro | Capuccino | Costura aparente em off white | Costura Invertida |
| **BRASA** | O vermelho que guarda luz por dentro | Framboesa | Relevo tom sobre tom | O Relevo |

Os nomes descrevem **estados de luz**, não cores: Alva é luz nascendo, Penumbra é luz filtrada, Brasa é luz retida. A sequência deixa espaço para as próximas — Umbra, Halo, Zênite seguem livres. *(Eclipse já foi usado — é o macacão canelado da coleção Nuance.)*

### Regra de contraste descoberta nesta rodada

**O traço tem que ser mais claro que o tecido.** Linha clara sobre fundo médio ou escuro sempre vence linha escura sobre fundo claro. Vale para toda cor futura e economiza rodada de teste.

Foi o que separou a versão marsala com viés chocolate — em que o traço quase sumia — da framboesa com viés off white, em que ele se lê de longe.

### Alertas por colorway

- **Alva** é a mais difícil de produzir: off white claro em legging colada denuncia transparência, costura interna e roupa por baixo. Deve ser a última a entrar, depois que as outras validarem a modelagem.
- **Brasa** é a mais difícil de costurar bem: sem contraste, qualquer irregularidade no relevo aparece como defeito e não como desenho.
- **Penumbra** é a mais forte de costas — off white sobre marrom faz o X das alças e o nome saltarem.

---

## Aplicação da marca

**Monograma no cós da frente. Logotipo ÉCLAT no cós das costas.**

De frente quem lê a peça é a própria cliente, no espelho, e ali o monograma basta. De costas quem lê é a outra pessoa na sala — é onde o nome trabalha.

As duas marcas acompanham a cor de cada peça: caramelo na Alva, off white na Penumbra, tom sobre tom na Brasa.

---

## Versões descartadas

Sete variações foram geradas antes de fechar em três. Registro para não refazer:

| Versão | Por que caiu |
|---|---|
| Flare com viés chocolate | Bonita, mas o flare esconde o traçado do joelho para baixo |
| Off white com viés chocolate | Sobrepõe a Alva sem acrescentar |
| Marrom claro com costura off white | Fica no meio do caminho entre Alva e Penumbra |
| Marsala com viés chocolate | Contraste insuficiente — o traço some de longe |

A versão **flare** não está morta: ela é a silhueta de campanha, e o viés é o acabamento que ela sustenta melhor. Fica para decisão à parte.

---

## Pendências

1. Confirmar a cor da Brasa contra o cartão físico da Marazul — Bronze e Capuccino lado a lado, sob luz de dia, com a linha na mão.
2. Decidir a reclassificação do Macacão Cáustica (ver nota de arquitetura acima).

*(Pendências de molde novo — segundo macaquinho, legging com cropped, primeira família Pace — moveram para `NOMENCLATURA-E-ARQUITETURA.md`, escopo da coleção Nuance.)*
