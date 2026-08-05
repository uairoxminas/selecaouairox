import cairosvg

INK, MARK, THIN = "#1a1a1a", "#9c4a20", "#6f6f6f"
W, H = 900, 420

def label(x, y, t, size=12, color=THIN, anchor="start"):
    return (f'<text x="{x}" y="{y}" font-family="Helvetica,Arial" font-size="{size}" '
            f'letter-spacing="0.5" fill="{color}" text-anchor="{anchor}">{t}</text>')

def call(px, py, ty, text, sub=None, lx=470):
    s = (f'<path d="M{px} {py} L{lx-12} {ty-4}" stroke="{THIN}" stroke-width="0.8" fill="none"/>'
         f'<circle cx="{px}" cy="{py}" r="2.4" fill="{THIN}"/>')
    s += label(lx, ty, text, 12.5, INK)
    if sub:
        s += label(lx, ty + 15, sub, 11, THIN)
    return s

BODY = ('M150 116 Q210 94 270 116 L268 138 L330 166 L352 256 L316 270 L306 234 '
        'L306 350 L114 350 L114 234 L104 270 L68 256 L90 166 L152 138 Z')
BODYB = ('M150 116 Q210 94 270 116 L330 166 L352 256 L316 270 L306 234 '
         'L306 350 L114 350 L114 234 L104 270 L68 256 L90 166 Z')

CUFFS = (f'<g fill="none" stroke="{MARK}" stroke-width="2.6">'
         f'<path d="M104 256 L114 252 L114 270 L104 270 Z"/>'
         f'<path d="M316 256 L306 252 L306 270 L316 270 Z"/></g>')
HEM = f'<path d="M114 342 L306 342" stroke="{INK}" stroke-width="1" stroke-dasharray="4 3" fill="none"/>'

frente = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*3}" height="{H*3}">
<rect width="{W}" height="{H}" fill="#ffffff"/>
<g fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"><path d="{BODY}"/></g>
<g fill="none" stroke="{INK}" stroke-width="1.6">
  <path d="M150 116 L186 150 L210 138 L234 150 L270 116"/>
  <path d="M150 116 L152 138 L186 150"/><path d="M270 116 L268 138 L234 150"/>
  <path d="M210 138 L210 350"/>
  <path d="M158 188 L196 188 L196 230 L158 230 Z"/>
  <path d="M224 188 L262 188 L262 230 L224 230 Z"/>
  <path d="M158 188 L177 202 L196 188"/><path d="M224 188 L243 202 L262 188"/>
</g>{CUFFS}
<g fill="{INK}"><circle cx="210" cy="170" r="4"/><circle cx="210" cy="216" r="4"/>
<circle cx="210" cy="262" r="4"/><circle cx="210" cy="308" r="4"/>
<circle cx="177" cy="196" r="3.4"/><circle cx="243" cy="196" r="3.4"/></g>{HEM}
{call(210, 124, 118, "GOLA SOCIAL COM PE DE GOLA", "Inalterada do piloto")}
{call(210, 216, 166, "CARCELA — 4 BOTOES DE PRESSAO", "Latao fosco cobre. Substitui botao de resina")}
{call(243, 196, 214, "BOLSO CHAPADO COM ABA PONTIAGUDA", "Inalterado. Fecho por pressao metalica")}
{call(312, 261, 262, "PUNHO ELASTICO JACQUARD 25 MM", "Aviamento AV-02. Encurtar bainha da manga")}
{call(258, 346, 310, "BARRA RETA — PESPONTO DUPLO 6 MM", "Comprimento cropped: ver tabela de medidas")}
{label(30, 42, "CAMISA MERIDIANO CROPPED — FRENTE", 16, INK)}
{label(30, 62, "SEM ESCALA — COTAS EM CM NA TABELA DE MEDIDAS", 11)}
</svg>'''

costas = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*3}" height="{H*3}">
<rect width="{W}" height="{H}" fill="#ffffff"/>
<g fill="none" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"><path d="{BODYB}"/></g>
<g fill="none" stroke="{INK}" stroke-width="1.6">
  <path d="M150 116 Q210 126 270 116"/><path d="M112 174 L308 174"/>
</g>{CUFFS}{HEM}
<rect x="188" y="188" width="44" height="11" fill="none" stroke="{MARK}" stroke-width="1.5"/>
<rect x="118" y="318" width="7" height="16" fill="none" stroke="{MARK}" stroke-width="1.5"/>
{call(210, 174, 140, "PALA DE COSTAS", "Inalterada do piloto")}
{call(210, 193, 188, "ECLAT EM RELEVO SILICONE 12 MM", "Tom sobre tom. 4 cm abaixo da costura da gola")}
{call(312, 261, 236, "PUNHO ELASTICO JACQUARD 25 MM", "Aviamento AV-02, identico a frente")}
{call(124, 326, 284, "ETIQUETA TECIDA NA LATERAL ESQUERDA", "Aviamento AV-08. 4 cm acima da barra")}
{label(30, 42, "CAMISA MERIDIANO CROPPED — COSTAS", 16, INK)}
{label(30, 62, "SEM ESCALA — COTAS EM CM NA TABELA DE MEDIDAS", 11)}
</svg>'''

cairosvg.svg2png(bytestring=frente.encode(), write_to='tec_frente.png', output_width=2100)
cairosvg.svg2png(bytestring=costas.encode(), write_to='tec_costas.png', output_width=2100)
print('ok')
