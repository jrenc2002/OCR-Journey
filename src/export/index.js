import { saveAs } from 'file-saver';

export function exportToTxtFile(text, filename) {
    // 创建一个新的Blob对象，其中包含文本内容，设置类型为text/plain
    const blob = new Blob([text], { 'type': 'text/plain' });

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


// md

// docx
export function exportToDocxFile(base64Content, fileName) {
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { 'type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    saveAs(blob, fileName);
}

//xsl
export function exportToXlsFile(base64String,fileName) {
    // 将 base64 编码的字符串转换为二进制数据
    const binaryString = window.atob(base64String);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // 创建 Blob 对象
    const blob = new Blob([bytes], { 'type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // 创建下载链接
    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // 释放对象 URL
    window.URL.revokeObjectURL(link.href);
}
// csv
import * as XLSX from 'xlsx';

export function exportToCsvFile(base64String, fileName) {
  // 将 base64 编码的字符串转换为二进制数据
  const binaryString = window.atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // 将二进制数据转换为 Excel 工作簿
  const workbook = XLSX.read(bytes, { type: 'array' });

  // 获取第一个工作表
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // 将工作表转换为 CSV
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  // 创建 Blob 对象
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  // 创建下载链接
  const link = document.createElement('a');
  if (link.download !== undefined) {
    // 设置下载链接
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


export function exportToMDFile(base64Content, fileName) {
      console.log(base64Content)
      const blob = new Blob([base64Content], { type: 'text/markdown;charset=utf-8' });
      saveAs(blob, fileName);
      console.log('Conversion completed');
}


// 示例调用方式
// exportToDocxFile('<your-base64-content>', 'output.md');

