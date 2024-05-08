export function exportToTxtFile(text, filename) {
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

// csv
export function exportToCsvFile(data, filename) {
  const csv = data.map(row => row.join(',')).join('\n');
  exportToTxtFile(csv, filename);
}
// md
export function exportToMdFile(data, filename) {
  const md = data.map(row => row.join(' | ')).join('\n');
  exportToTxtFile(md, filename);
}
// docx
export function exportToDocxFile(data, filename) {
  const docx = new Docxgen();
  docx.load(data);
  docx.save(filename);
}
//xsl
export function exportToXslFile(data, filename) {
  const xsl = new Xslgen();
  xsl.load(data);
  xsl.save(filename);
}
