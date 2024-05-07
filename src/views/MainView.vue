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
            {{returnValue}}
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const returnValue = ref([]);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = async () => {
    const fileData = reader.result;
    const appId = '5f5f8ee05ecefd5aab1d94658263594b'; // 应该从安全的地方获取
    const secretCode = '7153f1ea7481d9a9b0468c36275e58a8'; // 应该从安全的地方获取
    const url = 'https://api.textin.com/ai/service/v2/recognize';


    try {
      const response = await axios.post(url, fileData, {
        headers: {
          'x-ti-app-id': appId,
          'x-ti-secret-code': secretCode,
          'Content-Type': 'application/octet-stream'
        }
      });


      if (response.data.result) {
        returnValue.value = response.data.result || [];
        console.log(returnValue.value, 'debug3');
      }
    } catch (error) {
      console.error('上传失败', error);
    }
  };
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
