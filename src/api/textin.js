import axios from "axios";

// 定义URL常量
const URLS = {
  TABLE: "https://api.textin.com/ai/service/v2/recognize/table",
  MD: "https://api.textin.com/ai/service/v2/recognize/md",
  TXT: "https://api.textin.com/ai/service/v2/recognize/txt"
};

// 应该从安全的地方获取
const appId = '5f5f8ee05ecefd5aab1d94658263594b';
const secretCode = '7153f1ea7481d9a9b0468c36275e58a8';

const postInocr = async (file, kind) => {
  if (!file) return;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = async () => {
    const fileData = reader.result;
    // 使用kind来选择正确的URL
    const url = URLS[kind.toUpperCase()]; // 确保kind的大小写不会影响结果

    try {
      const response = await axios.post(url, fileData, {
        headers: {
          'x-ti-app-id': appId,
          'x-ti-secret-code': secretCode,
          'Content-Type': 'application/octet-stream'
        }
      });

      if (response.data.result) {
        return response.data.result || [];
      }
    } catch (error) {
      console.error('上传失败', error);
    }
  };
};

export default postInocr;
