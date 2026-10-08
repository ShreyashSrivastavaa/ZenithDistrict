import cv2
import numpy as np

def trace_and_export():
    img = cv2.imread('d7aa6ed2-a206-40ec-a9d5-d4e831c6d5aa.png')
    if img is None:
        raise ValueError("Could not load image")
        
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    filtered = cv2.bilateralFilter(gray, 7, 50, 50)
    _, binary = cv2.threshold(filtered, 65, 255, cv2.THRESH_BINARY)
    
    contours, hierarchy = cv2.findContours(binary, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
    
    # Separate into monogram contours and text contours
    monogram_contours = []
    text_contours = []
    all_valid_contours = []
    
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area < 15:
            continue
        all_valid_contours.append(cnt)
        x, y, w, h = cv2.boundingRect(cnt)
        if y < 670:
            monogram_contours.append(cnt)
        else:
            text_contours.append(cnt)
            
    def contours_to_svg(cnt_list, epsilon=0.55):
        paths = []
        all_pts = []
        for cnt in cnt_list:
            approx = cv2.approxPolyDP(cnt, epsilon, True)
            if len(approx) < 3:
                continue
            pts = approx.reshape(-1, 2)
            all_pts.append(pts)
            d = f"M {pts[0][0]},{pts[0][1]}"
            for pt in pts[1:]:
                d += f" L {pt[0]},{pt[1]}"
            d += " Z"
            paths.append(d)
        
        all_pts = np.vstack(all_pts)
        min_x, min_y = all_pts.min(axis=0)
        max_x, max_y = all_pts.max(axis=0)
        
        vb_w = max_x - min_x
        vb_h = max_y - min_y
        
        return paths, min_x, min_y, vb_w, vb_h

    # 1. Full Logo
    full_paths, fx, fy, fw, fh = contours_to_svg(all_valid_contours)
    pad_f = 20
    full_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{fx - pad_f} {fy - pad_f} {fw + pad_f*2} {fh + pad_f*2}" fill="currentColor" fill-rule="evenodd">
  <!-- ZenithDistrict Official Brand Logo -->
  <path d="{' '.join(full_paths)}" />
</svg>'''
    with open('public/brand/zenith-district-full.svg', 'w', encoding='utf-8') as f:
        f.write(full_svg)
    print("Exported public/brand/zenith-district-full.svg")

    # 2. Standalone Monogram Mark (ZD + Celestial Orbit + Star)
    # Normalize to (0, 0)
    mark_paths_raw, mx, my, mw, mh = contours_to_svg(monogram_contours)
    
    # We can create a normalized version where min_x=0, min_y=0
    normalized_paths = []
    for cnt in monogram_contours:
        approx = cv2.approxPolyDP(cnt, 0.55, True)
        if len(approx) < 3:
            continue
        pts = approx.reshape(-1, 2)
        pts_norm = pts - [mx, my]
        d = f"M {pts_norm[0][0]},{pts_norm[0][1]}"
        for pt in pts_norm[1:]:
            d += f" L {pt[0]},{pt[1]}"
        d += " Z"
        normalized_paths.append(d)
        
    pad_m = 10
    mark_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-pad_m} {-pad_m} {mw + pad_m*2} {mh + pad_m*2}" fill="currentColor" fill-rule="evenodd">
  <!-- ZenithDistrict Official ZD Monogram Mark -->
  <path d="{' '.join(normalized_paths)}" />
</svg>'''
    with open('public/brand/zenith-district-mark.svg', 'w', encoding='utf-8') as f:
        f.write(mark_svg)
    print(f"Exported public/brand/zenith-district-mark.svg (Dimensions: {mw}x{mh})")

    # Also output the path string for direct embedding into React LogoMark.tsx
    with open('scripts/mark_path.txt', 'w', encoding='utf-8') as f:
        f.write(' '.join(normalized_paths))
    with open('scripts/mark_viewbox.txt', 'w', encoding='utf-8') as f:
        f.write(f"{-pad_m} {-pad_m} {mw + pad_m*2} {mh + pad_m*2}")
        
    # Also copy the original high-res logo to public/brand/zenith-district-logo.png for raster fallbacks
    cv2.imwrite('public/brand/zenith-district-logo.png', img)
    print("Saved public/brand/zenith-district-logo.png")

if __name__ == '__main__':
    trace_and_export()
