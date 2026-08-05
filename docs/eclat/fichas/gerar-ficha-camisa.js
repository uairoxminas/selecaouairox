const fs = require('fs');
const d = require('docx');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow,
        TableCell, WidthType, ShadingType, BorderStyle, ImageRun, PageBreak } = d;

const INK = "1A1611", COBRE = "9C4A20", CINZA = "6F6F6F", FUNDO = "EFEAE2";
const PW = 9360; // largura util em DXA (Letter 12240 - margens 1440x2)

const noB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const hair = { style: BorderStyle.SINGLE, size: 4, color: "CDC4B4" };

function txt(t, o = {}) {
  return new TextRun({ text: t, font: "Helvetica", size: o.size || 19, bold: !!o.bold,
    color: o.color || INK, allCaps: !!o.caps, characterSpacing: o.track || 0 });
}
function p(t, o = {}) {
  return new Paragraph({ children: Array.isArray(t) ? t : [txt(t, o)],
    alignment: o.align, spacing: { before: o.before ?? 60, after: o.after ?? 60 },
    heading: o.heading, border: o.border });
}
function h1(t) {
  return new Paragraph({ children: [txt(t, { size: 26, bold: true, caps: true, track: 12 })],
    spacing: { before: 320, after: 140 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: COBRE } } });
}
function h2(t) {
  return new Paragraph({ children: [txt(t, { size: 19, bold: true, color: COBRE, caps: true, track: 8 })],
    spacing: { before: 200, after: 80 } });
}
function nota(t) {
  return new Paragraph({ children: [txt(t, { size: 17, color: CINZA })], spacing: { before: 40, after: 140 } });
}
function cell(t, o = {}) {
  return new TableCell({
    width: { size: o.w, type: WidthType.DXA },
    shading: o.head ? { type: ShadingType.CLEAR, fill: FUNDO, color: "auto" } : undefined,
    margins: { top: 90, bottom: 90, left: 110, right: 110 },
    borders: { top: hair, bottom: hair, left: noB, right: noB },
    children: [new Paragraph({ children: [txt(String(t), {
      size: o.head ? 16 : 18, bold: !!o.head || !!o.bold,
      color: o.head ? CINZA : INK, caps: !!o.head, track: o.head ? 10 : 0 })],
      alignment: o.align, spacing: { before: 0, after: 0 } })]
  });
}
function tabela(cols, linhas) {
  const widths = cols.map(c => Math.round(PW * c.f));
  widths[0] += PW - widths.reduce((a, b) => a + b, 0);
  return new Table({
    columnWidths: widths,
    width: { size: PW, type: WidthType.DXA },
    rows: [
      new TableRow({ tableHeader: true, children: cols.map((c, i) =>
        cell(c.t, { w: widths[i], head: true, align: c.align })) }),
      ...linhas.map(l => new TableRow({ children: l.map((v, i) =>
        cell(v, { w: widths[i], align: cols[i].align, bold: i === 0 })) }))
    ]
  });
}
function img(file, w, h) {
  return new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 120 },
    children: [new ImageRun({ type: "png", data: fs.readFileSync(file),
      transformation: { width: w, height: h } })] });
}

