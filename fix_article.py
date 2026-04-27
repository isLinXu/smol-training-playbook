#!/usr/bin/env python3
"""
Safe fix script for article-zh.mdx
Uses line-by-line processing to avoid sed corruption issues
"""

import re

def fix_article():
    with open('app/src/content/articles/article-zh.mdx', 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    fixed_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Fix 1: Code block issue around line 3244-3286
        # Convert the code block containing math to blockquote
        if i == 3243:  # Line 3244 (0-indexed: 3243)
            # Check if this is the problematic code block
            if line.strip() == '```':
                # Replace with blockquote
                fixed_lines.append('> 但是，由于慢跑者和火车都在同一个方向上移动，相对速度是它们速度之间的差异：\n')
                i += 1
                if i < len(lines):
                    math_line = lines[i]
                    # Add > prefix to math line
                    fixed_lines.append('> ' + math_line)
                    i += 1
                if i < len(lines) and lines[i].strip() == '```':
                    i += 1  # Skip the closing ```
                continue
        
        # Fix 2: Remove stray ``` before "使用过长补全惩罚"
        if line.strip() == '```' and i > 0:
            # Check if next line contains the heading
            if i + 1 < len(lines) and '使用过长补全惩罚' in lines[i + 1]:
                i += 1  # Skip the ``` line
                continue
        
        fixed_lines.append(line)
        i += 1
    
    with open('app/src/content/articles/article-zh.mdx', 'w', encoding='utf-8') as f:
        f.writelines(fixed_lines)
    
    print("Article fixed successfully")

if __name__ == '__main__':
    fix_article()
