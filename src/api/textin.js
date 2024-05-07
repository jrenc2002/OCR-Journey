import axios from "axios";
const debug=true
// 定义URL常量
const URLS = {
  TABLE: "https://api.textin.com/ai/service/v2/recognize/table",
  MD: "https://api.textin.com/ai/service/v2/recognize",
  TXT: "https://api.textin.com/ai/service/v2/recognize"
};

// 应该从安全的地方获取
const appId = '5f5f8ee05ecefd5aab1d94658263594b';
const secretCode = '7153f1ea7481d9a9b0468c36275e58a8';

export const postInocr = async (file, kind) => {
  if (!file) return;

  // 将 FileReader 的操作封装成一个 Promise
  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  try {
    const fileData = await readFileAsArrayBuffer(file);  // 等待文件读取完成
    if (debug) {
      console.log('传入文件', file, '传入种类', kind, '传入二进制文件', fileData);
    }

    // 使用kind来选择正确的URL
    const url = URLS[kind.toUpperCase()]; // 确保kind的大小写不会影响结果
    if (debug) {
      console.log('postInocr url', url);
    }

    const response = await axios.post(url, fileData, {
      headers: {
        'x-ti-app-id': appId,
        'x-ti-secret-code': secretCode,
        'Content-Type': 'application/octet-stream'
      }
    });

    if (debug) {
      console.log('postInocr 返回值', response);
      // 如果需要查看详细的返回结果可以取消注释下面的行
      // console.log('postInocr 返回结果', JSON.stringify(response.data.result, null, 2));
    }

    return response.data.result || [];

  } catch (error) {
    console.error('上传失败', error);
    return [];  // 出错时返回空数组，保持函数返回类型一致
  }
};

export const parseInocrTxt= (data)=>{
  const lines = data.lines;
  let resultText = "";
  if (debug) {
    console.log('parseInocrTxt data', data)
    console.log('parseInocrTxt lines', lines)
  }
  // 遍历lines数组，每个元素代表文本行的识别结果
  lines.forEach(line => {
    // 使用text字段和其他可能的字段构建文本行
    resultText += line.text + "\n"; // 添加每行识别的文本并换行
  });

  return resultText;
}