const doc = new Document({
  creator: "ÉCLAT",
  title: "Ficha Técnica — Camisa Meridiano Cropped",
  styles: { default: { document: { run: { font: "Helvetica", size: 19, color: INK } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
    children: [

      new Paragraph({ children: [txt("ÉCLAT", { size: 34, bold: true, track: 40 })], spacing: { after: 20 } }),
      new Paragraph({ children: [txt("Ficha técnica de produto", { size: 18, color: CINZA, caps: true, track: 20 })],
        spacing: { after: 200 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COBRE } } }),

      new Paragraph({ children: [txt("CAMISA MERIDIANO CROPPED", { size: 30, bold: true })], spacing: { before: 160, after: 160 } }),

      tabela(
        [{ t: "Campo", f: 0.28 }, { t: "Conteúdo", f: 0.72 }],
        [
          ["Referência", "ECL-MER-001-CAM"],
          ["Coleção", "Meridiano — Essenciais — Verão"],
          ["Categoria", "Camisa / overshirt feminina, caimento oversized"],
          ["Origem da modelagem", "Molde do piloto já aprovado. Única alteração: comprimento."],
          ["Grade", "P · M · G · GG"],
          ["Cor", "Osso (padrão) · Telha (2ª cor, tecido produzido em MG)"],
          ["Versão da ficha", "v1 — a preencher com as medidas do modelista"],
          ["Responsável", "____________________________"],
          ["Data", "____ / ____ / ________"],
        ]
      ),

      h1("1. Desenho técnico"),
      img('tec_frente.png', 620, 289),
      img('tec_costas.png', 620, 289),
      nota("Desenhos sem escala. Todas as cotas estão na tabela de medidas do item 2. Em caso de divergência entre desenho e tabela, a tabela prevalece."),

      new Paragraph({ children: [new PageBreak()] }),

      h1("2. Tabela de medidas"),
      nota("Peça medida aberta sobre a mesa, sem esticar. Tolerância ± 1,0 cm salvo indicação. Os valores abaixo são a proposta de partida — o modelista confirma ou corrige na coluna final."),
      tabela(
        [{ t: "Ponto de medida", f: 0.34 }, { t: "P", f: 0.11, align: AlignmentType.CENTER },
         { t: "M", f: 0.11, align: AlignmentType.CENTER }, { t: "G", f: 0.11, align: AlignmentType.CENTER },
         { t: "GG", f: 0.11, align: AlignmentType.CENTER }, { t: "Confirmado", f: 0.22, align: AlignmentType.CENTER }],
        [
          ["A — Comprimento centro das costas", "38", "39", "40", "41", "______"],
          ["B — Tórax (1 cm abaixo da cava)", "56", "59", "62", "65", "______"],
          ["C — Barra (largura)", "56", "59", "62", "65", "______"],
          ["D — Ombro a ombro", "48", "50", "52", "54", "______"],
          ["E — Comprimento da manga", "23", "24", "25", "26", "______"],
          ["F — Boca da manga (com punho)", "19", "20", "21", "22", "______"],
          ["G — Altura da cava", "26", "27", "28", "29", "______"],
          ["H — Gola: altura do pé", "3,5", "3,5", "3,5", "3,5", "______"],
          ["I — Gola: ponta", "7,0", "7,0", "7,5", "7,5", "______"],
          ["J — Largura da carcela", "3,5", "3,5", "3,5", "3,5", "______"],
          ["K — Bolso: largura × altura", "11×12", "11×12", "12×13", "12×13", "______"],
          ["L — Pala de costas (altura)", "9", "9,5", "10", "10,5", "______"],
        ]
      ),
      nota("O comprimento A é o único ponto alterado em relação ao piloto. Todos os demais permanecem exatamente como o molde aprovado. Antes de cortar a grade, confirmar A no manequim com a bermuda vestida: a barra tem que ficar 4 a 6 cm acima do cós."),

      h1("3. Materiais"),
      h2("Tecido principal"),
      tabela(
        [{ t: "Item", f: 0.3 }, { t: "Especificação", f: 0.7 }],
        [
          ["Artigo", "Mesmo do piloto — sarja canelada fina"],
          ["Composição", "A confirmar com o fornecedor e transcrever aqui"],
          ["Gramatura", "____ g/m²"],
          ["Largura útil", "____ cm"],
          ["Consumo estimado", "____ m por peça (recalcular: cropped consome menos que o piloto)"],
          ["Encolhimento", "Testar antes do corte da grade. Máx. admitido 3%."],
        ]
      ),
      nota("O consumo cai em relação ao piloto porque o corpo encurtou. Peça ao modelista o encaixe novo antes de fechar a compra de tecido — pode render peças a mais no mesmo rolo."),

      h2("Aviamentos"),
      tabela(
        [{ t: "Cód.", f: 0.09 }, { t: "Aviamento", f: 0.27 }, { t: "Especificação", f: 0.42 },
         { t: "Qtd/peça", f: 0.22, align: AlignmentType.CENTER }],
        [
          ["AV-01", "Botão de pressão", "Metal, latão fosco envelhecido, 12 mm, tom cobre", "6"],
          ["AV-02", "Elástico jacquard", "25 mm, fundo Osso, monograma + ÉCLAT em Cobre, repetição 8 cm", "0,45 m"],
          ["AV-03", "Linha de pesponto", "Poliéster, cor Cobre, título conforme facção", "—"],
          ["AV-04", "Linha de overlock", "Poliéster, cor Cobre", "—"],
          ["AV-08", "Etiqueta tecida de barra", "15 × 50 mm dobrada, ÉCLAT em Cobre sobre Osso", "1"],
          ["AV-09", "Aplique silicone 3D", "ÉCLAT, 12 mm, tom sobre tom, relevo 3D", "1"],
          ["AV-10", "Etiqueta de composição", "Cetim, impressa, com CA e instruções de lavagem", "1"],
        ]
      ),
      nota("AV-01 substitui o botão de resina do piloto. Mesma carcela, mesmas posições — não altera o molde. AV-02 exige mínimo de fábrica (normalmente 500 a 1000 m por arte); cotar junto com a largura de 40 mm usada nos shorts e bermudas, na mesma arte e na mesma cotação."),

      new Paragraph({ children: [new PageBreak()] }),

      h1("4. Especificação de costura"),
      tabela(
        [{ t: "Nº", f: 0.07, align: AlignmentType.CENTER }, { t: "Operação", f: 0.32 }, { t: "Especificação", f: 0.61 }],
        [
          ["01", "Fechamento de ombro", "Overlock 3 fios em Cobre + pesponto 6 mm em Cobre"],
          ["02", "Montagem da pala de costas", "Conforme piloto. Pesponto 6 mm em Cobre"],
          ["03", "Aplicação do bolso", "Pesponto 3 mm no contorno, travete nos cantos superiores"],
          ["04", "Aba do bolso", "Pesponto 3 mm, pressão AV-01 centralizada na ponta"],
          ["05", "Montagem da gola", "Conforme piloto. Pé de gola pespontado 3 mm"],
          ["06", "Carcela frontal", "Pesponto duplo 6 mm. 4 pressões AV-01 igualmente espaçadas"],
          ["07", "Montagem da manga", "Overlock 3 fios em Cobre"],
          ["08", "Punho elástico", "Aplicar AV-02 na boca da manga com pesponto duplo. Elástico esticado a 85% da medida F"],
          ["09", "Fechamento lateral", "Overlock 3 fios em Cobre, corrido da cava à barra"],
          ["10", "Etiqueta de barra", "AV-08 embutida na costura lateral esquerda, 4 cm acima da barra"],
          ["11", "Barra", "Bainha 2 cm com pesponto duplo 6 mm em Cobre"],
          ["12", "Aplique de marca", "AV-09 nas costas, centralizado, 4 cm abaixo da costura da gola"],
        ]
      ),
      nota("Toda costura aparente vai em linha Cobre. Nenhuma costura aparente em linha tom sobre tom nesta peça — se a facção não tiver a cor, parar e avisar antes de costurar."),

      h1("5. Posicionamento da marca"),
      tabela(
        [{ t: "Elemento", f: 0.28 }, { t: "Onde", f: 0.44 }, { t: "Medida", f: 0.28 }],
        [
          ["Aplique ÉCLAT (AV-09)", "Costas, centralizado abaixo da gola", "4 cm abaixo da costura, 12 mm de altura"],
          ["Elástico jacquard (AV-02)", "Boca das duas mangas", "25 mm de largura, aparente"],
          ["Etiqueta tecida (AV-08)", "Costura lateral esquerda", "4 cm acima da barra"],
          ["Etiqueta de composição", "Costura lateral esquerda, interna", "Junto à AV-08"],
        ]
      ),
      nota("O monograma nunca é impresso nem bordado em cor contrastante. Só existe em relevo tom sobre tom."),

      h1("6. Pontos críticos de qualidade"),
      tabela(
        [{ t: "Ponto", f: 0.34 }, { t: "O que verificar", f: 0.66 }],
        [
          ["Comprimento da barra", "Vestir com a bermuda: a barra fica 4 a 6 cm acima do cós. Fora disso, reprova."],
          ["Punho elástico", "Franzido regular nos dois punhos. Sem ondulação, sem torção do elástico."],
          ["Pressões", "Testar abrir e fechar 10 vezes. Sem folga, sem marcar o tecido."],
          ["Simetria dos bolsos", "Mesma altura e mesma distância da carcela nos dois lados. Tolerância 0,3 cm."],
          ["Cor da linha", "Todas as costuras aparentes na mesma cor Cobre, sem variação entre lotes."],
          ["Proporção da manga", "Ver observação do item 7."],
        ]
      ),

      h1("7. Observações para o modelista"),
      p("Esta peça é o molde do piloto já aprovado com o corpo encurtado. Não refazer modelagem: cava, ombro, gola, carcela, bolso e manga permanecem como estão. A única alteração é a linha de corte da barra e a bainha."),
      p([txt("Decisão em aberto: ", { bold: true }), txt("com o corpo encurtado, a manga do piloto pode parecer curta demais em relação ao novo comprimento. Pilotar primeiro apenas com a barra encurtada. Se ao vestir a proporção não fechar, aí sim ampliar a manga — com a peça na mão, não no papel.")]),
      p("Refazer o encaixe antes de cortar a grade: o consumo caiu e pode render mais peças por rolo."),

      h1("8. Histórico de revisões"),
      tabela(
        [{ t: "Versão", f: 0.14, align: AlignmentType.CENTER }, { t: "Data", f: 0.2, align: AlignmentType.CENTER },
         { t: "Alteração", f: 0.44 }, { t: "Por", f: 0.22 }],
        [
          ["v1", "____/____/____", "Emissão inicial a partir do piloto aprovado", "________"],
          ["", "____/____/____", "", "________"],
          ["", "____/____/____", "", "________"],
        ]
      ),

      new Paragraph({ children: [txt("ÉCLAT · Ficha técnica ECL-MER-001-CAM · Documento controlado", { size: 15, color: CINZA, caps: true, track: 14 })],
        spacing: { before: 400 },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: "CDC4B4" } } }),
    ]
  }]
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync('FICHA-TECNICA-CAMISA-MERIDIANO.docx', b); console.log('ok'); });
