<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] flex flex-col gap-2">
    <div class="rounded-2xl bg-white w-full h-[12rem]  bottom-0 border  p-4 ">
      <div class="flex flex-col w-full h-full gap-2">
        <div class="w-full text-xl p-1 tracking-wide" >选择文件解析类型</div>
        <div class="w-full  gap-5 h-full flex overflow-auto">
          <div class="relative w-[20%] max-w-[10rem]   h-full flex justify-center items-center rounded-2xl hover:cursor-pointer"
               :class="temp.color"
               v-for="(temp, index) in fileKinds"
               :key="index"
               @click="toggleCheckbox(temp)">
            <img :src="temp.icon" class="w-[25%]  ">

            <div class="absolute right-3 bottom-3 hover:cursor-pointer cursor-pointer">

              <!-- 使用动态id，确保每个checkbox和label的对应关系 -->
              <input :id="`cbx-${index}`" v-model="temp.checked" class="cursor-pointer" style="display: none;" type="checkbox">
              <label :for="`cbx-${index}`" class="check cursor-pointer"   @click="toggleCheckbox(temp)" >
                <svg height="1.3vw" width="1.3vw" class="max-h-[1.3rem] max-w-[1.3rem]" viewBox="0 0 18 18" >
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
    <div class="   w-full h-full bottom-0   flex flex-1 gap-2 ">
      <div class="border rounded-2xl bg-white w-1/2 p-4">

        <div class="w-full text-xl p-1 tracking-wide" >文件预览</div>
<!--        <pdf :src="pdfUrl" v-if="pdfUrl"></pdf>-->
      </div>
      <div class="border rounded-2xl bg-white w-1/2 p-4">

        <div class="w-full text-xl p-1 tracking-wide" >识别结果</div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import txtIcon from '../assets/image/TXT.svg';
import csvIcon from '../assets/image/CSV.svg';
import mdIcon from '../assets/image/MD.svg';
import docxIcon from '../assets/image/DOCX.svg';
import xslIcon from '../assets/image/XSL.svg';
// import pdf from 'vue-pdf'
import {useAppGlobal} from "@/store/AppGlobal";
const pdfUrl = ref(null);
const AppGlobal = useAppGlobal()

watch(AppGlobal.file.fileContent,()=>{
  if (AppGlobal.file.fileType === "application/pdf") {

  }
})

const toggleCheckbox = (temp) => {
  fileKinds.value.forEach((item) => {
    if (item.name !== temp.name) {
      item.checked = false;
    }
    else {
      item.checked = true;
    }
  })
};
const fileKinds = ref([
  {
    name: 'TXT',
    icon: txtIcon,
    color: 'bg-[rgb(233,241,254)] hover:bg-[rgb(213,221,234)]',
    checked: false
  },
  {
    name: 'CSV',
    icon: csvIcon,
    color: 'bg-[rgb(234,245,245)] hover:bg-[rgb(214,225,225)]',
    checked: false
  },
  {
    name: 'MD',
    icon: mdIcon,
    color: 'bg-[rgb(234,240,249)] hover:bg-[rgb(214,220,229)]',
    checked: false
  },
  {
    name: 'DOCX',
    icon: docxIcon,
    color: 'bg-[rgb(244,239,253)] hover:bg-[rgb(224,219,233)]',
    checked: false
  },
  {
    name: 'XSL',
    icon: xslIcon,
    color: 'bg-[rgb(250,240,243)] hover:bg-[rgb(230,220,223)]',
    checked: false
  }
])


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
  transition: all 0.3s linear;
}

input[type="checkbox"]:checked + .check svg polyline {
  stroke-dashoffset: 42;
  transition: all 0.2s linear;
  transition-delay: 0.15s;
}

</style>
