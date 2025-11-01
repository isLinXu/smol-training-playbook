#!/bin/bash

# 测试本地HTML文件的脚本
echo "🧪 测试本地HTML文件..."

# 检查dist目录是否存在
if [ ! -d "app/dist" ]; then
    echo "❌ dist目录不存在，请先运行 'npm run build:local'"
    exit 1
fi

# 检查index.html是否存在
if [ ! -f "app/dist/index.html" ]; then
    echo "❌ index.html文件不存在"
    exit 1
fi

# 检查关键资源文件
echo "📁 检查资源文件..."
if [ -f "app/dist/_astro/index.DZ3G3zka.css" ]; then
    echo "✅ CSS文件存在"
else
    echo "❌ CSS文件缺失"
fi

if [ -f "app/dist/_astro/hoisted.Cw1NicPi.js" ]; then
    echo "✅ JavaScript文件存在"
else
    echo "❌ JavaScript文件缺失"
fi

if [ -d "app/dist/_astro" ]; then
    echo "✅ 资源目录存在"
else
    echo "❌ 资源目录缺失"
fi

# 检查HTML文件大小
file_size=$(stat -f%z "app/dist/index.html" 2>/dev/null || stat -c%s "app/dist/index.html" 2>/dev/null)
if [ "$file_size" -gt 1000000 ]; then
    echo "✅ HTML文件大小正常 ($(echo "scale=2; $file_size/1024/1024" | bc)MB)"
else
    echo "⚠️  HTML文件可能不完整"
fi

echo ""
echo "🚀 测试完成！您可以通过以下方式打开HTML文件："
echo "   方法1: open app/dist/index.html"
echo "   方法2: 双击 app/dist/index.html 文件"
echo "   方法3: 在浏览器中打开 file://$(pwd)/app/dist/index.html"
echo ""
echo "📖 查看 README.md 了解更多使用方法"