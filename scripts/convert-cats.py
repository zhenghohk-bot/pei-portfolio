from PIL import Image
from pathlib import Path

SRC = Path('/Users/hejennifer/Downloads/个人网页/design-refs/cats-new')
DST = Path('/Users/hejennifer/Downloads/个人网页/app/public/cats')

# 总览图从左到右：端坐 -> 伸懒腰 -> 炸毛 -> 扑蝴蝶 -> 玩毛线 -> 蜷睡
mapping = {
    '2.png': 'sitting.webp',
    '3.png': 'stretch.webp',
    '4.png': 'angry.webp',
    '5.png': 'butterfly.webp',
    '6.png': 'yarn.webp',
    '7.png': 'sleeping.webp',
}

CANVAS = 640          # 统一正方形画布
FILL = 0.45           # 猫身占画布面积比例（统一视觉大小）
MARGIN = 16           # 底部留白

target_area = CANVAS * CANVAS * FILL

for src_name, dst_name in mapping.items():
    im = Image.open(SRC / src_name).convert('RGBA')
    bbox = im.getchannel('A').getbbox()
    if bbox:
        im = im.crop(bbox)
    # 按面积归一：不同宽高比的猫视觉上一样大
    scale = (target_area / (im.width * im.height)) ** 0.5
    w, h = round(im.width * scale), round(im.height * scale)
    # 安全约束：不超出画布
    if w > CANVAS - 2 * MARGIN or h > CANVAS - 2 * MARGIN:
        s = min((CANVAS - 2 * MARGIN) / w, (CANVAS - 2 * MARGIN) / h)
        w, h = round(w * s), round(h * s)
    im = im.resize((w, h), Image.LANCZOS)
    # 贴到统一画布：水平居中、底部对齐（猫脚在同一水平线）
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    canvas.paste(im, ((CANVAS - w) // 2, CANVAS - MARGIN - h), im)
    canvas.save(DST / dst_name, 'WEBP', quality=88, method=4)
    print(f'{src_name} -> {dst_name}: cat {w}x{h} on {CANVAS}x{CANVAS}')
