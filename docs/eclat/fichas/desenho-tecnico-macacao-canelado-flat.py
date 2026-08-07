import cairosvg, base64

INK = "#241012"          # contorno da silhueta
FILL = "#B32C58"         # canelado marsala/cereja, aproximado do cartao Marazul
STITCH = "#7C1F3D"       # pesponto tom sobre tom, mais escuro que o tecido
MARK = "#9C4A20"         # tinta de identificacao no flat (bordado e tom sobre tom na peca real)
TITLE = "#8A2F1E"
W, H = 2000, 1230

def dashed(d, w=1.1, double=False, color=STITCH, offset=5):
    if not double:
        return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{w}" stroke-dasharray="6 4"/>'
    # segunda linha paralela aproximada por leve deslocamento vertical do mesmo path
    return (f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{w}" stroke-dasharray="6 4"/>'
            f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{w}" stroke-dasharray="6 4" '
            f'transform="translate(0,{offset})"/>')

OUTLINE = (
    "M320 62 C296 62 280 78 274 96 L250 112 C224 132 210 158 206 190 "
    "L198 240 L232 232 L228 300 L235 392 C220 420 212 452 214 486 "
    "L210 520 L232 900 L286 900 L292 566 L320 566 L348 566 L354 900 L408 900 "
    "L430 520 L426 486 C428 452 420 420 405 392 "
    "L412 300 L408 232 L442 240 L434 190 C430 158 416 132 390 112 "
    "L366 96 C360 78 344 62 320 62 Z"
)
WAIST_TOP = "M235 392 C220 420 212 452 214 486"
WAIST_TOP_R = "M405 392 C420 420 428 452 426 486"
WAIST_BOTTOM = "M214 486 L426 486"
HEM_L = "M232 892 L286 892"
HEM_R = "M354 892 L408 892"

# ---------- FRENTE ----------
PRINCESS_L = "M296 96 C282 140 274 180 272 232 C270 280 272 336 280 392"
PRINCESS_R = "M344 96 C358 140 366 180 368 232 C370 280 368 336 360 392"
LEG_L_F = "M268 520 C258 620 252 720 250 820 L252 900"
LEG_R_F = "M372 520 C382 620 388 720 390 820 L388 900"
CENTER_F = f'<path d="M320 486 L320 520" stroke="{STITCH}" stroke-width="0.9" stroke-opacity="0.55" stroke-dasharray="3 3"/>'
MONO_F = (f'<g stroke="{MARK}" stroke-width="1.8" fill="none">'
          f'<circle cx="308" cy="437" r="9"/><circle cx="332" cy="437" r="9"/>'
          f'<path d="M308 428 L332 446 M332 428 L308 446"/></g>')

FRONT_G = f'''<g>
<path d="{OUTLINE}" fill="{FILL}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>
{dashed(PRINCESS_L)}{dashed(PRINCESS_R)}
{dashed(WAIST_TOP, double=True)}{dashed(WAIST_TOP_R, double=True)}{dashed(WAIST_BOTTOM, double=True)}
{dashed(LEG_L_F)}{dashed(LEG_R_F)}
{CENTER_F}
{dashed(HEM_L)}{dashed(HEM_R)}
{MONO_F}
<text x="320" y="42" font-family="Georgia,'Times New Roman',serif" font-size="20" letter-spacing="1.5" fill="{TITLE}" text-anchor="middle">FRENTE</text>
</g>'''

# ---------- COSTAS ----------
NAPE = f'<path d="M300 96 C305 90 315 88 320 88 C325 88 335 90 340 96" fill="none" stroke="{INK}" stroke-width="2.6"/>'
STRAP_L = "M300 96 C282 160 268 260 262 392"
STRAP_R = "M340 96 C358 160 372 260 378 392"
OPEN_CUTOUT = (
    f'<path d="M300 100 C282 160 268 260 262 392 L378 392 '
    f'C372 260 358 160 340 100 C335 92 325 92 320 92 C315 92 305 92 300 100 Z" '
    f'fill="#f4ede9" stroke="none"/>'
)
YOKE = "M235 520 C270 502 370 502 405 520"
LEG_L_B = "M268 520 C258 620 252 720 250 820 L252 900"
LEG_R_B = "M372 520 C382 620 388 720 390 820 L388 900"
CENTER_B = f'<path d="M320 520 L320 900" stroke="{STITCH}" stroke-width="0.9" stroke-opacity="0.55" stroke-dasharray="3 3"/>'
WORD_B = (f'<text x="320" y="442" font-family="Georgia,\'Times New Roman\',serif" font-size="15" '
          f'letter-spacing="2" fill="{MARK}" text-anchor="middle">ÉCLAT</text>')

