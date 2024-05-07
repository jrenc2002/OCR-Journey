export function exportToTxtFile(text, filename = 'exported-text.txt') {
  // 创建一个新的Blob对象，其中包含文本内容，设置类型为text/plain
  const blob = new Blob([text], { type: 'text/plain' });

  // 创建一个指向该Blob的URL
  const fileUrl = URL.createObjectURL(blob);

  // 创建一个a标签，用于下载
  const downloadLink = document.createElement('a');
  downloadLink.href = fileUrl;
  downloadLink.download = filename; // 设置下载文件的默认文件名

  // 模拟点击事件触发下载
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // 清理和移除创建的元素和URL
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(fileUrl);
}

