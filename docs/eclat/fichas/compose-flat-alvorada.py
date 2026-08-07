"""
Monta a pagina final do flat do Alvorada (Macaquinho A, peca 002 da Nuance)
a partir de duas imagens ja prontas (tec_frente_alvorada_flat_raw.png /
tec_costas_alvorada_flat_raw.png).

Mesmo metodo das pecas anteriores: croqui plano gerado a partir do render
fotografico aprovado (construcao) e do flat vetorial da familia Blackout
(estilo). Desta vez a instrucao de alca fina/regulador saiu correta de
primeira — sem a derivacao de gola grossa que aconteceu no Eclipse.
"""
from PIL import Image, ImageDraw, ImageFont, ImageChops

FRENTE_RAW = "tec_frente_alvorada_flat_raw.png"
COSTAS_RAW = "tec_costas_alvorada_flat_raw.png"
SWATCH = "amostra-poliamida-offwhite-bronze.jpg"
OUT = "tec_alvorada_flat.png"

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

    target_h = 1700
    frente = resize_h(frente, target_h)
    costas = resize_h(costas, target_h)

    W, H = 2000, 2280
    page = Image.new("RGB", (W, H), (255, 255, 255))
    draw = ImageDraw.Draw(page)

    centered_text(draw, W / 2, 36, "ALVORADA — MACACAO FLARE, BRONZE", f_title, TITLE_COL)
    centered_text(
        draw, W / 2, 96,
        "COLECAO NUANCE · PECA 002   ·   O RELEVO   ·   SEM ESCALA",
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
        ("Decote reto/quadrado na frente, gola canoa nas costas — alcas finas reguláveis (~1cm) com regulador", INK),
        ("Cos marcado na cintura natural, recorte horizontal", INK),
        ("Perna flare — ajustada no quadril e na coxa, abre a partir do joelho até a barra larga", INK),
        ("Costura estrutural tom sobre tom em relevo — sem contraste de cor (Registro O Relevo)", MARK),
        ("Logotipo ECLAT em etiqueta caramelo (transfer plano), centralizado entre os seios, ~4-5cm", MARK),
        ("Monograma tom sobre tom, centralizado nas costas, ~4cm", MARK),
    ]
    yy = ny
    for text, col in notes:
        draw.text((80, yy), text, font=f_small, fill=col)
        yy += 30

    page.save(OUT)
    print("ok", page.size)


if __name__ == "__main__":
    main()
