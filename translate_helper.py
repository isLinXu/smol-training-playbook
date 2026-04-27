#!/usr/bin/env python3
"""
翻译辅助脚本：读取英文版，生成完整中文版
策略：保留所有 JSX/HTML 标签和代码块，只翻译自然语言部分
"""
import re

def translate_line(line):
    """翻译单行文本（保留代码块和JSX标签）"""
    # 保留空行
    if not line.strip():
        return line
    
    # 保留 JSX 标签和组件
    if line.strip().startswith(('<', '>', '{', '}')):
        return line
    
    # 保留代码块（``` 开头或结尾）
    if line.strip().startswith('```'):
        return line
    
    # 保留 YAML frontmatter
    if line.strip() in ('---',):
        return line
    
    # 这里是翻译逻辑入口（实际需要调用翻译API或手动翻译）
    return line

if __name__ == '__main__':
    with open('/Users/gatilin/PycharmProjects/smol-training-playbook-v260425/app/src/content/articles/article.mdx', 'r', encoding='utf-8') as f:
        en_lines = f.readlines()
    
    print(f"英文版总行数: {len(en_lines)}")
    print("需要手动翻译剩余章节...")
