#!/usr/bin/env python3
"""
Advanced Image Analysis Tool
Analyzes images for colors, patterns, and visual elements
"""

import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import sys
import os

def analyze_image(image_path):
    """Comprehensive image analysis"""
    
    print(f"🔍 Analyzing image: {os.path.basename(image_path)}")
    print("=" * 60)
    
    # Load image with PIL for basic info
    try:
        pil_img = Image.open(image_path)
        width, height = pil_img.size
        mode = pil_img.mode
        
        print(f"📏 Image Dimensions: {width} x {height} pixels")
        print(f"🎨 Color Mode: {mode}")
        print(f"📊 Total Pixels: {width * height:,}")
        print()
        
    except Exception as e:
        print(f"❌ Error loading image: {e}")
        return
    
    # Load image with OpenCV for analysis
    try:
        img = cv2.imread(image_path)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # Convert to different color spaces for analysis
        img_lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return
    
    # 1. Color Analysis
    print("🎨 COLOR ANALYSIS")
    print("-" * 30)
    
    # Dominant colors using K-means clustering
    def get_dominant_colors(image, k=5):
        """Extract dominant colors using K-means clustering"""
        data = image.reshape((-1, 3))
        data = np.float32(data)
        
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0)
        _, labels, centers = cv2.kmeans(data, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
        
        centers = np.uint8(centers)
        return centers
    
    dominant_colors = get_dominant_colors(img_rgb)
    
    print("🌈 Dominant Colors (RGB values):")
    for i, color in enumerate(dominant_colors):
        rgb = tuple(color)
        hex_color = f"#{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}"
        print(f"   {i+1}. RGB{rgb} → {hex_color}")
    
    # Brightness analysis
    brightness = np.mean(img_gray)
    print(f"💡 Average Brightness: {brightness:.1f}/255 ({brightness/255*100:.1f}%)")
    
    # Contrast analysis
    contrast = np.std(img_gray)
    print(f"⚡ Contrast (Standard Deviation): {contrast:.1f}")
    
    # Color distribution
    r_mean, g_mean, b_mean = np.mean(img_rgb, axis=(0,1))
    print(f"🔴 Red Channel Average: {r_mean:.1f}")
    print(f"🟢 Green Channel Average: {g_mean:.1f}")
    print(f"🔵 Blue Channel Average: {b_mean:.1f}")
    
    print()
    
    # 2. Edge and Texture Analysis
    print("📐 EDGE & TEXTURE ANALYSIS")
    print("-" * 30)
    
    # Edge detection
    edges_canny = cv2.Canny(img_gray, 50, 150)
    edge_density = np.sum(edges_canny > 0) / (width * height) * 100
    print(f"📏 Edge Density: {edge_density:.2f}% of pixels")
    
    # Texture analysis using Local Binary Patterns
    def calculate_texture_complexity(image):
        """Calculate texture complexity using gradient magnitude"""
        grad_x = cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=3)
        grad_y = cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=3)
        magnitude = np.sqrt(grad_x**2 + grad_y**2)
        return np.mean(magnitude)
    
    texture_complexity = calculate_texture_complexity(img_gray)
    print(f"🧩 Texture Complexity: {texture_complexity:.2f}")
    
    # Sharpness analysis
    laplacian_var = cv2.Laplacian(img_gray, cv2.CV_64F).var()
    print(f"🔍 Sharpness (Laplacian Variance): {laplacian_var:.2f}")
    
    print()
    
    # 3. Histogram Analysis
    print("📊 HISTOGRAM ANALYSIS")
    print("-" * 30)
    
    # Calculate histograms for each channel
    hist_r = cv2.calcHist([img_rgb], [0], None, [256], [0, 256])
    hist_g = cv2.calcHist([img_rgb], [1], None, [256], [0, 256])
    hist_b = cv2.calcHist([img_rgb], [2], None, [256], [0, 256])
    
    # Find peaks in histograms
    def find_histogram_peaks(hist, threshold=0.01):
        """Find significant peaks in histogram"""
        max_val = np.max(hist)
        threshold_val = max_val * threshold
        peaks = []
        for i, val in enumerate(hist):
            if val > threshold_val:
                peaks.append(i)
        return peaks
    
    r_peaks = find_histogram_peaks(hist_r)
    g_peaks = find_histogram_peaks(hist_g)
    b_peaks = find_histogram_peaks(hist_b)
    
    print(f"🔴 Red channel peaks at intensities: {r_peaks[:5]}{'...' if len(r_peaks) > 5 else ''}")
    print(f"🟢 Green channel peaks at intensities: {g_peaks[:5]}{'...' if len(g_peaks) > 5 else ''}")
    print(f"🔵 Blue channel peaks at intensities: {b_peaks[:5]}{'...' if len(b_peaks) > 5 else ''}")
    
    print()
    
    # 4. Object Detection (if OpenCV has DNN support)
    print("🎯 OBJECT DETECTION")
    print("-" * 30)
    
    try:
        # Simple contour detection
        contours, _ = cv2.findContours(edges_canny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        significant_contours = [c for c in contours if cv2.contourArea(c) > 100]
        
        print(f"🔍 Found {len(significant_contours)} significant contours/objects")
        
        if significant_contours:
            # Analyze the largest contour
            largest_contour = max(significant_contours, key=cv2.contourArea)
            area = cv2.contourArea(largest_contour)
            perimeter = cv2.arcLength(largest_contour, True)
            print(f"📏 Largest object area: {area:.0f} pixels ({area/(width*height)*100:.1f}% of image)")
            print(f"📐 Largest object perimeter: {perimeter:.0f} pixels")
            
            # Circularity
            if perimeter > 0:
                circularity = 4 * np.pi * area / (perimeter * perimeter)
                print(f"⭕ Circularity of largest object: {circularity:.3f} (1.0 = perfect circle)")
        
    except Exception as e:
        print(f"⚠️  Object detection limited: {e}")
    
    print()
    
    # 5. Image Quality Metrics
    print("⭐ IMAGE QUALITY METRICS")
    print("-" * 30)
    
    # Blur detection
    blur_score = cv2.Laplacian(img_gray, cv2.CV_64F).var()
    if blur_score > 100:
        blur_level = "Sharp"
    elif blur_score > 50:
        blur_level = "Moderately Sharp"
    else:
        blur_level = "Blurry"
    print(f"🔍 Blur Level: {blur_level} (score: {blur_score:.1f})")
    
    # Noise estimation
    noise_level = np.std(cv2.Laplacian(img_gray, cv2.CV_64F))
    if noise_level < 10:
        noise_level_desc = "Low"
    elif noise_level < 20:
        noise_level_desc = "Medium"
    else:
        noise_level_desc = "High"
    print(f"🔊 Noise Level: {noise_level_desc} (score: {noise_level:.1f})")
    
    # Dynamic range
    min_val, max_val = img_gray.min(), img_gray.max()
    dynamic_range = max_val - min_val
    print(f"📈 Dynamic Range: {dynamic_range}/255 ({dynamic_range/255*100:.1f}%)")
    
    print()
    
    # 6. Summary and Recommendations
    print("📋 SUMMARY & RECOMMENDATIONS")
    print("-" * 30)
    
    recommendations = []
    
    if brightness < 50:
        recommendations.append("💡 Consider increasing brightness - image appears dark")
    elif brightness > 200:
        recommendations.append("☀️ Consider reducing brightness - image appears overexposed")
    
    if contrast < 30:
        recommendations.append("⚡ Consider increasing contrast - image appears flat")
    
    if blur_score < 50:
        recommendations.append("🔍 Image appears blurry - check focus or camera stability")
    
    if edge_density < 1:
        recommendations.append("📐 Low edge density - image may lack detail or be very smooth")
    elif edge_density > 15:
        recommendations.append("📐 High edge density - image has many fine details")
    
    if not recommendations:
        recommendations.append("✅ Image appears well-balanced overall!")
    
    for rec in recommendations:
        print(rec)
    
    print()
    print("🎉 Analysis Complete!")
    print("=" * 60)

def create_visualization(image_path, output_dir="analysis_output"):
    """Create visual analysis plots"""
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Load image
    img = cv2.imread(image_path)
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Create figure with subplots
    fig, axes = plt.subplots(2, 3, figsize=(15, 10))
    fig.suptitle(f'Visual Analysis: {os.path.basename(image_path)}', fontsize=16)
    
    # Original image
    axes[0, 0].imshow(img_rgb)
    axes[0, 0].set_title('Original Image')
    axes[0, 0].axis('off')
    
    # Grayscale
    axes[0, 1].imshow(img_gray, cmap='gray')
    axes[0, 1].set_title('Grayscale')
    axes[0, 1].axis('off')
    
    # Edges
    edges = cv2.Canny(img_gray, 50, 150)
    axes[0, 2].imshow(edges, cmap='gray')
    axes[0, 2].set_title('Edge Detection')
    axes[0, 2].axis('off')
    
    # Color histograms
    colors = ['red', 'green', 'blue']
    for i, color in enumerate(colors):
        hist = cv2.calcHist([img_rgb], [i], None, [256], [0, 256])
        axes[1, i].plot(hist, color=color)
        axes[1, i].set_title(f'{color.capitalize()} Histogram')
        axes[1, i].set_xlabel('Intensity')
        axes[1, i].set_ylabel('Frequency')
        axes[1, i].grid(True, alpha=0.3)
    
    plt.tight_layout()
    
    # Save the plot
    output_path = os.path.join(output_dir, f"analysis_{os.path.splitext(os.path.basename(image_path))[0]}.png")
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    plt.close()
    
    print(f"📊 Visualization saved to: {output_path}")

def main():
    if len(sys.argv) != 2:
        print("Usage: python image_analyzer.py <image_path>")
        print("Example: python image_analyzer.py /path/to/your/image.jpg")
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"❌ Error: Image file not found: {image_path}")
        sys.exit(1)
    
    # Perform analysis
    analyze_image(image_path)
    
    # Create visualization
    try:
        create_visualization(image_path)
    except Exception as e:
        print(f"⚠️  Could not create visualization: {e}")

if __name__ == "__main__":
    main()
