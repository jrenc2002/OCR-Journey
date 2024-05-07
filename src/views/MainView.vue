<template>
  <div class="h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]">
    <div class="rounded-2xl bg-white w-full h-full bottom-0 shadow p-4 overflow-auto">
      <div class="flex flex-col w-full h-full ">
        <!-- Your header and nav content here -->

        <main class="flex  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-1">
          <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <!-- Iterate over sensor boards -->

            <div>
              <h2>上传文件</h2>
              <div>
                <input type="file" @change="handleFileChange">
              </div>
            </div>
            {{ returnValue }}
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue';
import axios from 'axios';
import  {postInocr,parseInocrTxt} from '@/api/textin.js';
import {exportToTxtFile} from '@/export/txt.js';
const returnValue = ref([]);

const handleFileChange = async (event) => {
  try {
    // 确保使用await关键字等待异步操作完成
    const postResult = await postInocr(event.target.files[0], 'TXT');
    console.log(postResult, '2222');  // 这里假设postInocr返回的是处理后的文本

    // 解析返回的文本，假设parseInocrTxt也是异步的且返回一个Promise
    const parsedText = await parseInocrTxt(postResult);
    let  name='text1.txt'
    // 最后导出到TXT文件
    exportToTxtFile(parsedText,name);
  } catch (error) {
    console.error('Error handling file change:', error);
  }
};

</script>


<style>
@keyframes flip {
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  50% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

.animate-flip {
  animation: flip 0.5s ease-in-out; /* Reduced the duration to 0.5s for a quicker animation */
}
</style>
