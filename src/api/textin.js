import axios from 'axios';

import { toRaw } from 'vue';
import * as mammoth from 'mammoth';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import { fromByteArray, toByteArray } from 'base64-js';
const debug=true;
// 定义URL常量
const URLS = {
    'CSV': 'https://api.textin.com/ai/service/v2/recognize/table/multipage?excel=1&table_type_hint=table_without_line',
    'XLS': 'https://api.textin.com/ai/service/v2/recognize/table/multipage?excel=1&table_type_hint=table_without_line',
    'MD': 'https://api.textin.com/robot/v1.0/api/doc_restore',
    'TXT': 'https://api.textin.com/ai/service/v2/recognize/multipage',
    'DOCX':'https://api.textin.com/robot/v1.0/api/doc_restore'
};

const appId = process.env.VUE_APP_APP_ID;
const secretCode = process.env.VUE_APP_SECRET_CODE;


export const postInocr = async (file, kind) => {
    if (!file) {
        console.error('No file provided');
        return;
    }

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
        const fileData = await readFileAsArrayBuffer(file); // 等待文件读取完成

        if (debug) {
            console.log('传入文件', file);
            console.log('传入种类', kind);
            console.log('传入二进制文件', fileData);
        }

        // 使用 kind 来选择正确的 URL
        const url = URLS[kind.toUpperCase()]; // 确保 kind 的大小写不会影响结果

        if (debug) {
            console.log('postInocr url', url);
        }

        const response = await axios.post(url, fileData, {
            'headers': {
                'x-ti-app-id': appId,
                'x-ti-secret-code': secretCode,
                'Content-Type': 'application/octet-stream'
            }
        });

        if (debug) {
            console.log('postInocr 返回值', response);
            console.log('postInocr 返回数据', JSON.stringify(response.data, null, 2)); // 打印完整的响应数据
        }

        return response.data.result || [];

    } catch (error) {
        console.error('上传失败', error);
        return []; // 出错时返回空数组，保持函数返回类型一致
    }
};

export const parseInocrDocx = (data) => {
    const rawData = toRaw(data); // 将响应式对象转换为普通对象

    if (!rawData || !rawData.docx) {
        console.error('Invalid response data');
        console.log('parseInocrDocx raw data', rawData); // 打印 rawData 以便调试
        return '';
    }

    const base64Docx = rawData.docx;

    if (debug) {
        console.log('parseInocrDocx base64Docx', base64Docx);
    }

    return base64Docx; // 返回 Base64 编码的 DOCX 文件字符串
};


export const parseInocrTxt = (data) => {
    // 确保 data 和 data.pages 定义且 data.pages 是一个数组
    if (!data || !Array.isArray(data.pages)) {
        console.error('parseInocrTxt: data.pages is not defined or not an array');
        return '';
    }

    const pages = data.pages;
    let resultText = '';

    if (debug) {
        console.log('parseInocrTxt data', data);
        console.log('parseInocrTxt pages', pages);
    }

    // 遍历pages数组，每个元素代表一个页面
    pages.forEach(page => {
        const lines = page.lines;

        if (Array.isArray(lines)) {
            // 遍历lines数组，每个元素代表文本行的识别结果
            lines.forEach(line => {
                resultText += line.text + '\n'; // 添加每行识别的文本并换行
            });
        } else {
            console.error('parseInocrTxt: page.lines is not an array', page);
        }
    });

    return resultText;
};

export const parseInocrCsv= (data)=>{
    console.log('parseInocrCsv data', data);
    return data.excel;
};

async function convertBase64WordToMd(base64Content) {
    const bytes = toByteArray(base64Content);
    const arrayBuffer = bytes.buffer;
    const result = await mammoth.convertToHtml({ 'arrayBuffer': arrayBuffer });
    const turndownService = new TurndownService();

    turndownService.use(gfm); // 使用 GitHub 风格的 Markdown 插件
    const markdown = turndownService.turndown(result.value);

    return new TextEncoder().encode(markdown);
}
export const parseInocrMd= async (data) => {
    const rawData = toRaw(data); // 将响应式对象转换为普通对象

    if (!rawData || !rawData.docx) {
        console.error('Invalid response data');
        console.log('parseInocrDocx raw data', rawData); // 打印 rawData 以便调试
        return '';
    }

    const base64Docx = rawData.docx;

    const bytes = toByteArray(base64Docx);
    const arrayBuffer = bytes.buffer;
    const result = await mammoth.convertToHtml({ 'arrayBuffer': arrayBuffer });
    const turndownService = new TurndownService();

    turndownService.use(gfm); // 使用 GitHub 风格的 Markdown 插件
    const markdown = turndownService.turndown(result.value);

    return new TextDecoder().decode(new TextEncoder().encode(markdown));

};

export const parseInocrXls= (data)=>{

    return data.excel;
};
