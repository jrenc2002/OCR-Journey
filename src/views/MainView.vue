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
import {postInocr} from '@/api/textin.js';
const returnValue = ref([]);

const handleFileChange = async (event) => {
  returnValue.value=postInocr(event.target.files[0],'TXT')
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