BACK_G = f'''<g>
<path d="{OUTLINE}" fill="{FILL}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>
{OPEN_CUTOUT}
{NAPE}
<path d="{STRAP_L}" fill="none" stroke="{INK}" stroke-width="2.8"/>
<path d="{STRAP_R}" fill="none" stroke="{INK}" stroke-width="2.8"/>
{dashed(WAIST_TOP, double=True)}{dashed(WAIST_TOP_R, double=True)}{dashed(WAIST_BOTTOM, double=True)}
{dashed(YOKE)}
{dashed(LEG_L_B)}{dashed(LEG_R_B)}
{CENTER_B}
{dashed(HEM_L)}{dashed(HEM_R)}
{WORD_B}
<text x="320" y="42" font-family="Georgia,'Times New Roman',serif" font-size="20" letter-spacing="1.5" fill="{TITLE}" text-anchor="middle">COSTAS</text>
</g>'''

SWATCH_PATH = ("/tmp/claude-0/-home-user-selecaouairox/68b7192c-efb9-5f24-ba01-c01e563b62cc/"
               "scratchpad/chk_69b8b76c-4318-4d70-8052-b5591e4e303a.jpg")
with open(SWATCH_PATH, "rb") as fh:
    swatch_b64 = base64.b64encode(fh.read()).decode()

SWATCH = (f'<image href="data:image/jpeg;base64,{swatch_b64}" x="0" y="0" width="180" height="230" '
          f'preserveAspectRatio="xMidYMid slice" clip-path="inset(0 round 4)"/>')

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*1.1}" height="{H*1.1}">
<rect width="{W}" height="{H}" fill="#ffffff"/>
<text x="{W/2}" y="46" font-family="Georgia,'Times New Roman',serif" font-size="30" letter-spacing="2"
  fill="{TITLE}" text-anchor="middle">MACACAO CANELADO — PECA AINDA SEM NOME</text>
<text x="{W/2}" y="72" font-family="Helvetica,Arial" font-size="13" letter-spacing="1" fill="#6f6f6f"
  text-anchor="middle">REGISTRO O RELEVO — SEM ESCALA</text>
<g transform="translate(120,90)">{FRONT_G}</g>
<g transform="translate(1080,90)">{BACK_G}</g>
<g transform="translate(1650,860)">
  {SWATCH}
  <rect x="0" y="0" width="180" height="230" fill="none" stroke="{INK}" stroke-width="1"/>
  <text x="0" y="252" font-family="Helvetica,Arial" font-size="13" fill="{INK}">TECIDO CANELADO</text>
  <text x="0" y="270" font-family="Helvetica,Arial" font-size="11" fill="#6f6f6f">Cor a confirmar contra</text>
  <text x="0" y="285" font-family="Helvetica,Arial" font-size="11" fill="#6f6f6f">cartao fisico Marazul</text>
</g>
<g transform="translate(120,1060)">
  <line x1="0" y1="-24" x2="{W-240}" y2="-24" stroke="#d8d0c8" stroke-width="1"/>
  <text x="0" y="0" font-family="Helvetica,Arial" font-size="13" fill="{INK}">Pesponto duplo no cos — topo e base da faixa</text>
  <text x="0" y="22" font-family="Helvetica,Arial" font-size="13" fill="{INK}">Costura simples nos recortes princesa, laterais da perna e pala do quadril</text>
  <text x="0" y="44" font-family="Helvetica,Arial" font-size="13" fill="{INK}">Gola/nuca sem fecho — veste pela cabeca. Decote min. 56 cm no estiramento</text>
  <text x="0" y="66" font-family="Helvetica,Arial" font-size="13" fill="{INK}">Area clara nas costas = pele a mostra, sem tecido. Alcas retas, sem cruzar</text>
  <text x="0" y="88" font-family="Helvetica,Arial" font-size="13" fill="{MARK}">Monograma (frente) e logotipo ECLAT (costas) bordados tom sobre tom no cos</text>
  <text x="0" y="110" font-family="Helvetica,Arial" font-size="13" fill="{INK}">Atencao ao gancho — reduzir altura pela elasticidade do canelado no sentido da largura</text>
</g>
</svg>'''

cairosvg.svg2png(bytestring=svg.encode(), write_to='tec_macacao_canelado_flat.png', output_width=2600)
print('ok')
