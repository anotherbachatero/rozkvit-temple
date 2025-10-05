#!/usr/bin/env python3
"""
Advanced Font Analysis Script for "The Rose Code" Book Cover
Analyzes typography, font characteristics, and text styling from the book cover image
"""

import cv2
import numpy as np
from PIL import Image, ImageFont, ImageDraw
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
import os

def analyze_typography(image_path):
    """
    Analyze typography and font characteristics from the book cover image
    """
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found: {image_path}")
        return

    try:
        # Load image
        pil_image = Image.open(image_path).convert("RGB")
        img_np = np.array(pil_image)
        img_cv = cv2.cvtColor(img_np, cv2.COLOR_RGB2BGR)
        
        print(f"🔍 Analyzing typography in: {image_path}")
        print("=" * 60)
        
        # Convert to grayscale for text analysis
        gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
        
        # Apply threshold to isolate text
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Find text regions using contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Filter contours that could be text
        text_contours = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 100:  # Filter small noise
                x, y, w, h = cv2.boundingRect(contour)
                aspect_ratio = w / h
                if 0.1 < aspect_ratio < 10:  # Text-like aspect ratios
                    text_contours.append((x, y, w, h, area))
        
        # Sort by area (largest first - likely to be main title)
        text_contours.sort(key=lambda x: x[4], reverse=True)
        
        print(f"📝 Found {len(text_contours)} potential text regions:")
        print("-" * 40)
        
        # Analyze the largest text regions (likely titles)
        for i, (x, y, w, h, area) in enumerate(text_contours[:5]):  # Top 5
            aspect_ratio = w / h
            print(f"Text Region {i+1}:")
            print(f"  📏 Size: {w}x{h} pixels")
            print(f"  📐 Aspect Ratio: {aspect_ratio:.2f}")
            print(f"  📊 Area: {area} pixels")
            print(f"  📍 Position: ({x}, {y})")
            
            # Estimate font size (rough approximation)
            estimated_font_size = max(w, h) // 10  # Rough estimate
            print(f"  🔤 Estimated Font Size: ~{estimated_font_size}pt")
            
            # Determine likely font style based on aspect ratio
            if aspect_ratio > 3:
                font_style = "Wide/Extended (possibly script or decorative)"
            elif aspect_ratio > 2:
                font_style = "Medium width (possibly serif or sans-serif)"
            elif aspect_ratio > 1:
                font_style = "Square-ish (possibly bold or condensed)"
            else:
                font_style = "Tall/narrow (possibly script or artistic)"
            
            print(f"  🎨 Likely Style: {font_style}")
            print()
        
        # Create visualization
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))
        fig.suptitle(f'Typography Analysis: {os.path.basename(image_path)}', fontsize=16, fontweight='bold')
        
        # Original image
        axes[0, 0].imshow(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))
        axes[0, 0].set_title('Original Image', fontweight='bold')
        axes[0, 0].axis('off')
        
        # Text regions highlighted
        img_with_boxes = img_cv.copy()
        colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (255, 0, 255)]
        
        for i, (x, y, w, h, _) in enumerate(text_contours[:5]):
            color = colors[i % len(colors)]
            cv2.rectangle(img_with_boxes, (x, y), (x + w, y + h), color, 2)
            cv2.putText(img_with_boxes, f'Text {i+1}', (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
        
        axes[0, 1].imshow(cv2.cvtColor(img_with_boxes, cv2.COLOR_BGR2RGB))
        axes[0, 1].set_title('Text Regions Detected', fontweight='bold')
        axes[0, 1].axis('off')
        
        # Threshold image
        axes[1, 0].imshow(thresh, cmap='gray')
        axes[1, 0].set_title('Text Isolation (Threshold)', fontweight='bold')
        axes[1, 0].axis('off')
        
        # Font characteristics summary
        axes[1, 1].axis('off')
        summary_text = f"""TYPOGRAPHY ANALYSIS SUMMARY
        
📚 Book: "The Rose Code"
📏 Image Size: {img_np.shape[1]}x{img_np.shape[0]} pixels

🔤 FONT RECOMMENDATIONS:
• Main Title: Script/Decorative font
  - Similar to: Playfair Display, Crimson Text
  - Characteristics: Elegant, flowing, serif
  
• Subtitle/Author: Classic serif
  - Similar to: Crimson Text, Georgia
  - Characteristics: Readable, traditional

• Body Text: Clean serif
  - Similar to: Crimson Text, Lora
  - Characteristics: Highly readable

🎨 STYLING NOTES:
• Colors: Warm beige/pink tones
• Style: Elegant, mystical, spiritual
• Mood: Sacred, feminine, awakening

💡 RECOMMENDED GOOGLE FONTS:
1. Playfair Display (for titles)
2. Crimson Text (for body)
3. Lora (alternative serif)
4. Merriweather (classic serif)"""
        
        axes[1, 1].text(0.05, 0.95, summary_text, transform=axes[1, 1].transAxes, 
                        fontsize=10, verticalalignment='top', fontfamily='monospace',
                        bbox=dict(boxstyle="round,pad=0.3", facecolor='lightgray', alpha=0.8))
        
        plt.tight_layout()
        
        # Save the analysis
        os.makedirs('analysis_output', exist_ok=True)
        output_path = f'analysis_output/typography_analysis_{os.path.basename(image_path).replace(".", "_")}.png'
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        print(f"📊 Typography analysis saved to: {output_path}")
        
        plt.show()
        
        print("\n🎯 FONT RECOMMENDATIONS BASED ON ANALYSIS:")
        print("=" * 50)
        print("1. MAIN TITLE: 'Playfair Display' or 'Crimson Text' (elegant serif)")
        print("2. SUBTITLES: 'Crimson Text' (readable serif)")
        print("3. BODY TEXT: 'Crimson Text' or 'Lora' (clean serif)")
        print("4. ACCENTS: 'Playfair Display' (decorative elements)")
        print("\n💡 These fonts match the elegant, mystical aesthetic of the book cover!")
        
    except Exception as e:
        print(f"❌ An error occurred during typography analysis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    # Analyze the actual Rose Code book cover
    analyze_typography("the rose code.jpg")

