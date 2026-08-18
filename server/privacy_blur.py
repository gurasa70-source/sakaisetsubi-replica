import sys
import os
from PIL import Image, ImageFilter

def process_image(input_path, output_path):
    """
    プライバシー保護自動匿名化スクリプト：
    車両ナンバープレート、人物の顔、表札等が写り込みやすいエリアに対して
    安全にモザイクまたはぼかし処理を適用します。
    万が一画像処理に失敗した場合は例外を発生させ、未処理画像の流出を防ぎます。
    """
    try:
        img = Image.open(input_path).convert("RGB")
        width, height = img.size
        
        # 1. 下部領域（車両ナンバープレートや敷地内の表札・看板等：yが height * 0.60 から height）
        box_bottom = (0, int(height * 0.60), width, height)
        region_bottom = img.crop(box_bottom)
        region_bottom = region_bottom.resize(
            (max(1, region_bottom.width // 10), max(1, region_bottom.height // 10)),
            Image.Resampling.BILINEAR
        ).resize(
            (width, height - int(height * 0.60)),
            Image.Resampling.NEAREST
        )
        img.paste(region_bottom, box_bottom)

        # 2. 上部〜中央領域の車両プレート想定エリア（yが height * 0.15 から height * 0.55、xが width * 0.25 から width * 0.75）
        box_center_top = (int(width * 0.25), int(height * 0.15), int(width * 0.75), int(height * 0.55))
        region_ct = img.crop(box_center_top)
        region_ct = region_ct.resize(
            (max(1, region_ct.width // 10), max(1, region_ct.height // 10)),
            Image.Resampling.BILINEAR
        ).resize(
            (int(width * 0.5), int(height * 0.40)),
            Image.Resampling.NEAREST
        )
        img.paste(region_ct, box_center_top)

        img.save(output_path, "JPEG", quality=92)
        print("SUCCESS")
    except Exception as e:
        print(f"ERROR: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 privacy_blur.py <input> <output>")
        sys.exit(1)
    process_image(sys.argv[1], sys.argv[2])
