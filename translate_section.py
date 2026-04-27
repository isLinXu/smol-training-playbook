#!/usr/bin/env python3
"""
辅助翻译脚本：读取英文版指定章节，帮助分段翻译
"""

import sys

def extract_section(file_path, start_marker, end_marker=None):
    """提取指定章节的内容"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 找到开始位置
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print(f"错误：找不到开始标记 '{start_marker}'")
        return None
    
    # 找到结束位置
    if end_marker:
        end_idx = content.find(end_marker, start_idx + len(start_marker))
        if end_idx == -1:
            print(f"警告：找不到结束标记 '{end_marker}'，使用文件末尾")
            end_idx = len(content)
    else:
        end_idx = len(content)
    
    section = content[start_idx:end_idx]
    return section

def main():
    if len(sys.argv) < 3:
        print("用法：python translate_section.py <英文文件> <开始标记> [结束标记]")
        sys.exit(1)
    
    file_path = sys.argv[1]
    start_marker = sys.argv[2]
    end_marker = sys.argv[3] if len(sys.argv) > 3 else None
    
    section = extract_section(file_path, start_marker, end_marker)
    
    if section:
        print(f"章节长度：{len(section)} 字符，{section.count(chr(10)) + 1} 行")
        print("\n" + "="*60)
        print(section)
        print("="*60)
        
        # 保存到文件
        output_file = "current_section.txt"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(section)
        print(f"\n✅ 章节已保存到 {output_file}")

if __name__ == "__main__":
    main()
