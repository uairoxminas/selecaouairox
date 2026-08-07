import cairosvg

INK, MARK, THIN = "#1a1a1a", "#9c4a20", "#6f6f6f"
W, H = 980, 1000

def label(x, y, t, size=12, color=THIN, anchor="start"):
    return (f'<text x="{x}" y="{y}" font-family="Helvetica,Arial" font-size="{size}" '
            f'letter-spacing="0.5" fill="{color}" text-anchor="{anchor}">{t}</text>')

def call(px, py, ty, text, sub=None, lx=440, anchor_x=None):
    ax = anchor_x if anchor_x is not None else lx - 12
    s = (f'<path d="M{px} {py} L{ax} {ty-4}" stroke="{THIN}" stroke-width="0.8" fill="none"/>'
         f'<circle cx="{px}" cy="{py}" r="2.6" fill="{THIN}"/>')
    s += label(lx, ty, text, 12, INK)
    if sub:
        s += label(lx, ty + 15, sub, 10.5, THIN)
    return s

# ---------- FRENTE ----------
OUTLINE_F = (
    "M320 62 "
    "C296 62 280 70 270 88 "
    "C240 100 228 140 230 176 "
    "C231 220 233 300 235 392 "
    "C220 420 212 452 214 486 "
    "L210 520 L232 900 L286 900 L292 566 L320 566 L348 566 L354 900 L408 900 "
    "L430 520 L426 486 "
    "C428 452 420 420 405 392 "
    "C407 300 409 220 410 176 "
    "C412 140 400 100 370 88 "
    "C360 70 344 62 320 62 Z"
)
PRINCESS_F = (
    '<path d="M296 96 C282 140 274 180 272 232 C270 280 272 336 280 392" '
    f'fill="none" stroke="{INK}" stroke-width="1.3"/>'
    '<path d="M344 96 C358 140 366 180 368 232 C370 280 368 336 360 392" '
    f'fill="none" stroke="{INK}" stroke-width="1.3"/>'
)
WAISTBAND_F = (
    f'<path d="M235 392 C220 420 212 452 214 486 L426 486 C428 452 420 420 405 392 Z" '
    f'fill="none" stroke="{INK}" stroke-width="1.8"/>'
    f'<path d="M214 486 L426 486" stroke="{INK}" stroke-width="1.1"/>'
)
LEG_SEAMS_F = (
    f'<path d="M268 520 C258 620 252 720 250 820 L252 900" fill="none" stroke="{INK}" stroke-width="1.3"/>'
    f'<path d="M372 520 C382 620 388 720 390 820 L388 900" fill="none" stroke="{INK}" stroke-width="1.3"/>'
)
CENTER_F = f'<path d="M320 486 L320 520" stroke="{THIN}" stroke-width="1" stroke-dasharray="3 3"/>'
RIB_TICKS = f'<g stroke="{THIN}" stroke-width="0.6">' + "".join(
    f'<path d="M{x} 600 L{x} 880"/>' for x in range(226, 430, 9)
) + "</g>"
MONO_F = (f'<g stroke="{MARK}" stroke-width="1.6" fill="none">'
          f'<circle cx="308" cy="437" r="9"/><circle cx="332" cy="437" r="9"/>'
          f'<path d="M308 428 L332 446 M332 428 L308 446"/></g>')
HEM_F = f'<path d="M232 892 L286 892 M354 892 L408 892" stroke="{INK}" stroke-width="1" stroke-dasharray="4 3"/>'

