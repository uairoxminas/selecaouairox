# ÉCLAT · Ativos digitais

> Registro de identificadores que não podem se perder entre sessões. Sem eles, os ativos têm que ser refeitos do zero.

---

## Avatar da marca (Soul)

| Campo | Valor |
|---|---|
| Nome | ECLAT Avatar Oficial |
| `soul_id` | `df6eea7a-16e8-478c-93ac-a34c76469eec` |
| Plataforma | Higgsfield |
| Tipo | `soul_2` |
| Treinado com | 14 fotos, enviadas em 05/08/2026 |
| Status na criação | training |

**Como usar:** gerar imagem com `model: soul_2` mais o `soul_id` acima.

**Restrição conhecida:** o Soul funciona apenas com `soul_2` e `soul_cinema_studio`. Não funciona com `nano_banana_pro` — que é o modelo usado para gerar uma vista a partir de outra mantendo a mesma peça. Quando as duas coisas forem necessárias na mesma imagem, é preciso escolher: fidelidade de corpo ou consistência de peça entre frente e costas.

**O que o avatar não faz:** não é simulação de caimento. Serve para proporção e imagem de campanha. Onde a peça vai repuxar continua sendo respondido pela simulação 3D a partir do molde, ou pela peça-piloto vestida.

**Pendência — refinar o rosto.** A v1 acerta corpo e proporção, mas o rosto ainda precisa de ajuste. A correção é retreinar com o mesmo conjunto mais 4 a 6 fotos de rosto em primeiro plano: luz frontal uniforme, expressão neutra, cabelo afastado do rosto, sem filtro e sem óculos, variando o ângulo entre frontal, perfil e três-quartos. O retreino gera um `soul_id` novo — o antigo continua válido até a troca.

---

## Regras de trabalho

- **Uma imagem frontal por pedido.** Não gerar variações, costas ou ângulos extras sem pedido explícito.

- **Nunca alterar a peça sem pedido.** Cor, acabamento e comprimento mudam quando pedido; construção, não.

- **Os dois caminhos de geração se excluem — e a escolha muda a peça.**

  | Caminho | Preserva a peça | Aceita o avatar |
  |---|---|---|
  | A partir da imagem de referência | **Sim** | Não |
  | A partir de texto | Não | **Sim** |

  A modelagem de costas do Macacão Cáustica — gola com fecho na nuca, painéis largos, alça atravessando a abertura na diagonal — **não se reconstrói a partir de texto.** Já derivou duas vezes quando gerada assim.

  Regra: **peça definida se gera a partir da referência.** O avatar serve para julgar proporção e comprimento de peça nova, não para catálogo de peça já aprovada. Trocar de caminho é decisão do usuário, e precisa ser avisada antes, não depois.

- **Mesmo gerando a partir da referência certa, detalhe fino de construção pode derivar quando a instrução acumula muita mudança de uma vez.** No Eclipse (halter fino, faixa de nuca estreita), pedir fazenda + cor + costura + logo no mesmo prompt engordou a faixa da gola e da nuca para o dobro da largura real — sem trocar de caminho, sem imagem de texto, só por acúmulo de instrução. Correção: comparar sempre o resultado lado a lado com a referência aprovada na mesma região (recorte igual, mesmo enquadramento) antes de entregar, não só olhar a peça inteira.

---

## Marca

| Ativo | Onde está |
|---|---|
| Monograma e logotipo | `Logo_Eclat_1_1.pdf`, quatro versões: sobre branco, sobre marrom, sobre nude e sobre cinza |
| Instagram | use.ÉCLAT |

O monograma é um nó entrelaçado de É e C; o logotipo traz ÉCLAT em serifa abaixo dele. Cor do traço em marrom avermelhado, próximo de `#6E4034`.

---

## Identificadores de geração

Imagens e vídeos gerados ficam guardados na conta Higgsfield e podem ser reaproveitados como referência em novas gerações, passando o job ID.

| Ativo | Job ID |
|---|---|
| Camisa Meridiano cropped — costas | `6822bdab-e86d-475a-91fd-be0ea99fe417` |
| Camisa Meridiano cropped — frente (gerada a partir das costas) | `0dcbafe9-d30d-4c92-97b1-a3e4cd37a16c` |
| Teste de caimento em vídeo | `7e612c23-4c8c-468d-92c0-92916898295b` |

---

## Fotos de treino do avatar

Enviadas em 05/08/2026. Os `media_id` ficam registrados caso o Soul precise ser retreinado com o mesmo conjunto.

```
9e581fa3-3383-4332-a100-cab752770ca2
8c81922b-8eac-4579-9655-d6e35dc5333e
3e9c4546-1a93-4c25-9280-126e048a0108
08e20b82-858b-4c15-90b0-1e742b2966bd
e6e180ac-8fef-4d86-86aa-792edded42a1
0e92fe1f-72bb-47fd-a221-41a2e100fff3
638f8c9d-a940-48bb-b9cd-f85ada1ad570
9b56c630-4df8-403a-b23c-11b98c7dc338
9296f86d-0cbd-494a-9b2c-3c316013dbe2
f511e57c-9d57-4d0c-9014-29579dcf432a
35be945e-5d87-47a1-93a2-deeac6d834f3
ba0e9f4c-9863-4f09-935e-f04bb194f15c
4337776f-b6e0-4ec3-9ccb-31ecc95c83f1
ea157cef-be0a-43c9-ade2-72fbfad5cb4a
```
