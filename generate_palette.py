import cv2
import numpy as np

# Create image
height, width = 300, 800
img = np.zeros((height, width, 3), dtype=np.uint8)

# Colors in BGR
colors = [
    (230, 218, 255), # Soft Bright Pink
    (147, 105, 255), # Hot Pink
    (0, 102, 255),   # Bright Orange
    (30, 0, 210)     # Romantic Red
]
labels = ["Soft Bright Pink", "Hot Pink", "Bright Orange", "Romantic Red"]
hex_codes = ["#FFDAE6", "#FF6993", "#FF6600", "#D2001E"]

segment_width = width // len(colors)

for i, color in enumerate(colors):
    start_x = i * segment_width
    end_x = (i + 1) * segment_width
    img[:, start_x:end_x] = color

    # Add text
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 0.6
    font_color = (0, 0, 0)
    thickness = 2
    
    cv2.putText(img, labels[i], (start_x + 10, height // 2), font, font_scale, font_color, thickness, cv2.LINE_AA)
    cv2.putText(img, hex_codes[i], (start_x + 10, height // 2 + 30), font, font_scale, font_color, thickness, cv2.LINE_AA)

cv2.imwrite('/Users/yallappah/sam/master_plan/palette.png', img)
print("Palette saved to palette.png")
