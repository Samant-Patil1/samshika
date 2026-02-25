import os
import glob
import re

html_files = glob.glob('/Users/yallappah/sam/master_plan/*.html')

replacements = {
    '#3d0c02,#c0392b': '#FF9A9E,#FECFEF',
    '#1a0a00,#6b3010': '#FFD1FF,#FAD0C4',
    '#1e0d00,#e8621a': '#FFECD2,#FCB69F',
    '#2a0000,#7b0000': '#FBC2EB,#A6C1EE',
    '#1a0f00,#d4861a': '#FDDB92,#D1FDFF',
    '#0d0500,#5c2200': '#B2FEFA,#0ED2F7',
    '#1a0600,#a02010': '#84FAB0,#8FD3F4',
    '#0d0000,#3d0000': '#FF9A9E,#FFDAE6',
    
    '#2a0800,#8a3000': '#FF9A9E,#FECFEF',
    '#1a0400,#6b1500': '#FFD1FF,#FAD0C4',
    '#0d0500,#4a1000': '#FFECD2,#FCB69F',
    '#1e0800,#7a2800': '#FBC2EB,#A6C1EE',
    
    'rgba(192, 57, 43, 0.18)': 'rgba(255, 105, 147, 0.18)',
    'rgba(232, 98, 26, 0.15)': 'rgba(255, 102, 0, 0.15)',
    'rgba(212, 134, 26, 0.1)': 'rgba(255, 150, 50, 0.1)',
    'rgba(192, 57, 43, 0.12)': 'rgba(255, 105, 147, 0.12)',
    'rgba(192,57,43,0.12)': 'rgba(255,105,147,0.12)',
    'rgba(192,57,43,0.1)': 'rgba(255,105,147,0.1)',
    'rgba(232,98,26,0.4)': 'rgba(255,102,0,0.4)',
    'rgba(232,98,26,0.15)': 'rgba(255,105,147,0.15)',
    
    'var(--surface2), #0a0604': 'var(--surface2), #FFDAE6',
    
    '#c0392b,#e74c3c': '#FF9A9E,#FECFEF',
    '#c0392b,#7b241c': '#FBC2EB,#A6C1EE',
    '#e8621a,#f47c3c': '#FFECD2,#FCB69F',
    
    'var(--pink), var(--rose), var(--gold)': 'var(--pink), var(--rose), var(--blush)',
    'var(--navy), #1a2a3a': 'var(--navy), var(--blush)',
    
    '#c0392b,#e8621a': '#FF6993,#FF6600',
    '#f093fb,#f5576c': '#FFDAE6,#FF6993'
}

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