frente = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*2.4}" height="{H*2.4}">
<rect width="{W}" height="{H}" fill="#ffffff"/>
<g fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"><path d="{OUTLINE_F}"/></g>
{PRINCESS_F}{WAISTBAND_F}{LEG_SEAMS_F}{CENTER_F}{RIB_TICKS}{MONO_F}{HEM_F}
{call(320, 64, 100, "GOLA HALTER, FAIXA LARGA 3,5 CM", "Sem fecho — veste pela cabeca. Decote min. 56 cm no estiramento", lx=470)}
{call(280, 250, 250, "COSTURA PRINCESA DO BUSTO", "Tracado continuo, sem vies — quebra de canela na costura", lx=470)}
{call(320, 440, 430, "COS APLICADO — CANELA NA HORIZONTAL", "Monograma bordado tom sobre tom, centralizado", lx=470)}
{call(372, 560, 560, "RECORTE LATERAL DA PERNA", "Canela muda de direcao no encontro — Registro do Relevo", lx=470)}
{call(390, 800, 700, "LEGGING COLADA", "Atencao ao gancho — reduzir altura pela elasticidade do canelado", lx=470)}
{call(388, 890, 800, "BARRA DO TORNOZELO", "Acabamento reto, sem vies", lx=470)}
{label(30, 42, "MACACAO CANELADO — FRENTE", 17, INK)}
{label(30, 62, "SEM ESCALA — PECA AINDA SEM NOME — REGISTRO O RELEVO", 11)}
</svg>'''

# ---------- COSTAS ----------
OUTLINE_B = (
    "M320 62 "
    "C296 62 280 70 270 88 "
    "C240 100 228 140 230 176 "
    "C231 220 233 300 235 392 "
    "C220 420 212 452 214 486 "
    "L210 520 L232 900 L286 900 L292 566 L320 566 L348 566 L354 900 L408 900 "
    "L430 520 L426 486 "
    "C428 452 420 420 405 392 "
    "C407 300 409 220 410 176 "
    "C412 140 400 100 370 88 "
    "C360 70 344 62 320 62 Z"
)
NAPE = f'<path d="M300 96 C305 90 315 88 320 88 C325 88 335 90 340 96" fill="none" stroke="{INK}" stroke-width="2.4"/>'
STRAPS = (
    f'<path d="M300 96 C282 160 268 260 262 392" fill="none" stroke="{INK}" stroke-width="2.6"/>'
    f'<path d="M340 96 C358 160 372 260 378 392" fill="none" stroke="{INK}" stroke-width="2.6"/>'
)
# Recorte vazado real (nao apenas linha de sugestao) — a area entre as alcas e a
# faixa da nuca e pele a mostra, delimitada pelas proprias alcas e pelo cos.
OPEN_CUTOUT = (
    f'<path d="M300 100 C282 160 268 260 262 392 L378 392 '
    f'C372 260 358 160 340 100 '
    f'C335 92 325 92 320 92 C315 92 305 92 300 100 Z" '
    f'fill="{THIN}" fill-opacity="0.09" stroke="none"/>'
)
WAISTBAND_B = (
    f'<path d="M235 392 C220 420 212 452 214 486 L426 486 C428 452 420 420 405 392 Z" '
    f'fill="none" stroke="{INK}" stroke-width="1.8"/>'
    f'<path d="M214 486 L426 486" stroke="{INK}" stroke-width="1.1"/>'
)
YOKE = f'<path d="M235 520 C270 502 370 502 405 520" fill="none" stroke="{INK}" stroke-width="1.3"/>'
LEG_SEAMS_B = (
    f'<path d="M268 520 C258 620 252 720 250 820 L252 900" fill="none" stroke="{INK}" stroke-width="1.3"/>'
    f'<path d="M372 520 C382 620 388 720 390 820 L388 900" fill="none" stroke="{INK}" stroke-width="1.3"/>'
)
CENTER_B = f'<path d="M320 520 L320 900" stroke="{THIN}" stroke-width="1" stroke-dasharray="3 3"/>'
RIB_TICKS_B = f'<g stroke="{THIN}" stroke-width="0.6">' + "".join(
    f'<path d="M{x} 600 L{x} 880"/>' for x in range(226, 430, 9)
) + "</g>"
WORD_B = f'{label(320, 442, "ECLAT", 13, MARK, "middle")}'
HEM_B = f'<path d="M232 892 L286 892 M354 892 L408 892" stroke="{INK}" stroke-width="1" stroke-dasharray="4 3"/>'

costas = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*2.4}" height="{H*2.4}">
<rect width="{W}" height="{H}" fill="#ffffff"/>
<g fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"><path d="{OUTLINE_B}"/></g>
{OPEN_CUTOUT}{NAPE}{STRAPS}{WAISTBAND_B}{YOKE}{LEG_SEAMS_B}{CENTER_B}{RIB_TICKS_B}{WORD_B}{HEM_B}
{call(320, 92, 110, "FAIXA DA NUCA — SEM FECHO", "Mesma abertura da frente, veste pela cabeca. Ponto de atencao: conforto sob mochila/colete", lx=470)}
{call(300, 200, 250, "ALCAS RETAS, PARALELAS", "Nao se cruzam — encontro unico na faixa da nuca. Area sombreada = pele a mostra, sem tecido", lx=470)}
{call(320, 440, 430, "COS APLICADO — LOGOTIPO ECLAT", "Bordado tom sobre tom, centralizado. Canela na horizontal", lx=470)}
{call(320, 510, 500, "PALA DO QUADRIL / RECORTE DO ASSENTO", "Costura curva, sem vies", lx=470)}
{call(390, 800, 700, "LEGGING COLADA", "Mesmo alerta de gancho da frente", lx=470)}
{label(30, 42, "MACACAO CANELADO — COSTAS", 17, INK)}
{label(30, 62, "SEM ESCALA — PECA AINDA SEM NOME — REGISTRO O RELEVO", 11)}
</svg>'''

cairosvg.svg2png(bytestring=frente.encode(), write_to='tec_frente_macacao.png', output_width=1800)
cairosvg.svg2png(bytestring=costas.encode(), write_to='tec_costas_macacao.png', output_width=1800)
print('ok')
