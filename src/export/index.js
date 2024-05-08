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
export function exportToCsvFile(base64String,fileName) {
  // 将 base64 编码的字符串转换为二进制数据
  const binaryString = window.atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // 创建 Blob 对象
  const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // 创建下载链接
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();

  // 释放对象 URL
  window.URL.revokeObjectURL(link.href);
}
// md
export function exportToMdFile(data) {

}
// docx
export function exportToDocxFile(data) {

}
//xsl
export function exportToXslFile(base64String,fileName) {
  // 将 base64 编码的字符串转换为二进制数据
  const binaryString = window.atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // 创建 Blob 对象
  const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // 创建下载链接
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();

  // 释放对象 URL
  window.URL.revokeObjectURL(link.href);
}

