#!/usr/bin/env python3
"""
Get a proper animated rose emoji using external services
"""

import requests
import os

def get_emoji_from_unicode():
    """Create a simple animated rose using Unicode and CSS animation"""
    
    # Create HTML file to generate the emoji
    html_content = '''
<!DOCTYPE html>
<html>
<head>
    <style>
        .rose-container {
            width: 200px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 120px;
            background: transparent;
        }
        
        .rose {
            animation: pulse 2s ease-in-out infinite;
            filter: sepia(1) saturate(1.5) hue-rotate(320deg) brightness(0.8);
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        body {
            background: transparent;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <div class="rose-container">
        <div class="rose">🌹</div>
    </div>
</body>
</html>
'''
    
    with open('rose_preview.html', 'w') as f:
        f.write(html_content)
    
    print("Created rose_preview.html - open this in a browser to see the colored rose")

def create_simple_css_rose():
    """Create a simple CSS-based rose solution"""
    
    css_content = '''
/* Simple animated rose using CSS filters */
.instagram-avatar-rose {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
    margin-right: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
}

.instagram-avatar-rose::before {
    content: '🌹';
    font-size: 20px;
    animation: rosePulse 2s ease-in-out infinite;
    filter: sepia(1) saturate(1.8) hue-rotate(320deg) brightness(0.9) contrast(1.1);
}

@keyframes rosePulse {
    0%, 100% { 
        transform: scale(1); 
        filter: sepia(1) saturate(1.8) hue-rotate(320deg) brightness(0.9) contrast(1.1);
    }
    50% { 
        transform: scale(1.1); 
        filter: sepia(1) saturate(2.2) hue-rotate(325deg) brightness(1.1) contrast(1.2);
    }
}
'''
    
    with open('rose_css_solution.css', 'w') as f:
        f.write(css_content)
    
    print("Created rose_css_solution.css - CSS-based rose with filters")

if __name__ == "__main__":
    print("Creating simple rose solutions...")
    get_emoji_from_unicode()
    create_simple_css_rose()
    print("Done! Use the CSS solution for a clean, animated rose.")
