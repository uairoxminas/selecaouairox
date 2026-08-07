"""
Monta a pagina final do flat do Fulgor (conjunto top + short, peca 003 da
Nuance) a partir de duas imagens ja prontas (tec_frente_fulgor_flat_raw.png /
tec_costas_fulgor_flat_raw.png).

Mesmo metodo das pecas anteriores: croqui plano gerado a partir do render
fotografico aprovado (construcao) e do flat vetorial do Alvorada (estilo).
"""
from PIL import Image, ImageDraw, ImageFont, ImageChops

FRENTE_RAW = "tec_frente_fulgor_flat_raw.png"
COSTAS_RAW = "tec_costas_fulgor_flat_raw.png"
SWATCH = "amostra-poliamida-offwhite-bronze.jpg"
OUT = "tec_fulgor_flat.png"

TITLE_COL = (138, 47, 30)
INK = (30, 20, 20)
GREY = (110, 110, 110)
MARK = (156, 74, 32)

FONT_DIR = "/usr/share/fonts/truetype/dejavu/"
f_title = ImageFont.truetype(FONT_DIR + "DejaVuSerif-Bold.ttf", 44)
f_sub = ImageFont.truetype(FONT_DIR + "DejaVuSans.ttf", 20)
f_label = ImageFont.truetype(FONT_DIR + "DejaVuSerif.ttf", 30)
f_small = ImageFont.truetype(FONT_DIR + "DejaVuSans.ttf", 20)
f_note = ImageFont.truetype(FONT_DIR + "DejaVuSans-Bold.ttf", 20)


def trim_white(im, pad=20):
    bg = Image.new("RGB", im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg)
    bbox = diff.getbbox()
    if bbox:
        l, t, r, b = bbox
        l, t = max(l - pad, 0), max(t - pad, 0)
        r, b = min(r + pad, im.width), min(b + pad, im.height)
        return im.crop((l, t, r, b))
    return im


def resize_h(im, h):
    return im.resize((int(im.width * h / im.height), h))


def centered_text(draw, cx, y, text, font, fill):
    w = draw.textlength(text, font=font)
    draw.text((cx - w / 2, y), text, font=font, fill=fill)


def main():
    frente = trim_white(Image.open(FRENTE_RAW).convert("RGB"))
    costas = trim_white(Image.open(COSTAS_RAW).convert("RGB"))
    swatch = Image.open(SWATCH).convert("RGB")

    target_h = 1900
    frente = resize_h(frente, target_h)
    costas = resize_h(costas, target_h)

    W, H = 2000, 2480
    page = Image.new("RGB", (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(page)

    centered_text(draw, W / 2, 36, "FULGOR — CONJUNTO TOP + SHORT, BRONZE", f_title, TITLE_COL)
    centered_text(
        draw, W / 2, 96,
        "COLECAO NUANCE · PECA 003   ·   SEM ESCALA",
        f_sub, GREY,
    )

    gap = 220
    start_x = (W - (frente.width + costas.width + gap)) // 2
    y_img = 175
    page.paste(frente, (start_x, y_img))
    costas_x = start_x + frente.width + gap
    page.paste(costas, (costas_x, y_img))

    centered_text(draw, start_x + frente.width / 2, y_img - 44, "FRENTE", f_label, TITLE_COL)
    centered_text(draw, costas_x + costas.width / 2, y_img - 44, "COSTAS", f_label, TITLE_COL)

    sw_box = 220
    sx = start_x + frente.width + (gap - sw_box) // 2
    sy = y_img + 60
    swatch_r = swatch.resize((sw_box, int(sw_box * swatch.height / swatch.width))).crop((0, 0, sw_box, sw_box))
    page.paste(swatch_r, (sx, sy))
    draw.rectangle([sx, sy, sx + sw_box, sy + sw_box], outline=INK, width=2)
    centered_text(draw, sx + sw_box / 2, sy + sw_box + 26, "POLIAMIDA BRONZE", f_note, INK)
    centered_text(draw, sx + sw_box / 2, sy + sw_box + 56, "Cor a confirmar contra", f_small, GREY)
    centered_text(draw, sx + sw_box / 2, sy + sw_box + 80, "cartao fisico Marazul", f_small, GREY)

    ny = y_img + target_h + 40
    draw.line([(80, ny - 20), (W - 80, ny - 20)], fill=(216, 208, 200), width=2)
    notes = [
        ("Top: alcas finas cruzadas em X na frente, retas (sem cruzar) nas costas — costas abertas, sem escada", INK),
        ("Elastico na base do top, estampado com o monograma ECLAT repetido tom sobre tom (marca d'agua)", MARK),
        ("Costura estrutural tom sobre tom em relevo nos recortes princesa do top — Registro O Relevo", MARK),
        ("Short de cintura alta, costuras normais (sem costura viva) — sem pesponto ou relevo aparente", INK),
        ("Costura empina bumbum nas costas do short — recorte em coracao na pala, pesponto duplo marcado", MARK),
        ("Logotipo ECLAT em relevo no peito do top, tom sobre tom", MARK),
        ("Monograma emborrachado caramelo (no entrelacado) na barra de uma perna do short, ~3cm", MARK),
    ]
    yy = ny
    for text, col in notes:
        draw.text((80, yy), text, font=f_small, fill=col)
        yy += 30

    page.save(OUT)
    print("ok", page.size)


if __name__ == "__main__":
    main()
