document.addEventListener('DOMContentLoaded', () => {
    // 1. 从 URL 获取字体 ID
    const urlParams = new URLSearchParams(window.location.search);
    const fontId = urlParams.get('id');

    if (!fontId) {
        // 如果 URL 中没有 ID，则停止加载并显示错误或默认内容
        console.error("Font ID not found in URL.");
        document.querySelector('.detail-title').textContent = "未找到字体信息";
        return;
    }

    // 2. 加载 fonts.json 数据
    fetch('fonts.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load fonts.json');
            }
            return response.json();
        })
        .then(fonts => {
            // 3. 查找匹配的字体数据
            const fontData = fonts.find(font => font.id === fontId);

            if (fontData) {
                // 4. 动态填充 HTML 内容
                renderFontDetails(fontData);
            } else {
                console.error(`Font data for ID: ${fontId} not found.`);
                document.querySelector('.detail-title').textContent = "字体加载失败";
            }
        })
        .catch(error => {
            console.error("Error loading font data:", error);
            document.querySelector('.detail-title').textContent = "数据加载错误";
        });
});

function renderFontDetails(data) {
    // 标题
    document.querySelector('.detail-title').textContent = data.title;
    
    // 字体简介
    document.querySelector('.description-text').textContent = data.description;
    
    // 预览图片 (假设您有一个主要的预览区域)
    // 请确保您的 font_detail.html 有一个用于放置主预览图的 img 标签
    const mainPreview = document.querySelector('.detail-preview-img'); 
    if (mainPreview) {
        // 关键：这里直接使用 fonts.json 中提供的图片路径
        mainPreview.src = data.previewImg:; 
        mainPreview.alt = data.title + "预览图";
    }

    // 字体信息卡片
    document.querySelector('.info-item:nth-child(1) .value').textContent = data.licenseType;
    document.querySelector('.info-item:nth-child(2) .value').textContent = data.fileSize;
    document.querySelector('.info-item:nth-child(3) .value').textContent = data.formats;

    // 百度网盘下载链接 (第 1 个下载按钮)
    const baiduButton = document.querySelector('.download-button:not(.quark-button)');
    if (baiduButton) {
        baiduButton.href = data.baiduLink;
    }

    // 夸克下载链接 (带有 .quark-button 类的下载按钮)
    const quarkButton = document.querySelector('.quark-button');
    if (quarkButton) {
        quarkButton.href = data.quarkLink;
    }
}