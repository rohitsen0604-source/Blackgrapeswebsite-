import os
from PIL import Image

input_path = r"c:\Users\Hp\.gemini\antigravity-ide\scratch\Blackgrapeswebsite-\BlackGrapes\04Oclock\public\images\black_grapes_nano.jpg"
output_path = r"c:\Users\Hp\.gemini\antigravity-ide\scratch\Blackgrapeswebsite-\BlackGrapes\04Oclock\public\images\7addd40bc67f5f380c018d8a8c67adf1-removebg-preview.png"
output_path2 = r"c:\Users\Hp\.gemini\antigravity-ide\scratch\Blackgrapeswebsite-\BlackGrapes\04Oclock\public\images\black_grapes_transparent.png"

try:
    from rembg import remove
    print("Using rembg...")
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
        with open(output_path, 'wb') as o:
            o.write(output_data)
        with open(output_path2, 'wb') as o2:
            o2.write(output_data)
    print("Background removed successfully with rembg!")
except Exception as e:
    print(f"rembg error: {e}")
    # Fallback to smart alpha thresholding
    print("Using PIL fallback...")
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        # Check if black background with dark threshold
        r, g, b, a = item
        # If very dark or near background black
        brightness = (r * 299 + g * 587 + b * 114) / 1000
        if brightness < 18 and max(r, g, b) < 25:
            newData.append((0, 0, 0, 0))
        elif brightness < 35 and max(r, g, b) < 40:
            alpha = int((brightness - 18) / 17 * 255)
            newData.append((r, g, b, alpha))
        else:
            newData.append(item)
    img.putdata(newData)
    img.save(output_path, "PNG")
    img.save(output_path2, "PNG")
    print("Saved fallback transparent image!")
