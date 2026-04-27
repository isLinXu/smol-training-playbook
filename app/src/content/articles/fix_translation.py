#!/usr/bin/env python3
"""
修复中文版翻译：替换混乱的"每个大模型都从小规模 Ablation 开始"章节
"""

import sys

def fix_chinese_translation():
    # 读取中文版
    with open('article-zh.mdx', 'r', encoding='utf-8') as f:
        chinese_content = f.read()
    
    # 读取干净的翻译
    with open('section1_complete.mdx', 'r', encoding='utf-8') as f:
        clean_translation = f.read()
    
    # 找到需要替换的部分
    # 开始标记：## 每个大模型都从小规模 Ablation 开始
    # 结束标记：## 设计模型架构
    start_marker = "## 每个大模型都从小规模 Ablation 开始"
    end_marker = "## 设计模型架构"
    
    start_idx = chinese_content.find(start_marker)
    if start_idx == -1:
        print("错误：找不到开始标记")
        return False
    
    end_idx = chinese_content.find(end_marker, start_idx + len(start_marker))
    if end_idx == -1:
        print("错误：找不到结束标记")
        return False
    
    print(f"找到开始位置：{start_idx}")
    print(f"找到结束位置：{end_idx}")
    print(f"将替换 {end_idx - start_idx} 字符")
    
    # 执行替换
    new_content = chinese_content[:start_idx] + clean_translation + "\n\n" + chinese_content[end_idx:]
    
    # 写入新文件
    with open('article-zh-FIXED.mdx', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ 修复完成！新文件：article-zh-FIXED.mdx")
    print(f"原文件大小：{len(chinese_content)} 字符")
    print(f"新文件大小：{len(new_content)} 字符")
    
    return True

if __name__ == "__main__":
    success = fix_chinese_translation()
    sys.exit(0 if success else 1)
