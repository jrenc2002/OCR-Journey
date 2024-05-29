<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] flex flex-col gap-2">
    <div class="rounded-2xl bg-white w-full h-[11rem]  bottom-0 border  p-4 ">
      <div class="flex flex-col w-full h-full gap-2">
        <div class="w-full text-xl p-1 tracking-wide">选择文件解析类型</div>
        <div class="w-full  gap-5 h-full flex overflow-auto">
          <div
            v-for="(temp, index) in fileKinds"
            :key="index"
            :class="temp.color"
            class="relative w-[20%] max-w-[10rem]   h-full flex justify-center items-center rounded-2xl hover:cursor-pointer"
            @click.prevent="toggleCheckbox(temp)">
            <img :src="temp.icon" class="w-[25%]  ">

            <div class="absolute right-3 bottom-3 hover:cursor-pointer cursor-pointer"
                 @click.prevent="toggleCheckbox(temp)">

              <!-- 使用动态id，确保每个checkbox和label的对应关系 -->
              <input :id="`cbx-${index}`" v-model="temp.checked" class="cursor-pointer" style="display: none;"
                     type="checkbox">
              <label :for="`cbx-${index}`" class="check cursor-pointer" @click.prevent="toggleCheckbox(temp)">
                <svg class="max-h-[1.3rem] max-w-[1.3rem]" height="1.3vw" viewBox="0 0 18 18" width="1.3vw">
                  <path
                    d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                  <polyline points="1 9 7 14 15 4"></polyline>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="   w-full h-[calc(100vh-15rem)] bottom-0   flex flex-1 gap-2 ">
      <div class="border relative  rounded-2xl bg-white w-1/2 p-4 h-full ">

        <div class=" w-full h-[2.2rem] text-xl pb-1 tracking-wide  top-0">文件预览</div>
        <div class="w-full h-[calc(100%-2.2rem)] overflow-auto">
          <template v-if="AppGlobal.file.fileType === 'application/pdf'">
            <vue-office-pdf
              :src="fileUrl"
            />
          </template>
          <template v-else-if="AppGlobal.file.fileType === 'image/png'">
            <img :src="fileUrl" alt="Image Preview"/>
          </template>
          <template v-else-if="AppGlobal.file.fileType === 'image/jpeg'">
            <img :src="fileUrl" alt="Image Preview"/>
          </template>
        </div>
        <div class="z-50  absolute right-10 bottom-5">

          <button class="button" @click="startOCR">
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <span class=" tracking-wide">开始识别</span>
          </button>


        </div>


      </div>
      <div class="border relative rounded-2xl bg-white w-1/2 p-4">


        <div class="w-full h-[2.2rem] text-xl pb-1 tracking-wide  top-0">识别结果 <span class="text-sm text-gray-500 ml-2">
          预览仅供测试，实际导出效果要优于预览效果
          <span class="px-5 font-bold text-blue-500 text-xl absolute right-0">{{excelUrl!=null||textValue!=null||docxUrl!=null||decodedMarkdown!=null?'可以导出':'等待识别结果'}}</span>

        </span></div>
        <div class="w-full h-[calc(100%-2.2rem)] overflow-hidden relative">
          <textarea v-if="AppGlobal.returnKind==='TXT'" v-model="textValue"
                    class="w-full min-h-full focus:border-indigo-50 focus:border p-3" placeholder="">
          </textarea>
          <div v-if="AppGlobal.returnKind==='CSV'||AppGlobal.returnKind==='XLS'" class="relative w-full h-full">
            <div class="absolute top-0 bottom-0 left-0 right-0 overflow-auto">
              <div class="inline-block w-[300vw]">
                <vue-office-excel :src="excelUrl"/>
              </div>
            </div>
          </div>
          <div v-if="AppGlobal.returnKind==='DOCX'" class="relative w-full h-full">
            <div class="absolute top-0 bottom-0 left-0 right-0 overflow-auto">
              <div class="inline-block">
                <vue-office-docx class="w-full inline-block" :src="docxUrl"/>
              </div>
            </div>
          </div>
          <div v-if="AppGlobal.returnKind==='MD'" class="relative w-full h-full overflow-auto">

            <div v-html="decodedMarkdown"></div>
          </div>
        </div>
        <div class="z-50  absolute right-10 bottom-5">
          <button class="button2">

            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>

            <span class=" tracking-wide" @click="exportFile">导出文件</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import {onMounted, ref, watch} from 'vue';
import txtIcon from '../assets/image/TXT.svg';
import csvIcon from '../assets/image/CSV.svg';
import mdIcon from '../assets/image/MD.svg';
import docxIcon from '../assets/image/DOCX.svg';
import xlsIcon from '../assets/image/XLS.svg';
import VueOfficePdf from '@vue-office/pdf';
import {useAppGlobal} from '@/store/AppGlobal';
import {parseInocrCsv, parseInocrDocx, parseInocrMd, parseInocrTxt, parseInocrXls, postInocr} from '@/api/textin.js';
import {exportToCsvFile, exportToTxtFile, exportToXlsFile, exportToDocxFile, exportToMDFile} from '@/export';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficeDocx from '@vue-office/docx';
const fileUrl = ref(null);
const excelUrl = ref(null);
const docxUrl=ref(null);
const AppGlobal = useAppGlobal();
const returnOCR = ref();
const parsedValue = ref(null);
const decodedMarkdown = ref(null);
const textValue=ref(null)


