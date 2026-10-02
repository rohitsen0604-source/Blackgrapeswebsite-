import numpy as np
from PIL import Image, ImageFilter

input_path = r"c:\Users\Hp\.gemini\antigravity-ide\scratch\Blackgrapeswebsite-\BlackGrapes\04Oclock\public\images\black_grapes_nano.jpg"
output_path = r"c:\Users\Hp\.gemini\antigravity-ide\scratch\Blackgrapeswebsite-\BlackGrapes\04Oclock\public\images\7addd40bc67f5f380c018d8a8c67adf1-removebg-preview.png"
output_path2 = r"c:\Users\Hp\.gemini\antigravity-ide\scratch\Blackgrapeswebsite-\BlackGrapes\04Oclock\public\images\black_grapes_transparent.png"

# Load image
img = Image.open(input_path).convert("RGB")
arr = np.array(img, dtype=np.float32)

# Height and Width
h, w, _ = arr.shape

# The background has a golden haze on top-left and right, and pure black elsewhere.
# Let's analyze the grape cluster mask:
# Grape berries have cyan/gold circuits, reflections, and deep purplish/blue/black grape skins.
# The vine branch is metallic silver/gold with cyan circuits.
# The background is a smooth gradient from black (0,0,0) to soft ambient warm haze (e.g. max 50-80).

# Calculate luminance
lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]

# Detect local contrast / texture / edges:
# Background is very smooth, whereas grapes and circuits have high local variation.
gray = Image.fromarray(lum.astype(np.uint8))
edges = gray.filter(ImageFilter.FIND_EDGES)
edge_arr = np.array(edges, dtype=np.float32)

# Color saturation / chroma difference
r = arr[:, :, 0]
g = arr[:, :, 1]
b = arr[:, :, 2]
max_c = np.maximum(np.maximum(r, g), b)
min_c = np.minimum(np.minimum(r, g), b)
chroma = max_c - min_c

# Background pixels have low chroma or pure smooth warm gradient in corners:
# Check distances from center of grape cluster (approx center_x = w*0.5, center_y = h*0.5)
y_indices, x_indices = np.indices((h, w))

# Grapes mask criteria:
# 1. Edge energy > 8 OR
# 2. Cyan circuit glow (b > r + 15 and g > r + 10) OR
# 3. Bright reflective dots / specular highlights (lum > 50) OR
# 4. Grape body pixels: lum > 12 and (not corner ambient haze)

# Smooth ambient haze has r > b + 15 and g > b + 5 with very low edge energy
is_warm_haze = (r > b + 10) & (g > b + 5) & (edge_arr < 15) & (x_indices < w * 0.35) & (y_indices < h * 0.45)
is_right_haze = (r > b + 10) & (g > b + 5) & (edge_arr < 15) & (x_indices > w * 0.75)

# Pure background black
is_deep_black = (lum < 15) & (edge_arr < 8)

# Foreground seed
is_fg = (edge_arr > 12) | ((b > r + 10) & (g > r + 5)) | (lum > 40)
is_fg = is_fg & (~is_warm_haze) & (~is_right_haze)

# Dilate and close foreground mask
fg_img = Image.fromarray((is_fg * 255).astype(np.uint8))
fg_dilated = fg_img.filter(ImageFilter.MaxFilter(9))
fg_closed = fg_dilated.filter(ImageFilter.MinFilter(5))

# Also include connected dark grape flesh inside the boundary of the grape bunch
fg_mask = np.array(fg_closed, dtype=np.float32) / 255.0

# Refine alpha:
# For pixels in fg_mask, alpha is proportional to difference from background
alpha = np.zeros((h, w), dtype=np.float32)

# Alpha calculation
alpha = np.clip(fg_mask * ((lum - 8.0) / 20.0), 0.0, 1.0)
alpha[lum > 30] = 1.0 * fg_mask[lum > 30]
alpha[edge_arr > 15] = 1.0
alpha[is_warm_haze] = 0.0
alpha[is_right_haze] = 0.0
alpha[is_deep_black] = 0.0

# Smooth alpha edges
alpha_img = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))

# Combine RGBA
rgba = np.dstack((arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], np.array(alpha_img)))
result = Image.fromarray(rgba.astype(np.uint8))

result.save(output_path, "PNG")
result.save(output_path2, "PNG")
print("Saved custom refined transparent PNG!")