onMounted(() => {
    fileView();
    // let content = '<p>更新日志</p> <p>2024-5-9 2:12 初步完成了TXT,CSV,XLS,Word,MD的OCR功能</p> ';

    // Swal.fire({
    //     'icon': 'info',
    //     'confirmButtonText': '确定',
    //     'html': content
    // });
});

watch(AppGlobal.file, () => {
    fileView();
});
const fileView = () => {
    console.log('fileContent', AppGlobal.file.fileContent);
    if (AppGlobal.file.fileType === 'application/pdf') {

        let fileReader = new FileReader();

        fileReader.readAsArrayBuffer(AppGlobal.file.fileContent);
        fileReader.onload = () => {
            fileUrl.value = fileReader.result;
        };
    } else if (AppGlobal.file.fileType === 'image/png' || AppGlobal.file.fileType === 'image/jpeg') {
        const reader = new FileReader();

        reader.onload = (e) => {
            fileUrl.value = e.target.result; // 将读取的结果赋值给imageUrl
        };
        reader.readAsDataURL(AppGlobal.file.fileContent); // 读取文件内容
    }
};
watch(AppGlobal.returnKind, () => {
  excelUrl.value=null
  textValue.value=null
  docxUrl.value=null
  decodedMarkdown.value=null
})
watch(parsedValue, () => {
    returnView();
});
function base64ToBlob(baseContent) {
    let mime = baseContent.match(/:(.*?);/); //获取分割后的base64前缀中的类型
    let bstr = window.atob(baseContent);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { 'type': mime });
}

const returnView = () => {
    if (AppGlobal.returnKind === 'TXT') {
      if (parsedValue.value === '') {
        Swal.fire({
          'text': '读取文件失败，请重新识别文件',
          'icon': 'warning',
          'confirmButtonText': '确定'
        });
        return;
      }
      textValue.value = parsedValue.value;
    // 处理 TXT 文件的逻辑
    } else if (AppGlobal.returnKind === 'DOCX') {
        if (parsedValue.value === '') {
            Swal.fire({
                'text': '读取文件失败，请重新识别文件',
                'icon': 'warning',
                'confirmButtonText': '确定'
            });
            return;
        }
        docxUrl.value = base64ToBlob(parsedValue.value);
    } else if (AppGlobal.returnKind === 'CSV' || AppGlobal.returnKind === 'XLS') {
        if (parsedValue.value === '') {
            Swal.fire({
                'text': '读取文件失败，请重新识别文件',
                'icon': 'warning',
                'confirmButtonText': '确定'
            });
            return;
        }
        excelUrl.value = base64ToBlob(parsedValue.value);
    } else if (AppGlobal.returnKind === 'MD') {
        if (parsedValue.value === '') {
            Swal.fire({
                'text': '读取文件失败，请重新识别文件',
                'icon': 'warning',
                'confirmButtonText': '确定'
            });
            return;
        }
        decodedMarkdown.value = parsedValue.value;
    }
};
const toggleCheckbox = (temp) => {
    console.log('temp', temp);
    fileKinds.value.forEach((item) => {
        if (item.name !== temp.name) {
            item.checked = false;
        } else {
            item.checked = true;
        }
    });
};
const fileKinds = ref([
    {
        'name': 'TXT',
        'icon': txtIcon,
        'color': 'bg-[rgb(233,241,254)] hover:bg-[rgb(213,221,234)]',
        'checked': false
    },
    {
        'name': 'CSV',
        'icon': csvIcon,
        'color': 'bg-[rgb(234,245,245)] hover:bg-[rgb(214,225,225)]',
        'checked': false
    },
    {
        'name': 'XLS',
        'icon': xlsIcon,
        'color': 'bg-[rgb(250,240,243)] hover:bg-[rgb(230,220,223)]',
        'checked': false
    },
    {
        'name': 'MD',
        'icon': mdIcon,
        'color': 'bg-[rgb(234,240,249)] hover:bg-[rgb(214,220,229)]',
        'checked': false
    },
    {
        'name': 'DOCX',
        'icon': docxIcon,
        'color': 'bg-[rgb(244,239,253)] hover:bg-[rgb(224,219,233)]',
        'checked': false
    }
]);
// 开始识别文件
const startOCR = async () => {
    // 检查是否选择文件解析类型,是否有文件存入
    if (!AppGlobal.file.fileContent) {
        await Swal.fire({
            'text': '请上传文件',
            'icon': 'warning',
            'confirmButtonText': '确定'
        });
        return;
    }
    if (fileKinds.value.filter((item) => item.checked).length === 0) {
        Swal.fire({
            'text': '请选择文件解析类型',
            'icon': 'warning',
            'confirmButtonText': '确定'
        });
        return;
    }
    if (fileKinds.value.filter((item) => item.checked).length > 1) {
        Swal.fire({
            'text': '只能选择一种文件解析类型',
            'icon': 'warning',
            'confirmButtonText': '确定'
        });
        return;
    }
    // 选择文件解析类型
    AppGlobal.returnKind = fileKinds.value.filter((item) => item.checked)[0].name;
    excelUrl.value=null
    textValue.value=null
    docxUrl.value=null
    decodedMarkdown.value=null
    // 向API上传文件
    returnOCR.value = await postFile(AppGlobal.file.fileContent);
    parsedValue.value = await parseFile(returnOCR.value);


};

const postFile = async (file) => {
    try {
        const result = await postInocr(file, AppGlobal.returnKind);

        return result;
    } catch (error) {
        console.error('Error post file:', error);
        throw error; // 抛出错误以便外部调用处理
    }
};

const parseFile = async (data) => {
    try {
    // 根据returnKind匹配不同的解析方式
        switch (AppGlobal.returnKind) {
        case 'TXT':
            return await parseInocrTxt(data);
        case 'CSV':
            return await parseInocrCsv(data);
        case 'MD':
            return await parseInocrMd(data);
        case 'DOCX':
            return await parseInocrDocx(data);
        case 'XLS':
            return await parseInocrXls(data);
        default:
            throw new Error('Invalid return kind');
        }
    } catch (error) {
        console.error('Error parsing file:', error);
        throw error; // 抛出错误以便外部调用处理
    }
};

const exportFile = () => {
    console.log(parsedValue.value,AppGlobal.returnKind);
    try {
    // 根据文件类型导出文件
        switch (AppGlobal.returnKind) {
        case 'TXT':
            exportToTxtFile(parsedValue.value, AppGlobal.file.fileName+'-ocr.txt');
            break;
        case 'CSV':
            exportToCsvFile(parsedValue.value, AppGlobal.file.fileName+'-ocr.csv');
            break;
        case 'MD':
            exportToMDFile(parsedValue.value, AppGlobal.file.fileName+'-ocr.md');
            break;
        case 'DOCX':
            exportToDocxFile(parsedValue.value, AppGlobal.file.fileName + '-ocr.docx');
            break;
        case 'XLS':
            exportToXlsFile(parsedValue.value, AppGlobal.file.fileName+'-ocr.xls');
            break;
        default:
            throw new Error('Invalid return kind');
        }

    } catch (error) {
        console.error('Error exporting file:', error);
        throw error; // 抛出错误以便外部调用处理
    }
};

</script>


<style>
.check svg {
  z-index: 1;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: rgba(0, 0, 0, 0);
  stroke-width: 1.5;
  transform: translate3d(0, 0, 0);
  transition: all 0.2s ease;
}

.check svg path {
  stroke-dasharray: 60;
  stroke-dashoffset: 0;
}

.check svg polyline {
  stroke-dasharray: 22;
  stroke-dashoffset: 66;
}

.check:hover:before {
  opacity: 1;
}

.check:hover svg {
  stroke: var(--accent-color, rgba(0, 0, 0, 0));
}

/* 适用于所有checkbox */
input[type="checkbox"]:checked + .check svg {
  stroke: var(--accent-color, #ffffff);
  background-color: black;
  padding: 4px;
  border-radius: 100px;
}

input[type="checkbox"]:checked + .check svg path {
  stroke-dashoffset: 60;
  transition: all 0.2s linear;
}

input[type="checkbox"]:checked + .check svg polyline {
  stroke-dashoffset: 42;
  transition: all 0.1s linear;
  transition-delay: 0.05s;
}

.button {
  font-family: inherit;
  font-size: 16px;
  background: #1875FF;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 7px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0px 14px 56px -11px #1875FF;
}

.button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;

}

.button:hover {
  border: #b7b7b7;
}

.button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;

}

.button:hover svg {
  transform: translateX(2.2em) rotate(45deg) scale(1.1);
}

.button:hover span {
  transform: translateX(6em);
}

.button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

.swal2-popup {
  border-radius: 20px;
}
.button2 {
  font-family: inherit;
  font-size: 16px;
  background: #1875FF;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 7px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0px 14px 56px -11px #1875FF;
}

.button2 span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.button2 svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;

}

.button2:hover {
  border: #b7b7b7;
}

.button2:hover .svg-wrapper {
  animation: fly-2 0.6s ease-in-out infinite alternate;

}

.button2:hover svg {
  transform: translateX(4.5em) rotate(20deg) scale(1.1);
}

.button2:hover span {
  transform: translateX(-1.5rem);
}

.button2:active {
  transform: scale(0.95);
}

@keyframes fly-2 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

</style>
